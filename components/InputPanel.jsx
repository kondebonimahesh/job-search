import React from 'react';
import { Spinner } from './Spinner';
import { FireIcon } from './icons/FireIcon';

// Removed interface InputPanelProps

export const InputPanel = ({ query, setQuery, handleSearch, isLoading }) => { // Removed type annotation
    
    const handleKeyDown = (event) => { // Removed type annotation
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <label htmlFor="job-search" className="text-lg font-semibold text-slate-200">
              Search for Jobs
            </label>
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
                <input
                    id="job-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="... 'Software Engineer in India'"
                    className="w-full p-3 bg-slate-700 text-slate-200 placeholder-slate-400 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow"
                    disabled={isLoading}
                    aria-label="Job search input"
                />
                <button
                    onClick={handleSearch}
                    disabled={isLoading || !query.trim()}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                    {isLoading ? (
                        <>
                            <Spinner />
                            Searching...
                        </>
                    ) : (
                        <>
                            <FireIcon className="w-5 h-5 mr-2" />
                            Search
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
