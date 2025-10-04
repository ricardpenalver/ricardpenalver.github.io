// Modern Contact Form JavaScript
// Enhanced with real-time validation, animations, and modern UX patterns

class ModernContactForm {
    constructor() {
        this.form = document.getElementById('modernContactForm');
        this.progressBar = document.querySelector('.progress-bar');
        this.successModal = document.getElementById('successModal');
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.btnText = document.getElementById('btn-text');
        this.btnIcon = document.getElementById('btn-icon');
        this.btnSpinner = document.getElementById('btn-spinner');

        this.fields = {
            required: ['firstName', 'lastName', 'email', 'projectType', 'projectDescription'],
            optional: ['phone', 'company', 'budget', 'timeline']
        };

        this.validationRules = {
            firstName: { min: 2, max: 50, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/ },
            lastName: { min: 2, max: 50, pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/ },
            email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            phone: { pattern: /^[\+]?[0-9\s\-\(\)]{9,15}$/ },
            company: { min: 2, max: 100 },
            projectDescription: { min: 20, max: 1000 }
        };

        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.initializeAnimations();
        this.updateProgress();
    }

    attachEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation on input
        this.getAllFormFields().forEach(field => {
            field.addEventListener('input', (e) => this.handleInput(e));
            field.addEventListener('blur', (e) => this.validateField(e.target));
            field.addEventListener('focus', (e) => this.handleFocus(e));
        });

        // Character counter for textarea
        const textarea = document.getElementById('projectDescription');
        if (textarea) {
            textarea.addEventListener('input', (e) => this.updateCharCounter(e.target));
        }

        // Phone number formatting
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', (e) => this.formatPhoneNumber(e));
        }

        // Progress tracking
        this.getAllFormFields().forEach(field => {
            field.addEventListener('input', () => this.updateProgress());
            field.addEventListener('change', () => this.updateProgress());
        });
    }

    getAllFormFields() {
        return this.form.querySelectorAll('input, textarea, select');
    }

    handleInput(e) {
        const field = e.target;
        this.clearErrors(field);

        // Real-time validation for specific fields
        if (field.type === 'email' && field.value.length > 0) {
            this.validateEmail(field);
        }

        if (field.name === 'projectDescription') {
            this.updateCharCounter(field);
        }

        // Update progress
        this.updateProgress();
    }

    handleFocus(e) {
        const field = e.target;
        this.addFocusEffect(field);
    }

    addFocusEffect(field) {
        const container = field.closest('.floating-label');
        if (container) {
            container.classList.add('focused');
        }
    }

    removeFocusEffect(field) {
        const container = field.closest('.floating-label');
        if (container) {
            container.classList.remove('focused');
        }
    }

    validateField(field) {
        const name = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[name];

        // Clear previous errors
        this.clearErrors(field);

        // Check if required field is empty
        if (this.fields.required.includes(name) && !value) {
            this.showError(field, 'Este campo es obligatorio');
            return false;
        }

        // Skip validation if field is empty and optional
        if (!value && !this.fields.required.includes(name)) {
            return true;
        }

        // Apply specific validation rules
        if (rules) {
            // Length validation
            if (rules.min && value.length < rules.min) {
                this.showError(field, `Mínimo ${rules.min} caracteres`);
                return false;
            }

            if (rules.max && value.length > rules.max) {
                this.showError(field, `Máximo ${rules.max} caracteres`);
                return false;
            }

            // Pattern validation
            if (rules.pattern && !rules.pattern.test(value)) {
                this.showError(field, this.getPatternErrorMessage(name));
                return false;
            }
        }

        // Special validations
        if (name === 'email') {
            return this.validateEmail(field);
        }

        if (name === 'phone' && value) {
            return this.validatePhone(field);
        }

        this.showSuccess(field);
        return true;
    }

    validateEmail(field) {
        const email = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            this.showError(field, 'Introduce un email válido');
            return false;
        }

        this.showSuccess(field);
        return true;
    }

    validatePhone(field) {
        const phone = field.value.trim();
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,15}$/;

        if (!phoneRegex.test(phone)) {
            this.showError(field, 'Introduce un teléfono válido');
            return false;
        }

        this.showSuccess(field);
        return true;
    }

    getPatternErrorMessage(fieldName) {
        const messages = {
            firstName: 'Solo se permiten letras y espacios',
            lastName: 'Solo se permiten letras y espacios',
            email: 'Introduce un email válido',
            phone: 'Introduce un teléfono válido'
        };

        return messages[fieldName] || 'Formato no válido';
    }

    showError(field, message) {
        const errorElement = field.parentNode.querySelector('.error-message');
        const container = field.closest('.floating-label');

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }

        field.classList.add('border-red-400');
        field.classList.remove('border-green-400');

        if (container) {
            container.classList.add('error');
            container.classList.remove('success');
        }

        // Add shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    showSuccess(field) {
        const container = field.closest('.floating-label');

        field.classList.add('border-green-400');
        field.classList.remove('border-red-400');

        if (container) {
            container.classList.add('success');
            container.classList.remove('error');
        }
    }

    clearErrors(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        const container = field.closest('.floating-label');

        if (errorElement) {
            errorElement.classList.add('hidden');
        }

        field.classList.remove('border-red-400', 'border-green-400');

        if (container) {
            container.classList.remove('error', 'success');
        }
    }

    updateCharCounter(textarea) {
        const maxLength = parseInt(textarea.getAttribute('maxlength')) || 1000;
        const currentLength = textarea.value.length;
        const counter = textarea.parentNode.querySelector('.char-count');

        if (counter) {
            counter.textContent = `${currentLength}/${maxLength}`;

            // Change color based on character count
            if (currentLength > maxLength * 0.9) {
                counter.classList.add('text-red-400');
                counter.classList.remove('text-yellow-400', 'text-white');
            } else if (currentLength > maxLength * 0.7) {
                counter.classList.add('text-yellow-400');
                counter.classList.remove('text-red-400', 'text-white');
            } else {
                counter.classList.add('text-white');
                counter.classList.remove('text-red-400', 'text-yellow-400');
            }
        }
    }

    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');

        // Basic Spanish phone formatting
        if (value.startsWith('34')) {
            value = '+34 ' + value.slice(2);
        } else if (value.length > 0 && !value.startsWith('+')) {
            if (value.length <= 9) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
            }
        }

        e.target.value = value;
    }

    updateProgress() {
        const totalFields = this.fields.required.length;
        let completedFields = 0;

        this.fields.required.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && field.value.trim()) {
                completedFields++;
            }
        });

        const progress = (completedFields / totalFields) * 100;

        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;

            // Add color changes based on progress
            if (progress === 100) {
                this.progressBar.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
            } else if (progress >= 50) {
                this.progressBar.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
            } else {
                this.progressBar.style.background = 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)';
            }
        }
    }

    validateForm() {
        let isValid = true;

        this.fields.required.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !this.validateField(field)) {
                isValid = false;
            }
        });

        // Validate optional fields that have content
        this.fields.optional.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && field.value.trim()) {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) return;

        // Validate form
        if (!this.validateForm()) {
            this.showValidationErrors();
            return;
        }

        this.isSubmitting = true;
        this.showLoadingState();

        try {
            // Collect form data
            const formData = this.collectFormData();

            // Simulate API call (replace with your actual endpoint)
            await this.submitFormData(formData);

            // Show success
            this.showSuccessModal();
            this.resetForm();

        } catch (error) {
            console.error('Error submitting form:', error);
            this.showErrorMessage('Error al enviar el formulario. Inténtalo de nuevo.');
        } finally {
            this.isSubmitting = false;
            this.hideLoadingState();
        }
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add additional metadata
        data.timestamp = new Date().toISOString();
        data.userAgent = navigator.userAgent;
        data.source = 'modern-contact-form';

        return data;
    }

    async submitFormData(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // For now, just log the data (replace with actual API call)
        console.log('Form submitted:', data);

        // You can replace this with your actual API endpoint:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
        */
    }

    showLoadingState() {
        this.submitBtn.disabled = true;
        this.btnText.textContent = 'Enviando...';
        this.btnIcon.classList.add('hidden');
        this.btnSpinner.classList.remove('hidden');
        this.submitBtn.classList.add('opacity-80');
    }

    hideLoadingState() {
        this.submitBtn.disabled = false;
        this.btnText.textContent = 'Enviar Proyecto';
        this.btnIcon.classList.remove('hidden');
        this.btnSpinner.classList.add('hidden');
        this.submitBtn.classList.remove('opacity-80');
    }

    showSuccessModal() {
        this.successModal.classList.remove('hidden');
        this.successModal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        // Add entrance animation
        const modalContent = this.successModal.querySelector('div');
        modalContent.style.animation = 'scaleIn 0.3s ease-out';
    }

    closeSuccessModal() {
        this.successModal.classList.add('hidden');
        this.successModal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    showValidationErrors() {
        // Find first error field and scroll to it
        const firstErrorField = this.form.querySelector('.border-red-400');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            firstErrorField.focus();
        }

        // Show temporary error message
        this.showErrorMessage('Por favor, corrige los errores marcados en rojo');
    }

    showErrorMessage(message) {
        // Create temporary error toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 5000);
    }

    resetForm() {
        this.form.reset();

        // Clear all error states
        this.getAllFormFields().forEach(field => {
            this.clearErrors(field);
            this.removeFocusEffect(field);
        });

        // Reset progress
        this.updateProgress();

        // Reset character counter
        const textarea = document.getElementById('projectDescription');
        if (textarea) {
            this.updateCharCounter(textarea);
        }
    }

    initializeAnimations() {
        // Add shake animation CSS if not present
        if (!document.querySelector('#shake-animation')) {
            const style = document.createElement('style');
            style.id = 'shake-animation';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }

        // Stagger form field animations on load
        const fields = this.getAllFormFields();
        fields.forEach((field, index) => {
            field.style.opacity = '0';
            field.style.transform = 'translateY(20px)';

            setTimeout(() => {
                field.style.transition = 'all 0.5s ease-out';
                field.style.opacity = '1';
                field.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Global function for closing modal (called from HTML)
function closeSuccessModal() {
    if (window.modernForm) {
        window.modernForm.closeSuccessModal();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.modernForm = new ModernContactForm();
});

// Add some additional modern interactions
document.addEventListener('DOMContentLoaded', function() {
    // Floating particles effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.absolute.pointer-events-none div');
        particles.forEach((particle, index) => {
            const speed = 0.01 + (index * 0.01);
            const x = e.clientX * speed;
            const y = e.clientY * speed;

            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});