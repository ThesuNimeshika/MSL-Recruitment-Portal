// MSL Schedule Management JavaScript

let scheduledInterviews = [];
let availableJobs = [];
let filteredScheduled = [];
let filteredAvailable = [];

const sampleScheduledData = [
    {
        id: 1,
        jobTitle: 'Senior Software Engineer',
        company: 'Hayleys PLC',
        seekerName: 'John Doe',
        seekerAvatar: 'img/user.png',
        seekerSkills: 'React, Node.js, MongoDB',
        interviewDate: '2024-12-20',
        interviewTime: '10:00',
        interviewType: 'video',
        status: 'scheduled',
        resumeUrl: 'resume1.pdf',
        sector: 'IT'
    },
    {
        id: 2,
        jobTitle: 'Marketing Manager',
        company: 'John Keells',
        seekerName: 'Jane Smith',
        seekerAvatar: 'img/user.png',
        seekerSkills: 'Digital Marketing, Brand Management',
        interviewDate: '2024-12-20',
        interviewTime: '14:00',
        interviewType: 'in-person',
        status: 'requested',
        resumeUrl: 'resume2.pdf',
        sector: 'Marketing'
    },
    {
        id: 3,
        jobTitle: 'Data Analyst',
        company: 'Ceylon Tobacco',
        seekerName: 'Mike Johnson',
        seekerAvatar: 'img/user.png',
        seekerSkills: 'SQL, Python, Excel',
        interviewDate: '2024-12-20',
        interviewTime: '16:00',
        interviewType: 'phone',
        status: 'accepted',
        resumeUrl: 'resume3.pdf',
        sector: 'IT'
    }
];

const sampleAvailableJobsData = [
    {
        id: 1,
        jobTitle: 'Financial Controller',
        company: 'Dialog Axiata',
        postedDate: '2024-12-15',
        applicants: 6,
        sector: 'Finance',
        description: 'Financial Controller to oversee financial operations and reporting...',
        requirements: ['5+ years experience', 'CPA/ACCA', 'Financial Reporting']
    },
    {
        id: 2,
        jobTitle: 'HR Manager',
        company: 'Hayleys PLC',
        postedDate: '2024-12-18',
        applicants: 8,
        sector: 'HR',
        description: 'Experienced HR Manager to lead our human resources team...',
        requirements: ['3+ years experience', 'HR Management', 'Employee Relations']
    },
    {
        id: 3,
        jobTitle: 'Sales Executive',
        company: 'John Keells',
        postedDate: '2024-12-19',
        applicants: 12,
        sector: 'Sales',
        description: 'Dynamic Sales Executive to drive revenue growth...',
        requirements: ['2+ years experience', 'Sales Skills', 'Customer Relations']
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeScheduleManagement();
});

function initializeScheduleManagement() {
    loadScheduleData();
    setupEventListeners();
    setupTabs();
    renderScheduledTable();
    renderAvailableTable();
    updateCounts();
}

function loadScheduleData() {
    // Load data from localStorage or use sample data
    const savedScheduled = localStorage.getItem('mslScheduledData');
    const savedAvailable = localStorage.getItem('mslAvailableJobsData');
    
    if (savedScheduled) {
        scheduledInterviews = JSON.parse(savedScheduled);
    } else {
        scheduledInterviews = [...sampleScheduledData];
        localStorage.setItem('mslScheduledData', JSON.stringify(scheduledInterviews));
    }
    
    if (savedAvailable) {
        availableJobs = JSON.parse(savedAvailable);
    } else {
        availableJobs = [...sampleAvailableJobsData];
        localStorage.setItem('mslAvailableJobsData', JSON.stringify(availableJobs));
    }
    
    filteredScheduled = [...scheduledInterviews];
    filteredAvailable = [...availableJobs];
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('schedule-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterData);
    }

    // Sector filter
    const sectorFilter = document.getElementById('sector-filter');
    if (sectorFilter) {
        sectorFilter.addEventListener('change', filterData);
    }

    // Status filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterData);
    }

    // Schedule interview button
    const scheduleInterviewBtn = document.getElementById('schedule-interview-btn');
    if (scheduleInterviewBtn) {
        scheduleInterviewBtn.addEventListener('click', showScheduleInterviewModal);
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
    const closeScheduleModal = document.getElementById('close-schedule-modal');
    if (closeScheduleModal) {
        closeScheduleModal.addEventListener('click', hideScheduleInterviewModal);
    }

    const cancelSchedule = document.getElementById('cancel-schedule');
    if (cancelSchedule) {
        cancelSchedule.addEventListener('click', hideScheduleInterviewModal);
    }

    const closeRescheduleModal = document.getElementById('close-reschedule-modal');
    if (closeRescheduleModal) {
        closeRescheduleModal.addEventListener('click', hideRescheduleModal);
    }

    const cancelReschedule = document.getElementById('cancel-reschedule');
    if (cancelReschedule) {
        cancelReschedule.addEventListener('click', hideRescheduleModal);
    }

    // Forms
    const scheduleInterviewForm = document.getElementById('schedule-interview-form');
    if (scheduleInterviewForm) {
        scheduleInterviewForm.addEventListener('submit', handleScheduleInterview);
    }

    const rescheduleForm = document.getElementById('reschedule-form');
    if (rescheduleForm) {
        rescheduleForm.addEventListener('submit', handleReschedule);
    }
}

function setupTabs() {
    const tabScheduled = document.getElementById('tab-scheduled');
    const tabSchedule = document.getElementById('tab-schedule');
    const tabScheduledContent = document.getElementById('tab-scheduled-content');
    const tabScheduleContent = document.getElementById('tab-schedule-content');

    if (tabScheduled && tabSchedule && tabScheduledContent && tabScheduleContent) {
        tabScheduled.addEventListener('click', function() {
            switchTab('scheduled');
        });

        tabSchedule.addEventListener('click', function() {
            switchTab('schedule');
        });
    }
}

function switchTab(tabName) {
    const tabScheduled = document.getElementById('tab-scheduled');
    const tabSchedule = document.getElementById('tab-schedule');
    const tabScheduledContent = document.getElementById('tab-scheduled-content');
    const tabScheduleContent = document.getElementById('tab-schedule-content');

    // Remove active class from all tabs and content
    [tabScheduled, tabSchedule].forEach(tab => {
        if (tab) tab.classList.remove('active');
    });
    [tabScheduledContent, tabScheduleContent].forEach(content => {
        if (content) content.classList.remove('active');
    });

    // Add active class to selected tab and content
    if (tabName === 'scheduled') {
        if (tabScheduled) tabScheduled.classList.add('active');
        if (tabScheduledContent) tabScheduledContent.classList.add('active');
    } else if (tabName === 'schedule') {
        if (tabSchedule) tabSchedule.classList.add('active');
        if (tabScheduleContent) tabScheduleContent.classList.add('active');
    }
}

function filterData() {
    const searchTerm = document.getElementById('schedule-search')?.value.toLowerCase() || '';
    const sectorFilter = document.getElementById('sector-filter')?.value || '';
    const statusFilter = document.getElementById('status-filter')?.value || '';

    // Filter scheduled interviews
    filteredScheduled = scheduledInterviews.filter(interview => {
        const matchesSearch = !searchTerm || 
            interview.jobTitle.toLowerCase().includes(searchTerm) ||
            interview.seekerName.toLowerCase().includes(searchTerm) ||
            interview.company.toLowerCase().includes(searchTerm);

        const matchesSector = !sectorFilter || interview.sector === sectorFilter;
        const matchesStatus = !statusFilter || interview.status === statusFilter;

        return matchesSearch && matchesSector && matchesStatus;
    });

    // Filter available jobs
    filteredAvailable = availableJobs.filter(job => {
        const matchesSearch = !searchTerm || 
            job.jobTitle.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm);

        const matchesSector = !sectorFilter || job.sector === sectorFilter;

        return matchesSearch && matchesSector;
    });

    renderScheduledTable();
    renderAvailableTable();
    updateCounts();
}

function renderScheduledTable() {
    const tableBody = document.getElementById('scheduled-table-body');
    if (!tableBody) return;

    if (filteredScheduled.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                    <div class="empty-state">
                        <i class="fas fa-calendar-alt"></i>
                        <p>No scheduled interviews found matching your criteria</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = filteredScheduled.map(interview => `
        <tr class="interview-row hover:bg-gray-50">
            <td class="px-6 py-4">
                <div class="job-details">
                    <h4 class="text-sm font-medium text-gray-900">${interview.jobTitle}</h4>
                    <p class="text-sm text-gray-500">${interview.seekerSkills}</p>
                    <span class="interview-type ${interview.interviewType} px-2 py-1 rounded-full text-xs font-medium">
                        ${getInterviewTypeLabel(interview.interviewType)}
                    </span>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="seeker-info">
                    <img class="seeker-avatar" src="${interview.seekerAvatar}" alt="${interview.seekerName}">
                    <div class="seeker-details">
                        <h4>${interview.seekerName}</h4>
                        <p>${interview.seekerSkills}</p>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="company-info">${interview.company}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="interview-time">${interview.interviewTime}</div>
                <div class="interview-date">${formatDate(interview.interviewDate)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="interview-status ${interview.status}">
                    ${getStatusLabel(interview.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-wrap gap-1">
                    <button class="action-btn resume" onclick="viewResume('${interview.resumeUrl}')">
                        <i class="fas fa-file-alt mr-1"></i>Resume
                    </button>
                    <button class="action-btn view" onclick="viewInterviewDetails(${interview.id})">
                        <i class="fas fa-eye mr-1"></i>View
                    </button>
                    <button class="action-btn reschedule" onclick="showRescheduleModal(${interview.id})">
                        <i class="fas fa-calendar-alt mr-1"></i>Reschedule
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderAvailableTable() {
    const tableBody = document.getElementById('available-table-body');
    if (!tableBody) return;

    if (filteredAvailable.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <div class="empty-state">
                        <i class="fas fa-briefcase"></i>
                        <p>No jobs available for scheduling</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = filteredAvailable.map(job => `
        <tr class="job-row hover:bg-gray-50">
            <td class="px-6 py-4">
                <div class="job-details">
                    <h4 class="text-sm font-medium text-gray-900">${job.jobTitle}</h4>
                    <p class="text-sm text-gray-500">${job.description}</p>
                    <div class="flex flex-wrap gap-1 mt-2">
                        ${job.requirements.map(req => 
                            `<span class="skills-tag">${req}</span>`
                        ).join('')}
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="company-info">${job.company}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${formatDate(job.postedDate)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${job.applicants} applicants
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="action-btn schedule" onclick="scheduleJob(${job.id})">
                    <i class="fas fa-calendar-plus mr-1"></i>Schedule
                </button>
            </td>
        </tr>
    `).join('');
}

function updateCounts() {
    const scheduledCount = document.getElementById('scheduled-count');
    const availableCount = document.getElementById('available-count');
    
    if (scheduledCount) {
        scheduledCount.textContent = filteredScheduled.length;
    }
    
    if (availableCount) {
        availableCount.textContent = filteredAvailable.length;
    }
}

function getInterviewTypeLabel(type) {
    switch (type) {
        case 'phone': return 'Phone';
        case 'video': return 'Video';
        case 'in-person': return 'In-Person';
        default: return type;
    }
}

function getStatusLabel(status) {
    switch (status) {
        case 'scheduled': return 'Scheduled';
        case 'requested': return 'Requested';
        case 'accepted': return 'Accepted';
        case 'rescheduled': return 'Rescheduled';
        default: return status;
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

function showScheduleInterviewModal() {
    const modal = document.getElementById('schedule-interview-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideScheduleInterviewModal() {
    const modal = document.getElementById('schedule-interview-modal');
    if (modal) {
        modal.classList.add('hidden');
        
        // Reset form
        const form = document.getElementById('schedule-interview-form');
        if (form) {
            form.reset();
        }
    }
}

function showRescheduleModal(interviewId) {
    const modal = document.getElementById('reschedule-modal');
    const interviewIdInput = document.getElementById('reschedule-interview-id');
    
    if (modal && interviewIdInput) {
        interviewIdInput.value = interviewId;
        modal.classList.remove('hidden');
    }
}

function hideRescheduleModal() {
    const modal = document.getElementById('reschedule-modal');
    if (modal) {
        modal.classList.add('hidden');
        
        // Reset form
        const form = document.getElementById('reschedule-form');
        if (form) {
            form.reset();
        }
    }
}

function handleScheduleInterview(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const jobId = formData.get('job');
    const seekerId = formData.get('seeker');
    const date = formData.get('date');
    const time = formData.get('time');
    const type = formData.get('type');
    const notes = formData.get('notes');
    
    if (!jobId || !seekerId || !date || !time || !type) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Create new scheduled interview logic here
    const newInterview = {
        id: Date.now(),
        jobTitle: 'New Job Title', // This would come from the selected job
        company: 'New Company', // This would come from the selected job
        seekerName: 'New Seeker', // This would come from the selected seeker
        seekerAvatar: 'img/user.png',
        seekerSkills: 'Skills',
        interviewDate: date,
        interviewTime: time,
        interviewType: type,
        status: 'scheduled',
        resumeUrl: 'resume.pdf',
        sector: 'IT',
        notes: notes
    };
    
    scheduledInterviews.push(newInterview);
    localStorage.setItem('mslScheduledData', JSON.stringify(scheduledInterviews));
    
    showNotification('Interview scheduled successfully!', 'success');
    hideScheduleInterviewModal();
    
    // Refresh the tables
    filterData();
}

function handleReschedule(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const interviewId = formData.get('interview-id');
    const newDate = formData.get('new-date');
    const newTime = formData.get('new-time');
    const reason = formData.get('reason');
    
    if (!interviewId || !newDate || !newTime || !reason) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Update interview with reschedule request
    const interview = scheduledInterviews.find(inv => inv.id == interviewId);
    if (interview) {
        interview.status = 'requested';
        interview.rescheduleDate = newDate;
        interview.rescheduleTime = newTime;
        interview.rescheduleReason = reason;
        
        localStorage.setItem('mslScheduledData', JSON.stringify(scheduledInterviews));
        showNotification('Reschedule request submitted successfully!', 'success');
        hideRescheduleModal();
        
        // Refresh the tables
        filterData();
    }
}

function viewResume(resumeUrl) {
    showNotification('Viewing resume: ' + resumeUrl, 'info');
    // Here you would implement resume viewing functionality
}

function viewInterviewDetails(interviewId) {
    const interview = scheduledInterviews.find(inv => inv.id === interviewId);
    if (interview) {
        showNotification('Viewing interview details for: ' + interview.jobTitle, 'info');
        // Here you would implement interview details viewing functionality
    }
}

function scheduleJob(jobId) {
    const job = availableJobs.find(j => j.id === jobId);
    if (job) {
        showNotification('Scheduling interview for job: ' + job.jobTitle, 'info');
        showScheduleInterviewModal();
        // Here you would pre-populate the form with job details
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




