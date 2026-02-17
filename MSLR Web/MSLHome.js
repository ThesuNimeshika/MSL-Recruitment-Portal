// MSL Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Profile dropdown functionality
    const profileBtn = document.getElementById('profile-dropdown-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }



    // Quick Actions navigation
    const quickActionLinks = document.querySelectorAll('[data-section]');
    const contentArea = document.getElementById('content-area');

    quickActionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active state from all links
            quickActionLinks.forEach(l => {
                l.classList.remove('text-blue-600', 'bg-blue-50');
                l.classList.add('text-gray-700');
            });
            
            // Add active state to clicked link
            this.classList.remove('text-gray-700');
            this.classList.add('text-blue-600', 'bg-blue-50');
            
            const section = this.getAttribute('data-section');
            loadSection(section);
        });
    });

    // Calendar functionality
    initializeCalendar();

    // Job management functionality
    initializeJobManagement();

    // Add fade-in animation to cards
    addFadeInAnimation();
});

// Function to load different sections
function loadSection(section) {
    const contentArea = document.getElementById('content-area');
    
    // Show loading state
    contentArea.classList.add('loading');
    
    // Simulate loading delay
    setTimeout(() => {
        contentArea.classList.remove('loading');
        
        // Here you would typically load different content based on the section
        console.log(`Loading section: ${section}`);
        
        // For now, just show a notification
        showNotification(`Switched to ${section} section`, 'info');
    }, 500);
}

// Calendar initialization
function initializeCalendar() {
    const calendarDays = document.querySelectorAll('.grid.grid-cols-7 > div');
    
    // Mark today's date
    const today = new Date();
    const currentDay = today.getDate();
    
    calendarDays.forEach((day, index) => {
        const dayText = day.textContent.trim();
        
        if (dayText === currentDay.toString()) {
            day.classList.add('today');
        }
        
        // Add click event for calendar days
        day.addEventListener('click', function() {
            // Remove selection from all days
            calendarDays.forEach(d => d.classList.remove('selected'));
            
            // Add selection to clicked day
            this.classList.add('selected');
            
            // Show events for selected day
            showDayEvents(dayText);
        });
        
        // Add hover effect
        day.addEventListener('mouseenter', function() {
            if (!this.classList.contains('today')) {
                this.style.backgroundColor = '#f3f4f6';
            }
        });
        
        day.addEventListener('mouseleave', function() {
            if (!this.classList.contains('today')) {
                this.style.backgroundColor = '';
            }
        });
    });
}

// Show events for a specific day
function showDayEvents(day) {
    console.log(`Showing events for day ${day}`);
    
    // Here you would typically fetch and display events for the selected day
    const events = [
        { type: 'interview', title: 'Senior Developer Interview', time: '10:00 AM', client: 'Hayleys PLC' },
        { type: 'meeting', title: 'Client Meeting', time: '2:00 PM', client: 'Dialog' },
        { type: 'review', title: 'Job Posting Review', time: '4:00 PM', client: 'Internal' }
    ];
    
    // Update today's events section
    updateTodayEvents(events);
}

// Update today's events display
function updateTodayEvents(events) {
    const eventsContainer = document.querySelector('.border-t.border-gray-200.pt-4 .space-y-2');
    
    if (eventsContainer) {
        eventsContainer.innerHTML = '';
        
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'flex items-center space-x-3 p-2 rounded-md';
            
            let bgColor = 'bg-blue-50';
            let dotColor = 'bg-blue-500';
            
            if (event.type === 'meeting') {
                bgColor = 'bg-green-50';
                dotColor = 'bg-green-500';
            } else if (event.type === 'review') {
                bgColor = 'bg-orange-50';
                dotColor = 'bg-orange-500';
            }
            
            eventElement.className = `flex items-center space-x-3 p-2 ${bgColor} rounded-md`;
            
            eventElement.innerHTML = `
                <div class="w-3 h-3 ${dotColor} rounded-full"></div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">${event.title}</p>
                    <p class="text-xs text-gray-600">${event.time} - ${event.client}</p>
                </div>
            `;
            
            eventsContainer.appendChild(eventElement);
        });
    }
}

// Job management functionality
function initializeJobManagement() {
    // Edit job buttons
    const editButtons = document.querySelectorAll('button[title="Edit"]');
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const jobTitle = this.closest('.flex.flex-col').querySelector('h3').textContent;
            editJob(jobTitle);
        });
    });
    
    // Delete job buttons
    const deleteButtons = document.querySelectorAll('button[title="Delete"]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const jobTitle = this.closest('.flex.flex-col').querySelector('h3').textContent;
            deleteJob(jobTitle);
        });
    });
    
    // Job card click events
    const jobCards = document.querySelectorAll('.flex.flex-col.sm\\:flex-row');
    jobCards.forEach(card => {
        card.addEventListener('click', function() {
            const jobTitle = this.querySelector('h3').textContent;
            viewJobDetails(jobTitle);
        });
    });
}

// Edit job function
function editJob(jobTitle) {
    console.log(`Editing job: ${jobTitle}`);
    showNotification(`Opening edit form for ${jobTitle}`, 'info');
    
    // Here you would typically open a modal or navigate to edit page
    // For now, just show a notification
}

// Delete job function
function deleteJob(jobTitle) {
    if (confirm(`Are you sure you want to delete "${jobTitle}"?`)) {
        console.log(`Deleting job: ${jobTitle}`);
        showNotification(`Job "${jobTitle}" deleted successfully`, 'success');
        
        // Here you would typically make an API call to delete the job
        // For now, just remove the job card from the DOM
        const jobCard = document.querySelector(`h3:contains("${jobTitle}")`).closest('.flex.flex-col');
        if (jobCard) {
            jobCard.style.opacity = '0';
            setTimeout(() => {
                jobCard.remove();
            }, 300);
        }
    }
}

// View job details function
function viewJobDetails(jobTitle) {
    console.log(`Viewing details for job: ${jobTitle}`);
    showNotification(`Opening details for ${jobTitle}`, 'info');
    
    // Here you would typically navigate to job details page or open a modal
}

// Add fade-in animation to cards
function addFadeInAnimation() {
    const cards = document.querySelectorAll('.bg-white.rounded-lg');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 transform translate-x-full`;
    
    let bgColor = 'bg-blue-500';
    let icon = 'fas fa-info-circle';
    
    if (type === 'success') {
        bgColor = 'bg-green-500';
        icon = 'fas fa-check-circle';
    } else if (type === 'error') {
        bgColor = 'bg-red-500';
        icon = 'fas fa-exclamation-circle';
    } else if (type === 'warning') {
        bgColor = 'bg-yellow-500';
        icon = 'fas fa-exclamation-triangle';
    }
    
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 transform translate-x-full ${bgColor} text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Utility function to check if element contains text
Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
};

// Add event listeners for form submissions
document.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('job-form')) {
        handleJobFormSubmission(e.target);
    }
});

// Handle job form submission
function handleJobFormSubmission(form) {
    const formData = new FormData(form);
    const jobData = Object.fromEntries(formData);
    
    console.log('Job form data:', jobData);
    showNotification('Job posted successfully!', 'success');
    
    // Here you would typically send the data to your backend
    form.reset();
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N to add new job
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        showNotification('Opening new job form...', 'info');
    }
    
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        showNotification('Saving changes...', 'info');
    }
    
    // Escape to close dropdowns
    if (e.key === 'Escape') {
        const dropdowns = document.querySelectorAll('.absolute:not(.hidden)');
        dropdowns.forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
    }
});

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg';
            tooltip.textContent = this.getAttribute('title');
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

// Initialize tooltips when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTooltips();
});

