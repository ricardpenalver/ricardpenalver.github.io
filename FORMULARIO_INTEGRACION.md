# 📧 Integración del Formulario de Contacto

## ✅ **Formulario Mejorado Implementado**

He mejorado tu formulario de contacto existente con las siguientes características:

### **🎯 Nuevas Funcionalidades:**

1. **✅ Validación en tiempo real** - Los campos se validan mientras escribes
2. **🔍 Validación robusta** - Reglas específicas para cada campo
3. **💬 Mensajes de error claros** - Feedback inmediato al usuario
4. **🎨 Estados visuales** - Campos con borde rojo/verde según validación
5. **⏳ Estado de carga** - Botón con spinner durante envío
6. **🎉 Notificaciones** - Mensajes de éxito y error
7. **📱 Responsive** - Funciona perfectamente en móviles

### **📋 Campos del Formulario:**

- **Nombre** (2-50 caracteres)
- **Email** (formato válido)
- **Asunto** (5-100 caracteres) - *Nuevo campo añadido*
- **Mensaje** (10-1000 caracteres)

---

## 🔧 **Integración con Servicios de Email**

Para conectar el formulario con un servicio real de email, tienes varias opciones:

### **Opción 1: Formspree (Recomendado - Gratis)**

1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia el endpoint que te proporcionan
5. Reemplaza la simulación en `script.js`:

```javascript
// En lugar de la simulación actual:
await new Promise(resolve => setTimeout(resolve, 2000));

// Usa esto:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
});

if (!response.ok) {
    throw new Error('Error al enviar el formulario');
}
```

### **Opción 2: EmailJS (Gratis)**

1. Ve a [emailjs.com](https://emailjs.com)
2. Crea una cuenta gratuita
3. Configura tu servicio de email (Gmail, Outlook, etc.)
4. Añade el script de EmailJS a tu HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

5. Reemplaza la lógica de envío en `script.js`:

```javascript
// Inicializar EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

// En el try block del formulario:
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
```

### **Opción 3: Netlify Forms (Si usas Netlify)**

1. Añade `netlify` al atributo del formulario:

```html
<form id="contactForm" novalidate netlify>
```

2. Netlify procesará automáticamente los envíos

### **Opción 4: Backend Personalizado**

Si tienes un servidor backend, puedes crear un endpoint para procesar los formularios:

```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
});
```

---

## 🎨 **Personalización Adicional**

### **Cambiar Colores:**
Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2c3e50;    /* Color principal */
    --accent-color: #3498db;     /* Color de acento */
    --error-color: #e74c3c;      /* Color de error */
    --success-color: #27ae60;    /* Color de éxito */
}
```

### **Añadir Más Campos:**
1. Añade el campo HTML
2. Añade las reglas de validación en `validationRules`
3. El JavaScript se adaptará automáticamente

### **Cambiar Mensajes:**
Modifica los mensajes en el objeto `validationRules` en `script.js`

---

## 🚀 **Próximos Pasos**

1. **Elige un servicio de email** (recomiendo Formspree para empezar)
2. **Configura el endpoint** en el JavaScript
3. **Prueba el formulario** en tu sitio web
4. **Personaliza los estilos** si lo deseas

---

## 📞 **Soporte**

Si necesitas ayuda con la integración o tienes alguna pregunta, no dudes en contactarme. El formulario está listo para usar y solo necesita la conexión con el servicio de email que elijas.

¡Tu formulario de contacto ahora tiene una experiencia de usuario profesional y moderna! 🎉
