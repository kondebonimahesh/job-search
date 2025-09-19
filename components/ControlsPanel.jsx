import React, { useState } from 'react';
import { FilterIcon } from './icons/FilterIcon';

// Removed interface ControlsPanelProps

export const ControlsPanel = ({ filters, setFilters, sortOption, setSortOption, hasResults }) => { // Removed type annotation
    const [isOpen, setIsOpen] = useState(true); // Removed <boolean>

    const handleFilterChange = (e) => { // Removed type annotation
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({
            location: '',
            employmentType: '',
            workplaceType: '',
            minSalary: '',
            minExperience: ''
        });
    };

    if (!hasResults) return null;

    return (
        <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-lg">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left"
            >
                <div className="flex items-center">
                    <FilterIcon className="w-5 h-5 mr-2 text-slate-400" />
                    <h2 className="text-lg font-semibold text-slate-200">Filters & Sorting</h2>
                </div>
                 <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="p-4 border-t border-slate-700">
                    {/* Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-slate-400 mb-1">Location</label>
                            <input type="text" name="location" id="location" value={filters.location} onChange={handleFilterChange} className="w-full p-2 bg-slate-700 text-slate-200 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="City, Country..."/>
                        </div>
                        {/* Employment Type */}
                        <div>
                            <label htmlFor="employmentType" className="block text-sm font-medium text-slate-400 mb-1">Employment</label>
                            <select name="employmentType" id="employmentType" value={filters.employmentType} onChange={handleFilterChange} className="w-full p-2 bg-slate-700 text-slate-200 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                                <option value="">All</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        {/* Workplace Type */}
                        <div>
                            <label htmlFor="workplaceType" className="block text-sm font-medium text-slate-400 mb-1">Workplace</label>
                            <select name="workplaceType" id="workplaceType" value={filters.workplaceType} onChange={handleFilterChange} className="w-full p-2 bg-slate-700 text-slate-200 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                                <option value="">All</option>
                                <option value="Onsite">Onsite</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                         {/* Min Salary */}
                        <div>
                            <label htmlFor="minSalary" className="block text-sm font-medium text-slate-400 mb-1">Min Salary (USD)</label>
                            <input type="number" name="minSalary" id="minSalary" value={filters.minSalary} onChange={handleFilterChange} className="w-full p-2 bg-slate-700 text-slate-200 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="e.g., 80000" min="0"/>
                        </div>
                        {/* Min Experience */}
                         <div>
                            <label htmlFor="minExperience" className="block text-sm font-medium text-slate-400 mb-1">Min Experience (Yrs)</label>
                            <input type="number" name="minExperience" id="minExperience" value={filters.minExperience} onChange={handleFilterChange} className="w-full p-2 bg-slate-700 text-slate-200 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none" placeholder="e.g., 3" min="0"/>
                        </div>
                    </div>
                    {/* Sorting & Actions */}
                     <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <label htmlFor="sortOption" className="block text-sm font-medium text-slate-400 mb-1 sm:inline-block sm:mb-0 sm:mr-2">Sort by</label>
                            <select name="sortOption" id="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="w-full sm:w-auto p-2 bg-slate-700 text-slate-200 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                                <option value="relevance">Relevance</option>
                                <option value="date">Date</option>
                                <option value="salary">Salary</option>
                            </select>
                        </div>
                        <button onClick={clearFilters} className="px-4 py-2 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-800 transition-colors">
                            Clear Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
