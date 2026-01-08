# Ricardo Peñalver García - Web Personal

## 📋 Resumen Ejecutivo

Sitio web personal estático de **Ricardo Peñalver García**, profesional en transformación digital de Administraciones Públicas. Funciona como portfolio profesional y blog personal.

### URLs del Proyecto
| Entorno | URL |
|---------|-----|
| **GitHub Pages** | [ricardpenalver.github.io](https://ricardpenalver.github.io) |
| **Vercel** | [ricardpenalver.vercel.app](https://ricardpenalver.vercel.app) |
| **Repositorio** | [github.com/ricardpenalver/ricardpenalver.github.io](https://github.com/ricardpenalver/ricardpenalver.github.io) |

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend**: HTML5, CSS3, JavaScript ES6 (Vanilla)
- **Estilos**: CSS personalizado con variables CSS y diseño responsivo
- **Iconos**: Font Awesome 6.0.0 (CDN)
- **Hosting**: GitHub Pages + Vercel (despliegue automático desde GitHub)
- **Control de versiones**: Git + GitHub

### Características
| Característica | Estado |
|----------------|--------|
| Sitio estático sin backend | ✅ |
| Responsive design | ✅ |
| SEO optimizado | ✅ |
| Progressive Enhancement | ✅ |
| Carga rápida (<2s) | ✅ |
| Headers de seguridad HTTP | ✅ |
| Dependencias npm | 0 |

---

## 📁 Estructura del Proyecto

```
ricardpenalver.github.io/
├── index.html                 # Página principal
├── styles.css                 # Estilos CSS (~28KB)
├── script.js                  # JavaScript interactivo (~12KB)
├── package.json               # Configuración (sin dependencias)
├── vercel.json                # Configuración de Vercel
│
├── assets/                    # Recursos estáticos
│   ├── css/                   # Estilos adicionales
│   ├── images/                # Imágenes del sitio
│   └── media/                 # Otros recursos multimedia
│
├── pages/                     # Páginas estáticas (32 archivos)
│   ├── contacto.html          # Formulario de contacto
│   ├── experiencia-profesional.html
│   ├── competencias.html
│   ├── formación-académica.html
│   ├── ponencias.html
│   ├── publicaciones.html
│   ├── aficiones.html
│   ├── idiomas.html
│   ├── ensenar.html           # Habilidad: Enseñanza
│   ├── gestionar.html         # Habilidad: Gestión
│   ├── facilitar.html         # Habilidad: Facilitación
│   ├── emprender.html         # Habilidad: Emprendimiento
│   ├── programar.html         # Habilidad: Programación
│   └── comunicar.html         # Habilidad: Comunicación
│
├── blog/                      # Blog (~285 posts)
│   ├── index.html             # Índice del blog
│   ├── blog-data.js           # Datos del blog (~64KB)
│   └── *.html                 # Posts individuales
│
└── migration_tools/           # Herramientas de migración desde WordPress
    ├── wordpress_to_static.py
    ├── post_process.py
    └── requirements.txt
```

---

## 🎨 Diseño y UX

### Paleta de Colores
```css
--primary-color: #2c3e50     /* Azul oscuro principal */
--secondary-color: #34495e   /* Azul gris secundario */
--accent-color: #3498db      /* Azul brillante para acentos */
--text-light: #ecf0f1        /* Texto claro */
--text-dark: #2c3e50         /* Texto oscuro */
```

### Secciones de la Home
1. **Hero** - Presentación como "Humanista tecnológico"
2. **Sobre Mí** - Experiencia en transformación digital
3. **¿Qué sé hacer?** - 6 habilidades (Enseñar, Gestionar, Facilitar, Emprender, Programar, Comunicar)
4. **Blog** - Posts destacados con miniaturas
5. **Proyectos** - Portfolio de trabajos
6. **CTA de Contacto** - Datos de contacto

### Navegación "Sobre mí" (Dropdown)
- Experiencia Profesional
- Competencias
- Formación Académica
- Ponencias
- Publicaciones
- Aficiones
- Idiomas

---

## 🚀 Despliegue

### Flujo de Trabajo
```bash
# 1. Verificar cambios
git status

# 2. Añadir y commitear
git add .
git commit -m "Descripción del cambio"

# 3. Push (despliega automáticamente en ambos hostings)
git push origin main
```

### Tiempos de Propagación
- **GitHub Pages**: 30-60 segundos
- **Vercel**: 1-2 minutos

### Configuración de Vercel
```json
{
  "buildCommand": "echo 'No build required for static site'",
  "outputDirectory": ".",
  "installCommand": "echo 'No dependencies to install'",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

---

## 🛠️ Desarrollo Local

```bash
# Servidor de desarrollo con Python
python -m http.server 8000

# O con Node.js
npx serve .

# Luego visitar http://localhost:8000
```

---

## 📝 Flujo para Publicar Posts

La actividad principal del sitio es publicar posts (~1 al mes):

### 1. Crear el Post
```bash
touch blog/mi-nuevo-post.html
```

### 2. Usar Plantilla Base
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título del Post - Ricardo Peñalver</title>
    <link rel="stylesheet" href="../styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Copiar navegación de otro post existente -->
    
    <main class="blog-post">
        <article>
            <h1>Título del Post</h1>
            <p class="post-meta">Enero 2026</p>
            <p>Contenido del post...</p>
        </article>
    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 Ricardo Peñalver García. Todos los derechos reservados.</p>
            <p class="footer-credit">Web diseñada, programada, alojada y mantenida por 
               <a href="https://linkedin.com/in/ricardpenalver" target="_blank" 
                  rel="noopener noreferrer" class="footer-link">mí</a>
            </p>
        </div>
    </footer>
</body>
</html>
```

### 3. (Opcional) Destacar en Home
Actualizar la sección Blog en `index.html` si quieres mostrar el post en portada.

### 4. Desplegar
```bash
git add .
git commit -m "Nuevo post: Título del post"
git push origin main
```

---

## 🔧 Personalización

### Agregar Nueva Página
1. Crear archivo HTML en `/pages/`
2. Copiar estructura de navegación de página existente
3. Commit y push

### Modificar Estilos
- Variables CSS en `:root` de `styles.css`
- Responsive breakpoints ya configurados

### Sistema de Imágenes del Blog
- Imágenes asignadas automáticamente por categoría
- Fallback a imagen genérica si no hay categoría
- Configurado en `blog/blog-data.js`

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Páginas totales | ~320 |
| Tamaño CSS | ~28KB |
| Tamaño JS | ~12KB |
| Posts del blog | ~285 |
| Tiempo de carga | <2 segundos |

---

## 👤 Información del Propietario

**Ricardo Peñalver García**
- **Perfil**: Humanista tecnológico
- **Experiencia**: 15+ años en transformación digital de AAPP
- **Email**: ricardopenalver@icloud.com
- **LinkedIn**: [linkedin.com/in/ricardpenalver](https://linkedin.com/in/ricardpenalver)

---

## 📚 Migración desde WordPress

El blog fue migrado desde WordPress usando scripts Python personalizados:

```bash
cd migration_tools
pip install -r requirements.txt
python wordpress_to_static.py webdericardo.WordPress.*.xml
```

---

**Última actualización**: Enero 2026  
**Licencia**: MIT