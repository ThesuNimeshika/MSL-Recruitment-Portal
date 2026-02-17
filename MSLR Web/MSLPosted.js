// MSL Posted Jobs Management JavaScript

// Global variables
let jobsData = [];
let filteredJobs = [];

// Sample job data
const sampleJobsData = [
    {
        id: 1,
        company: 'Hayleys PLC',
        companyLogo: 'img/user.png',
        jobTitle: 'Senior Software Engineer',
        contract: 'Full-time',
        openDate: '2024-12-01',
        closeDate: '2024-12-31',
        jobRole: 'Full-stack development, API design, Database optimization',
        salaryRate: '$60,000 - $80,000',
        currentApplicants: 15,
        invoiceStatus: 'Complete',
        description: 'We are looking for a Senior Software Engineer to join our dynamic team...',
        requirements: ['5+ years experience', 'React/Node.js', 'MongoDB', 'AWS'],
        location: 'Colombo, Sri Lanka',
        sector: 'IT'
    },
    {
        id: 2,
        company: 'John Keells',
        companyLogo: 'img/user.png',
        jobTitle: 'Financial Analyst',
        contract: 'Full-time',
        openDate: '2024-12-05',
        closeDate: '2025-01-05',
        jobRole: 'Financial modeling, Risk assessment, Budget planning',
        salaryRate: '$50,000 - $70,000',
        currentApplicants: 8,
        invoiceStatus: 'Pending',
        description: 'Join our finance team as a Financial Analyst...',
        requirements: ['3+ years experience', 'Excel advanced', 'Financial modeling', 'CPA preferred'],
        location: 'Colombo, Sri Lanka',
        sector: 'Finance'
    },
    {
        id: 3,
        company: 'Ceylon Tobacco',
        companyLogo: 'img/user.png',
        jobTitle: 'Marketing Manager',
        contract: 'Full-time',
        openDate: '2024-12-10',
        closeDate: '2025-01-10',
        jobRole: 'Brand management, Campaign strategy, Team leadership',
        salaryRate: '$70,000 - $90,000',
        currentApplicants: 12,
        invoiceStatus: 'Not Yet',
        description: 'Lead our marketing initiatives as Marketing Manager...',
        requirements: ['7+ years experience', 'Digital marketing', 'Team management', 'Brand strategy'],
        location: 'Colombo, Sri Lanka',
        sector: 'Marketing'
    },
    {
        id: 4,
        company: 'Dialog Axiata',
        companyLogo: 'img/user.png',
        jobTitle: 'Network Engineer',
        contract: 'Contract',
        openDate: '2024-12-15',
        closeDate: '2025-02-15',
        jobRole: 'Network infrastructure, Security implementation, Troubleshooting',
        salaryRate: '$55,000 - $75,000',
        currentApplicants: 6,
        invoiceStatus: 'Not Yet',
        description: 'Join our network team as Network Engineer...',
        requirements: ['4+ years experience', 'Cisco certification', 'Network security', 'Troubleshooting'],
        location: 'Colombo, Sri Lanka',
        sector: 'IT'
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePostedJobsManagement();
    setupEventListeners();
});

// Initialize posted jobs management
function initializePostedJobsManagement() {
    loadJobsData();
    renderJobsTable();
    updateJobCount();
}

// Load jobs data
function loadJobsData() {
    // In a real application, this would fetch from an API
    jobsData = [...sampleJobsData];
    filteredJobs = [...jobsData];
}

// Setup event listeners
function setupEventListeners() {
    // Profile dropdown
    const profileDropdownBtn = document.getElementById('profile-dropdown-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (profileDropdownBtn && profileDropdown) {
        profileDropdownBtn.addEventListener('click', function() {
            profileDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!profileDropdownBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
    
    // Search functionality
    const jobSearch = document.getElementById('job-search');
    if (jobSearch) {
        jobSearch.addEventListener('input', function() {
            filterJobs();
        });
    }
    
    // Company filter
    const companyFilter = document.getElementById('company-filter');
    if (companyFilter) {
        companyFilter.addEventListener('change', function() {
            filterJobs();
        });
    }
    
    // Invoice status filter
    const invoiceStatusFilter = document.getElementById('invoice-status-filter');
    if (invoiceStatusFilter) {
        invoiceStatusFilter.addEventListener('change', function() {
            filterJobs();
        });
    }
    

    
    // Add job button
    const addJobBtn = document.getElementById('add-job-btn');
    if (addJobBtn) {
        addJobBtn.addEventListener('click', function() {
            showAddJobModal();
        });
    }
    
    // Modal close buttons
    const closeJobModal = document.getElementById('close-job-modal');
    if (closeJobModal) {
        closeJobModal.addEventListener('click', function() {
            hideJobDetailsModal();
        });
    }
    
    const closeAddJobModal = document.getElementById('close-add-job-modal');
    if (closeAddJobModal) {
        closeAddJobModal.addEventListener('click', function() {
            hideAddJobModal();
        });
    }
    
    const cancelAddJob = document.getElementById('cancel-add-job');
    if (cancelAddJob) {
        cancelAddJob.addEventListener('click', function() {
            hideAddJobModal();
        });
    }
    
    // Add job form
    const addJobForm = document.getElementById('add-job-form');
    if (addJobForm) {
        addJobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddJob();
        });
    }
}

// Filter jobs based on search and filters
function filterJobs() {
    const searchTerm = document.getElementById('job-search')?.value.toLowerCase() || '';
    const companyFilter = document.getElementById('company-filter')?.value || '';
    const invoiceStatusFilter = document.getElementById('invoice-status-filter')?.value || '';
    
    filteredJobs = jobsData.filter(job => {
        const matchesSearch = !searchTerm || 
            job.jobTitle.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.jobRole.toLowerCase().includes(searchTerm);
        
        const matchesCompany = !companyFilter || job.company === companyFilter;
        const matchesInvoiceStatus = !invoiceStatusFilter || job.invoiceStatus === invoiceStatusFilter;
        
        return matchesSearch && matchesCompany && matchesInvoiceStatus;
    });
    
    renderJobsTable();
    updateJobCount();
}



// Render jobs table
function renderJobsTable() {
    const tableBody = document.getElementById('jobs-table-body');
    if (!tableBody) return;
    
    if (filteredJobs.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                    <div class="empty-state">
                        <i class="fas fa-briefcase"></i>
                        <p>No jobs found matching your criteria</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = filteredJobs.map(job => `
        <tr class="job-row hover:bg-gray-50" data-job-id="${job.id}">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <img class="company-logo" src="${job.companyLogo}" alt="${job.company}">
                    <div class="ml-4">
                        <div class="job-title">${job.jobTitle}</div>
                        <div class="company-name">${job.company}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="space-y-1">
                    <div class="contract-type">${job.contract}</div>
                    <div class="date-info">
                        <span class="open-date">Open: ${formatDate(job.openDate)}</span>
                    </div>
                    <div class="date-info">
                        <span class="close-date">Close: ${formatDate(job.closeDate)}</span>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="space-y-1">
                    <div class="text-sm text-gray-900">${job.jobRole}</div>
                    <div class="salary-rate">${job.salaryRate}</div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="applicant-count">
                    <i class="fas fa-users"></i>
                    ${job.currentApplicants} applicants
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="invoice-status ${getInvoiceStatusClass(job.invoiceStatus)}">
                    ${job.invoiceStatus}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                    <button class="view-btn action-btn bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors" onclick="viewJobDetails(${job.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="edit-btn action-btn bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors" onclick="editJob(${job.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn action-btn bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors" onclick="deleteJob(${job.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update job count
function updateJobCount() {
    const jobCount = document.getElementById('job-count');
    if (jobCount) {
        jobCount.textContent = filteredJobs.length;
    }
}

// Get invoice status CSS class
function getInvoiceStatusClass(status) {
    switch (status) {
        case 'Complete':
            return 'complete';
        case 'Pending':
            return 'pending';
        case 'Not Yet':
            return 'not-yet';
        default:
            return '';
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// View job details
function viewJobDetails(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job) return;
    
    const modalContent = document.getElementById('job-modal-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center space-x-4">
                    <img src="${job.companyLogo}" alt="${job.company}" class="w-16 h-16 rounded-full">
                    <div>
                        <h4 class="text-xl font-semibold text-gray-900">${job.jobTitle}</h4>
                        <p class="text-gray-600">${job.company}</p>
                        <p class="text-sm text-gray-500">${job.location}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Contract Type:</label>
                        <p class="text-gray-900">${job.contract}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Salary Range:</label>
                        <p class="text-gray-900">${job.salaryRate}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Open Date:</label>
                        <p class="text-gray-900">${formatDate(job.openDate)}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Close Date:</label>
                        <p class="text-gray-900">${formatDate(job.closeDate)}</p>
                    </div>
                </div>
                
                <div>
                    <label class="text-sm font-medium text-gray-700">Job Role:</label>
                    <p class="text-gray-900">${job.jobRole}</p>
                </div>
                
                <div>
                    <label class="text-sm font-medium text-gray-700">Description:</label>
                    <p class="text-gray-900">${job.description}</p>
                </div>
                
                <div>
                    <label class="text-sm font-medium text-gray-700">Requirements:</label>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${job.requirements.map(req => `<span class="skills-tag">${req}</span>`).join('')}
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Current Applicants:</label>
                        <p class="text-gray-900">${job.currentApplicants}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Invoice Status:</label>
                        <span class="invoice-status ${getInvoiceStatusClass(job.invoiceStatus)}">
                            ${job.invoiceStatus}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }
    
    showJobDetailsModal();
}

// Show job details modal
function showJobDetailsModal() {
    const modal = document.getElementById('job-details-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Hide job details modal
function hideJobDetailsModal() {
    const modal = document.getElementById('job-details-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Show add job modal
function showAddJobModal() {
    const modal = document.getElementById('add-job-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Hide add job modal
function hideAddJobModal() {
    const modal = document.getElementById('add-job-modal');
    if (modal) {
        modal.classList.add('hidden');
        
        // Reset form
        const form = document.getElementById('add-job-form');
        if (form) {
            form.reset();
        }
    }
}

// Handle add job
function handleAddJob() {
    const form = document.getElementById('add-job-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const newJob = {
        id: jobsData.length + 1,
        company: formData.get('company'),
        companyLogo: 'img/user.png',
        jobTitle: formData.get('job-title'),
        contract: formData.get('contract'),
        openDate: formData.get('open-date'),
        closeDate: formData.get('close-date'),
        jobRole: formData.get('description'),
        salaryRate: formData.get('salary'),
        currentApplicants: 0,
        invoiceStatus: 'Not Yet',
        description: formData.get('description'),
        requirements: ['Experience required', 'Skills needed'],
        location: 'Colombo, Sri Lanka',
        sector: 'IT'
    };
    
    // Add to data
    jobsData.unshift(newJob);
    filteredJobs.unshift(newJob);
    
    // Update UI
    renderJobsTable();
    updateJobCount();
    hideAddJobModal();
    
    // Show success message
    showNotification('Job added successfully!', 'success');
}

// Edit job
function editJob(jobId) {
    // In a real application, this would open an edit form
    showNotification('Edit functionality coming soon!', 'info');
}

// Delete job
function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job?')) {
        jobsData = jobsData.filter(job => job.id !== jobId);
        filteredJobs = filteredJobs.filter(job => job.id !== jobId);
        
        renderJobsTable();
        updateJobCount();
        
        showNotification('Job deleted successfully!', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.className += ' bg-green-500 text-white';
            break;
        case 'error':
            notification.className += ' bg-red-500 text-white';
            break;
        case 'warning':
            notification.className += ' bg-yellow-500 text-white';
            break;
        default:
            notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const jobModal = document.getElementById('job-details-modal');
    const addJobModal = document.getElementById('add-job-modal');
    
    if (jobModal && event.target === jobModal) {
        hideJobDetailsModal();
    }
    
    if (addJobModal && event.target === addJobModal) {
        hideAddJobModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideJobDetailsModal();
        hideAddJobModal();
    }
});
