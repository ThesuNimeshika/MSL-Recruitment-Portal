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

    // Sidebar navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('aside nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('bg-blue-50', 'text-blue-600', 'font-medium');
            link.classList.add('text-gray-600');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('bg-blue-50', 'text-blue-600', 'font-medium');
                link.classList.remove('text-gray-600');
            }
        });
    });

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
