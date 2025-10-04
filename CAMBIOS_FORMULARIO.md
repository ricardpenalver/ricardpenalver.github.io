# 📧 Cambios del Formulario de Contacto

## 🚨 **PROBLEMA DE SUBIDA DETECTADO**

Los cambios del formulario mejorado no se han podido subir automáticamente debido a problemas de conectividad con GitHub. 

## 📋 **ARCHIVOS QUE NECESITAN ACTUALIZARSE:**

### 1. **index.html** - Líneas 169-206
Reemplazar la sección del formulario de contacto con:

```html
<div class="contact-form">
    <form id="contactForm" novalidate>
        <div class="form-group">
            <label for="name">Nombre *</label>
            <input type="text" id="name" name="name" required minlength="2" maxlength="50">
            <div class="error-message" id="name-error"></div>
        </div>
        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required>
            <div class="error-message" id="email-error"></div>
        </div>
        <div class="form-group">
            <label for="subject">Asunto *</label>
            <input type="text" id="subject" name="subject" required minlength="5" maxlength="100">
            <div class="error-message" id="subject-error"></div>
        </div>
        <div class="form-group">
            <label for="message">Mensaje *</label>
            <textarea id="message" name="message" rows="5" required minlength="10" maxlength="1000"></textarea>
            <div class="error-message" id="message-error"></div>
        </div>
        <button type="submit" class="submit-btn" id="submitBtn">
            <span class="btn-text">Enviar Mensaje</span>
            <span class="btn-loading" style="display: none;">
                <i class="fas fa-spinner fa-spin"></i> Enviando...
            </span>
        </button>
    </form>
    <div id="form-success" class="success-message" style="display: none;">
        <i class="fas fa-check-circle"></i>
        <p>¡Mensaje enviado correctamente! Te responderé pronto.</p>
    </div>
    <div id="form-error" class="error-message-global" style="display: none;">
        <i class="fas fa-exclamation-circle"></i>
        <p>Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>
    </div>
</div>
```

### 2. **pages/contacto.html** - Líneas 33-71
Reemplazar la sección del formulario con el mismo código de arriba.

### 3. **styles.css** - Añadir al final del archivo:

```css
.submit-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
}

/* Error and Success Messages */
.error-message {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: none;
}

.error-message.show {
    display: block;
}

.form-group input.error,
.form-group textarea.error {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.form-group input.success,
.form-group textarea.success {
    border-color: #27ae60;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
}

.success-message {
    background: #d5f4e6;
    border: 1px solid #27ae60;
    color: #27ae60;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.error-message-global {
    background: #fdf2f2;
    border: 1px solid #e74c3c;
    color: #e74c3c;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
```

### 4. **script.js** - Añadir al final del archivo:

```javascript
// Contact form handling with validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            message: 'El nombre debe tener entre 2 y 50 caracteres'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Por favor ingresa un email válido'
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 100,
            message: 'El asunto debe tener entre 5 y 100 caracteres'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'El mensaje debe tener entre 10 y 1000 caracteres'
        }
    };

    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return true;

        if (rules.required && (!value || value.trim() === '')) {
            return 'Este campo es obligatorio';
        }

        if (rules.minLength && value.length < rules.minLength) {
            return rules.message;
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            return rules.message;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            return rules.message;
        }

        return null;
    }

    // Show field error
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field && errorElement) {
            field.classList.add('error');
            field.classList.remove('success');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    // Clear field error
    function clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field && errorElement) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    }

    // Show success message
    function showSuccessMessage() {
        const successElement = document.getElementById('form-success');
        const errorElement = document.getElementById('form-error');
        
        if (successElement) {
            successElement.style.display = 'flex';
        }
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Show error message
    function showErrorMessage() {
        const successElement = document.getElementById('form-success');
        const errorElement = document.getElementById('form-error');
        
        if (successElement) {
            successElement.style.display = 'none';
        }
        if (errorElement) {
            errorElement.style.display = 'flex';
        }
    }

    // Hide all messages
    function hideMessages() {
        const successElement = document.getElementById('form-success');
        const errorElement = document.getElementById('form-error');
        
        if (successElement) {
            successElement.style.display = 'none';
        }
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                const error = validateField(fieldName, this.value);
                if (error) {
                    showFieldError(fieldName, error);
                } else {
                    clearFieldError(fieldName);
                }
            });

            field.addEventListener('input', function() {
                const error = validateField(fieldName, this.value);
                if (!error) {
                    clearFieldError(fieldName);
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        hideMessages();

        let isValid = true;
        const formData = {};

        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                const value = field.value.trim();
                const error = validateField(fieldName, value);
                
                if (error) {
                    showFieldError(fieldName, error);
                    isValid = false;
                } else {
                    clearFieldError(fieldName);
                    formData[fieldName] = value;
                }
            }
        });

        if (!isValid) {
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Form data:', formData);
            showSuccessMessage();
            contactForm.reset();
            
            Object.keys(validationRules).forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field) {
                    field.classList.remove('error', 'success');
                }
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorMessage();
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    });
});
```

## 🚀 **INSTRUCCIONES PARA APLICAR LOS CAMBIOS:**

1. **Abre cada archivo** en tu editor
2. **Reemplaza las secciones** indicadas con el código proporcionado
3. **Guarda los archivos**
4. **Haz commit y push** manualmente:
   ```bash
   git add .
   git commit -m "Mejorar formulario de contacto"
   git push origin main
   ```

## ✅ **RESULTADO ESPERADO:**

- ✅ Campo "Asunto" añadido
- ✅ Validación en tiempo real
- ✅ Mensajes de error específicos
- ✅ Estados visuales (bordes rojos/verdes)
- ✅ Botón con spinner al enviar
- ✅ Notificaciones de éxito/error

¡Una vez aplicados estos cambios, tu formulario estará completamente funcional!
