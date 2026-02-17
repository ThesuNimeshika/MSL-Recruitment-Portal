// Seeker Applications Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeProfileDropdown();
    initializeApplicationCards();
    initializeProgressTree();
    initializeResponsiveBehavior();
    initializeKeyboardShortcuts();
    initializeTooltips();
    initializeNotifications();
    
    // Add fade-in animation to application cards
    addFadeInAnimation();
});

// Profile Dropdown Functionality
function initializeProfileDropdown() {
    const dropdownBtn = document.getElementById('profile-dropdown-btn');
    const dropdown = document.getElementById('profile-dropdown');
    
    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdownBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdown.classList.add('hidden');
            }
        });
    }
}

// Application Cards Functionality
function initializeApplicationCards() {
    const applicationCards = document.querySelectorAll('.application-card');
    
    applicationCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click functionality for expanding details
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on interactive elements
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            
            toggleApplicationDetails(this);
        });
        
        // Add keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleApplicationDetails(this);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'View application details');
    });
}

// Progress Tree Functionality
function initializeProgressTree() {
    const progressSteps = document.querySelectorAll('.progress-step');
    
    progressSteps.forEach(step => {
        const icon = step.querySelector('.progress-icon');
        const statusBadge = step.querySelector('.status-badge');
        
        if (icon && statusBadge) {
            // Add hover effects
            step.addEventListener('mouseenter', function() {
                icon.style.transform = 'scale(1.1)';
            });
            
            step.addEventListener('mouseleave', function() {
                icon.style.transform = 'scale(1)';
            });
            
            // Add click functionality to show more details
            step.addEventListener('click', function() {
                showProgressDetails(this);
            });
            
            // Add keyboard accessibility
            step.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showProgressDetails(this);
                }
            });
            
            // Make steps focusable
            step.setAttribute('tabindex', '0');
            step.setAttribute('role', 'button');
        }
    });
}

// Toggle Application Details
function toggleApplicationDetails(card) {
    const detailsSection = card.querySelector('.application-details');
    
    if (detailsSection) {
        const isExpanded = detailsSection.classList.contains('expanded');
        
        if (isExpanded) {
            detailsSection.classList.remove('expanded');
            detailsSection.style.maxHeight = '0';
            showNotification('Application details collapsed', 'info');
        } else {
            detailsSection.classList.add('expanded');
            detailsSection.style.maxHeight = detailsSection.scrollHeight + 'px';
            showNotification('Application details expanded', 'info');
        }
    } else {
        // Create details section if it doesn't exist
        createApplicationDetails(card);
    }
}

// Create Application Details Section
function createApplicationDetails(card) {
    const jobTitle = card.querySelector('h3').textContent;
    const company = card.querySelector('p').textContent;
    
    const detailsSection = document.createElement('div');
    detailsSection.className = 'application-details expanded mt-4 p-4 bg-gray-50 rounded-lg';
    detailsSection.style.maxHeight = '0';
    detailsSection.style.overflow = 'hidden';
    detailsSection.style.transition = 'max-height 0.3s ease-in-out';
    
    detailsSection.innerHTML = `
        <h4 class="font-semibold text-gray-900 mb-2">Application Details</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
                <p class="text-gray-600"><strong>Job Title:</strong> ${jobTitle}</p>
                <p class="text-gray-600"><strong>Company:</strong> ${company}</p>
                <p class="text-gray-600"><strong>Applied Date:</strong> ${getRandomDate()}</p>
                <p class="text-gray-600"><strong>Application ID:</strong> ${generateApplicationId()}</p>
            </div>
            <div>
                <p class="text-gray-600"><strong>Salary Range:</strong> $60,000 - $80,000</p>
                <p class="text-gray-600"><strong>Job Type:</strong> Full-time</p>
                <p class="text-gray-600"><strong>Location:</strong> Colombo, Sri Lanka</p>
                <p class="text-gray-600"><strong>Remote:</strong> Hybrid</p>
            </div>
        </div>
        <div class="mt-4 flex space-x-2">
            <button class="btn-primary text-sm px-3 py-1">View Job Details</button>
            <button class="btn-secondary text-sm px-3 py-1">Withdraw Application</button>
        </div>
    `;
    
    card.appendChild(detailsSection);
    
    // Animate the expansion
    setTimeout(() => {
        detailsSection.style.maxHeight = detailsSection.scrollHeight + 'px';
    }, 10);
    
    showNotification('Application details loaded', 'success');
}

// Show Progress Details
function showProgressDetails(step) {
    const stepTitle = step.querySelector('p').textContent;
    const stepStatus = step.querySelector('.status-badge').textContent;
    
    const details = {
        'Open to seekers': 'Job posting is active and accepting applications from qualified candidates.',
        'Under Review': 'Your application is being reviewed by the HR team and hiring managers.',
        '1st Interview Scheduled': 'First round interview has been scheduled. Check your email for details.',
        '2nd Interview Scheduled': 'Second round interview has been scheduled. This is typically with senior management.'
    };
    
    const description = details[stepTitle] || 'Step in the application process.';
    
    showNotification(`${stepTitle}: ${description}`, 'info');
}

// Responsive Behavior
function initializeResponsiveBehavior() {
    const sidebar = document.querySelector('.w-1/3');
    const content = document.querySelector('.w-2/3');
    
    function adjustLayout() {
        if (window.innerWidth <= 768) {
            // Mobile layout
            if (sidebar && content) {
                sidebar.style.position = 'relative';
                sidebar.style.width = '100%';
                content.style.width = '100%';
                content.style.marginLeft = '0';
            }
        } else {
            // Desktop layout
            if (sidebar && content) {
                sidebar.style.position = 'fixed';
                sidebar.style.width = '33.333333%';
                content.style.width = '66.666667%';
                content.style.marginLeft = 'auto';
            }
        }
    }
    
    // Initial adjustment
    adjustLayout();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustLayout);
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder*="Title, skill or company"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close dropdowns
        if (e.key === 'Escape') {
            const dropdowns = document.querySelectorAll('.dropdown:not(.hidden)');
            dropdowns.forEach(dropdown => dropdown.classList.add('hidden'));
        }
        
        // Tab navigation for application cards
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('application-card')) {
                focusedElement.style.outline = '2px solid #3b82f6';
                focusedElement.style.outlineOffset = '2px';
            }
        }
    });
}

// Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', function(e) {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            tooltip.classList.add('show');
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    });
}

// Notification System
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '1rem';
        container.style.right = '1rem';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'info': 'fa-info-circle',
        'warning': 'fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

// Fade-in Animation
function addFadeInAnimation() {
    const applicationCards = document.querySelectorAll('.application-card');
    
    applicationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utility Functions
function getRandomDate() {
    const dates = [
        'Dec 15, 2024',
        'Dec 12, 2024',
        'Dec 10, 2024',
        'Dec 8, 2024',
        'Dec 5, 2024'
    ];
    return dates[Math.floor(Math.random() * dates.length)];
}

function generateApplicationId() {
    return 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Application Status Management
function updateApplicationStatus(applicationId, newStatus) {
    const applicationCard = document.querySelector(`[data-application-id="${applicationId}"]`);
    
    if (applicationCard) {
        const statusBadge = applicationCard.querySelector('.application-status');
        const progressSteps = applicationCard.querySelectorAll('.progress-step');
        
        // Update main status badge
        statusBadge.textContent = newStatus;
        statusBadge.className = `application-status ${getStatusClass(newStatus)}`;
        
        // Update progress steps based on new status
        updateProgressSteps(progressSteps, newStatus);
        
        showNotification(`Application status updated to: ${newStatus}`, 'success');
    }
}

function getStatusClass(status) {
    const statusClasses = {
        'Under Review': 'under-review',
        '1st Interview': 'interview',
        '2nd Interview': 'interview',
        'Completed': 'completed'
    };
    return statusClasses[status] || 'under-review';
}

function updateProgressSteps(steps, status) {
    const statusOrder = ['Open to seekers', 'Under Review', '1st Interview Scheduled', '2nd Interview Scheduled'];
    const currentIndex = statusOrder.indexOf(status);
    
    steps.forEach((step, index) => {
        const icon = step.querySelector('.progress-icon');
        const badge = step.querySelector('.status-badge');
        
        if (index <= currentIndex) {
            // Mark as complete
            icon.className = 'progress-icon complete';
            icon.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
            badge.textContent = 'Complete';
            badge.className = 'status-badge complete';
        } else if (index === currentIndex + 1) {
            // Mark as pending
            icon.className = 'progress-icon pending';
            icon.innerHTML = '<i class="fas fa-clock text-white text-xs"></i>';
            badge.textContent = 'Pending';
            badge.className = 'status-badge pending';
        } else {
            // Mark as not started
            icon.className = 'progress-icon not-started';
            icon.innerHTML = '<i class="fas fa-minus text-gray-500 text-xs"></i>';
            badge.textContent = 'Not Started';
            badge.className = 'status-badge not-started';
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('input[placeholder*="Title, skill or company"]');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const applicationCards = document.querySelectorAll('.application-card');
            
            applicationCards.forEach(card => {
                const jobTitle = card.querySelector('h3').textContent.toLowerCase();
                const company = card.querySelector('p').textContent.toLowerCase();
                
                if (jobTitle.includes(searchTerm) || company.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

// Export functions for global access
window.SeekerApplications = {
    updateApplicationStatus,
    showNotification,
    toggleApplicationDetails,
    showProgressDetails
};





