// MSL Invoice Management JavaScript

let invoicesData = [];
let filteredInvoices = [];

const sampleInvoicesData = [
    {
        id: 1,
        jobTitle: 'Senior Software Engineer',
        company: 'Hayleys PLC',
        postedDate: '2024-12-01',
        invoiceStatus: 'Complete',
        resumeStatus: 'Sent',
        salary: '$60,000 - $80,000',
        contract: 'Full-time',
        location: 'Colombo, Sri Lanka',
        applicants: 15,
        description: 'We are looking for a Senior Software Engineer to join our dynamic team...',
        requirements: ['5+ years experience', 'React/Node.js', 'MongoDB', 'AWS'],
        sector: 'IT'
    },
    {
        id: 2,
        jobTitle: 'Marketing Manager',
        company: 'John Keells',
        postedDate: '2024-12-05',
        invoiceStatus: 'Pending',
        resumeStatus: 'Held',
        salary: '$50,000 - $70,000',
        contract: 'Full-time',
        location: 'Colombo, Sri Lanka',
        applicants: 8,
        description: 'Experienced Marketing Manager needed to lead our marketing initiatives...',
        requirements: ['3+ years experience', 'Digital Marketing', 'Brand Management', 'Analytics'],
        sector: 'Marketing'
    },
    {
        id: 3,
        jobTitle: 'Data Analyst',
        company: 'Ceylon Tobacco',
        postedDate: '2024-12-10',
        invoiceStatus: 'Not Yet',
        resumeStatus: 'Available',
        salary: '$40,000 - $60,000',
        contract: 'Contract',
        location: 'Colombo, Sri Lanka',
        applicants: 12,
        description: 'Data Analyst position for analyzing business metrics and trends...',
        requirements: ['2+ years experience', 'SQL', 'Python', 'Excel', 'Data Visualization'],
        sector: 'IT'
    },
    {
        id: 4,
        jobTitle: 'Financial Controller',
        company: 'Dialog Axiata',
        postedDate: '2024-12-15',
        invoiceStatus: 'Complete',
        resumeStatus: 'Sent',
        salary: '$70,000 - $90,000',
        contract: 'Full-time',
        location: 'Colombo, Sri Lanka',
        applicants: 6,
        description: 'Financial Controller to oversee financial operations and reporting...',
        requirements: ['5+ years experience', 'CPA/ACCA', 'Financial Reporting', 'Team Management'],
        sector: 'Finance'
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeInvoiceManagement();
});

function initializeInvoiceManagement() {
    loadInvoicesData();
    setupEventListeners();
    renderInvoicesTable();
    updateInvoiceCount();
}

function loadInvoicesData() {
    // Load data from localStorage or use sample data
    const savedData = localStorage.getItem('mslInvoicesData');
    if (savedData) {
        invoicesData = JSON.parse(savedData);
    } else {
        invoicesData = [...sampleInvoicesData];
        localStorage.setItem('mslInvoicesData', JSON.stringify(invoicesData));
    }
    filteredInvoices = [...invoicesData];
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('invoice-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterInvoices);
    }

    // Company filter
    const companyFilter = document.getElementById('company-filter');
    if (companyFilter) {
        companyFilter.addEventListener('change', filterInvoices);
    }

    // Invoice status filter
    const invoiceStatusFilter = document.getElementById('invoice-status-filter');
    if (invoiceStatusFilter) {
        invoiceStatusFilter.addEventListener('change', filterInvoices);
    }

    // Create invoice button
    const createInvoiceBtn = document.getElementById('create-invoice-btn');
    if (createInvoiceBtn) {
        createInvoiceBtn.addEventListener('click', showCreateInvoiceModal);
    }

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

    // Modal close buttons
    const closeJobModal = document.getElementById('close-job-modal');
    if (closeJobModal) {
        closeJobModal.addEventListener('click', hideJobDetailsModal);
    }

    const closeCreateInvoiceModal = document.getElementById('close-create-invoice-modal');
    if (closeCreateInvoiceModal) {
        closeCreateInvoiceModal.addEventListener('click', hideCreateInvoiceModal);
    }

    const cancelCreateInvoice = document.getElementById('cancel-create-invoice');
    if (cancelCreateInvoice) {
        cancelCreateInvoice.addEventListener('click', hideCreateInvoiceModal);
    }

    // Create invoice form
    const createInvoiceForm = document.getElementById('create-invoice-form');
    if (createInvoiceForm) {
        createInvoiceForm.addEventListener('submit', handleCreateInvoice);
    }
}

function filterInvoices() {
    const searchTerm = document.getElementById('invoice-search')?.value.toLowerCase() || '';
    const companyFilter = document.getElementById('company-filter')?.value || '';
    const invoiceStatusFilter = document.getElementById('invoice-status-filter')?.value || '';

    filteredInvoices = invoicesData.filter(invoice => {
        const matchesSearch = !searchTerm || 
            invoice.jobTitle.toLowerCase().includes(searchTerm) ||
            invoice.company.toLowerCase().includes(searchTerm) ||
            invoice.description.toLowerCase().includes(searchTerm);

        const matchesCompany = !companyFilter || invoice.company === companyFilter;
        const matchesStatus = !invoiceStatusFilter || invoice.invoiceStatus === invoiceStatusFilter;

        return matchesSearch && matchesCompany && matchesStatus;
    });

    renderInvoicesTable();
    updateInvoiceCount();
}

function renderInvoicesTable() {
    const tableBody = document.getElementById('invoices-table-body');
    if (!tableBody) return;

    if (filteredInvoices.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <div class="empty-state">
                        <i class="fas fa-file-invoice"></i>
                        <p>No invoices found matching your criteria</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = filteredInvoices.map(invoice => `
        <tr class="invoice-row hover:bg-gray-50">
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="img/user.png" alt="">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${invoice.jobTitle}</div>
                        <div class="text-sm text-gray-500">${invoice.company}</div>
                        <div class="text-xs text-gray-400">${invoice.contract} • ${invoice.location}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${formatDate(invoice.postedDate)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="invoice-status ${getInvoiceStatusClass(invoice.invoiceStatus)}">
                    ${invoice.invoiceStatus}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="resume-status ${getResumeStatusClass(invoice.resumeStatus)}">
                    ${invoice.resumeStatus}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-wrap gap-1">
                    <button class="action-btn create" onclick="createInvoice(${invoice.id})">
                        <i class="fas fa-plus mr-1"></i>Create
                    </button>
                    <button class="action-btn view" onclick="viewJobDetails(${invoice.id})">
                        <i class="fas fa-eye mr-1"></i>View
                    </button>
                    <button class="action-btn renew" onclick="renewInvoice(${invoice.id})">
                        <i class="fas fa-redo mr-1"></i>Renew
                    </button>
                    <button class="action-btn hold" onclick="holdResumes(${invoice.id})">
                        <i class="fas fa-pause mr-1"></i>Hold
                    </button>
                    <button class="action-btn send" onclick="sendResumes(${invoice.id})">
                        <i class="fas fa-paper-plane mr-1"></i>Send
                    </button>
                    <button class="action-btn delete" onclick="deleteInvoice(${invoice.id})">
                        <i class="fas fa-trash mr-1"></i>Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateInvoiceCount() {
    const countElement = document.getElementById('invoice-count');
    if (countElement) {
        countElement.textContent = filteredInvoices.length;
    }
}

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

function getResumeStatusClass(status) {
    switch (status) {
        case 'Sent':
            return 'sent';
        case 'Held':
            return 'held';
        case 'Available':
            return 'available';
        default:
            return '';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function viewJobDetails(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    const modalContent = document.getElementById('job-modal-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Job Title:</label>
                        <p class="text-gray-900">${invoice.jobTitle}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Company:</label>
                        <p class="text-gray-900">${invoice.company}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Posted Date:</label>
                        <p class="text-gray-900">${formatDate(invoice.postedDate)}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Contract:</label>
                        <p class="text-gray-900">${invoice.contract}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Salary:</label>
                        <p class="text-gray-900">${invoice.salary}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Location:</label>
                        <p class="text-gray-900">${invoice.location}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Applicants:</label>
                        <p class="text-gray-900">${invoice.applicants}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Sector:</label>
                        <p class="text-gray-900">${invoice.sector}</p>
                    </div>
                </div>
                
                <div>
                    <label class="text-sm font-medium text-gray-700">Description:</label>
                    <p class="text-gray-900">${invoice.description}</p>
                </div>
                
                <div>
                    <label class="text-sm font-medium text-gray-700">Requirements:</label>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${invoice.requirements.map(req => 
                            `<span class="skills-tag">${req}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Invoice Status:</label>
                        <span class="invoice-status ${getInvoiceStatusClass(invoice.invoiceStatus)}">
                            ${invoice.invoiceStatus}
                        </span>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Resume Status:</label>
                        <span class="resume-status ${getResumeStatusClass(invoice.resumeStatus)}">
                            ${invoice.resumeStatus}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    showJobDetailsModal();
}

function showJobDetailsModal() {
    const modal = document.getElementById('job-details-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideJobDetailsModal() {
    const modal = document.getElementById('job-details-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showCreateInvoiceModal() {
    const modal = document.getElementById('create-invoice-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideCreateInvoiceModal() {
    const modal = document.getElementById('create-invoice-modal');
    if (modal) {
        modal.classList.add('hidden');
        
        // Reset form
        const form = document.getElementById('create-invoice-form');
        if (form) {
            form.reset();
        }
    }
}

function handleCreateInvoice(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const jobId = formData.get('job');
    const amount = formData.get('amount');
    const description = formData.get('description');
    
    if (!jobId || !amount || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Create new invoice logic here
    showNotification('Invoice created successfully!', 'success');
    hideCreateInvoiceModal();
    
    // Refresh the table
    renderInvoicesTable();
}

function createInvoice(invoiceId) {
    showNotification('Create invoice functionality for job ID: ' + invoiceId, 'info');
}

function renewInvoice(invoiceId) {
    showNotification('Renew invoice functionality for job ID: ' + invoiceId, 'info');
}

function holdResumes(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (invoice) {
        invoice.resumeStatus = 'Held';
        localStorage.setItem('mslInvoicesData', JSON.stringify(invoicesData));
        renderInvoicesTable();
        showNotification('Resumes held for job: ' + invoice.jobTitle, 'success');
    }
}

function sendResumes(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (invoice) {
        invoice.resumeStatus = 'Sent';
        localStorage.setItem('mslInvoicesData', JSON.stringify(invoicesData));
        renderInvoicesTable();
        showNotification('Resumes sent for job: ' + invoice.jobTitle, 'success');
    }
}

function deleteInvoice(invoiceId) {
    if (confirm('Are you sure you want to delete this invoice?')) {
        invoicesData = invoicesData.filter(inv => inv.id !== invoiceId);
        localStorage.setItem('mslInvoicesData', JSON.stringify(invoicesData));
        filterInvoices();
        showNotification('Invoice deleted successfully', 'success');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set colors based on type
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




