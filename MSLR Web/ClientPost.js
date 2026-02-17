// Client Post Job Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeProfileDropdown();
    initializeFormValidation();
    initializeAutoSave();
    initializeCharacterCounters();
    initializeFormSubmission();
    initializeResponsiveBehavior();
    initializeKeyboardShortcuts();
    initializeTooltips();
    initializeNotifications();
    initializeAddOptionButtons();
    
    // Add fade-in animation to form
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

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('job-post-form');
    const requiredFields = ['job-title', 'location', 'job-type', 'job-description', 'requirements'];
    
    // Add validation to required fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                clearFieldError(this);
            });
        }
    });
    
    // Add validation to select fields
    const selectFields = ['field', 'experience-level', 'work-type'];
    selectFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', function() {
                validateSelectField(this);
            });
        }
    });
    
    // Add validation to date field
    const deadlineField = document.getElementById('deadline');
    if (deadlineField) {
        deadlineField.addEventListener('change', function() {
            validateDateField(this);
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error
    clearFieldError(field);
    
    // Check if field is empty
    if (!value) {
        showFieldError(field, `${getFieldLabel(fieldName)} is required`);
        return false;
    }
    
    // Specific validation rules
    switch (fieldName) {
        case 'job-title':
            if (value.length < 3) {
                showFieldError(field, 'Job title must be at least 3 characters long');
                return false;
            }
            break;
        case 'location':
            if (value.length < 2) {
                showFieldError(field, 'Location must be at least 2 characters long');
                return false;
            }
            break;
        case 'salary-range':
            if (value && !/^[A-Z]{3}\s+\d{1,3}(?:,\d{3})*\s*-\s*\d{1,3}(?:,\d{3})*$/.test(value)) {
                showFieldError(field, 'Please enter salary range in format: LKR 150,000 - 200,000');
                return false;
            }
            break;
    }
    
    // Show success state
    showFieldSuccess(field);
    return true;
}

function validateSelectField(field) {
    const value = field.value;
    
    clearFieldError(field);
    
    if (!value) {
        showFieldError(field, `Please select a ${getFieldLabel(field.name)}`);
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

function validateDateField(field) {
    const value = field.value;
    const selectedDate = new Date(value);
    const today = new Date();
    
    clearFieldError(field);
    
    if (!value) {
        showFieldError(field, 'Please select an application deadline');
        return false;
    }
    
    if (selectedDate <= today) {
        showFieldError(field, 'Deadline must be in the future');
        return false;
    }
    
    showFieldSuccess(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    field.parentNode.appendChild(errorDiv);
}

function showFieldSuccess(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        'job-title': 'Job title',
        'location': 'Location',
        'job-type': 'Job type',
        'job-description': 'Job description',
        'requirements': 'Requirements',
        'field': 'Field',
        'salary-range': 'Salary range',
        'experience-level': 'Experience level',
        'work-type': 'Work type',
        'deadline': 'Application deadline'
    };
    return labels[fieldName] || fieldName;
}

// Auto-save functionality
function initializeAutoSave() {
    const form = document.getElementById('job-post-form');
    const formData = {};
    let autoSaveTimer;
    
    // Load saved data on page load
    loadSavedData();
    
    // Add input event listeners for auto-save
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                saveFormData();
            }, 2000); // Save after 2 seconds of inactivity
        });
    });
    
    // Save form data
    function saveFormData() {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        localStorage.setItem('jobPostFormData', JSON.stringify(data));
        showAutoSaveIndicator('saved');
    }
    
    // Load saved data
    function loadSavedData() {
        const savedData = localStorage.getItem('jobPostFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
        }
    }
    
    // Clear saved data after successful submission
    window.clearSavedData = function() {
        localStorage.removeItem('jobPostFormData');
    };
}

function showAutoSaveIndicator(status) {
    // Remove existing indicator
    const existingIndicator = document.querySelector('.auto-save-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Create indicator
    const indicator = document.createElement('div');
    indicator.className = `auto-save-indicator auto-save ${status}`;
    
    const icon = status === 'saving' ? 'fa-spinner fa-spin' : 'fa-check';
    const text = status === 'saving' ? 'Saving...' : 'Saved';
    
    indicator.innerHTML = `<i class="fas ${icon}"></i><span>${text}</span>`;
    
    // Add to form
    const form = document.getElementById('job-post-form');
    form.appendChild(indicator);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.remove();
        }
    }, 3000);
}

// Character counters
function initializeCharacterCounters() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength') || 2000;
        
        // Create character counter
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = `0/${maxLength}`;
        textarea.parentNode.appendChild(counter);
        
        // Update counter on input
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            // Update counter color based on length
            const percentage = (currentLength / maxLength) * 100;
            
            counter.classList.remove('warning', 'error');
            if (percentage >= 90) {
                counter.classList.add('error');
            } else if (percentage >= 75) {
                counter.classList.add('warning');
            }
        });
    });
}

// Form submission
function initializeFormSubmission() {
    const form = document.getElementById('job-post-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = validateAllFields();
        
        if (isValid) {
            submitForm();
        } else {
            showNotification('Please fix the errors in the form', 'error');
            scrollToFirstError();
        }
    });
}

function validateAllFields() {
    const requiredFields = ['job-title', 'location', 'job-type', 'job-description', 'requirements'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate select fields
    const selectFields = ['field', 'experience-level', 'work-type'];
    selectFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !validateSelectField(field)) {
            isValid = false;
        }
    });
    
    // Validate date field
    const deadlineField = document.getElementById('deadline');
    if (deadlineField && !validateDateField(deadlineField)) {
        isValid = false;
    }
    
    return isValid;
}

function submitForm() {
    const form = document.getElementById('job-post-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Posting Job...</span>';
    form.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
        // Clear saved data
        window.clearSavedData();
        
        // Show success message
        showFormSubmittedMessage();
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-plus"></i><span>Post Job</span>';
        form.classList.remove('loading');
        
        // Show notification
        showNotification('Job posted successfully!', 'success');
        
        // Redirect to home page after 2 seconds
        setTimeout(() => {
            window.location.href = 'ClientHome.html';
        }, 2000);
        
    }, 2000);
}

function showFormSubmittedMessage() {
    const form = document.getElementById('job-post-form');
    
    const message = document.createElement('div');
    message.className = 'form-submitted';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Job posted successfully! Redirecting to dashboard...</span>
    `;
    
    form.parentNode.insertBefore(message, form);
}

function scrollToFirstError() {
    const firstError = document.querySelector('.error');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
    }
}

// Responsive behavior
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

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S to save draft
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveFormData();
            showNotification('Draft saved', 'info');
        }
        
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('job-post-form').dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            if (confirm('Are you sure you want to clear the form?')) {
                document.getElementById('job-post-form').reset();
                localStorage.removeItem('jobPostFormData');
                showNotification('Form cleared', 'info');
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

// Notification system
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

// Fade-in animation
function addFadeInAnimation() {
    const form = document.getElementById('job-post-form');
    
    form.style.opacity = '0';
    form.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        form.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        form.style.opacity = '1';
        form.style.transform = 'translateY(0)';
    }, 100);
}

// Form data management
function saveFormData() {
    const form = document.getElementById('job-post-form');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('jobPostFormData', JSON.stringify(data));
    showAutoSaveIndicator('saved');
}

// Job Type Modal Functionality
function initializeAddOptionButtons() {
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        const addJobTypeBtn = document.getElementById('add-job-type-btn');
        console.log('Looking for add-job-type-btn:', addJobTypeBtn);
        
        if (addJobTypeBtn) {
            console.log('Found button, adding click listener');
            addJobTypeBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked!');
                showJobTypeModal();
            };
        } else {
            console.log('Button not found!');
        }
    }, 100);
}

function showJobTypeModal() {
    console.log('showJobTypeModal called');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('job-type-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div id="job-type-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div style="background: white; padding: 24px; border-radius: 8px; width: 90%; max-width: 400px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size: 18px; font-weight: 600; color: #111827;">+ Add New Option</h3>
                    <button onclick="closeJobTypeModal()" style="background: none; border: none; color: #9CA3AF; cursor: pointer; font-size: 18px;">×</button>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Job Type</label>
                    <input type="text" id="new-job-type-input" placeholder="Enter new job type" 
                           style="width: 100%; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px;">
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <button onclick="addNewJobType()" style="background: #2563EB; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">Add</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Focus on input
    const input = document.getElementById('new-job-type-input');
    if (input) {
        input.focus();
        
        // Handle Enter key
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                addNewJobType();
            }
        });
    }
    
    console.log('Modal created and added to page');
}

function closeJobTypeModal() {
    const modal = document.getElementById('job-type-modal');
    if (modal) {
        modal.remove();
    }
}

function addNewJobType() {
    const input = document.getElementById('new-job-type-input');
    const newJobType = input ? input.value.trim() : '';
    
    if (!newJobType) {
        alert('Please enter a job type');
        return;
    }
    
    // Add new option to select
    const select = document.getElementById('job-type');
    if (select) {
        const option = document.createElement('option');
        option.value = newJobType.toLowerCase().replace(/\s+/g, '-');
        option.textContent = newJobType;
        select.appendChild(option);
        
        // Select the new option
        select.value = option.value;
    }
    
    closeJobTypeModal();
    alert('Job type added successfully!');
}

// Field Modal Functions
function showFieldModal() {
    console.log('showFieldModal called');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('field-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div id="field-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div style="background: white; padding: 24px; border-radius: 8px; width: 90%; max-width: 400px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size: 18px; font-weight: 600; color: #111827;">+ Add New Option</h3>
                    <button onclick="closeFieldModal()" style="background: none; border: none; color: #9CA3AF; cursor: pointer; font-size: 18px;">×</button>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Field</label>
                    <input type="text" id="new-field-input" placeholder="Enter new field" 
                           style="width: 100%; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px;">
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <button onclick="addNewField()" style="background: #2563EB; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">Add</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Focus on input
    const input = document.getElementById('new-field-input');
    if (input) {
        input.focus();
        
        // Handle Enter key
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                addNewField();
            }
        });
    }
    
    console.log('Field modal created and added to page');
}

function closeFieldModal() {
    const modal = document.getElementById('field-modal');
    if (modal) {
        modal.remove();
    }
}

function addNewField() {
    const input = document.getElementById('new-field-input');
    const newField = input ? input.value.trim() : '';
    
    if (!newField) {
        alert('Please enter a field');
        return;
    }
    
    // Add new option to select
    const select = document.getElementById('field');
    if (select) {
        const option = document.createElement('option');
        option.value = newField.toLowerCase().replace(/\s+/g, '-');
        option.textContent = newField;
        select.appendChild(option);
        
        // Select the new option
        select.value = option.value;
    }
    
    closeFieldModal();
    alert('Field added successfully!');
}

// Experience Level Modal Functions
function showExperienceLevelModal() {
    console.log('showExperienceLevelModal called');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('experience-level-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div id="experience-level-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div style="background: white; padding: 24px; border-radius: 8px; width: 90%; max-width: 400px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size: 18px; font-weight: 600; color: #111827;">+ Add New Option</h3>
                    <button onclick="closeExperienceLevelModal()" style="background: none; border: none; color: #9CA3AF; cursor: pointer; font-size: 18px;">×</button>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Experience Level</label>
                    <input type="text" id="new-experience-level-input" placeholder="Enter new experience level" 
                           style="width: 100%; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px;">
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <button onclick="addNewExperienceLevel()" style="background: #2563EB; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">Add</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Focus on input
    const input = document.getElementById('new-experience-level-input');
    if (input) {
        input.focus();
        
        // Handle Enter key
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                addNewExperienceLevel();
            }
        });
    }
    
    console.log('Experience Level modal created and added to page');
}

function closeExperienceLevelModal() {
    const modal = document.getElementById('experience-level-modal');
    if (modal) {
        modal.remove();
    }
}

function addNewExperienceLevel() {
    const input = document.getElementById('new-experience-level-input');
    const newExperienceLevel = input ? input.value.trim() : '';
    
    if (!newExperienceLevel) {
        alert('Please enter an experience level');
        return;
    }
    
    // Add new option to select
    const select = document.getElementById('experience-level');
    if (select) {
        const option = document.createElement('option');
        option.value = newExperienceLevel.toLowerCase().replace(/\s+/g, '-');
        option.textContent = newExperienceLevel;
        select.appendChild(option);
        
        // Select the new option
        select.value = option.value;
    }
    
    closeExperienceLevelModal();
    alert('Experience level added successfully!');
}

// Work Type Modal Functions
function showWorkTypeModal() {
    console.log('showWorkTypeModal called');
    
    // Remove any existing modal first
    const existingModal = document.getElementById('work-type-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div id="work-type-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div style="background: white; padding: 24px; border-radius: 8px; width: 90%; max-width: 400px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size: 18px; font-weight: 600; color: #111827;">+ Add New Option</h3>
                    <button onclick="closeWorkTypeModal()" style="background: none; border: none; color: #9CA3AF; cursor: pointer; font-size: 18px;">×</button>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">Work Type</label>
                    <input type="text" id="new-work-type-input" placeholder="Enter new work type" 
                           style="width: 100%; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px;">
                </div>
                <div style="display: flex; justify-content: flex-end;">
                    <button onclick="addNewWorkType()" style="background: #2563EB; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">Add</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Focus on input
    const input = document.getElementById('new-work-type-input');
    if (input) {
        input.focus();
        
        // Handle Enter key
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                addNewWorkType();
            }
        });
    }
    
    console.log('Work Type modal created and added to page');
}

function closeWorkTypeModal() {
    const modal = document.getElementById('work-type-modal');
    if (modal) {
        modal.remove();
    }
}

function addNewWorkType() {
    const input = document.getElementById('new-work-type-input');
    const newWorkType = input ? input.value.trim() : '';
    
    if (!newWorkType) {
        alert('Please enter a work type');
        return;
    }
    
    // Add new option to select
    const select = document.getElementById('work-type');
    if (select) {
        const option = document.createElement('option');
        option.value = newWorkType.toLowerCase().replace(/\s+/g, '-');
        option.textContent = newWorkType;
        select.appendChild(option);
        
        // Select the new option
        select.value = option.value;
    }
    
    closeWorkTypeModal();
    alert('Work type added successfully!');
}

function addOptionToSelect(fieldId, newOption) {
    const select = document.getElementById(fieldId);
    if (select) {
        // Create new option
        const option = document.createElement('option');
        option.value = newOption.toLowerCase().replace(/\s+/g, '-');
        option.textContent = newOption;
        
        // Add option to select
        select.appendChild(option);
        
        // Select the new option
        select.value = option.value;
        
        // Trigger change event
        select.dispatchEvent(new Event('change'));
    }
}

// Export functions for global access
window.ClientPost = {
    validateField,
    submitForm,
    saveFormData,
    showNotification,
    clearSavedData: function() {
        localStorage.removeItem('jobPostFormData');
    },
    showJobTypeModal,
    closeJobTypeModal,
    addNewJobType,
    showFieldModal,
    closeFieldModal,
    addNewField,
    showExperienceLevelModal,
    closeExperienceLevelModal,
    addNewExperienceLevel,
    showWorkTypeModal,
    closeWorkTypeModal,
    addNewWorkType
};

// Make modal functions globally accessible
window.showJobTypeModal = showJobTypeModal;
window.closeJobTypeModal = closeJobTypeModal;
window.addNewJobType = addNewJobType;
window.showFieldModal = showFieldModal;
window.closeFieldModal = closeFieldModal;
window.addNewField = addNewField;
window.showExperienceLevelModal = showExperienceLevelModal;
window.closeExperienceLevelModal = closeExperienceLevelModal;
window.addNewExperienceLevel = addNewExperienceLevel;
window.showWorkTypeModal = showWorkTypeModal;
window.closeWorkTypeModal = closeWorkTypeModal;
window.addNewWorkType = addNewWorkType;
