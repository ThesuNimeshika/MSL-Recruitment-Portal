// Seeker Document Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeProfileDropdown();
    initializeDocumentUploads();
    initializeResumeManagement();
    initializeProgressBar();
    initializeNotifications();
    initializeResponsiveBehavior();
    initializeKeyboardShortcuts();
    initializeTooltips();
});

// Profile Dropdown Functionality
function initializeProfileDropdown() {
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
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                profileDropdown.classList.add('hidden');
            }
        });
    }
}

// Document Upload Functionality
function initializeDocumentUploads() {
    const uploadButtons = document.querySelectorAll('button');
    
    uploadButtons.forEach(button => {
        if (button.textContent.includes('Upload') || button.textContent.includes('Replace')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleDocumentUpload(this);
            });
        }
    });
}

function handleDocumentUpload(button) {
    const documentCard = button.closest('.flex.items-center.justify-between');
    const documentName = documentCard.querySelector('h3').textContent;
    
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            uploadDocument(file, documentName, documentCard);
        }
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

function uploadDocument(file, documentName, documentCard) {
    // Show loading state
    const button = documentCard.querySelector('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    button.disabled = true;
    button.classList.add('loading');
    
    // Simulate upload process
    setTimeout(() => {
        // Update document status
        updateDocumentStatus(documentCard, 'uploaded');
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove('loading');
        
        // Show success notification
        showNotification(`${documentName} uploaded successfully!`, 'success');
        
        // Update progress bar
        updateProgressBar();
        
    }, 2000);
}

function updateDocumentStatus(documentCard, status) {
    const statusText = documentCard.querySelector('p.text-sm.text-gray-600');
    const buttonContainer = documentCard.querySelector('.flex.items-center.space-x-2');
    
    if (status === 'uploaded') {
        statusText.textContent = 'Uploaded';
        
        // Replace upload button with status badge and replace button
        buttonContainer.innerHTML = `
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                <i class="fas fa-check text-xs"></i>
                <span>Uploaded</span>
            </span>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                Replace
            </button>
        `;
        
        // Add event listener to new replace button
        const replaceButton = buttonContainer.querySelector('button');
        replaceButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleDocumentUpload(this);
        });
        
        // Add fade-in animation
        documentCard.classList.add('fade-in');
    }
}

// Resume Management Functionality
function initializeResumeManagement() {
    const uploadResumeBtn = document.getElementById('upload-resume-btn');
    const resumeUploadForm = document.getElementById('resume-upload-form');
    const saveResumeBtn = document.getElementById('save-resume');
    const cancelResumeUploadBtn = document.getElementById('cancel-resume-upload');
    
    if (uploadResumeBtn) {
        uploadResumeBtn.addEventListener('click', function() {
            resumeUploadForm.classList.remove('hidden');
            this.classList.add('hidden');
        });
    }
    
    if (cancelResumeUploadBtn) {
        cancelResumeUploadBtn.addEventListener('click', function() {
            resumeUploadForm.classList.add('hidden');
            uploadResumeBtn.classList.remove('hidden');
            resetResumeForm();
        });
    }
    
    if (saveResumeBtn) {
        saveResumeBtn.addEventListener('click', function() {
            handleResumeUpload();
        });
    }
    
    // Initialize resume version actions
    initializeResumeVersionActions();
}

function initializeResumeVersionActions() {
    // Set as active buttons
    const setActiveButtons = document.querySelectorAll('button[title="Set as Active"]');
    setActiveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resumeCard = this.closest('.bg-white.rounded-lg');
            setResumeAsActive(resumeCard);
        });
    });
    
    // Preview buttons
    const previewButtons = document.querySelectorAll('button[title="Preview"]');
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resumeCard = this.closest('.bg-white.rounded-lg');
            showResumePreview(resumeCard);
        });
    });
    
    // Download buttons
    const downloadButtons = document.querySelectorAll('button[title="Download"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resumeCard = this.closest('.bg-white.rounded-lg');
            downloadResume(resumeCard);
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('button[title="Delete"]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resumeCard = this.closest('.bg-white.rounded-lg');
            deleteResume(resumeCard);
        });
    });
}

function setResumeAsActive(resumeCard) {
    // Remove active status from all resumes
    const allResumes = document.querySelectorAll('.bg-white.rounded-lg');
    allResumes.forEach(resume => {
        resume.classList.remove('border-2', 'border-blue-500');
        resume.classList.add('border', 'border-gray-200');
        
        // Update active badge
        const activeBadge = resume.querySelector('.bg-blue-100');
        if (activeBadge) {
            activeBadge.remove();
        }
        
        // Add set as active button if not present
        const buttonContainer = resume.querySelector('.flex.items-center.space-x-2');
        const setActiveBtn = buttonContainer.querySelector('button[title="Set as Active"]');
        if (!setActiveBtn) {
            const newSetActiveBtn = document.createElement('button');
            newSetActiveBtn.className = 'text-blue-600 hover:text-blue-800 p-1';
            newSetActiveBtn.title = 'Set as Active';
            newSetActiveBtn.innerHTML = '<i class="fas fa-star"></i>';
            newSetActiveBtn.addEventListener('click', function() {
                setResumeAsActive(resume);
            });
            buttonContainer.insertBefore(newSetActiveBtn, buttonContainer.firstChild);
        }
    });
    
    // Set this resume as active
    resumeCard.classList.remove('border', 'border-gray-200');
    resumeCard.classList.add('border-2', 'border-blue-500');
    
    // Replace set as active button with active badge
    const buttonContainer = resumeCard.querySelector('.flex.items-center.space-x-2');
    const setActiveBtn = buttonContainer.querySelector('button[title="Set as Active"]');
    if (setActiveBtn) {
        setActiveBtn.remove();
    }
    
    const activeBadge = document.createElement('span');
    activeBadge.className = 'bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium';
    activeBadge.textContent = 'Active';
    buttonContainer.insertBefore(activeBadge, buttonContainer.firstChild);
    
    showNotification('Resume set as active successfully!', 'success');
}

function showResumePreview(resumeCard) {
    const resumeTitle = resumeCard.querySelector('h4').textContent;
    const resumeInfo = resumeCard.querySelector('p.text-xs.text-gray-500').textContent;
    
    const modal = document.getElementById('resume-preview-modal');
    const title = document.getElementById('resume-preview-title');
    const info = document.getElementById('resume-preview-info');
    
    title.textContent = resumeTitle;
    info.textContent = resumeInfo;
    modal.classList.remove('hidden');
    
    // Close modal functionality
    const closeBtn = document.getElementById('close-resume-preview');
    closeBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

function downloadResume(resumeCard) {
    const resumeTitle = resumeCard.querySelector('h4').textContent;
    showNotification(`Downloading ${resumeTitle}...`, 'info');
    
    // Simulate download
    setTimeout(() => {
        showNotification(`${resumeTitle} downloaded successfully!`, 'success');
    }, 1500);
}

function deleteResume(resumeCard) {
    const resumeTitle = resumeCard.querySelector('h4').textContent;
    
    if (confirm(`Are you sure you want to delete ${resumeTitle}?`)) {
        // Check if it's the active resume
        const isActive = resumeCard.classList.contains('border-2') && resumeCard.classList.contains('border-blue-500');
        
        if (isActive) {
            showNotification('Cannot delete active resume. Please set another resume as active first.', 'error');
            return;
        }
        
        // Remove the resume card with animation
        resumeCard.style.transition = 'all 0.3s ease';
        resumeCard.style.transform = 'scale(0.8)';
        resumeCard.style.opacity = '0';
        
        setTimeout(() => {
            resumeCard.remove();
            showNotification(`${resumeTitle} deleted successfully!`, 'success');
        }, 300);
    }
}

function handleResumeUpload() {
    const versionName = document.getElementById('resume-version-name').value.trim();
    const fileInput = document.getElementById('resume-file');
    const setAsActive = document.getElementById('set-as-active').checked;
    
    if (!versionName) {
        showNotification('Please enter a version name', 'error');
        return;
    }
    
    if (!fileInput.files[0]) {
        showNotification('Please select a file to upload', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        return;
    }
    
    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
        showNotification('Only PDF, DOC, and DOCX files are allowed', 'error');
        return;
    }
    
    // Show loading state
    const saveBtn = document.getElementById('save-resume');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    saveBtn.disabled = true;
    
    // Simulate upload process
    setTimeout(() => {
        // Create new resume version
        createNewResumeVersion(versionName, file, setAsActive);
        
        // Reset form and hide
        resetResumeForm();
        document.getElementById('resume-upload-form').classList.add('hidden');
        document.getElementById('upload-resume-btn').classList.remove('hidden');
        
        // Reset button
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        
        showNotification('Resume uploaded successfully!', 'success');
    }, 2000);
}

function createNewResumeVersion(versionName, file, setAsActive) {
    const resumeVersionsContainer = document.querySelector('.space-y-3');
    const currentDate = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    const fileSize = (file.size / (1024 * 1024)).toFixed(1);
    
    // If setting as active, remove active status from current active resume
    if (setAsActive) {
        const activeResume = document.querySelector('.border-2.border-blue-500');
        if (activeResume) {
            activeResume.classList.remove('border-2', 'border-blue-500');
            activeResume.classList.add('border', 'border-gray-200');
            
            // Replace active badge with set as active button
            const buttonContainer = activeResume.querySelector('.flex.items-center.space-x-2');
            const activeBadge = buttonContainer.querySelector('.bg-blue-100');
            if (activeBadge) {
                activeBadge.remove();
            }
            
            const setActiveBtn = document.createElement('button');
            setActiveBtn.className = 'text-yellow-600 hover:text-yellow-800 p-1';
            setActiveBtn.title = 'Set as Active';
            setActiveBtn.innerHTML = '<i class="fas fa-star"></i>';
            setActiveBtn.addEventListener('click', function() {
                setResumeAsActive(activeResume);
            });
            buttonContainer.insertBefore(setActiveBtn, buttonContainer.firstChild);
        }
    }
    
    // Create new resume card
    const newResumeCard = document.createElement('div');
    newResumeCard.className = setAsActive ? 
        'bg-white rounded-lg border-2 border-blue-500 p-3' : 
        'bg-white rounded-lg border border-gray-200 p-3';
    
    newResumeCard.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 ${setAsActive ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg flex items-center justify-center">
                    <i class="fas fa-file-pdf ${setAsActive ? 'text-blue-600' : 'text-gray-600'}"></i>
                </div>
                <div>
                    <h4 class="font-medium text-gray-900">${versionName}.pdf</h4>
                    <p class="text-xs text-gray-500">Uploaded: ${currentDate} • ${fileSize} MB</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                ${setAsActive ? 
                    '<span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">Active</span>' :
                    '<button class="text-yellow-600 hover:text-yellow-800 p-1" title="Set as Active"><i class="fas fa-star"></i></button>'
                }
                <button class="text-blue-600 hover:text-blue-800 p-1" title="Preview"><i class="fas fa-eye"></i></button>
                <button class="text-gray-600 hover:text-gray-800 p-1" title="Download"><i class="fas fa-download"></i></button>
                <button class="text-red-600 hover:text-red-800 p-1" title="Delete"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
    
    // Add event listeners to new buttons
    const setActiveBtn = newResumeCard.querySelector('button[title="Set as Active"]');
    if (setActiveBtn) {
        setActiveBtn.addEventListener('click', function() {
            setResumeAsActive(newResumeCard);
        });
    }
    
    const previewBtn = newResumeCard.querySelector('button[title="Preview"]');
    previewBtn.addEventListener('click', function() {
        showResumePreview(newResumeCard);
    });
    
    const downloadBtn = newResumeCard.querySelector('button[title="Download"]');
    downloadBtn.addEventListener('click', function() {
        downloadResume(newResumeCard);
    });
    
    const deleteBtn = newResumeCard.querySelector('button[title="Delete"]');
    deleteBtn.addEventListener('click', function() {
        deleteResume(newResumeCard);
    });
    
    // Add to container with animation
    newResumeCard.style.opacity = '0';
    newResumeCard.style.transform = 'translateY(-20px)';
    resumeVersionsContainer.appendChild(newResumeCard);
    
    // Animate in
    setTimeout(() => {
        newResumeCard.style.transition = 'all 0.3s ease';
        newResumeCard.style.opacity = '1';
        newResumeCard.style.transform = 'translateY(0)';
    }, 100);
}

function resetResumeForm() {
    document.getElementById('resume-version-name').value = '';
    document.getElementById('resume-file').value = '';
    document.getElementById('set-as-active').checked = false;
}

// Progress Bar Functionality
function initializeProgressBar() {
    updateProgressBar();
}

function updateProgressBar() {
    const uploadedDocs = document.querySelectorAll('p.text-sm.text-gray-600');
    let uploadedCount = 0;
    let totalCount = uploadedDocs.length;
    
    uploadedDocs.forEach(doc => {
        if (doc.textContent === 'Uploaded') {
            uploadedCount++;
        }
    });
    
    const progressBar = document.querySelector('.bg-blue-600.h-2.rounded-full');
    const progressText = document.querySelector('.text-sm.text-gray-600');
    
    if (progressBar && progressText) {
        const percentage = (uploadedCount / totalCount) * 100;
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${uploadedCount}/${totalCount} documents uploaded`;
    }
}

// Notification System
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(notificationContainer);
    }
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    
    const bgColor = type === 'success' ? 'bg-green-500' : 
                   type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `notification ${bgColor} text-white p-4 rounded-lg shadow-lg mb-2 transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Responsive Behavior
function initializeResponsiveBehavior() {
    // Handle window resize
    window.addEventListener('resize', function() {
        handleResponsiveLayout();
    });
    
    // Initial call
    handleResponsiveLayout();
}

function handleResponsiveLayout() {
    const isMobile = window.innerWidth <= 768;
    const sidebar = document.querySelector('.w-full.lg\\:w-1\\/3');
    const content = document.querySelector('.w-full.lg\\:w-2\\/3');
    
    if (isMobile) {
        // Mobile layout adjustments
        if (sidebar) {
            sidebar.classList.remove('lg:fixed', 'lg:left-0', 'lg:top-14', 'lg:h-full', 'lg:overflow-y-auto');
        }
        if (content) {
            content.classList.remove('lg:ml-auto');
        }
    } else {
        // Desktop layout
        if (sidebar) {
            sidebar.classList.add('lg:fixed', 'lg:left-0', 'lg:top-14', 'lg:h-full', 'lg:overflow-y-auto');
        }
        if (content) {
            content.classList.add('lg:ml-auto');
        }
    }
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + U to focus on upload area
        if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
            e.preventDefault();
            const firstUploadButton = document.querySelector('button:contains("Upload")');
            if (firstUploadButton) {
                firstUploadButton.focus();
            }
        }
        
        // Escape to close dropdowns
        if (e.key === 'Escape') {
            const dropdowns = document.querySelectorAll('.absolute');
            dropdowns.forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        }
    });
}

// Tooltips
function initializeTooltips() {
    const buttons = document.querySelectorAll('button[title]');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            showTooltip(e.target, e.target.getAttribute('title'));
        });
        
        button.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// File Validation
function validateFile(file) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        showNotification('Please upload a valid file type (PDF, DOC, DOCX, JPG, PNG)', 'error');
        return false;
    }
    
    if (file.size > maxSize) {
        showNotification('File size must be less than 5MB', 'error');
        return false;
    }
    
    return true;
}

// Document Preview (for image files)
function createDocumentPreview(file, documentCard) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.createElement('img');
            preview.src = e.target.result;
            preview.className = 'document-preview mt-2';
            preview.style.maxWidth = '200px';
            preview.style.height = 'auto';
            
            const existingPreview = documentCard.querySelector('.document-preview');
            if (existingPreview) {
                existingPreview.remove();
            }
            
            documentCard.appendChild(preview);
        };
        reader.readAsDataURL(file);
    }
}

// Skip Upload Functionality
function skipDocumentUpload(documentName) {
    showNotification(`Skipped uploading ${documentName}`, 'info');
    updateProgressBar();
}

// Export functions for global access
window.SeekerDocument = {
    uploadDocument,
    skipDocumentUpload,
    showNotification,
    updateProgressBar
};

// Add fade-in animation to document cards on page load
document.addEventListener('DOMContentLoaded', function() {
    const documentCards = document.querySelectorAll('.flex.items-center.justify-between');
    documentCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
});

// Handle document card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const documentCards = document.querySelectorAll('.flex.items-center.justify-between');
    
    documentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Progress bar animation
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.bg-blue-600.h-2.rounded-full');
    if (progressBar) {
        progressBar.classList.add('progress-bar');
    }
});

// Handle file drag and drop (if needed in future)
function initializeDragAndDrop() {
    const documentCards = document.querySelectorAll('.flex.items-center.justify-between');
    
    documentCards.forEach(card => {
        card.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        card.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        card.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const documentName = this.querySelector('h3').textContent;
                uploadDocument(file, documentName, this);
            }
        });
    });
}

// Initialize drag and drop if needed
// initializeDragAndDrop();

