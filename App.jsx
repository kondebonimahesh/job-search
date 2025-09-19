import React, { useState, useCallback, useMemo, useEffect } from 'react';
// import type { JobData } from './types'; // Removed
import { findJobs } from './services/geminiService';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { ControlsPanel } from './components/ControlsPanel';
import { FireIcon } from './components/icons/FireIcon';

const PAGE_SIZE = 12;

// Helper to parse strings like "5h ago", "2 days ago" into hours for sorting
const parseRelativeDate = (dateStr) => { // Removed type annotation
    if (!dateStr) return Infinity; // Push jobs without dates to the end

    const now = new Date();
    const value = parseInt(dateStr, 10);
    if (isNaN(value)) return Infinity;

    if (dateStr.includes('minute')) {
        return value / 60;
    }
    if (dateStr.includes('hour')) {
        return value;
    }
    if (dateStr.includes('day')) {
        return value * 24;
    }
    if (dateStr.includes('week')) {
        return value * 24 * 7;
    }
    if (dateStr.includes('month')) {
        return value * 24 * 30;
    }
    return Infinity;
};

const App = () => { // Removed React.FC
  const [query, setQuery] = useState(''); // Removed <string>
  const [foundJobs, setFoundJobs] = useState(null); // Removed <JobData[] | null>
  const [isLoading, setIsLoading] = useState(false); // Removed <boolean>
  const [error, setError] = useState(null); // Removed <string | null>
  const [currentPage, setCurrentPage] = useState(1); // Removed <number>
  const [isLastPage, setIsLastPage] = useState(false); // Removed <boolean>

  const [filters, setFilters] = useState({
      location: '',
      employmentType: '',
      workplaceType: '',
      minSalary: '',
      minExperience: ''
  });
  const [sortOption, setSortOption] = useState('relevance');

  const fetchAndSetJobs = useCallback(async (page) => { // Removed type annotation
    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }
    setIsLoading(true);
    setError(null);
    if (page === 1) {
        setFoundJobs(null); // Clear previous results for a new search
    }

    try {
      const data = await findJobs(query, page, PAGE_SIZE);
      setFoundJobs(data);
      setCurrentPage(page);
      setIsLastPage(data.length < PAGE_SIZE);
    } catch (e) { // Removed : unknown
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
      setFoundJobs(null);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  // Reset to page 1 when filters or sort option change
  useEffect(() => {
    if (foundJobs) {
      setCurrentPage(1); // Conceptually reset, but we don't refetch, just filter current data.
    }
  }, [filters, sortOption, foundJobs]);


  const filteredAndSortedJobs = useMemo(() => {
    if (!foundJobs) return null;

    // Filtering logic
    let filtered = foundJobs.filter(job => {
        const locationMatch = !filters.location || job.locations?.some(l => l.toLowerCase().includes(filters.location.toLowerCase()));
        const employmentMatch = !filters.employmentType || job.employment_type === filters.employmentType;
        const workplaceMatch = !filters.workplaceType || job.workplace_type === filters.workplaceType;
        const salaryMatch = !filters.minSalary || (job.salary?.min ?? job.salary?.max ?? 0) >= Number(filters.minSalary);
        const experienceMatch = !filters.minExperience || (job.experience_min_years ?? 0) >= Number(filters.minExperience);

        return locationMatch && employmentMatch && workplaceMatch && salaryMatch && experienceMatch;
    });

    // Sorting logic
    switch (sortOption) {
        case 'date':
            filtered.sort((a, b) => parseRelativeDate(a.posted_at) - parseRelativeDate(b.posted_at));
            break;
        case 'salary':
            filtered.sort((a, b) => {
                const salaryA = a.salary?.max ?? a.salary?.min ?? 0;
                const salaryB = b.salary?.max ?? b.salary?.min ?? 0;
                return salaryB - salaryA;
            });
            break;
        case 'relevance':
        default:
            // Do nothing, keep original API order
            break;
    }

    return filtered;
  }, [foundJobs, filters, sortOption]);

  return (
    <div className="min-h-screen bg-black font-sans">
      <header className="bg-black/70 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <FireIcon className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-xl font-bold text-slate-100">Job Hunter</h1>
              <p className="text-sm text-slate-400">Find real job postings</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8 mt-4 flex flex-col items-center">
        <div className="w-full max-w-7xl space-y-8">
            <InputPanel
                query={query}
                setQuery={setQuery}
                handleSearch={() => fetchAndSetJobs(1)}
                isLoading={isLoading}
            />

            {foundJobs && (
              <ControlsPanel
                filters={filters}
                setFilters={setFilters}
                sortOption={sortOption}
                setSortOption={setSortOption}
                hasResults={foundJobs.length > 0}
              />
            )}

            <OutputPanel
                jobs={filteredAndSortedJobs}
                isLoading={isLoading}
                error={error}
                hasSearched={foundJobs !== null}
                currentPage={currentPage}
                isLastPage={isLastPage}
                onPageChange={fetchAndSetJobs}
            />
        </div>
      </main>
    </div>
  );
};

export default App;