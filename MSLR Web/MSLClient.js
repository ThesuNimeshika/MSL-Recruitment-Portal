// MSL Client Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeProfileDropdown();
    initializeClientManagement();
    initializeSearchAndFilters();
    initializeModals();
    initializeResponsiveBehavior();
    initializeKeyboardShortcuts();
    initializeTooltips();
    initializeNotifications();
    
    // Load initial clients data
    loadClientsData();
});

// Sample clients data
let clientsData = [
    {
        id: 1,
        companyName: 'Hayleys PLC',
        contactPerson: 'Hemas Silva',
        email: 'info@hayleys.com',
        phone: '+94 11 234 5678',
        sector: 'Manufacturing',
        location: 'Colombo, Sri Lanka',
        status: 'active',
        about: 'Leading conglomerate with diverse business interests across multiple sectors including textiles, agriculture, and consumer goods.',
        agreements: [
            { id: 'AGR-2024-001', type: 'Comprehensive Recruitment Services', startDate: 'Jan 1, 2024', endDate: 'Dec 31, 2024', status: 'Active' },
            { id: 'AGR-2024-002', type: 'Executive Search', startDate: 'Mar 1, 2024', endDate: 'Feb 28, 2025', status: 'Active' }
        ],
        postedJobs: [
            { title: 'Senior Software Engineer', postedDate: 'Dec 15, 2024', applications: 12, status: 'Open' },
            { title: 'Marketing Manager', postedDate: 'Dec 10, 2024', applications: 8, status: 'Open' },
            { title: 'Data Analyst', postedDate: 'Dec 05, 2024', applications: 15, status: 'Closed' }
        ]
    },
    {
        id: 2,
        companyName: 'Dialog Axiata',
        contactPerson: 'Sarah Johnson',
        email: 'hr@dialog.lk',
        phone: '+94 11 345 6789',
        sector: 'IT',
        location: 'Colombo, Sri Lanka',
        status: 'active',
        about: 'Leading telecommunications provider offering mobile, broadband, and digital services across Sri Lanka.',
        agreements: [
            { id: 'AGR-2024-003', type: 'IT Recruitment Services', startDate: 'Feb 1, 2024', endDate: 'Jan 31, 2025', status: 'Active' }
        ],
        postedJobs: [
            { title: 'Network Engineer', postedDate: 'Dec 12, 2024', applications: 20, status: 'Open' },
            { title: 'UX Designer', postedDate: 'Dec 08, 2024', applications: 14, status: 'Open' }
        ]
    },
    {
        id: 3,
        companyName: 'Commercial Bank',
        contactPerson: 'Michael Chen',
        email: 'careers@combank.lk',
        phone: '+94 11 456 7890',
        sector: 'Finance',
        location: 'Colombo, Sri Lanka',
        status: 'active',
        about: 'Premier commercial bank providing comprehensive financial services to individuals and businesses.',
        agreements: [
            { id: 'AGR-2024-004', type: 'Financial Services Recruitment', startDate: 'Apr 1, 2024', endDate: 'Mar 31, 2025', status: 'Active' }
        ],
        postedJobs: [
            { title: 'Financial Analyst', postedDate: 'Dec 14, 2024', applications: 18, status: 'Open' },
            { title: 'Risk Manager', postedDate: 'Dec 06, 2024', applications: 9, status: 'Open' }
        ]
    },
    {
        id: 4,
        companyName: 'Lanka Hospitals',
        contactPerson: 'Dr. Emily Wilson',
        email: 'hr@lankahospitals.lk',
        phone: '+94 11 567 8901',
        sector: 'Healthcare',
        location: 'Colombo, Sri Lanka',
        status: 'active',
        about: 'Leading private healthcare provider offering world-class medical services and facilities.',
        agreements: [
            { id: 'AGR-2024-005', type: 'Healthcare Recruitment', startDate: 'May 1, 2024', endDate: 'Apr 30, 2025', status: 'Active' }
        ],
        postedJobs: [
            { title: 'Medical Officer', postedDate: 'Dec 13, 2024', applications: 25, status: 'Open' },
            { title: 'Nurse Manager', postedDate: 'Dec 07, 2024', applications: 16, status: 'Open' }
        ]
    },
    {
        id: 5,
        companyName: 'MAS Holdings',
        contactPerson: 'David Rodriguez',
        email: 'careers@mas.lk',
        phone: '+94 11 678 9012',
        sector: 'Manufacturing',
        location: 'Colombo, Sri Lanka',
        status: 'inactive',
        about: 'Global apparel manufacturer specializing in intimate wear and sportswear for international brands.',
        agreements: [
            { id: 'AGR-2024-006', type: 'Manufacturing Recruitment', startDate: 'Jun 1, 2024', endDate: 'May 31, 2025', status: 'Expired' }
        ],
        postedJobs: [
            { title: 'Production Manager', postedDate: 'Nov 30, 2024', applications: 11, status: 'Closed' }
        ]
    },
    {
        id: 6,
        companyName: 'Ceylon Tobacco',
        contactPerson: 'Lisa Garcia',
        email: 'hr@ctc.lk',
        phone: '+94 11 789 0123',
        sector: 'Manufacturing',
        location: 'Colombo, Sri Lanka',
        status: 'suspended',
        about: 'Leading tobacco manufacturer with strong focus on corporate social responsibility and sustainability.',
        agreements: [
            { id: 'AGR-2024-007', type: 'Corporate Recruitment', startDate: 'Jul 1, 2024', endDate: 'Jun 30, 2025', status: 'Suspended' }
        ],
        postedJobs: [
            { title: 'Sustainability Officer', postedDate: 'Nov 25, 2024', applications: 7, status: 'Suspended' }
        ]
    },
    {
        id: 7,
        companyName: 'John Keells',
        contactPerson: 'Robert Taylor',
        email: 'careers@keells.com',
        phone: '+94 11 890 1234',
        sector: 'Retail',
        location: 'Colombo, Sri Lanka',
        status: 'active',
        about: 'Diversified conglomerate with interests in transportation, consumer goods, and leisure sectors.',
        agreements: [
            { id: 'AGR-2024-008', type: 'Multi-sector Recruitment', startDate: 'Aug 1, 2024', endDate: 'Jul 31, 2025', status: 'Active' }
        ],
        postedJobs: [
            { title: 'Supply Chain Manager', postedDate: 'Dec 11, 2024', applications: 22, status: 'Open' },
            { title: 'Retail Operations Lead', postedDate: 'Dec 04, 2024', applications: 13, status: 'Open' }
        ]
    },
    {
        id: 8,
        companyName: 'Sampath Bank',
        contactPerson: 'Jennifer Martinez',
        email: 'hr@sampath.lk',
        phone: '+94 11 901 2345',
        sector: 'Finance',
        location: 'Colombo, Sri Lanka',
        status: 'active',
        about: 'Innovative banking solutions provider committed to digital transformation and customer excellence.',
        agreements: [
            { id: 'AGR-2024-009', type: 'Banking Recruitment', startDate: 'Sep 1, 2024', endDate: 'Aug 31, 2025', status: 'Active' }
        ],
        postedJobs: [
            { title: 'Digital Banking Manager', postedDate: 'Dec 09, 2024', applications: 19, status: 'Open' },
            { title: 'Compliance Officer', postedDate: 'Dec 02, 2024', applications: 10, status: 'Open' }
        ]
    }
];

let filteredClients = [...clientsData];
let currentClient = null;

// Profile Dropdown
function initializeProfileDropdown() {
    const profileBtn = document.getElementById('profile-dropdown-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function() {
            profileDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
}

// Client Management
function initializeClientManagement() {
    const addClientBtn = document.getElementById('add-client-btn');
    if (addClientBtn) {
        addClientBtn.addEventListener('click', function() {
            document.getElementById('add-client-modal').classList.remove('hidden');
        });
    }
}

// Search and Filters
function initializeSearchAndFilters() {
    const searchInput = document.getElementById('client-search');
    const sectorFilter = document.getElementById('sector-filter');
    const statusFilter = document.getElementById('status-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterClients);
    }
    
    if (sectorFilter) {
        sectorFilter.addEventListener('change', filterClients);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterClients);
    }
}

// Modal Functionality
function initializeModals() {
    const clientDetailsModal = document.getElementById('client-details-modal');
    const closeClientModal = document.getElementById('close-client-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const suspendClientBtn = document.getElementById('suspend-client-btn');
    const activateClientBtn = document.getElementById('activate-client-btn');
    
    if (closeClientModal) {
        closeClientModal.addEventListener('click', function() {
            clientDetailsModal.classList.add('hidden');
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            clientDetailsModal.classList.add('hidden');
        });
    }
    
    if (suspendClientBtn) {
        suspendClientBtn.addEventListener('click', function() {
            handleSuspendClient();
        });
    }
    
    if (activateClientBtn) {
        activateClientBtn.addEventListener('click', function() {
            handleActivateClient();
        });
    }
    
    // Close modal when clicking outside
    if (clientDetailsModal) {
        clientDetailsModal.addEventListener('click', function(e) {
            if (e.target === clientDetailsModal) {
                clientDetailsModal.classList.add('hidden');
            }
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clientDetailsModal.classList.add('hidden');
        }
    });
    
    // Add Client Modal
    const addClientModal = document.getElementById('add-client-modal');
    const closeAddModal = document.getElementById('close-add-modal');
    const cancelAddClient = document.getElementById('cancel-add-client');
    const addClientForm = document.getElementById('add-client-form');
    
    if (closeAddModal) {
        closeAddModal.addEventListener('click', function() {
            addClientModal.classList.add('hidden');
        });
    }
    
    if (cancelAddClient) {
        cancelAddClient.addEventListener('click', function() {
            addClientModal.classList.add('hidden');
        });
    }
    
    if (addClientForm) {
        addClientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddClient();
        });
    }
}

// Load Clients Data
function loadClientsData() {
    renderClientsTable();
    updateClientCount();
}

// Render Clients Table
function renderClientsTable() {
    const tableBody = document.getElementById('clients-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    filteredClients.forEach(client => {
        const row = document.createElement('tr');
        row.className = 'client-row hover:bg-gray-50';
        row.setAttribute('data-client-id', client.id);
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="img/user.png" alt="">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${client.companyName}</div>
                        <div class="text-sm text-gray-500">${client.contactPerson}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ${client.sector}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${client.location}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="status-badge ${client.status}">
                    ${client.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                    <button class="text-blue-600 hover:text-blue-900 action-btn" title="View Details" onclick="viewClientDetails(${client.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${client.status === 'active' ? 
                        `<button class="suspend-btn action-btn" title="Suspend" onclick="suspendClient(${client.id})">
                            <i class="fas fa-pause"></i>
                        </button>` :
                        `<button class="activate-btn action-btn" title="Activate" onclick="activateClient(${client.id})">
                            <i class="fas fa-play"></i>
                        </button>`
                    }
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Filter Clients
function filterClients() {
    const searchTerm = document.getElementById('client-search').value.toLowerCase();
    const sectorFilter = document.getElementById('sector-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    
    filteredClients = clientsData.filter(client => {
        const matchesSearch = 
            client.companyName.toLowerCase().includes(searchTerm) ||
            client.contactPerson.toLowerCase().includes(searchTerm) ||
            client.sector.toLowerCase().includes(searchTerm) ||
            client.location.toLowerCase().includes(searchTerm);
        
        const matchesSector = !sectorFilter || client.sector === sectorFilter;
        const matchesStatus = !statusFilter || client.status === statusFilter;
        
        return matchesSearch && matchesSector && matchesStatus;
    });
    
    renderClientsTable();
    updateClientCount();
}

// Update Client Count
function updateClientCount() {
    const countElement = document.getElementById('client-count');
    if (countElement) {
        countElement.textContent = `Showing ${filteredClients.length} clients`;
    }
}

// View Client Details
function viewClientDetails(clientId) {
    const client = clientsData.find(c => c.id === clientId);
    if (!client) return;
    
    currentClient = client;
    
    // Populate modal with client data
    document.getElementById('modal-client-name').textContent = client.companyName;
    document.getElementById('modal-client-title').textContent = 'Premium Client';
    document.getElementById('modal-client-location').textContent = client.location;
    document.getElementById('modal-client-email').textContent = client.email;
    document.getElementById('modal-client-phone').textContent = client.phone;
    document.getElementById('modal-client-sector').textContent = client.sector;
    document.getElementById('modal-client-status').textContent = client.status;
    document.getElementById('modal-client-about').textContent = client.about;
    
    // Populate agreements
    const agreementsContainer = document.getElementById('modal-client-agreements');
    agreementsContainer.innerHTML = '';
    client.agreements.forEach(agreement => {
        const agreementItem = document.createElement('div');
        agreementItem.className = 'agreement-item bg-gray-50 p-3 rounded-lg border border-gray-200';
        agreementItem.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <h6 class="font-medium text-gray-900">${agreement.id}</h6>
                    <p class="text-sm text-gray-600">${agreement.type}</p>
                    <p class="text-xs text-gray-500">${agreement.startDate} - ${agreement.endDate}</p>
                </div>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    agreement.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    agreement.status === 'Expired' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                }">${agreement.status}</span>
            </div>
        `;
        agreementsContainer.appendChild(agreementItem);
    });
    
    // Populate posted jobs
    const jobsContainer = document.getElementById('modal-client-jobs');
    jobsContainer.innerHTML = '';
    client.postedJobs.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'job-item bg-gray-50 p-3 rounded-lg border border-gray-200';
        jobItem.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <h6 class="font-medium text-gray-900">${job.title}</h6>
                    <p class="text-sm text-gray-600">Posted: ${job.postedDate}</p>
                    <p class="text-xs text-gray-500">${job.applications} applications</p>
                </div>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    job.status === 'Open' ? 'bg-green-100 text-green-800' : 
                    job.status === 'Closed' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                }">${job.status}</span>
            </div>
        `;
        jobsContainer.appendChild(jobItem);
    });
    
    // Update action buttons based on status
    const suspendBtn = document.getElementById('suspend-client-btn');
    const activateBtn = document.getElementById('activate-client-btn');
    
    if (client.status === 'active') {
        suspendBtn.classList.remove('hidden');
        activateBtn.classList.add('hidden');
    } else {
        suspendBtn.classList.add('hidden');
        activateBtn.classList.remove('hidden');
    }
    
    // Show modal
    document.getElementById('client-details-modal').classList.remove('hidden');
}

// Suspend Client
function suspendClient(clientId) {
    const client = clientsData.find(c => c.id === clientId);
    if (!client) return;
    
    if (confirm(`Are you sure you want to suspend ${client.companyName}?`)) {
        client.status = 'suspended';
        renderClientsTable();
        updateClientCount();
        showNotification(`${client.companyName} has been suspended.`, 'warning');
        
        // Close modal if open
        document.getElementById('client-details-modal').classList.add('hidden');
    }
}

// Activate Client
function activateClient(clientId) {
    const client = clientsData.find(c => c.id === clientId);
    if (!client) return;
    
    if (confirm(`Are you sure you want to activate ${client.companyName}?`)) {
        client.status = 'active';
        renderClientsTable();
        updateClientCount();
        showNotification(`${client.companyName} has been activated.`, 'success');
        
        // Close modal if open
        document.getElementById('client-details-modal').classList.add('hidden');
    }
}

// Handle Suspend Client from Modal
function handleSuspendClient() {
    if (currentClient) {
        suspendClient(currentClient.id);
    }
}

// Handle Activate Client from Modal
function handleActivateClient() {
    if (currentClient) {
        activateClient(currentClient.id);
    }
}

// Handle Add Client
function handleAddClient() {
    const form = document.getElementById('add-client-form');
    const formData = new FormData(form);
    
    const newClient = {
        id: clientsData.length + 1,
        companyName: formData.get('companyName'),
        contactPerson: formData.get('contactPerson'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        sector: formData.get('sector'),
        location: formData.get('location'),
        about: formData.get('about'),
        status: 'active',
        agreements: [],
        postedJobs: []
    };
    
    clientsData.push(newClient);
    filteredClients = [...clientsData];
    
    renderClientsTable();
    updateClientCount();
    showNotification(`${newClient.companyName} has been added successfully.`, 'success');
    
    // Close modal and reset form
    document.getElementById('add-client-modal').classList.add('hidden');
    form.reset();
}

// Responsive Behavior
function initializeResponsiveBehavior() {
    // Add responsive behavior here
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    // Add keyboard shortcuts here
}

// Tooltips
function initializeTooltips() {
    // Add tooltip functionality here
}

// Notifications
function initializeNotifications() {
    // Add notification system here
}

// Show Notification
function showNotification(message, type = 'info') {
    // Simple notification implementation
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can implement a proper notification system here
}
