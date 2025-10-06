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

    // Web3Forms submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Enviando formulario a Web3Forms...');

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Enviando...';
            if (btnSpinner) btnSpinner.classList.remove('hidden');
        }

        try {
            // Get form data
            const formData = new FormData(form);

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
            alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo o contacta directamente por email.');
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