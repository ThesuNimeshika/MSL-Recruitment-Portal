/* SeekerSignup.js */

document.addEventListener('DOMContentLoaded', () => {
    // Set current date for submission
    const dateInput = document.getElementById('submission_date');
    if (dateInput) {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Handle Multi-select Dropdowns
    const multiSelects = document.querySelectorAll('.multi-select-container');

    multiSelects.forEach(container => {
        const btn = container.querySelector('.multi-select-btn');
        const dropdown = container.querySelector('.multi-select-dropdown');
        const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other dropdowns
            multiSelects.forEach(other => {
                if (other !== container) {
                    other.querySelector('.multi-select-dropdown').classList.add('hidden');
                }
            });
            dropdown.classList.toggle('hidden');
        });

        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                updateButtonText(btn, checkboxes);
            });

            // Allow clicking the parent div to toggle checkbox
            cb.parentElement.addEventListener('click', (e) => {
                if (e.target !== cb) {
                    cb.checked = !cb.checked;
                    cb.dispatchEvent(new Event('change'));
                }
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        multiSelects.forEach(container => {
            container.querySelector('.multi-select-dropdown').classList.add('hidden');
        });
        document.querySelectorAll('.month-year-popover').forEach(p => p.classList.remove('active'));
    });

    function updateButtonText(btn, checkboxes) {
        const selected = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (selected.length === 0) {
            btn.textContent = btn.getAttribute('data-placeholder') || 'Select Options';
        } else if (selected.length <= 2) {
            btn.textContent = selected.join(', ');
        } else {
            btn.textContent = `${selected.length} items selected`;
        }
    }

    // Initialize graduation picker using shared logic
    if (window.initMonthYearPicker) {
        window.initMonthYearPicker('signup-grad-picker', 'signup-grad-date');
    }

    // Form Submission
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation for required multi-selects
        let isValid = true;
        multiSelects.forEach(container => {
            if (container.classList.contains('required')) {
                const checked = container.querySelectorAll('input:checked');
                if (checked.length === 0) {
                    isValid = false;
                    container.classList.add('border-red-500');
                    alert(`Please select at least one option for ${container.getAttribute('data-name').replace('_', ' ')}`);
                } else {
                    container.classList.remove('border-red-500');
                }
            }
        });

        if (isValid) {
            alert('Signup form submitted successfully!');
            console.log('Form data:', new FormData(form));
        }
    });
});

// Modal Control Logic
const expModal = document.getElementById('add-experience-modal');
const addExpBtn = document.getElementById('add-experience-btn');
const closeExpModal = document.getElementById('close-add-experience-modal');
const cancelExpBtn = document.getElementById('cancel-experience');
const saveExpBtn = document.getElementById('save-experience');

function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

if (addExpBtn) {
    addExpBtn.addEventListener('click', () => openModal(expModal));
}

[closeExpModal, cancelExpBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', () => closeModal(expModal));
});

// Currently Working Toggle
const currentlyWorking = document.getElementById('currently-working');
const endDateContainer = document.getElementById('end-date-container');

if (currentlyWorking && endDateContainer) {
    currentlyWorking.addEventListener('change', function () {
        endDateContainer.classList.toggle('hidden', this.checked);
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
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectedMonth = index + 1;
                selectedYear = displayYear;
                const monthStr = selectedMonth.toString().padStart(2, '0');
                input.querySelector('span').textContent = `${months[index]} ${selectedYear}`;
                hiddenInput.value = `${selectedYear}-${monthStr}`;
                popover.classList.remove('active');
            });
            grid.appendChild(item);
        });
        currentYearSpan.textContent = displayYear;
    }

    input.addEventListener('click', (e) => {
        e.stopPropagation();
        popover.classList.toggle('active');
        if (popover.classList.contains('active')) renderMonths();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        displayYear--;
        renderMonths();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        displayYear++;
        renderMonths();
    });
}

initMonthYearPicker('exp-start-picker', 'exp-start-date');
initMonthYearPicker('exp-end-picker', 'exp-end-date');

// Experience Skills Logic
const expAddSkillBtn = document.getElementById('exp-add-skill-btn');
const expAddSkillInput = document.getElementById('exp-add-skill-input');
const expSkillsContainer = document.getElementById('exp-skills-container');

if (expAddSkillBtn && expAddSkillInput && expSkillsContainer) {
    expAddSkillBtn.addEventListener('click', () => {
        expAddSkillBtn.classList.add('hidden');
        expAddSkillInput.classList.remove('hidden');
        expAddSkillInput.focus();
    });

    expAddSkillInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = expAddSkillInput.value.trim();
            if (val) {
                const tag = document.createElement('span');
                tag.className = 'bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center';
                tag.innerHTML = `${val} <button type="button" class="ml-2 text-blue-400 hover:text-blue-600">&times;</button>`;
                tag.querySelector('button').onclick = () => tag.remove();
                expSkillsContainer.appendChild(tag);
                expAddSkillInput.value = '';
            }
        }
    });

    expAddSkillInput.addEventListener('blur', () => {
        if (!expAddSkillInput.value.trim()) {
            expAddSkillInput.classList.add('hidden');
            expAddSkillBtn.classList.remove('hidden');
        }
    });
}

// Save Experience (Simulated)
if (saveExpBtn) {
    saveExpBtn.addEventListener('click', () => {
        alert('Experience saved to form data!');
        closeModal(expModal);
    });
}

// Global click to close popovers
document.addEventListener('click', () => {
    document.querySelectorAll('.month-year-popover').forEach(p => p.classList.remove('active'));
});

