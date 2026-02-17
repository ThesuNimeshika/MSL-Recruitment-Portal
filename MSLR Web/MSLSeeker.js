// MSL Seeker Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSeekerManagement();
    loadSeekersData();
});

// Global variables
let seekersData = [];
let filteredSeekers = [];
let currentSeeker = null;

// Sample seeker data
const sampleSeekers = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+94 71 234 5678',
        experience: 'senior',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        location: 'Colombo, Sri Lanka',
        status: 'active',
        about: 'Experienced full-stack developer with 5+ years in web development.',
        currentPosition: 'Senior Developer at TechCorp',
        education: 'BSc Computer Science, University of Colombo',
        resumes: [
            { id: 1, name: 'John_Doe_Resume_2024.pdf', version: 'v1.0', active: true, uploadDate: 'Dec 15, 2024' },
            { id: 2, name: 'John_Doe_Resume_2023.pdf', version: 'v2.0', active: false, uploadDate: 'Dec 10, 2023' }
        ]
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        phone: '+94 72 345 6789',
        experience: 'mid',
        skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
        location: 'Kandy, Sri Lanka',
        status: 'active',
        about: 'Python developer passionate about building scalable applications.',
        currentPosition: 'Python Developer at DataTech',
        education: 'BSc Software Engineering, University of Peradeniya',
        resumes: [
            { id: 3, name: 'Jane_Smith_Resume_2024.pdf', version: 'v1.0', active: true, uploadDate: 'Dec 12, 2024' }
        ]
    },
    {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@email.com',
        phone: '+94 73 456 7890',
        experience: 'entry',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        location: 'Galle, Sri Lanka',
        status: 'inactive',
        about: 'Frontend developer looking for opportunities to grow and learn.',
        currentPosition: 'Junior Developer at WebStart',
        education: 'Diploma in Web Development, SLIIT',
        resumes: [
            { id: 4, name: 'Mike_Johnson_Resume_2024.pdf', version: 'v1.0', active: true, uploadDate: 'Dec 08, 2024' }
        ]
    },
    {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@email.com',
        phone: '+94 74 567 8901',
        experience: 'executive',
        skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes'],
        location: 'Jaffna, Sri Lanka',
        status: 'active',
        about: 'Senior software architect with expertise in enterprise solutions.',
        currentPosition: 'Software Architect at EnterpriseTech',
        education: 'MSc Computer Science, University of Jaffna',
        resumes: [
            { id: 5, name: 'Sarah_Wilson_Resume_2024.pdf', version: 'v1.0', active: true, uploadDate: 'Dec 20, 2024' },
            { id: 6, name: 'Sarah_Wilson_Resume_2023.pdf', version: 'v2.0', active: false, uploadDate: 'Dec 15, 2023' },
            { id: 7, name: 'Sarah_Wilson_Resume_2022.pdf', version: 'v3.0', active: false, uploadDate: 'Dec 10, 2022' }
        ]
    }
];

// Initialize seeker management
function initializeSeekerManagement() {
    // Add seeker button
    const addSeekerBtn = document.getElementById('add-seeker-btn');
    if (addSeekerBtn) {
        addSeekerBtn.addEventListener('click', () => {
            document.getElementById('add-seeker-modal').classList.remove('hidden');
        });
    }

    // Initialize search and filters
    initializeSearchAndFilters();
    
    // Initialize modals
    initializeModals();
    
    // Initialize profile dropdown
    initializeProfileDropdown();
}

// Initialize search and filters
function initializeSearchAndFilters() {
    const searchInput = document.getElementById('seeker-search');
    const sectorFilter = document.getElementById('sector-filter');
    const statusFilter = document.getElementById('status-filter');
    if (searchInput) {
        searchInput.addEventListener('input', filterSeekers);
    }

    if (sectorFilter) {
        sectorFilter.addEventListener('change', filterSeekers);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterSeekers);
    }
}

// Initialize modals
function initializeModals() {
    // Seeker details modal
    const seekerDetailsModal = document.getElementById('seeker-details-modal');
    const closeSeekerModal = document.getElementById('close-seeker-modal');
    
    if (closeSeekerModal) {
        closeSeekerModal.addEventListener('click', () => {
            seekerDetailsModal.classList.add('hidden');
        });
    }

    // Add seeker modal
    const addSeekerModal = document.getElementById('add-seeker-modal');
    const closeAddSeekerModal = document.getElementById('close-add-seeker-modal');
    const cancelAddSeeker = document.getElementById('cancel-add-seeker');
    const addSeekerForm = document.getElementById('add-seeker-form');

    if (closeAddSeekerModal) {
        closeAddSeekerModal.addEventListener('click', () => {
            addSeekerModal.classList.add('hidden');
        });
    }

    if (cancelAddSeeker) {
        cancelAddSeeker.addEventListener('click', () => {
            addSeekerModal.classList.add('hidden');
        });
    }

    if (addSeekerForm) {
        addSeekerForm.addEventListener('submit', handleAddSeeker);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === seekerDetailsModal) {
            seekerDetailsModal.classList.add('hidden');
        }
        if (e.target === addSeekerModal) {
            addSeekerModal.classList.add('hidden');
        }
    });
}

// Initialize profile dropdown
function initializeProfileDropdown() {
    const profileDropdownBtn = document.getElementById('profile-dropdown-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileDropdownBtn && profileDropdown) {
        profileDropdownBtn.addEventListener('click', () => {
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdownBtn.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
}

// Load seekers data
function loadSeekersData() {
    seekersData = [...sampleSeekers];
    filteredSeekers = [...seekersData];
    renderSeekersTable();
    updateSeekerCount();
}

// Render seekers table
function renderSeekersTable() {
    const tableBody = document.getElementById('seekers-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    filteredSeekers.forEach(seeker => {
        const row = document.createElement('tr');
        row.className = 'seeker-row hover:bg-gray-50';
        row.setAttribute('data-seeker-id', seeker.id);

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="img/user.png" alt="">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${seeker.firstName} ${seeker.lastName}</div>
                        <div class="text-sm text-gray-500">${seeker.email}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ${seeker.experience}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-wrap gap-1">
                    ${seeker.skills.slice(0, 3).map(skill => 
                        `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">${skill}</span>`
                    ).join('')}
                    ${seeker.skills.length > 3 ? `<span class="text-xs text-gray-500">+${seeker.skills.length - 3} more</span>` : ''}
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${seeker.location}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="status-badge ${seeker.status}">
                    ${seeker.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                    <button class="text-blue-600 hover:text-blue-900 action-btn" title="View Details" onclick="viewSeekerDetails(${seeker.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${seeker.status === 'active' ? 
                        `<button class="blacklist-btn action-btn" title="Blacklist" onclick="blacklistSeeker(${seeker.id})">
                            <i class="fas fa-ban"></i>
                        </button>` :
                        `<button class="activate-btn action-btn" title="Activate" onclick="activateSeeker(${seeker.id})">
                            <i class="fas fa-check"></i>
                        </button>`
                    }
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Filter seekers
function filterSeekers() {
    const searchTerm = document.getElementById('seeker-search')?.value.toLowerCase() || '';
    const sectorFilter = document.getElementById('sector-filter')?.value || '';
    const statusFilter = document.getElementById('status-filter')?.value || '';

    filteredSeekers = seekersData.filter(seeker => {
        const matchesSearch = !searchTerm || 
            seeker.firstName.toLowerCase().includes(searchTerm) ||
            seeker.lastName.toLowerCase().includes(searchTerm) ||
            seeker.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
            seeker.location.toLowerCase().includes(searchTerm);

        const matchesSector = !sectorFilter || seeker.skills.some(skill => 
            skill.toLowerCase().includes(sectorFilter.toLowerCase())
        );

        const matchesStatus = !statusFilter || seeker.status === statusFilter;

        return matchesSearch && matchesSector && matchesStatus;
    });

    renderSeekersTable();
    updateSeekerCount();
}



// Update seeker count
function updateSeekerCount() {
    const countElement = document.getElementById('seeker-count');
    if (countElement) {
        countElement.textContent = filteredSeekers.length;
    }
}

// View seeker details
function viewSeekerDetails(seekerId) {
    const seeker = seekersData.find(s => s.id === seekerId);
    if (!seeker) return;

    currentSeeker = seeker;
    const modalContent = document.getElementById('seeker-modal-content');
    
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="space-y-6">
                <!-- Profile Section -->
                <div class="border-b border-gray-200 pb-4">
                    <div class="flex items-center space-x-4">
                        <img src="img/user.png" alt="Profile" class="w-16 h-16 rounded-full">
                        <div>
                            <h4 class="text-xl font-semibold text-gray-900">${seeker.firstName} ${seeker.lastName}</h4>
                            <p class="text-gray-600">${seeker.currentPosition}</p>
                            <p class="text-sm text-gray-500">${seeker.location}</p>
                        </div>
                    </div>
                </div>

                <!-- Contact Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Email:</label>
                        <p class="text-gray-900">${seeker.email}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Phone:</label>
                        <p class="text-gray-900">${seeker.phone}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Experience Level:</label>
                        <p class="text-gray-900">${seeker.experience}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Status:</label>
                        <span class="status-badge ${seeker.status}">${seeker.status}</span>
                    </div>
                </div>

                <!-- About Section -->
                <div>
                    <h5 class="text-lg font-medium text-gray-900 mb-2">About</h5>
                    <p class="text-gray-700">${seeker.about}</p>
                </div>

                <!-- Skills Section -->
                <div>
                    <h5 class="text-lg font-medium text-gray-900 mb-2">Skills</h5>
                    <div class="flex flex-wrap gap-2">
                        ${seeker.skills.map(skill => 
                            `<span class="skill-tag">${skill}</span>`
                        ).join('')}
                    </div>
                </div>

                <!-- Education Section -->
                <div>
                    <h5 class="text-lg font-medium text-gray-900 mb-2">Education</h5>
                    <p class="text-gray-700">${seeker.education}</p>
                </div>

                <!-- Resumes Section -->
                <div>
                    <h5 class="text-lg font-medium text-gray-900 mb-2">Resumes</h5>
                    <div class="space-y-2">
                        ${seeker.resumes.map(resume => `
                            <div class="resume-item ${resume.active ? 'active' : ''}">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium">${resume.name}</p>
                                        <p class="text-sm text-gray-500">Version: ${resume.version} • Uploaded: ${resume.uploadDate}</p>
                                    </div>
                                    ${resume.active ? 
                                        '<span class="text-green-600 text-sm font-medium">Active</span>' : 
                                        '<button class="text-blue-600 hover:text-blue-800 text-sm">Set as Active</button>'
                                    }
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById('seeker-details-modal').classList.remove('hidden');
}

// Blacklist seeker
function blacklistSeeker(seekerId) {
    const seeker = seekersData.find(s => s.id === seekerId);
    if (seeker) {
        seeker.status = 'blacklisted';
        renderSeekersTable();
        console.log(`Seeker ${seeker.firstName} ${seeker.lastName} has been blacklisted`);
    }
}

// Activate seeker
function activateSeeker(seekerId) {
    const seeker = seekersData.find(s => s.id === seekerId);
    if (seeker) {
        seeker.status = 'active';
        renderSeekersTable();
        console.log(`Seeker ${seeker.firstName} ${seeker.lastName} has been activated`);
    }
}

// Handle add seeker
function handleAddSeeker(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newSeeker = {
        id: seekersData.length + 1,
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        skills: ['General'],
        location: 'Sri Lanka',
        status: 'active',
        about: 'New seeker profile',
        currentPosition: 'Seeking opportunities',
        education: 'Not specified',
        resumes: []
    };

    seekersData.push(newSeeker);
    filteredSeekers = [...seekersData];
    
    renderSeekersTable();
    updateSeekerCount();
    
    // Close modal and reset form
    document.getElementById('add-seeker-modal').classList.add('hidden');
    e.target.reset();
    
    console.log(`New seeker ${newSeeker.firstName} ${newSeeker.lastName} has been added`);
}
