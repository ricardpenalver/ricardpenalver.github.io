// Simple Contact Form Fallback
// Basic functionality that always works

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cargando formulario simple...');

    const form = document.getElementById('modernContactForm');
    const submitBtn = form?.querySelector('button[type="submit"]');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const successModal = document.getElementById('successModal');

    if (!form) {
        console.error('Formulario no encontrado');
        return;
    }

    console.log('Formulario encontrado, configurando eventos...');

    // Custom validation function
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const errorDiv = field.parentNode.querySelector('.error-message');

            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ef4444';
                if (errorDiv) {
                    errorDiv.textContent = 'Este campo es obligatorio';
                    errorDiv.classList.remove('hidden');
                }
            } else {
                field.style.borderColor = '#10b981';
                if (errorDiv) {
                    errorDiv.textContent = '';
                    errorDiv.classList.add('hidden');
                }
            }
        });

        // Validate email format
        const emailField = form.querySelector('#email');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailErrorDiv = emailField.parentNode.querySelector('.error-message');

            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#ef4444';
                if (emailErrorDiv) {
                    emailErrorDiv.textContent = 'Por favor, introduce un email válido';
                    emailErrorDiv.classList.remove('hidden');
                }
            }
        }

        return isValid;
    }

    // Web3Forms submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Validando y enviando formulario a Web3Forms...');

        // Custom validation first
        if (!validateForm()) {
            console.log('Formulario no válido, cancelando envío');
            return;
        }

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Enviando...';
            if (btnSpinner) btnSpinner.classList.remove('hidden');
        }

        try {
            // Generate reCAPTCHA token
            const recaptchaResponse = await new Promise((resolve, reject) => {
                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.ready(() => {
                        grecaptcha.execute('6LcBcIUoAAAAAO9u3rZNJo7TGCjrHwJwI6o8S7qL', {action: 'submit'})
                            .then(resolve)
                            .catch(reject);
                    });
                } else {
                    // If reCAPTCHA is not available, continue without it
                    resolve('');
                }
            });

            // Get form data
            const formData = new FormData(form);

            // Add reCAPTCHA token if available
            if (recaptchaResponse) {
                formData.set('g-recaptcha-response', recaptchaResponse);
            }

            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                console.log('Formulario enviado exitosamente a Web3Forms');

                // Reset form
                form.reset();

                // Reset field styles
                const allFields = form.querySelectorAll('input, textarea, select');
                allFields.forEach(field => {
                    field.style.borderColor = '';
                });

                // Hide all error messages
                const errorMessages = form.querySelectorAll('.error-message');
                errorMessages.forEach(error => {
                    error.classList.add('hidden');
                });

                // Show success modal
                if (successModal) {
                    successModal.classList.remove('hidden');
                    successModal.classList.add('flex');
                }
            } else {
                throw new Error(result.message || 'Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error al enviar formulario:', error);

            // Better error modal
            const errorMsg = error.message.includes('Failed to fetch')
                ? 'Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.'
                : 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo o contacta directamente por email: ricardopenalver@icloud.com';

            alert(errorMsg);
        } finally {
            // Hide loading state
            if (submitBtn) {
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Enviar Proyecto';
                if (btnSpinner) btnSpinner.classList.add('hidden');
            }
        }
    });

    // Simple validation on required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#10b981';
            }
        });

        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#10b981';
            } else {
                this.style.borderColor = '#ef4444';
            }
        });
    });

    console.log('Eventos configurados correctamente');
});

// Global function for closing modal
window.closeSuccessModal = function() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
    }
};