import React from 'react';
// import type { JobData, Salary } from '../types'; // Removed
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { ClockIcon } from './icons/ClockIcon';
import { LinkIcon } from './icons/LinkIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';

// Removed interface JobCardProps

// Helper function to format salary
const formatSalary = (salary) => { // Removed type annotation
    if (!salary || (salary.min === null && salary.max === null)) {
        return '';
    }

    const formatNumber = (num) => { // Removed type annotation
        if (num === null) return null;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
        return num.toString();
    };

    const getCurrencySymbol = (currencyCode) => { // Removed type annotation
        if (!currencyCode) return '$'; // Default
        const symbols = { // Removed type annotation
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
        };
        return symbols[currencyCode.toUpperCase()] || currencyCode;
    };

    const symbol = getCurrencySymbol(salary.currency);
    const min = formatNumber(salary.min);
    const max = formatNumber(salary.max);
    const frequency = salary.frequency ? ` ${salary.frequency}` : '';

    if (min && max) {
        if (min === max) return `${symbol}${min}${frequency}`;
        return `${symbol}${min} - ${symbol}${max}${frequency}`;
    }
    if (min) return `From ${symbol}${min}${frequency}`;
    if (max) return `Up to ${symbol}${max}${frequency}`;

    return '';
};


const JobCard = ({ job }) => { // Removed type annotation
    // A simple utility to create a placeholder from the company name
    const getInitials = (name) => { // Removed type annotation
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    };

    const salaryString = job.salary ? formatSalary(job.salary) : '';

    return (
        <div className="h-[24rem] bg-slate-50 text-slate-800 rounded-xl shadow-lg p-5 flex flex-col font-sans transition-transform hover:scale-[1.02] hover:shadow-cyan-500/20">
            <div className="flex-grow space-y-3">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{job.title}</h3>
                    {job.posted_at && (
                        <div className="flex items-center text-xs text-slate-500 flex-shrink-0 ml-2">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            <span>{job.posted_at}</span>
                        </div>
                    )}
                </div>

                {/* Location */}
                {job.locations && job.locations.length > 0 && (
                    <div className="flex items-center text-sm text-slate-600">
                        <LocationMarkerIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <span>{job.locations.join(', ')}</span>
                    </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {job.workplace_type && <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2 py-1 rounded-md">{job.workplace_type}</span>}
                    {job.employment_type && <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2 py-1 rounded-md">{job.employment_type}</span>}
                </div>

                {/* Company */}
                {job.company_name && (
                    <div className="flex items-center pt-2">
                        <div className="w-12 h-12 flex-shrink-0 bg-slate-200 rounded-md flex items-center justify-center mr-3">
                            <span className="text-xl font-bold text-slate-600">{getInitials(job.company_name)}</span>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900">{job.company_name}</p>
                            {job.category && <p className="text-xs text-slate-500">{job.category}</p>}
                        </div>
                    </div>
                )}

                {/* Salary */}
                {salaryString && (
                     <div className="flex items-center text-sm text-slate-700 pt-2">
                        <CurrencyDollarIcon className="w-5 h-5 mr-2 text-slate-500 flex-shrink-0" />
                        <span className="font-semibold">{salaryString}</span>
                    </div>
                )}


                {/* Experience & Requirements */}
                <div className="text-sm text-slate-700 pt-2 space-y-2">
                    {job.experience_min_years !== null && job.experience_min_years !== undefined && (
                        <div className="flex">
                            <BriefcaseIcon className="w-5 h-5 mr-2 text-slate-500 flex-shrink-0" />
                            <div>
                                <span className="font-semibold">{job.experience_min_years}+ YOE</span>
                                <span className="text-slate-600"> - Minimum years of experience</span>
                            </div>
                        </div>
                    )}
                    {job.requirements_summary && (
                        <p className="text-slate-600 leading-snug pt-1 line-clamp-3">{job.requirements_summary}</p>
                    )}
                </div>
            </div>

            {/* Footer / Action */}
            {job.source_url && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                     <a 
                        href={job.source_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-50 transition-colors"
                    >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        View Source
                    </a>
                </div>
            )}
        </div>
    );
};

export { JobCard };
