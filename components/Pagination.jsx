import React from 'react';

// Removed interface PaginationProps

export const Pagination = ({ currentPage, isLastPage, onPageChange }) => { // Removed type annotation
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-700">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Previous
            </button>
            <span className="text-sm text-slate-400">
                Page {currentPage}
            </span>
            <button
                onClick={handleNext}
                disabled={isLastPage}
                className="inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Next
            </button>
        </div>
    );
};
