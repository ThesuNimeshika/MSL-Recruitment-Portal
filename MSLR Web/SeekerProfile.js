// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Profile dropdown functionality
    const profileBtn = document.getElementById('profile-dropdown-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    // Contact Info Modal
    const contactInfoLink = document.getElementById('contact-info-link');
    const contactModal = document.getElementById('contact-modal');
    const closeContactModal = document.getElementById('close-contact-modal');
    const saveContact = document.getElementById('save-contact');

    if (contactInfoLink && contactModal) {
        contactInfoLink.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(contactModal);
        });
    }

    if (closeContactModal) {
        closeContactModal.addEventListener('click', function () {
            closeModal(contactModal);
        });
    }

    if (saveContact) {
        saveContact.addEventListener('click', function () {
            // Here you would typically save the contact info
            console.log('Contact info saved');
            closeModal(contactModal);
            showNotification('Contact information saved successfully!');
        });
    }

    // Edit Intro Modal
    const editIntroBtn = document.getElementById('edit-intro-btn');
    const editIntroModal = document.getElementById('edit-intro-modal');
    const closeIntroModal = document.getElementById('close-intro-modal');
    const saveIntro = document.getElementById('save-intro');

    if (editIntroBtn && editIntroModal) {
        editIntroBtn.addEventListener('click', function () {
            openModal(editIntroModal);
        });
    }

    if (closeIntroModal) {
        closeIntroModal.addEventListener('click', function () {
            closeModal(editIntroModal);
        });
    }

    if (saveIntro) {
        saveIntro.addEventListener('click', function () {
            const positionInput = editIntroModal.querySelector('input[type="text"]');
            if (positionInput) {
                // Update the current position in the UI
                const currentPositionElement = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200.mb-6.p-6 h4');
                if (currentPositionElement) {
                    currentPositionElement.textContent = positionInput.value;
                }
            }
            closeModal(editIntroModal);
            showNotification('Current position updated successfully!');
        });
    }

    // Edit About Modal
    const editAboutBtn = document.getElementById('edit-about-btn');
    const editAboutModal = document.getElementById('edit-about-modal');
    const closeAboutModal = document.getElementById('close-about-modal');
    const saveAbout = document.getElementById('save-about');

    if (editAboutBtn && editAboutModal) {
        editAboutBtn.addEventListener('click', function () {
            openModal(editAboutModal);
        });
    }

    if (closeAboutModal) {
        closeAboutModal.addEventListener('click', function () {
            closeModal(editAboutModal);
        });
    }

    if (saveAbout) {
        saveAbout.addEventListener('click', function () {
            const aboutTextarea = editAboutModal.querySelector('textarea');
            if (aboutTextarea) {
                // Update the about section in the UI
                const aboutElement = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200.mb-6.p-6 p.text-gray-700');
                if (aboutElement) {
                    aboutElement.innerHTML = aboutTextarea.value.replace(/\n/g, '<br>');
                }
            }
            closeModal(editAboutModal);
            showNotification('About section updated successfully!');
        });
    }

    // Edit Skills Modal
    const editSkillsBtn = document.getElementById('edit-skills-btn');
    const editSkillsModal = document.getElementById('edit-skills-modal');
    const closeSkillsModal = document.getElementById('close-skills-modal');
    const saveSkills = document.getElementById('save-skills');

    if (editSkillsBtn && editSkillsModal) {
        editSkillsBtn.addEventListener('click', function () {
            openModal(editSkillsModal);
        });
    }

    if (closeSkillsModal) {
        closeSkillsModal.addEventListener('click', function () {
            closeModal(editSkillsModal);
        });
    }

    if (saveSkills) {
        saveSkills.addEventListener('click', function () {
            // Logic to save skills if needed
            closeModal(editSkillsModal);
            showNotification('Skills updated successfully!');
        });
    }

    // Save Personal Details (including Bio)
    const savePersonalDetailsBtn = document.getElementById('save-personal-details');

    if (savePersonalDetailsBtn) {
        savePersonalDetailsBtn.addEventListener('click', function () {
            // Get values
            const firstNameInput = document.querySelector('input[value="Thesara"]');
            const lastNameInput = document.querySelector('input[value="Kariyawasam"]');
            const bioInput = document.getElementById('personal-bio');
            const countryInput = document.getElementById('personal-country');
            const cityInput = document.getElementById('personal-city');

            const firstName = firstNameInput?.value;
            const lastName = lastNameInput?.value;
            const bio = bioInput?.value;
            const country = countryInput?.value;
            const city = cityInput?.value;

            // Update header info
            const headerName = document.querySelector('h1.text-2xl.font-bold.text-gray-900');
            if (headerName && firstName && lastName) {
                headerName.textContent = `${firstName} ${lastName}`;
            }

            const headerPosition = document.getElementById('header-position');
            if (headerPosition && bio) {
                // Determine position from bio (first line)
                const bioLines = bio.split('\n');
                if (bioLines.length > 0) {
                    headerPosition.textContent = bioLines[0];
                }
            }

            const headerLocation = document.getElementById('header-location');
            if (headerLocation && city && country) {
                headerLocation.textContent = `${city}, Southern Province, ${country}`;
            }

            showNotification('Personal details saved successfully!');
        });
    }

    // Character count for about textarea
    const aboutTextarea = document.querySelector('#edit-about-modal textarea');
    if (aboutTextarea) {
        aboutTextarea.addEventListener('input', function () {
            const maxLength = 2600;
            const currentLength = this.value.length;
            const characterCount = this.parentElement.querySelector('.text-right span');

            if (characterCount) {
                characterCount.textContent = `${currentLength}/${maxLength}`;

                // Update color based on character count
                characterCount.classList.remove('warning', 'danger');
                if (currentLength > maxLength * 0.8) {
                    characterCount.classList.add('warning');
                }
                if (currentLength > maxLength * 0.95) {
                    characterCount.classList.add('danger');
                }
            }
        });
    }

    // Suggested skills functionality
    const suggestedSkills = document.querySelectorAll('.suggested-skill');
    suggestedSkills.forEach(skill => {
        skill.addEventListener('click', function () {
            const skillText = this.querySelector('span').textContent;
            addSkillToProfile(skillText);
            this.style.display = 'none';
        });
    });



    // Close modals with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.fixed:not(.hidden)');
            openModals.forEach(modal => {
                if (modal.id && (modal.id.includes('modal'))) {
                    modal.classList.add('hidden');
                }
            });
        }
    });

    // Add Experience Modal
    const addExperienceBtn = document.getElementById('add-experience-btn');
    const addExperienceModal = document.getElementById('add-experience-modal');
    const closeAddExperienceModal = document.getElementById('close-add-experience-modal');
    const saveExperience = document.getElementById('save-experience');
    const currentlyWorkingCheckbox = document.getElementById('currently-working');
    const endDateContainer = document.getElementById('end-date-container');
    const endCurrentPositionContainer = document.getElementById('end-current-position-container');

    if (addExperienceBtn && addExperienceModal) {
        addExperienceBtn.addEventListener('click', function () {
            openModal(addExperienceModal);
        });
    }

    if (closeAddExperienceModal) {
        closeAddExperienceModal.addEventListener('click', function () {
            closeModal(addExperienceModal);
        });
    }

    if (currentlyWorkingCheckbox) {
        currentlyWorkingCheckbox.addEventListener('change', function () {
            if (this.checked) {
                if (endDateContainer) endDateContainer.classList.add('hidden');
                if (endCurrentPositionContainer) endCurrentPositionContainer.classList.remove('hidden');
            } else {
                if (endDateContainer) endDateContainer.classList.remove('hidden');
                if (endCurrentPositionContainer) endCurrentPositionContainer.classList.add('hidden');
            }
        });
    }

    if (saveExperience) {
        saveExperience.addEventListener('click', function () {
            // Here you would typically save the experience
            console.log('Experience saved');
            closeModal(addExperienceModal);
            showNotification('Experience added successfully!');
        });
    }

    // Add Education Modal
    const addEducationBtn = document.getElementById('add-education-btn');
    const addEducationModal = document.getElementById('add-education-modal');
    const closeAddEducationModal = document.getElementById('close-add-education-modal');
    const saveEducation = document.getElementById('save-education');

    if (addEducationBtn && addEducationModal) {
        addEducationBtn.addEventListener('click', function () {
            openModal(addEducationModal);
        });
    }

    if (closeAddEducationModal) {
        closeAddEducationModal.addEventListener('click', function () {
            closeModal(addEducationModal);
        });
    }

    if (saveEducation) {
        saveEducation.addEventListener('click', function () {
            // Here you would typically save the education
            console.log('Education saved');
            closeModal(addEducationModal);
            showNotification('Education added successfully!');
        });
    }

    // Add hover effects to experience cards
    const experienceCards = document.querySelectorAll('.flex.items-start.space-x-4.mb-6, .flex.items-start.space-x-4');
    experienceCards.forEach(card => {
        card.classList.add('experience-card');
    });

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.bg-blue-100.text-blue-700.px-3.py-2.rounded-full.text-sm');
    skillTags.forEach(tag => {
        tag.classList.add('skill-tag');
    });

    // Add hover effects to edit buttons
    const editButtons = document.querySelectorAll('[id*="edit"]');
    editButtons.forEach(button => {
        button.classList.add('edit-button');
    });

    // Add hover effects to profile action buttons
    const actionButtons = document.querySelectorAll('.bg-blue-600.text-white.px-4.py-2.rounded-md, .bg-white.border.border-gray-300.text-gray-700.px-4.py-2.rounded-md');
    actionButtons.forEach(button => {
        button.classList.add('profile-action-btn');
    });

    // Initialize profile sections with fade-in animation
    const profileSections = document.querySelectorAll('.bg-white.rounded-lg.shadow-sm.border.border-gray-200.mb-6');
    profileSections.forEach((section, index) => {
        section.classList.add('profile-section', 'fade-out');
        setTimeout(() => {
            section.classList.remove('fade-out');
            section.classList.add('fade-in');
        }, index * 100);
    });
});

// Utility Functions

function openModal(modal) {
    if (modal) {
        modal.classList.remove('hidden');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.add('hidden');

        // Restore body scroll
        document.body.style.overflow = 'auto';
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function addSkillToProfile(skillName) {
    const skillsContainer = document.querySelector('.flex.flex-wrap.gap-2');
    if (skillsContainer) {
        const newSkill = document.createElement('span');
        newSkill.className = 'bg-blue-100 text-blue-700 px-3 py-2 rounded-full text-sm skill-tag';
        newSkill.textContent = skillName;

        // Add animation
        newSkill.style.opacity = '0';
        newSkill.style.transform = 'scale(0.8)';

        skillsContainer.appendChild(newSkill);

        // Animate in
        setTimeout(() => {
            newSkill.style.transition = 'all 0.3s ease';
            newSkill.style.opacity = '1';
            newSkill.style.transform = 'scale(1)';
        }, 10);
    }
}

// Form validation
function validateForm(formData) {
    const errors = [];

    // Example validation
    if (formData.get('position') && formData.get('position').trim().length < 2) {
        errors.push('Position must be at least 2 characters long');
    }

    if (formData.get('about') && formData.get('about').trim().length > 2600) {
        errors.push('About section cannot exceed 2600 characters');
    }

    return errors;
}

// Save form data (example)
function saveFormData(formData) {
    // Here you would typically send the data to a server
    console.log('Saving form data:', Object.fromEntries(formData));

    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Data saved successfully' });
        }, 1000);
    });
}

// Handle form submissions
document.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        errors.forEach(error => {
            showNotification(error, 'error');
        });
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
    }

    // Save data
    saveFormData(formData).then(response => {
        if (response.success) {
            showNotification(response.message);
            // Close modal if it's open
            const modal = form.closest('.fixed.bg-black');
            if (modal) {
                closeModal(modal);
            }
        } else {
            showNotification('Error saving data', 'error');
        }
    }).catch(error => {
        console.error('Error:', error);
        showNotification('Error saving data', 'error');
    }).finally(() => {
        // Remove loading state
        if (submitButton) {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    });
});

// Enhanced notification function with types
function showNotification(message, type = 'success') {
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
