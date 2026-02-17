// LinkedIn Jobs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Add event listeners
    addEventListeners();
    
    // Add smooth animations
    addAnimations();
});

function initializePage() {
    // Set default active section
    showSection('landing-page');
    
    // Add loading states
    addLoadingStates();
    
    // Initialize tooltips
    initializeTooltips();
}

function addEventListeners() {
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
    
    // Navigation menu clicks
    const navLinks = document.querySelectorAll('[data-section]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('bg-blue-50', 'text-blue-600'));
            this.classList.add('bg-blue-50', 'text-blue-600');
        });
    });
    
    // Job card interactions
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Dismiss buttons
    const dismissButtons = document.querySelectorAll('.dismiss-btn');
    dismissButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.bg-white');
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    card.remove();
                }, 300);
            }
        });
    });
    
    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Add search functionality here
            console.log('Searching for:', this.value);
        });
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-blue-500');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-blue-500');
        });
    });
    
    // Job search tags
    const searchTags = document.querySelectorAll('.bg-blue-50');
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Simulate search
            const searchText = this.querySelector('span').textContent;
            console.log('Searching for jobs:', searchText);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Post job button
    const postJobBtn = document.querySelector('button:contains("Post a free job")');
    if (postJobBtn) {
        postJobBtn.addEventListener('click', function() {
            alert('Post job functionality would be implemented here');
        });
    }
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('#content-area > div');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('fade-in');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            targetSection.classList.remove('fade-in');
        }, 300);
    }
}

function addLoadingStates() {
    // Add loading state to job cards
    const jobCards = document.querySelectorAll('.flex.items-start.space-x-4');
    jobCards.forEach(card => {
        card.classList.add('job-card');
    });
    
    // Add loading state to dismiss buttons
    const dismissBtns = document.querySelectorAll('.fas.fa-times');
    dismissBtns.forEach(btn => {
        btn.parentElement.classList.add('dismiss-btn');
        btn.parentElement.style.cursor = 'pointer';
    });
}

function initializeTooltips() {
    // Add tooltips to interactive elements
    const tooltipElements = document.querySelectorAll('button, a');
    tooltipElements.forEach(element => {
        if (element.textContent.trim()) {
            element.classList.add('tooltip');
            element.setAttribute('data-tooltip', element.textContent.trim());
        }
    });
}

function addAnimations() {
    // Add staggered animation to job cards
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Add pulse animation to notification badges
    const notificationBadges = document.querySelectorAll('.bg-red-500');
    notificationBadges.forEach(badge => {
        badge.classList.add('notification-badge');
    });
}

// Utility functions
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

// Search functionality with debounce
const debouncedSearch = debounce(function(searchTerm) {
    console.log('Performing search for:', searchTerm);
    // Implement actual search logic here
}, 300);

// Add search event listeners
document.addEventListener('input', function(e) {
    if (e.target.matches('input[placeholder*="Title, skill or company"]')) {
        debouncedSearch(e.target.value);
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close modals or dismiss cards
    if (e.key === 'Escape') {
        const dismissButtons = document.querySelectorAll('.dismiss-btn');
        if (dismissButtons.length > 0) {
            dismissButtons[0].click();
        }
    }
    
    // Enter key to activate focused elements
    if (e.key === 'Enter' && document.activeElement.matches('[data-section]')) {
        document.activeElement.click();
    }
});

// Add smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.bg-white');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Add responsive behavior
function handleResize() {
    const width = window.innerWidth;
    const sidebar = document.querySelector('.w-1/3');
    const content = document.querySelector('.w-2/3');
    
    if (width <= 768) {
        // Mobile layout
        if (sidebar) sidebar.style.position = 'relative';
        if (content) content.style.marginLeft = '0';
    } else {
        // Desktop layout
        if (sidebar) sidebar.style.position = 'fixed';
        if (content) content.style.marginLeft = 'auto';
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// Initialize on load
handleResize();
