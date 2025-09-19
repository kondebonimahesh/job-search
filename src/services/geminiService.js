import { GoogleGenAI } from "@google/genai";
// import type { JobData } from '../types'; // Removed

// Fix: API key must be read from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const findJobs = async (query, page, pageSize) => { // Removed type annotations
    const systemInstruction = "You are an expert job search assistant. Your task is to find real, recent job postings based on the user's query using Google Search. You must return the data in a specific JSON format. The entire response body must be only the JSON array, with no introductory text, conversational filler, or markdown formatting like ```json. If you cannot find any jobs, return an empty array [].";

    const jobSchemaString = JSON.stringify({
        company_name: "string | null",
        title: "string",
        locations: "string[] | null",
        employment_type: "'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Temporary' | 'Seasonal' | 'Volunteer' | null",
        workplace_type: "'Remote' | 'Onsite' | 'Hybrid' | null",
        salary: {
            min: "number | null",
            max: "number | null",
            currency: "string (ISO 4217 code like 'USD') | null",
            frequency: "'Yearly' | 'Monthly' | 'Hourly' | null"
        },
        requirements_summary: "string (less than 250 characters) | null",
        experience_min_years: "number | null",
        posted_at: "string (e.g., '5h ago', '2 days ago') | null",
        source_url: "string | null",
    }, null, 2);


    const userPrompt = `Please find ${pageSize} jobs matching this query: "${query}".
This is for page ${page}. Avoid returning jobs you may have provided for previous pages.

For each job you find, extract as much of the following information as possible and format the output as a JSON array of objects. The schema for each object should be:
${jobSchemaString}

Ensure the 'source_url' field contains the direct URL to the job posting. Again, your entire response must be ONLY the raw JSON array string.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction,
                tools: [{googleSearch: {}}],
            },
        });

        let jsonString = response.text.trim();

        // Clean the string in case the model wraps it in markdown
        const jsonMatch = jsonString.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
            jsonString = jsonMatch[1];
        }

        const parsedData = JSON.parse(jsonString);

        if (!Array.isArray(parsedData)) {
             throw new Error("API did not return a valid array of jobs.");
        }

        return parsedData; // Removed as JobData[]
    } catch (error) {
        console.error("Error finding jobs:", error);
        if (error instanceof SyntaxError) {
             throw new Error('The API returned data in an unexpected format that could not be parsed. Please try a different query.');
        }
        if (error instanceof Error) {
            throw new Error(`Failed to find jobs: ${error.message}`);
        }
        throw new Error("An unknown error occurred while finding jobs.");
    }
};
