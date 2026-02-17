// Client Home Page JavaScript

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

    // Quick Actions Navigation
    const quickActionLinks = document.querySelectorAll('[data-section]');
    quickActionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            handleQuickAction(section);
        });
    });

    // Job management functionality
    initializeJobManagement();

    // Dashboard metrics animation
    initializeDashboardAnimations();

    // Search functionality
    initializeSearch();

    // Notification system
    initializeNotifications();
});

// Quick Actions Handler
function handleQuickAction(section) {
    switch(section) {
        case 'current-jobs':
            showNotification('Navigating to Current Jobs...', 'info');
            break;
        case 'post-jobs':
            showNotification('Opening Job Posting Form...', 'info');
            break;
        case 'msl-alerts':
            showNotification('Loading MSL Alerts...', 'info');
            break;
        case 'invoice':
            showNotification('Opening Invoice Dashboard...', 'info');
            break;
        case 'my-jobs':
            showNotification('Loading My Jobs...', 'info');
            break;
        case 'interviews':
            showNotification('Opening Interview Schedule...', 'info');
            break;
        case 'agreement':
            showNotification('Loading Current Agreement...', 'info');
            break;
        default:
            showNotification('Feature coming soon!', 'warning');
    }
}

// Job Management Functions
function initializeJobManagement() {
    // Edit job buttons
    const editButtons = document.querySelectorAll('[title="Edit"]');
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const jobCard = this.closest('.flex.flex-col');
            const jobTitle = jobCard.querySelector('h3').textContent;
            showNotification(`Editing job: ${jobTitle}`, 'info');
            // Here you would typically open an edit modal
        });
    });

    // Delete job buttons
    const deleteButtons = document.querySelectorAll('[title="Delete"]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const jobCard = this.closest('.flex.flex-col');
            const jobTitle = jobCard.querySelector('h3').textContent;
            
            if (confirm(`Are you sure you want to delete "${jobTitle}"?`)) {
                jobCard.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    jobCard.remove();
                    showNotification(`Job "${jobTitle}" deleted successfully`, 'success');
                    updateJobCount();
                }, 300);
            }
        });
    });

    // Post New Job button
    const postNewJobBtn = document.querySelector('button:contains("Post New Job")');
    if (postNewJobBtn) {
        postNewJobBtn.addEventListener('click', function() {
            showNotification('Opening Job Posting Form...', 'info');
            // Here you would typically open a job posting modal
        });
    }
}

// Dashboard Animations
function initializeDashboardAnimations() {
    const dashboardCards = document.querySelectorAll('.grid-cols-4 > div');
    dashboardCards.forEach((card, index) => {
        card.classList.add('dashboard-metric');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effects to metric cards
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('input[placeholder*="Title, skill or company"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Here you would typically implement search functionality
            if (query.length > 2) {
                console.log('Searching for:', query);
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                showNotification(`Searching for: ${this.value}`, 'info');
            }
        });
    }
}

// Notification System
function initializeNotifications() {
    // Auto-hide notification badge after 5 seconds
    const notificationBadge = document.querySelector('.bg-red-500');
    if (notificationBadge) {
        setTimeout(() => {
            notificationBadge.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                notificationBadge.style.display = 'none';
            }, 500);
        }, 5000);
    }
}

// Utility Functions

// Show notification
function showNotification(message, type = 'info') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Update job count
function updateJobCount() {
    const jobCards = document.querySelectorAll('.job-listing');
    const activeJobsMetric = document.querySelector('.text-3xl.font-bold.text-blue-600');
    if (activeJobsMetric) {
        activeJobsMetric.textContent = jobCards.length;
    }
}

// Add CSS for fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Dashboard Metrics Update (simulate real-time data)
function updateDashboardMetrics() {
    // Simulate real-time updates
    setInterval(() => {
        const applicationsMetric = document.querySelector('.text-3xl.font-bold.text-green-600');
        if (applicationsMetric) {
            const currentValue = parseInt(applicationsMetric.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 3);
            applicationsMetric.textContent = newValue;
        }
    }, 30000); // Update every 30 seconds
}

// Initialize real-time updates
updateDashboardMetrics();

// Job card interactions
document.addEventListener('click', function(e) {
    // Job title click
    if (e.target.matches('h3.font-semibold.text-blue-600')) {
        const jobTitle = e.target.textContent;
        showNotification(`Viewing details for: ${jobTitle}`, 'info');
    }

    // Job type badges
    if (e.target.matches('.bg-green-100, .bg-yellow-100, .bg-red-100')) {
        const jobType = e.target.textContent;
        showNotification(`Filtering by job type: ${jobType}`, 'info');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + N for new job
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        showNotification('Opening New Job Form (Keyboard Shortcut)', 'info');
    }
    
    // Ctrl/Cmd + S for search
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Title, skill or company"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Responsive behavior
function handleResponsiveBehavior() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific behaviors
        const dashboardCards = document.querySelectorAll('.grid-cols-4 > div');
        dashboardCards.forEach(card => {
            card.addEventListener('click', function() {
                showNotification('Tap to view detailed metrics', 'info');
            });
        });
    }
}

// Initialize responsive behavior
handleResponsiveBehavior();
window.addEventListener('resize', handleResponsiveBehavior);

// Export functions for potential use in other modules
window.ClientDashboard = {
    showNotification,
    updateJobCount,
    handleQuickAction,
    updateDashboardMetrics
};
