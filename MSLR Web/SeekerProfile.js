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
    const editContactInfoBtn = document.getElementById('edit-contact-info-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeContactModal = document.getElementById('close-contact-modal');
    const saveContact = document.getElementById('save-contact');

    // Website logic
    const addWebsiteTrigger = document.getElementById('add-website-trigger');
    const websiteInputGroup = document.getElementById('website-input-group');
    const websiteContainer = document.getElementById('website-container');
    const saveWebsiteBtn = document.getElementById('save-website-btn');
    const cancelWebsite = document.getElementById('cancel-website');
    const newWebsiteUrl = document.getElementById('new-website-url');

    if ((contactInfoLink || editContactInfoBtn) && contactModal) {
        const triggers = [contactInfoLink, editContactInfoBtn];
        triggers.forEach(trigger => {
            if (trigger) {
                trigger.addEventListener('click', function (e) {
                    e.preventDefault();
                    openModal(contactModal);
                });
            }
        });
    }

    if (closeContactModal) {
        closeContactModal.addEventListener('click', function () {
            closeModal(contactModal);
        });
    }

    if (saveContact) {
        saveContact.addEventListener('click', function () {
            // Get values
            const phone = document.getElementById('contact-phone')?.value;
            const phoneType = document.getElementById('contact-phone-type')?.value;
            const houseNo = document.getElementById('contact-house-no')?.value;
            const street = document.getElementById('contact-street')?.value;
            const city = document.getElementById('contact-city')?.value;
            const district = document.getElementById('contact-district')?.value;
            const birthday = document.getElementById('contact-birthday')?.value;

            console.log('Contact info saved:', {
                phone, phoneType, houseNo, street, city, district, birthday
            });

            closeModal(contactModal);
            showNotification('Contact information saved successfully!');
        });
    }

    if (addWebsiteTrigger && websiteInputGroup) {
        addWebsiteTrigger.addEventListener('click', function () {
            addWebsiteTrigger.classList.add('hidden');
            websiteInputGroup.classList.remove('hidden');
            if (newWebsiteUrl) newWebsiteUrl.focus();
        });
    }

    if (cancelWebsite) {
        cancelWebsite.addEventListener('click', function () {
            websiteInputGroup.classList.add('hidden');
            addWebsiteTrigger.classList.remove('hidden');
            if (newWebsiteUrl) newWebsiteUrl.value = '';
        });
    }

    if (saveWebsiteBtn && websiteContainer) {
        saveWebsiteBtn.addEventListener('click', function () {
            const url = newWebsiteUrl ? newWebsiteUrl.value.trim() : '';
            if (url) {
                const websiteDiv = document.createElement('div');
                websiteDiv.className = 'flex items-center justify-between text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md border border-gray-200';
                websiteDiv.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-globe mr-2 text-gray-500"></i>
                        <a href="${url}" target="_blank" class="text-blue-600 hover:underline break-all">${url}</a>
                    </div>
                    <button class="text-gray-400 hover:text-red-500 remove-website">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                websiteContainer.appendChild(websiteDiv);

                // Add remove listener
                websiteDiv.querySelector('.remove-website').addEventListener('click', function () {
                    websiteDiv.remove();
                });

                // Reset
                websiteInputGroup.classList.add('hidden');
                addWebsiteTrigger.classList.remove('hidden');
                if (newWebsiteUrl) newWebsiteUrl.value = '';
            }
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

    // Edit Skills Modal Logic
    const addSkillBtn = document.getElementById('add-skill-btn');
    const addSkillInput = document.getElementById('add-skill-input');
    const skillsRowContainer = document.getElementById('skills-row-container');

    if (addSkillBtn && addSkillInput && skillsRowContainer) {
        addSkillBtn.addEventListener('click', function () {
            addSkillBtn.classList.add('hidden');
            addSkillInput.classList.remove('hidden');
            addSkillInput.focus();
        });

        addSkillInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const value = this.value.trim().replace(/,$/, '');
                if (value) {
                    addSkillToEditModal(value);
                    this.value = '';
                }
            } else if (e.key === 'Escape') {
                this.classList.add('hidden');
                addSkillBtn.classList.remove('hidden');
                this.value = '';
            }
        });

        addSkillInput.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.classList.add('hidden');
                addSkillBtn.classList.remove('hidden');
            }
        });
    }

    function addSkillToEditModal(skillName) {
        if (!skillsRowContainer) return;

        // Check if skill already added
        const currentSkills = Array.from(skillsRowContainer.children)
            .filter(el => el.tagName === 'SPAN' && !el.classList.contains('comma-separator'))
            .map(el => el.textContent.trim());

        if (currentSkills.includes(skillName)) return;

        // Add comma if not first
        if (skillsRowContainer.children.length > 0) {
            const separator = document.createElement('span');
            separator.className = 'text-gray-400 mr-2 comma-separator';
            separator.textContent = ',';
            skillsRowContainer.appendChild(separator);
        }

        const skillTag = document.createElement('span');
        skillTag.className = 'bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer group relative';
        skillTag.innerHTML = `
            ${skillName}
            <button class="ml-1 text-blue-400 hover:text-blue-600 hidden group-hover:inline-block remove-edit-skill-tag" title="Remove">
                &times;
            </button>
        `;

        skillsRowContainer.appendChild(skillTag);

        // Add remove listener
        skillTag.querySelector('.remove-edit-skill-tag').addEventListener('click', function (e) {
            e.stopPropagation();
            const prev = skillTag.previousElementSibling;
            if (prev && prev.classList.contains('comma-separator')) {
                prev.remove();
            } else {
                const next = skillTag.nextElementSibling;
                if (next && next.classList.contains('comma-separator')) {
                    next.remove();
                }
            }
            skillTag.remove();
        });
    }

    // Save Personal Details (including Bio)
    const savePersonalDetailsBtn = document.getElementById('save-personal-details');

    if (savePersonalDetailsBtn) {
        savePersonalDetailsBtn.addEventListener('click', function () {
            // Get values
            const titleInput = document.getElementById('personal-title');
            const firstNameInput = document.getElementById('personal-first-name');
            const lastNameInput = document.getElementById('personal-last-name');
            const dobInput = document.getElementById('personal-dob');
            const bioInput = document.getElementById('personal-bio');
            const countryInput = document.getElementById('personal-country');
            const cityInput = document.getElementById('personal-city');
            const districtInput = document.getElementById('personal-district');

            const title = titleInput?.value;
            const firstName = firstNameInput?.value;
            const lastName = lastNameInput?.value;
            const dob = dobInput?.value;
            const bio = bioInput?.value;
            const country = countryInput?.value;
            const city = cityInput?.value;
            const district = districtInput?.value;

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
            addSkillToEditModal(skillText);
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
            // Reset skills state in the modal
            const expSkillsContainer = document.getElementById('exp-skills-container');
            const expAddSkillBtn = document.getElementById('exp-add-skill-btn');
            const expAddSkillInput = document.getElementById('exp-add-skill-input');

            if (expSkillsContainer) expSkillsContainer.innerHTML = '';
            if (expAddSkillInput) expAddSkillInput.classList.add('hidden');
            if (expAddSkillBtn) expAddSkillBtn.classList.remove('hidden');

            // Reset pickers
            document.querySelectorAll('#add-experience-modal .month-year-input span').forEach(s => s.textContent = 'Select Month');
            document.querySelectorAll('#add-experience-modal input[type="hidden"][id*="exp-"]').forEach(i => i.value = '');

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

    // Experience Skills Logic
    const expAddSkillBtn = document.getElementById('exp-add-skill-btn');
    const expAddSkillInput = document.getElementById('exp-add-skill-input');
    const expSkillsContainer = document.getElementById('exp-skills-container');

    if (expAddSkillBtn && expAddSkillInput && expSkillsContainer) {
        expAddSkillBtn.addEventListener('click', function () {
            expAddSkillBtn.classList.add('hidden');
            expAddSkillInput.classList.remove('hidden');
            expAddSkillInput.focus();
        });

        expAddSkillInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const value = this.value.trim().replace(/,$/, '');
                if (value) {
                    addSkillToExperience(value);
                    this.value = '';
                    // Keep focus and keep input visible for more entries
                }
            } else if (e.key === 'Escape') {
                this.classList.add('hidden');
                expAddSkillBtn.classList.remove('hidden');
                this.value = '';
            }
        });

        // Only hide on blur if it's empty, allowing user to click away to finish
        expAddSkillInput.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                // Check if we have any skills added, if not maybe show the button back
                // For now, let's just show the button back if the input is left empty
                this.classList.add('hidden');
                expAddSkillBtn.classList.remove('hidden');
            }
        });
    }

    function addSkillToExperience(skillName) {
        if (!expSkillsContainer) return;

        // Check if skill already added by checking text content
        const currentSkills = Array.from(expSkillsContainer.children)
            .filter(el => el.tagName === 'SPAN' && !el.classList.contains('comma-separator'))
            .map(el => el.textContent.trim());

        if (currentSkills.includes(skillName)) return;

        // Add comma if this isn't the first skill
        if (expSkillsContainer.children.length > 0) {
            const separator = document.createElement('span');
            separator.className = 'text-gray-400 mr-2 comma-separator';
            separator.textContent = ',';
            expSkillsContainer.appendChild(separator);
        }

        const skillTag = document.createElement('span');
        skillTag.className = 'bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer group relative';
        skillTag.innerHTML = `
            ${skillName}
            <button class="ml-1 text-blue-400 hover:text-blue-600 hidden group-hover:inline-block remove-exp-skill-tag" title="Remove">
                &times;
            </button>
        `;

        expSkillsContainer.appendChild(skillTag);

        // Add remove listener
        skillTag.querySelector('.remove-exp-skill-tag').addEventListener('click', function (e) {
            e.stopPropagation();
            // Remove the tag and the preceding comma if it exists
            const prev = skillTag.previousElementSibling;
            if (prev && prev.classList.contains('comma-separator')) {
                prev.remove();
            } else {
                // If it's the first tag and has a comma after it, remove that
                const next = skillTag.nextElementSibling;
                if (next && next.classList.contains('comma-separator')) {
                    next.remove();
                }
            }
            skillTag.remove();
        });
    }

    if (saveExperience) {
        saveExperience.addEventListener('click', function () {
            // Get form values
            const title = document.querySelector('#add-experience-modal input[placeholder*="Ex: Retail"]').value;
            const company = document.querySelector('#add-experience-modal input[placeholder*="Ex: Microsoft"]').value;
            const startDate = document.getElementById('exp-start-date').value;
            const endDate = document.getElementById('exp-end-date').value;
            const isCurrent = document.getElementById('currently-working').checked;

            const skills = [];
            if (expSkillsContainer) {
                expSkillsContainer.querySelectorAll('span').forEach(span => {
                    if (!span.classList.contains('comma-separator')) {
                        skills.push(span.textContent.trim().replace('×', '').trim());
                    }
                });
            }

            console.log('Experience saved:', {
                title,
                company,
                startDate,
                endDate: isCurrent ? 'Present' : endDate,
                skills
            });
            closeModal(addExperienceModal);
            showNotification('Experience added successfully!');

            // Reset skills for next time
            if (expSkillsContainer) expSkillsContainer.innerHTML = '';
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

    // Custom Month/Year Picker Logic
    function initMonthYearPicker(pickerId, hiddenInputId) {
        const picker = document.getElementById(pickerId);
        if (!picker) return;

        const input = picker.querySelector('.month-year-input');
        const popover = picker.querySelector('.month-year-popover');
        const hiddenInput = document.getElementById(hiddenInputId);
        const currentYearSpan = picker.querySelector('.current-year');
        const grid = picker.querySelector('.picker-grid');
        const prevBtn = picker.querySelector('.prev-year');
        const nextBtn = picker.querySelector('.next-year');

        let displayYear = new Date().getFullYear();
        let selectedMonth = null;
        let selectedYear = null;
        let viewMode = 'months'; // 'months' or 'years'

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        function renderMonths() {
            grid.innerHTML = '';
            months.forEach((month, index) => {
                const item = document.createElement('div');
                item.className = 'picker-item';
                if (selectedYear === displayYear && selectedMonth === index + 1) {
                    item.classList.add('selected');
                }
                item.textContent = month;
                item.addEventListener('click', () => {
                    selectedMonth = index + 1;
                    selectedYear = displayYear;
                    updateInput();
                    popover.classList.remove('active');
                });
                grid.appendChild(item);
            });
            currentYearSpan.textContent = displayYear;
            viewMode = 'months';
        }

        function renderYears() {
            grid.innerHTML = '';
            const startYear = displayYear - 5;
            for (let i = 0; i < 12; i++) {
                const year = startYear + i;
                const item = document.createElement('div');
                item.className = 'picker-item';
                if (selectedYear === year) {
                    item.classList.add('selected');
                }
                item.textContent = year;
                item.addEventListener('click', () => {
                    displayYear = year;
                    renderMonths();
                });
                grid.appendChild(item);
            }
            currentYearSpan.textContent = `${startYear} - ${startYear + 11}`;
            viewMode = 'years';
        }

        function updateInput() {
            if (selectedMonth && selectedYear) {
                const monthStr = selectedMonth.toString().padStart(2, '0');
                input.querySelector('span').textContent = `${months[selectedMonth - 1]} ${selectedYear}`;
                hiddenInput.value = `${selectedYear}-${monthStr}`;
            }
        }

        input.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.month-year-popover').forEach(p => {
                if (p !== popover) p.classList.remove('active');
            });
            popover.classList.toggle('active');
            if (popover.classList.contains('active')) {
                renderMonths();
            }
        });

        currentYearSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            if (viewMode === 'months') {
                renderYears();
            } else {
                renderMonths();
            }
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (viewMode === 'months') {
                displayYear--;
                renderMonths();
            } else {
                displayYear -= 12;
                renderYears();
            }
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (viewMode === 'months') {
                displayYear++;
                renderMonths();
            } else {
                displayYear += 12;
                renderYears();
            }
        });

        document.addEventListener('click', () => {
            popover.classList.remove('active');
        });

        popover.addEventListener('click', (e) => e.stopPropagation());
    }

    initMonthYearPicker('edu-start-picker', 'edu-start-date');
    initMonthYearPicker('edu-end-picker', 'edu-end-date');
    initMonthYearPicker('exp-start-picker', 'exp-start-date');
    initMonthYearPicker('exp-end-picker', 'exp-end-date');

    if (saveEducation) {
        saveEducation.addEventListener('click', function () {
            const school = document.querySelector('#add-education-modal input[placeholder*="Ex: Boston"]').value;
            const highest = document.getElementById('education-highest').value;
            const degree = document.getElementById('education-degree').value;
            const startDate = document.getElementById('edu-start-date').value;
            const endDate = document.getElementById('edu-end-date').value;

            // Here you would typically save the education
            console.log('Education saved:', {
                school,
                highest,
                degree,
                startDate,
                endDate
            });
            closeModal(addEducationModal);
            showNotification('Education added successfully!');

            // Reset pickers
            document.querySelectorAll('.month-year-input span').forEach(s => s.textContent = 'Select Month');
            document.querySelectorAll('input[type="hidden"][id*="edu-"]').forEach(i => i.value = '');
        });
    }

    // Dynamic education placeholder logic
    const educationHighest = document.getElementById('education-highest');
    const educationDegree = document.getElementById('education-degree');

    if (educationHighest && educationDegree) {
        educationHighest.addEventListener('change', function () {
            const selectedValue = this.value;
            if (selectedValue) {
                educationDegree.placeholder = `Ex: ${selectedValue} Name`;
            } else {
                educationDegree.placeholder = "Ex: Bachelor's Name";
            }
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
