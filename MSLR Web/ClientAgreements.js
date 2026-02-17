// Client Agreements Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeProfileDropdown();
    initializeTabNavigation();
    initializeAgreementActions();
    initializeResponsiveBehavior();
    initializeAnimations();
    initializeSearchFunctionality();
    initializeTooltips();
    initializeKeyboardShortcuts();
    
    console.log('Client Agreements page loaded successfully');
});

// Profile Dropdown Functionality
function initializeProfileDropdown() {
    const profileBtn = document.getElementById('profile-dropdown-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (profileBtn && profileDropdown) {
        // Toggle dropdown on click
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
            profileDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
                profileDropdown.classList.remove('show');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileDropdown.classList.add('hidden');
                profileDropdown.classList.remove('show');
            }
        });
    }
}

// Tab Navigation Functionality
function initializeTabNavigation() {
    const currentAgreementTab = document.getElementById('current-agreement-tab');
    const jobAgreementsTab = document.getElementById('job-agreements-tab');
    const currentAgreementContent = document.getElementById('current-agreement-content');
    const jobAgreementsContent = document.getElementById('job-agreements-content');
    
    if (currentAgreementTab && jobAgreementsTab) {
        // Current Agreement Tab
        currentAgreementTab.addEventListener('click', function() {
            // Update tab states
            currentAgreementTab.classList.add('active');
            jobAgreementsTab.classList.remove('active');
            
            // Update content visibility
            currentAgreementContent.classList.add('active');
            jobAgreementsContent.classList.remove('active');
            
            // Update border colors
            currentAgreementTab.classList.add('border-blue-500', 'text-blue-600');
            currentAgreementTab.classList.remove('border-transparent', 'text-gray-500');
            jobAgreementsTab.classList.remove('border-blue-500', 'text-blue-600');
            jobAgreementsTab.classList.add('border-transparent', 'text-gray-500');
        });
        
        // Job Agreements Tab
        jobAgreementsTab.addEventListener('click', function() {
            // Update tab states
            jobAgreementsTab.classList.add('active');
            currentAgreementTab.classList.remove('active');
            
            // Update content visibility
            jobAgreementsContent.classList.add('active');
            currentAgreementContent.classList.remove('active');
            
            // Update border colors
            jobAgreementsTab.classList.add('border-blue-500', 'text-blue-600');
            jobAgreementsTab.classList.remove('border-transparent', 'text-gray-500');
            currentAgreementTab.classList.remove('border-blue-500', 'text-blue-600');
            currentAgreementTab.classList.add('border-transparent', 'text-gray-500');
        });
    }
}

// Agreement Action Buttons
function initializeAgreementActions() {
    // Renew Agreement button
    const renewBtn = document.querySelector('button:contains("Renew Agreement")');
    if (renewBtn) {
        renewBtn.addEventListener('click', function() {
            showNotification('Opening agreement renewal form...', 'info');
            // Simulate form opening
            setTimeout(() => {
                showNotification('Agreement renewal form opened!', 'success');
            }, 1000);
        });
    }
    
    // New Agreement button
    const newAgreementBtn = document.querySelector('button:contains("New Agreement")');
    if (newAgreementBtn) {
        newAgreementBtn.addEventListener('click', function() {
            showNotification('Creating new job agreement...', 'info');
            // Simulate agreement creation
            setTimeout(() => {
                showNotification('New job agreement created successfully!', 'success');
            }, 1500);
        });
    }
    
    // Table action buttons
    const tableActionBtns = document.querySelectorAll('tbody button');
    tableActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').classList.contains('fa-eye') ? 'view' : 'download';
            const row = this.closest('tr');
            const jobTitle = row.querySelector('td:first-child').textContent;
            handleTableAction(action, jobTitle);
        });
    });
}

// Handle table action buttons
function handleTableAction(action, jobTitle) {
    switch(action) {
        case 'view':
            showNotification(`Viewing agreement for ${jobTitle}`, 'info');
            break;
        case 'download':
            showNotification(`Downloading agreement for ${jobTitle}`, 'info');
            setTimeout(() => {
                showNotification(`Agreement for ${jobTitle} downloaded successfully!`, 'success');
            }, 1500);
            break;
    }
}

// Responsive Behavior
function initializeResponsiveBehavior() {
    // Handle window resize
    window.addEventListener('resize', function() {
        adjustLayoutForScreenSize();
    });
    
    // Initial adjustment
    adjustLayoutForScreenSize();
}

function adjustLayoutForScreenSize() {
    const width = window.innerWidth;
    const sidebar = document.querySelector('.lg\\:w-1\\/3');
    const content = document.querySelector('.lg\\:w-2\\/3');
    
    if (width <= 768) {
        // Mobile layout
        if (sidebar) sidebar.classList.add('hidden');
        if (content) content.classList.remove('lg:ml-auto');
    } else {
        // Desktop layout
        if (sidebar) sidebar.classList.remove('hidden');
        if (content) content.classList.add('lg:ml-auto');
    }
}

// Animation System
function initializeAnimations() {
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.bg-white, .bg-gray-50, .bg-blue-50, .bg-green-50');
    
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
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Add hover animations to cards
    const cards = document.querySelectorAll('.bg-white, .bg-gray-50');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Search Functionality
function initializeSearchFunctionality() {
    const searchInput = document.querySelector('input[placeholder*="Title, skill or company"]');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterAgreements(searchTerm);
        });
        
        // Add search icon click functionality
        const searchIcon = searchInput.previousElementSibling;
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                searchInput.focus();
            });
        }
    }
}

function filterAgreements(searchTerm) {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
            row.classList.add('fade-in');
        } else {
            row.style.display = 'none';
        }
    });
    
    // Show/hide empty state
    const visibleRows = Array.from(tableRows).filter(row => row.style.display !== 'none');
    const emptyState = document.querySelector('.empty-state');
    
    if (visibleRows.length === 0 && searchTerm) {
        showEmptyState('No agreements found matching your search.');
    } else if (emptyState) {
        emptyState.style.display = 'none';
    }
}

// Tooltip System
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.classList.add('show'), 100);
    
    // Store reference for removal
    element.tooltip = tooltip;
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.classList.remove('show');
        setTimeout(() => tooltip.remove(), 200);
    });
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder*="Title, skill or company"]');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Tab 1 for Current Agreement tab
        if (e.key === '1' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const currentAgreementTab = document.getElementById('current-agreement-tab');
            if (currentAgreementTab) currentAgreementTab.click();
        }
        
        // Tab 2 for Job Agreements tab
        if (e.key === '2' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const jobAgreementsTab = document.getElementById('job-agreements-tab');
            if (jobAgreementsTab) jobAgreementsTab.click();
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    // Set notification content and styling based on type
    switch(type) {
        case 'success':
            notification.className += ' bg-green-500 text-white';
            notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
            break;
        case 'error':
            notification.className += ' bg-red-500 text-white';
            notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
            break;
        case 'warning':
            notification.className += ' bg-yellow-500 text-white';
            notification.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${message}`;
            break;
        default:
            notification.className += ' bg-blue-500 text-white';
            notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    }
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.className = 'ml-3 text-white hover:text-gray-200';
    closeBtn.onclick = () => notification.remove();
    notification.appendChild(closeBtn);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Empty State Management
function showEmptyState(message) {
    let emptyState = document.querySelector('.empty-state');
    
    if (!emptyState) {
        emptyState = document.createElement('div');
        emptyState.className = 'empty-state bg-white p-8 rounded-lg text-center';
        emptyState.innerHTML = `
            <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
            <p class="text-gray-600 text-lg">${message}</p>
        `;
        
        const tableContainer = document.querySelector('.bg-gray-50.rounded-lg');
        if (tableContainer) {
            tableContainer.appendChild(emptyState);
        }
    } else {
        emptyState.querySelector('p').textContent = message;
        emptyState.style.display = 'block';
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced table row interactions
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        // Add click to select functionality
        row.addEventListener('click', function(e) {
            if (!e.target.closest('button')) {
                // Remove selection from other rows
                tableRows.forEach(r => r.classList.remove('bg-blue-50', 'border-blue-200'));
                // Add selection to current row
                this.classList.add('bg-blue-50', 'border-blue-200');
            }
        });
        
        // Add double-click to view agreement
        row.addEventListener('dblclick', function() {
            const jobTitle = this.querySelector('td:first-child').textContent;
            showNotification(`Opening agreement for ${jobTitle} for detailed view`, 'info');
        });
    });
});

// Initialize additional features after page load
window.addEventListener('load', function() {
    // Add loading states to buttons
    const actionButtons = document.querySelectorAll('button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.disabled = true;
                
                // Remove loading state after action completes
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});




