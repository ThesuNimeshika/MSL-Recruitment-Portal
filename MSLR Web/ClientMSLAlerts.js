// Client MSL Alerts Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeProfileDropdown();
    initializeInterviewActions();
    initializeJudgmentActions();
    initializeTabNavigation();
    initializeRefreshButton();
    initializeNotifications();
    initializeResponsiveBehavior();
    initializeKeyboardShortcuts();
    initializeTooltips();
    initializeTimeUpdates();
    initializeSearchFunctionality();
    initializeTodayDate();
    
    // Add fade-in animation to cards
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

// Interview Action Buttons
function initializeInterviewActions() {
    const actionButtons = document.querySelectorAll('.interview-action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.classList.contains('approve-btn') ? 'approve' :
                          this.classList.contains('reschedule-btn') ? 'reschedule' :
                          this.classList.contains('decline-btn') ? 'decline' : 'unknown';
            
            const card = this.closest('.border');
            const jobTitle = card.querySelector('h3').textContent;
            const candidate = card.querySelector('strong').textContent.replace('Candidate:', '').trim();
            
            handleInterviewAction(action, jobTitle, candidate, card);
        });
    });
}

function handleInterviewAction(action, jobTitle, candidate, card) {
    const cardElement = card;
    
    switch (action) {
        case 'approve':
            showConfirmationModal(
                'Approve Interview',
                `Are you sure you want to approve the interview for <strong>${candidate}</strong> for the position <strong>${jobTitle}</strong>?`,
                () => approveInterview(cardElement, jobTitle, candidate)
            );
            break;
            
        case 'reschedule':
            showRescheduleModal(jobTitle, candidate, cardElement);
            break;
            
        case 'decline':
            showConfirmationModal(
                'Decline Interview',
                `Are you sure you want to decline the interview for <strong>${candidate}</strong> for the position <strong>${jobTitle}</strong>?`,
                () => declineInterview(cardElement, jobTitle, candidate)
            );
            break;
    }
}

function approveInterview(card, jobTitle, candidate) {
    // Show loading state
    const actionButtons = card.querySelectorAll('.interview-action-btn');
    actionButtons.forEach(btn => btn.disabled = true);
    
    // Simulate API call
    setTimeout(() => {
        // Update status badge
        const statusBadge = card.querySelector('.bg-blue-100');
        if (statusBadge) {
            statusBadge.className = 'bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
            statusBadge.textContent = 'Approved';
        }
        
        // Disable action buttons
        actionButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });
        
        // Show success notification
        showNotification(`Interview approved for ${candidate} - ${jobTitle}`, 'success');
        
        // Add success animation
        card.classList.add('approved');
        card.style.borderLeftColor = '#10b981';
        
    }, 1000);
}

function declineInterview(card, jobTitle, candidate) {
    // Show loading state
    const actionButtons = card.querySelectorAll('.interview-action-btn');
    actionButtons.forEach(btn => btn.disabled = true);
    
    // Simulate API call
    setTimeout(() => {
        // Update status badge
        const statusBadge = card.querySelector('.bg-blue-100, .bg-yellow-100, .bg-green-100');
        if (statusBadge) {
            statusBadge.className = 'bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
            statusBadge.textContent = 'Declined';
        }
        
        // Disable action buttons
        actionButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });
        
        // Show success notification
        showNotification(`Interview declined for ${candidate} - ${jobTitle}`, 'info');
        
        // Add decline animation
        card.classList.add('declined');
        card.style.borderLeftColor = '#ef4444';
        
    }, 1000);
}

function showRescheduleModal(jobTitle, candidate, card) {
    // Create modal HTML
    const modalHTML = `
        <div id="reschedule-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Reschedule Interview</h3>
                    <button id="close-reschedule-modal" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="text-sm text-gray-600 mb-4">
                    Reschedule interview for <strong>${candidate}</strong> - <strong>${jobTitle}</strong>
                </p>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">New Date</label>
                        <input type="date" id="new-interview-date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">New Time</label>
                        <input type="time" id="new-interview-time" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                        <select id="new-interview-type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="virtual">Virtual Interview</option>
                            <option value="on-site">On-site Interview</option>
                            <option value="hybrid">Hybrid Interview</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Reason for Reschedule</label>
                        <textarea id="reschedule-reason" rows="3" placeholder="Optional: Provide a reason for rescheduling..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 mt-6">
                    <button id="cancel-reschedule" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
                    <button id="confirm-reschedule" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Reschedule</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    const modal = document.getElementById('reschedule-modal');
    const closeBtn = document.getElementById('close-reschedule-modal');
    const cancelBtn = document.getElementById('cancel-reschedule');
    const confirmBtn = document.getElementById('confirm-reschedule');
    
    function closeModal() {
        modal.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    confirmBtn.addEventListener('click', () => {
        const newDate = document.getElementById('new-interview-date').value;
        const newTime = document.getElementById('new-interview-time').value;
        const newType = document.getElementById('new-interview-type').value;
        const reason = document.getElementById('reschedule-reason').value;
        
        if (!newDate || !newTime) {
            showNotification('Please select both date and time', 'error');
            return;
        }
        
        rescheduleInterview(card, jobTitle, candidate, newDate, newTime, newType, reason);
        closeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function rescheduleInterview(card, jobTitle, candidate, newDate, newTime, newType, reason) {
    // Show loading state
    const actionButtons = card.querySelectorAll('.interview-action-btn');
    actionButtons.forEach(btn => btn.disabled = true);
    
    // Simulate API call
    setTimeout(() => {
        // Update interview details
        const dateElement = card.querySelector('.fa-calendar-alt').parentElement;
        const timeElement = card.querySelector('.fa-clock').parentElement;
        const typeElement = card.querySelector('.fa-map-marker-alt').parentElement;
        
        if (dateElement) dateElement.innerHTML = `<i class="fas fa-calendar-alt mr-1"></i>${formatDate(newDate)}`;
        if (timeElement) timeElement.innerHTML = `<i class="fas fa-clock mr-1"></i>${formatTime(newTime)}`;
        if (typeElement) {
            const typeText = newType === 'virtual' ? 'Virtual Interview' : 
                           newType === 'on-site' ? 'On-site Interview' : 'Hybrid Interview';
            typeElement.innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i>${typeText}`;
        }
        
        // Update status badge
        const statusBadge = card.querySelector('.bg-blue-100, .bg-yellow-100, .bg-green-100');
        if (statusBadge) {
            statusBadge.className = 'bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
            statusBadge.textContent = 'Rescheduled';
        }
        
        // Re-enable action buttons
        actionButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
        });
        
        // Show success notification
        showNotification(`Interview rescheduled for ${candidate} - ${jobTitle}`, 'success');
        
        // Add reschedule animation
        card.classList.add('rescheduled');
        card.style.borderLeftColor = '#f59e0b';
        
    }, 1000);
}

// Refresh Button Functionality
function initializeRefreshButton() {
    const refreshBtn = document.getElementById('refresh-btn');
    const lastUpdated = document.getElementById('last-updated');
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // Add loading animation
            this.classList.add('loading');
            
            // Simulate refresh
            setTimeout(() => {
                this.classList.remove('loading');
                updateLastUpdated();
                showNotification('Alerts refreshed successfully', 'success');
                
                // Simulate new data
                simulateNewData();
            }, 2000);
        });
    }
}

function updateLastUpdated() {
    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated) {
        lastUpdated.textContent = 'Just now';
    }
}

function simulateNewData() {
    // Simulate receiving new interview alerts
    const interviewCards = document.getElementById('interview-cards');
    if (interviewCards && Math.random() > 0.7) {
        const newCard = createNewInterviewCard();
        interviewCards.insertBefore(newCard, interviewCards.firstChild);
        newCard.classList.add('fade-in');
    }
}

function createNewInterviewCard() {
    const card = document.createElement('div');
    card.className = 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow';
    card.innerHTML = `
        <div class="flex items-start justify-between">
            <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">New</span>
                    <span class="text-sm text-gray-500">• Just now</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">New Position</h3>
                <p class="text-sm text-gray-600 mb-2">Hayleys PLC • Colombo, Sri Lanka</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span><i class="fas fa-calendar-alt mr-1"></i>Dec 25, 2024</span>
                    <span><i class="fas fa-clock mr-1"></i>3:00 PM - 4:00 PM</span>
                    <span><i class="fas fa-map-marker-alt mr-1"></i>Virtual Interview</span>
                </div>
                <p class="text-sm text-gray-700 mb-3">
                    <strong>Candidate:</strong> New Candidate • <strong>Experience:</strong> 3 years • <strong>Skills:</strong> JavaScript, React, Node.js
                </p>
                <div class="flex items-center space-x-2">
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">MSL Recommended</span>
                </div>
            </div>
            <div class="flex flex-col space-y-2 ml-4">
                <button class="interview-action-btn approve-btn px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                    <i class="fas fa-check mr-1"></i>Approve
                </button>
                <button class="interview-action-btn reschedule-btn px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                    <i class="fas fa-calendar-plus mr-1"></i>Reschedule
                </button>
                <button class="interview-action-btn decline-btn px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm">
                    <i class="fas fa-times mr-1"></i>Decline
                </button>
            </div>
        </div>
    `;
    
    // Re-initialize action buttons for new card
    setTimeout(() => {
        initializeInterviewActions();
    }, 100);
    
    return card;
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
    
    notification.className = `notification ${type} slide-in`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2 p-3 rounded-md shadow-lg max-w-sm">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span class="text-sm">${message}</span>
            <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Set background color based on type
    const colors = {
        'success': 'bg-green-600',
        'error': 'bg-red-600',
        'info': 'bg-blue-600',
        'warning': 'bg-yellow-600'
    };
    
    notification.classList.add(colors[type] || colors.info);
    
    container.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('slide-in');
        notification.classList.add('slide-out');
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

// Confirmation Modal
function showConfirmationModal(title, message, onConfirm) {
    const modalHTML = `
        <div id="confirmation-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">${title}</h3>
                    <button id="close-confirmation-modal" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="text-sm text-gray-600 mb-6">${message}</p>
                <div class="flex justify-end space-x-3">
                    <button id="cancel-confirmation" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
                    <button id="confirm-action" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Confirm</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('confirmation-modal');
    const closeBtn = document.getElementById('close-confirmation-modal');
    const cancelBtn = document.getElementById('cancel-confirmation');
    const confirmBtn = document.getElementById('confirm-action');
    
    function closeModal() {
        modal.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    confirmBtn.addEventListener('click', () => {
        onConfirm();
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Time Updates
function initializeTimeUpdates() {
    // Update "time ago" text every minute
    setInterval(updateTimeAgo, 60000);
    updateTimeAgo(); // Initial update
}

function updateTimeAgo() {
    const timeElements = document.querySelectorAll('.text-gray-500');
    timeElements.forEach(element => {
        if (element.textContent.includes('ago')) {
            // Update time ago text (simplified for demo)
            const currentText = element.textContent;
            if (currentText.includes('hours ago')) {
                const hours = parseInt(currentText.match(/(\d+)/)[1]);
                if (hours < 24) {
                    element.textContent = `• ${hours + 1} hours ago`;
                }
            }
        }
    });
}

// Search Functionality
function initializeSearchFunctionality() {
    const searchInput = document.querySelector('input[placeholder="Title, skill or company"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterInterviewCards(searchTerm);
        });
    }
}

function filterInterviewCards(searchTerm) {
    const cards = document.querySelectorAll('#interview-cards .border');
    
    cards.forEach(card => {
        const jobTitle = card.querySelector('h3').textContent.toLowerCase();
        const candidate = card.querySelector('strong').textContent.toLowerCase();
        const skills = card.querySelector('.text-gray-700').textContent.toLowerCase();
        
        const matches = jobTitle.includes(searchTerm) || 
                       candidate.includes(searchTerm) || 
                       skills.includes(searchTerm);
        
        if (matches || searchTerm === '') {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
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
        // R to refresh
        if (e.key === 'r' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            document.getElementById('refresh-btn').click();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('#confirmation-modal, #reschedule-modal');
            modals.forEach(modal => modal.remove());
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

// Fade-in Animation
function addFadeInAnimation() {
    const cards = document.querySelectorAll('#interview-cards .border');
    cards.forEach((card, index) => {
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
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Tab Navigation
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.id.replace('tab-', '') + '-content';
            
            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('text-blue-600');
                btn.classList.remove('border-blue-500');
                btn.classList.add('text-gray-500');
                btn.classList.add('border-transparent');
            });
            
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.classList.add('hidden');
            });
            
            // Add active class to clicked tab and target panel
            this.classList.add('active');
            this.classList.add('text-blue-600');
            this.classList.add('border-blue-500');
            this.classList.remove('text-gray-500');
            this.classList.remove('border-transparent');
            
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.classList.remove('hidden');
            }
        });
    });
}

// Judgment Action Buttons
function initializeJudgmentActions() {
    const judgmentButtons = document.querySelectorAll('.judgment-btn');
    
    judgmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.classList.contains('hired-btn') ? 'hired' :
                          this.classList.contains('not-suitable-btn') ? 'not-suitable' : 'unknown';
            
            const card = this.closest('.border');
            const jobTitle = card.querySelector('h3').textContent;
            const candidate = card.querySelector('.fa-user').parentElement.textContent.trim();
            
            handleJudgmentAction(action, jobTitle, candidate, card);
        });
    });
}

function handleJudgmentAction(action, jobTitle, candidate, card) {
    const cardElement = card;
    
    switch (action) {
        case 'hired':
            showConfirmationModal(
                'Mark as Hired',
                `Are you sure you want to mark <strong>${candidate}</strong> as HIRED for the position <strong>${jobTitle}</strong>?`,
                () => markAsHired(cardElement, jobTitle, candidate)
            );
            break;
            
        case 'not-suitable':
            showNotSuitableModal(jobTitle, candidate, cardElement);
            break;
    }
}

function markAsHired(card, jobTitle, candidate) {
    // Show loading state
    const actionButtons = card.querySelectorAll('.judgment-btn');
    actionButtons.forEach(btn => btn.disabled = true);
    
    // Simulate API call
    setTimeout(() => {
        // Update status badge
        const statusBadge = card.querySelector('.bg-green-100');
        if (statusBadge) {
            statusBadge.className = 'bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
            statusBadge.textContent = 'HIRED';
        }
        
        // Disable action buttons
        actionButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });
        
        // Show success notification
        showNotification(`🎉 ${candidate} has been HIRED for ${jobTitle}!`, 'success');
        
        // Add success animation
        card.classList.add('hired');
        card.style.borderLeftColor = '#10b981';
        
        // Update judgment summary
        updateJudgmentSummary();
        
    }, 1000);
}

function markAsNotSuitable(card, jobTitle, candidate, reason) {
    // Show loading state
    const actionButtons = card.querySelectorAll('.judgment-btn');
    actionButtons.forEach(btn => btn.disabled = true);
    
    // Simulate API call
    setTimeout(() => {
        // Update status badge
        const statusBadge = card.querySelector('.bg-green-100');
        if (statusBadge) {
            statusBadge.className = 'bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
            statusBadge.textContent = 'Not Suitable';
        }
        
        // Disable action buttons
        actionButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });
        
        // Show success notification
        showNotification(`${candidate} marked as Not Suitable for ${jobTitle}`, 'info');
        
        // Add decline animation
        card.classList.add('not-suitable');
        card.style.borderLeftColor = '#ef4444';
        
        // Update judgment summary
        updateJudgmentSummary();
        
    }, 1000);
}

function showNotSuitableModal(jobTitle, candidate, card) {
    // Create modal HTML
    const modalHTML = `
        <div id="not-suitable-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Mark as Not Suitable</h3>
                    <button id="close-not-suitable-modal" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="text-sm text-gray-600 mb-4">
                    Mark <strong>${candidate}</strong> as Not Suitable for <strong>${jobTitle}</strong>
                </p>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Reason for MSL (Required)</label>
                        <select id="not-suitable-reason" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select a reason...</option>
                            <option value="technical-skills">Insufficient Technical Skills</option>
                            <option value="experience">Lack of Required Experience</option>
                            <option value="communication">Poor Communication Skills</option>
                            <option value="cultural-fit">Not a Good Cultural Fit</option>
                            <option value="salary-expectations">Salary Expectations Too High</option>
                            <option value="availability">Availability Issues</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                        <textarea id="not-suitable-comments" rows="3" placeholder="Provide additional details for MSL..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 mt-6">
                    <button id="cancel-not-suitable" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
                    <button id="confirm-not-suitable" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Mark as Not Suitable</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    const modal = document.getElementById('not-suitable-modal');
    const closeBtn = document.getElementById('close-not-suitable-modal');
    const cancelBtn = document.getElementById('cancel-not-suitable');
    const confirmBtn = document.getElementById('confirm-not-suitable');
    
    function closeModal() {
        modal.remove();
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    confirmBtn.addEventListener('click', () => {
        const reason = document.getElementById('not-suitable-reason').value;
        const comments = document.getElementById('not-suitable-comments').value;
        
        if (!reason) {
            showNotification('Please select a reason', 'error');
            return;
        }
        
        const fullReason = reason === 'other' ? comments : reason;
        markAsNotSuitable(card, jobTitle, candidate, fullReason);
        closeModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function updateJudgmentSummary() {
    const scheduledCount = document.querySelectorAll('#today-interviews .bg-green-100').length;
    const hiredCount = document.querySelectorAll('#today-interviews .bg-blue-100').length;
    const notSuitableCount = document.querySelectorAll('#today-interviews .bg-red-100').length;
    const pendingCount = scheduledCount - hiredCount - notSuitableCount;
    
    // Update summary cards
    const summaryCards = document.querySelectorAll('#scheduled-today-content .text-2xl');
    if (summaryCards.length >= 4) {
        summaryCards[0].textContent = scheduledCount;
        summaryCards[1].textContent = hiredCount;
        summaryCards[2].textContent = notSuitableCount;
        summaryCards[3].textContent = pendingCount;
    }
    
    // Update today's count
    const todayCount = document.getElementById('today-count');
    if (todayCount) {
        todayCount.textContent = scheduledCount;
    }
}

// Initialize Today's Date
function initializeTodayDate() {
    const todayDateElement = document.getElementById('today-date');
    if (todayDateElement) {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        todayDateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Export functions for global access
window.ClientMSLAlerts = {
    showNotification,
    handleInterviewAction,
    handleJudgmentAction,
    updateTimeAgo,
    filterInterviewCards,
    updateJudgmentSummary,
    initializeTodayDate
};
