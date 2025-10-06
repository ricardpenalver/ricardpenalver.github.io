// Web3Forms Contact Form - Simple & Functional
// This version prioritizes functionality over complexity

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando formulario Web3Forms...');

    const form = document.getElementById('modernContactForm');
    const submitBtn = form?.querySelector('button[type="submit"]');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const successModal = document.getElementById('successModal');

    if (!form) {
        console.error('❌ Formulario no encontrado');
        return;
    }

    console.log('✅ Formulario encontrado, configurando...');

    // Simple form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📤 Enviando formulario...');

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Enviando...';
            if (btnSpinner) btnSpinner.classList.remove('hidden');
        }

        try {
            // Create FormData from form
            const formData = new FormData(form);

            // Log form data for debugging
            console.log('📋 Datos del formulario:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            console.log('📡 Respuesta del servidor:', response.status);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('📄 Resultado:', result);

            if (result.success) {
                console.log('✅ ¡Formulario enviado exitosamente!');

                // Reset form
                form.reset();

                // Show success modal
                if (successModal) {
                    successModal.classList.remove('hidden');
                    successModal.classList.add('flex');
                }

                console.log('🎉 Modal de éxito mostrado');
            } else {
                throw new Error(result.message || 'Error desconocido del servidor');
            }

        } catch (error) {
            console.error('❌ Error al enviar formulario:', error);

            let errorMessage = 'Hubo un error al enviar el formulario. ';

            if (error.message.includes('Failed to fetch')) {
                errorMessage += 'Por favor, verifica tu conexión a internet e inténtalo de nuevo.';
            } else if (error.message.includes('HTTP: 429')) {
                errorMessage += 'Has enviado demasiados mensajes. Espera unos minutos e inténtalo de nuevo.';
            } else if (error.message.includes('HTTP: 422')) {
                errorMessage += 'Por favor, verifica que todos los campos estén completos correctamente.';
            } else {
                errorMessage += `Contacta directamente por email: ricardopenalver@icloud.com\n\nError técnico: ${error.message}`;
            }

            alert(errorMessage);

        } finally {
            // Always restore button state
            if (submitBtn) {
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Enviar Proyecto';
                if (btnSpinner) btnSpinner.classList.add('hidden');
            }
        }
    });

    console.log('✅ Formulario configurado correctamente');
});

// Global function for closing success modal
window.closeSuccessModal = function() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
        console.log('🔒 Modal cerrado');
    }
};

console.log('📝 Script de formulario cargado');