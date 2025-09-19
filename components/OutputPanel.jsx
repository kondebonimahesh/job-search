import React from 'react';
// import type { JobData } from '../types'; // Removed
import { JobCard } from './JobCard';
import { JobCardErrorBoundary } from './JobCardErrorBoundary';
import { Pagination } from './Pagination';

// Removed interface OutputPanelProps



const SkeletonLoader = () => ( // Removed : React.FC
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 animate-pulse">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-[24rem] bg-slate-700 rounded-xl p-5 flex flex-col space-y-4">
                <div className="flex justify-between">
                    <div className="h-6 bg-slate-600 rounded-md w-2/3"></div>
                    <div className="h-4 bg-slate-600 rounded-md w-1/6"></div>
                </div>
                <div className="h-4 bg-slate-600 rounded-md w-1/2"></div>
                <div className="flex space-x-2">
                    <div className="h-5 bg-slate-600 rounded-full w-1/4"></div>
                    <div className="h-5 bg-slate-600 rounded-full w-1/4"></div>
                </div>
                <div className="pt-4 space-y-3">
                    <div className="h-12 bg-slate-600 rounded-md w-full"></div>
                    <div className="h-8 bg-slate-600 rounded-md w-3/4"></div>
                </div>
                 <div className="h-10 bg-slate-600 rounded-md w-full mt-auto"></div>
            </div>
        ))}
    </div>
);


export const OutputPanel = ({ jobs, isLoading, error, hasSearched, currentPage, isLastPage, onPageChange }) => { // Removed type annotation

    const renderContent = () => {
        if (isLoading) {
            return <SkeletonLoader />;
        }
        if (error) {
            return (
                <div className="p-6 text-red-400">
                    <p className="font-semibold">An error occurred:</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            );
        }
        if (!hasSearched) {
             return (
                <div className="flex items-center justify-center h-full min-h-[24rem]">
                    <p className="text-slate-500">Your job search results will appear here...</p>
                </div>
            );
        }
        if (jobs && jobs.length === 0) {
            // This message shows if either the initial search had no results,
            // or if the filters cleared all results from the current page.
            return (
                <div className="flex items-center justify-center h-full min-h-[24rem]">
                    <p className="text-slate-500">No jobs found matching your criteria.</p>
                </div>
            );
        }
        if (jobs && jobs.length > 0) {
            return (
                 <>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {jobs.map((job, index) => (
                           <JobCardErrorBoundary key={job.source_url || index}>
                                <JobCard job={job} />
                           </JobCardErrorBoundary>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        isLastPage={isLastPage}
                        onPageChange={onPageChange}
                    />
                </>
            );
        }

        return null;
    }

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-slate-200">Search Results</h2>
            <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg min-h-[26rem] p-4 sm:p-6">
                {renderContent()}
            </div>
        </div>
    );
};
