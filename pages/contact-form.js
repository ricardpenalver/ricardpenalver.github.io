// Contact Form Validation and Functionality
// Inspired by shadcn/ui form patterns adapted for vanilla JavaScript

class ContactFormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.fields = {
            name: {
                element: document.getElementById('name'),
                errorElement: document.getElementById('name-error'),
                rules: {
                    required: true,
                    minLength: 2,
                    message: 'El nombre debe tener al menos 2 caracteres.'
                }
            },
            email: {
                element: document.getElementById('email'),
                errorElement: document.getElementById('email-error'),
                rules: {
                    required: true,
                    email: true,
                    message: 'Por favor ingresa un email válido.'
                }
            },
            phone: {
                element: document.getElementById('phone'),
                errorElement: document.getElementById('phone-error'),
                rules: {
                    required: false,
                    minLength: 10,
                    message: 'El teléfono debe tener al menos 10 dígitos.'
                }
            },
            company: {
                element: document.getElementById('company'),
                errorElement: document.getElementById('company-error'),
                rules: {
                    required: false
                }
            },
            subject: {
                element: document.getElementById('subject'),
                errorElement: document.getElementById('subject-error'),
                rules: {
                    required: true,
                    minLength: 5,
                    message: 'El asunto debe tener al menos 5 caracteres.'
                }
            },
            inquiryType: {
                element: document.getElementById('inquiryType'),
                errorElement: document.getElementById('inquiryType-error'),
                rules: {
                    required: true,
                    message: 'Por favor selecciona un tipo de consulta.'
                }
            },
            message: {
                element: document.getElementById('message'),
                errorElement: document.getElementById('message-error'),
                rules: {
                    required: true,
                    minLength: 10,
                    maxLength: 500,
                    message: 'El mensaje debe tener entre 10 y 500 caracteres.'
                }
            }
        };

        this.messageCounter = document.getElementById('message-count');
        this.toast = document.getElementById('toast');
        this.toastMessage = document.getElementById('toast-message');

        this.init();
    }

    init() {
        // Add event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Add real-time validation
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            field.element.addEventListener('blur', () => this.validateField(fieldName));
            field.element.addEventListener('input', () => this.clearError(fieldName));
        });

        // Message counter
        this.fields.message.element.addEventListener('input', () => this.updateMessageCounter());

        // Initialize message counter
        this.updateMessageCounter();
    }

    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.element.value.trim();
        const rules = field.rules;

        // Clear previous error
        this.clearError(fieldName);

        // Required validation
        if (rules.required && !value) {
            this.showError(fieldName, rules.message || `${fieldName} es requerido.`);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!value && !rules.required) {
            return true;
        }

        // Email validation
        if (rules.email && !this.isValidEmail(value)) {
            this.showError(fieldName, rules.message);
            return false;
        }

        // MinLength validation
        if (rules.minLength && value.length < rules.minLength) {
            this.showError(fieldName, rules.message);
            return false;
        }

        // MaxLength validation
        if (rules.maxLength && value.length > rules.maxLength) {
            this.showError(fieldName, rules.message);
            return false;
        }

        return true;
    }

    validateForm() {
        let isValid = true;
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        return isValid;
    }

    showError(fieldName, message) {
        const field = this.fields[fieldName];
        field.errorElement.textContent = message;
        field.errorElement.classList.remove('hidden');
        field.element.classList.add('border-red-500', 'focus:ring-red-500');
        field.element.classList.remove('border-gray-300', 'focus:ring-primary');
    }

    clearError(fieldName) {
        const field = this.fields[fieldName];
        field.errorElement.classList.add('hidden');
        field.element.classList.remove('border-red-500', 'focus:ring-red-500');
        field.element.classList.add('border-gray-300', 'focus:ring-primary');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateMessageCounter() {
        const currentLength = this.fields.message.element.value.length;
        this.messageCounter.textContent = `${currentLength}/500 caracteres`;

        if (currentLength > 500) {
            this.messageCounter.classList.add('text-red-600');
            this.messageCounter.classList.remove('text-gray-500');
        } else {
            this.messageCounter.classList.remove('text-red-600');
            this.messageCounter.classList.add('text-gray-500');
        }
    }

    getFormData() {
        const formData = {};
        Object.keys(this.fields).forEach(fieldName => {
            formData[fieldName] = this.fields[fieldName].element.value.trim();
        });

        // Add newsletter checkbox
        formData.newsletter = document.getElementById('newsletter').checked;

        return formData;
    }

    resetForm() {
        this.form.reset();
        Object.keys(this.fields).forEach(fieldName => {
            this.clearError(fieldName);
        });
        this.updateMessageCounter();
        document.getElementById('newsletter').checked = false;
    }

    showToast(message, type = 'success') {
        this.toastMessage.textContent = message;

        // Update toast styling based on type
        if (type === 'success') {
            this.toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out';
        } else if (type === 'error') {
            this.toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out';
        }

        // Show toast
        this.toast.style.transform = 'translateX(0)';

        // Hide toast after 3 seconds
        setTimeout(() => {
            this.toast.style.transform = 'translateX(100%)';
        }, 3000);
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            this.showToast('Por favor corrige los errores del formulario.', 'error');
            return;
        }

        // Get form data
        const formData = this.getFormData();

        // Simulate form submission (replace with actual implementation)
        try {
            // Show loading state
            const submitButton = this.form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;

            // Simulate API call
            await this.simulateFormSubmission(formData);

            // Success
            this.showToast('¡Mensaje enviado correctamente! Te responderemos en las próximas 24 horas.', 'success');
            this.resetForm();

            // Log form data (remove in production)
            console.log('Datos del formulario:', formData);

        } catch (error) {
            this.showToast('Error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
            console.error('Error:', error);
        } finally {
            // Reset button state
            const submitButton = this.form.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            submitButton.disabled = false;
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }

    // Method to integrate with actual form submission service
    async submitToService(formData) {
        // Example integration with a form service like Formspree, Netlify Forms, or custom backend

        // Example with Formspree:
        /*
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        return response.json();
        */

        // Example with Netlify Forms:
        /*
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'form-name': 'contact',
                ...formData
            })
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }
        */

        // For now, we'll use the simulation
        return this.simulateFormSubmission(formData);
    }
}

// Initialize form validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormValidator();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactFormValidator;
}