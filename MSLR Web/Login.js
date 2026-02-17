// Login Pages JavaScript

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
});

function initializeLoginPage() {
    setupEventListeners();
    setupAnimations();
    checkRememberMe();
}

function setupEventListeners() {
    // Password toggle functionality
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('password-icon');
    
    if (togglePasswordBtn && passwordInput && passwordIcon) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            if (type === 'text') {
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
            } else {
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
            }
        });
    }

    // Form submission
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Input validation for email and password fields
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('blur', validateInput);
        emailInput.addEventListener('input', clearError);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validateInput);
        passwordInput.addEventListener('input', clearError);
    }

    // Forgot password link
    const forgotPasswordLink = document.querySelector('a[href="#"]');
    if (forgotPasswordLink && forgotPasswordLink.textContent.includes('Forgot password')) {
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
    }
}

function setupAnimations() {
    // Add animation classes to elements
    const container = document.querySelector('.max-w-md');
    const card = document.querySelector('.bg-white');
    
    if (container) {
        container.classList.add('login-container');
    }
    
    if (card) {
        card.classList.add('login-card');
    }
}

function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    
    // Remove existing error classes
    input.classList.remove('error', 'success');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Email validation
    if (input.type === 'email') {
        if (value && !isValidEmail(value)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Password validation
    if (input.type === 'password') {
        if (value && value.length < 6) {
            showInputError(input, 'Password must be at least 6 characters');
            return false;
        }
    }
    
    // Show success state if value is provided and valid
    if (value) {
        input.classList.add('success');
    }
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearError(event) {
    const input = event.target;
    input.classList.remove('error');
    
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showInputError(input, message) {
    input.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('remember-me');
    
    // Validate email and password fields
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    let isValid = true;
    
    if (emailInput && !validateInput({ target: emailInput })) {
        isValid = false;
    }
    
    if (passwordInput && !validateInput({ target: passwordInput })) {
        isValid = false;
    }
    
    if (!isValid) {
        showNotification('Please fix the errors above', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Logging in...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simulate login process
    setTimeout(() => {
        // Check credentials (in real app, this would be an API call)
        if (authenticateUser(email, password)) {
            // Save login state
            if (rememberMe) {
                localStorage.setItem('rememberedUser', email);
            }
            
            // Redirect based on login type
            redirectAfterLogin();
        } else {
            showNotification('Invalid email or password', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    }, 2000);
}

function authenticateUser(email, password) {
    // Demo credentials for testing
    const demoCredentials = {
        'admin@msl.lk': 'admin123',
        'user@msl.lk': 'msl123',
        'company@gmail.lk': 'client123',
        'personal@gmail.com': 'seeker123',
        'test@test.com': 'test123'
    };
    
    return demoCredentials[email.toLowerCase()] === password;
}

function redirectAfterLogin() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('MSLLogin')) {
        window.location.href = 'MSLHome.html';
    } else if (currentPage.includes('ClientLogin')) {
        window.location.href = 'ClientHome.html';
    } else if (currentPage.includes('SeekerLogin')) {
        window.location.href = 'SeekerHome.html';
    } else {
        // Default redirect
        window.location.href = 'index.html';
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    
    if (!email) {
        showNotification('Please enter your email first', 'warning');
        return;
    }
    
    showNotification('Password reset instructions sent to your email', 'success');
    
    // In a real app, this would trigger a password reset email
    console.log('Password reset requested for:', email);
}

function checkRememberMe() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        const emailInput = document.getElementById('email');
        const rememberCheckbox = document.getElementById('remember-me');
        
        if (emailInput) {
            emailInput.value = rememberedUser;
        }
        
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg transition-all duration-300 transform translate-x-full max-w-sm`;
    
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
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span class="text-sm">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
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
        if (notification.parentNode) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Enter key on form
    if (event.key === 'Enter' && event.target.tagName !== 'BUTTON') {
        const form = document.querySelector('form');
        if (form) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
    }
    
    // Escape key to close notifications
    if (event.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Auto-focus on email field
window.addEventListener('load', function() {
    const emailInput = document.getElementById('email');
    if (emailInput && !emailInput.value) {
        emailInput.focus();
    }
});

// Form auto-save (for better UX)
function autoSaveForm() {
    const email = document.getElementById('email').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    if (email && rememberMe) {
        sessionStorage.setItem('tempEmail', email);
    }
}

function autoLoadForm() {
    const tempEmail = sessionStorage.getItem('tempEmail');
    if (tempEmail) {
        const emailInput = document.getElementById('email');
        if (emailInput && !emailInput.value) {
            emailInput.value = tempEmail;
        }
    }
}

// Add auto-save listeners
document.addEventListener('DOMContentLoaded', function() {
    autoLoadForm();
    
    const emailInput = document.getElementById('email');
    const rememberCheckbox = document.getElementById('remember-me');
    
    if (emailInput) {
        emailInput.addEventListener('input', autoSaveForm);
    }
    
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('change', autoSaveForm);
    }
});
