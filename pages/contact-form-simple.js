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

    // Simple form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Formulario enviado');

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Enviando...';
            if (btnSpinner) btnSpinner.classList.remove('hidden');
        }

        // Simulate submission
        setTimeout(() => {
            // Hide loading state
            if (submitBtn) {
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Enviar Proyecto';
                if (btnSpinner) btnSpinner.classList.add('hidden');
            }

            // Show success modal
            if (successModal) {
                successModal.classList.remove('hidden');
                successModal.classList.add('flex');
            }

            console.log('Formulario enviado exitosamente');
        }, 2000);
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