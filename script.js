document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchQuery = document.getElementById('search-query');
    const outputPanel = document.querySelector('.output-panel');

    searchButton.addEventListener('click', async () => {
        const query = searchQuery.value;
        if (!query) {
            return;
        }

        outputPanel.innerHTML = '<p>Loading...</p>';

        try {
            const response = await fetch(`http://localhost:3000/api/jobs?q=${query}`);
            const jobs = await response.json();

            if (jobs.length === 0) {
                outputPanel.innerHTML = '<p>No jobs found.</p>';
                return;
            }

            outputPanel.innerHTML = jobs.map(job => createJobCard(job)).join('');
        } catch (error) {
            outputPanel.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });

    function createJobCard(job) {
        return `
            <div class="job-card">
                <div class="job-card-content">
                    <div class="job-card-header">
                        <h3 class="job-card-title">${job.title}</h3>
                        <div class="job-card-posted-at">
                            <span>${job.posted_at}</span>
                        </div>
                    </div>
                    <div class="job-card-location">
                        <span>${job.locations ? job.locations.join(', ') : ''}</span>
                    </div>
                    <div class="job-card-tags">
                        ${job.workplace_type ? `<span class="job-card-tag">${job.workplace_type}</span>` : ''}
                        ${job.employment_type ? `<span class="job-card-tag">${job.employment_type}</span>` : ''}
                    </div>
                    <div class="job-card-company">
                        <div class="job-card-company-logo">
                            <span class="job-card-company-initials">${getInitials(job.company_name)}</span>
                        </div>
                        <div>
                            <p class="job-card-company-name">${job.company_name}</p>
                            <p class="job-card-company-category">${job.category || ''}</p>
                        </div>
                    </div>
                    <div class="job-card-salary">
                        <span>${formatSalary(job.salary)}</span>
                    </div>
                    <div class="job-card-experience">
                        ${job.experience_min_years ? `<span>${job.experience_min_years}+ YOE</span>` : ''}
                        <p>${job.requirements_summary || ''}</p>
                    </div>
                </div>
                <div class="job-card-footer">
                    <a href="${job.source_url}" target="_blank" rel="noopener noreferrer" class="job-card-footer-link">View Source</a>
                </div>
            </div>
        `;
    }

    function getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    }

    function formatSalary(salary) {
        if (!salary || (salary.min === null && salary.max === null)) {
            return '';
        }

        const formatNumber = (num) => {
            if (num === null || num === undefined) return null;
            if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
            return num.toString();
        };

        const getCurrencySymbol = (currencyCode) => {
            if (!currencyCode) return '$'; // Default
            const symbols = {
                'USD': '$',
                'EUR': '€',
                'GBP': '£',
            };
            return symbols[currencyCode && currencyCode.toUpperCase ? currencyCode.toUpperCase() : currencyCode] || currencyCode;
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
    }
});
