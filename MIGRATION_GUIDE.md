# Guía de Migración WordPress → Jekyll

Esta guía te ayudará a migrar tu sitio WordPress a Jekyll paso a paso.

## 📋 **Preparación**

### 1. Exportar contenido de WordPress

#### Opción A: Exportación completa (recomendada)
1. Ve a tu panel de administración de WordPress
2. Navega a **Herramientas → Exportar**
3. Selecciona **"Todo el contenido"**
4. Haz clic en **"Descargar archivo de exportación"**
5. Guarda el archivo XML (ej: `wordpress_export.xml`)

#### Opción B: Exportación manual
Si no tienes acceso al panel de administración:
1. Copia el contenido de cada post/página
2. Guarda las imágenes manualmente
3. Anota las fechas de publicación

### 2. Preparar el entorno

```bash
# Instalar dependencias de Python
pip install -r migration_scripts/requirements.txt

# Crear directorio para archivos de migración
mkdir migration_files
```

## 🚀 **Proceso de Migración**

### Método 1: Migración Automatizada (con XML)

1. **Coloca el archivo XML en el directorio raíz:**
   ```bash
   cp wordpress_export.xml .
   ```

2. **Edita el script de migración:**
   ```python
   # En migration_scripts/wordpress_to_jekyll.py
   XML_FILE = "wordpress_export.xml"
   BASE_URL = "https://tu-sitio-wordpress.com"  # Cambia por tu URL
   ```

3. **Ejecuta la migración:**
   ```bash
   python migration_scripts/wordpress_to_jekyll.py
   ```

### Método 2: Migración Manual

1. **Para cada post de WordPress:**
   - Copia el título y contenido
   - Convierte HTML a Markdown usando el script simple
   - Crea archivo en `_posts/` con formato `YYYY-MM-DD-titulo.md`

2. **Para cada página:**
   - Copia el título y contenido
   - Crea archivo en `_pages/` con formato `titulo.md`

3. **Para las imágenes:**
   - Descarga todas las imágenes
   - Colócalas en `assets/images/`
   - Actualiza las rutas en el contenido

## 📁 **Estructura de Archivos**

```
ricardpenalver.github.io/
├── _posts/                    # Posts del blog
│   ├── 2024-01-15-post-1.md
│   └── 2024-01-16-post-2.md
├── _pages/                    # Páginas estáticas
│   ├── about.md
│   └── contact.md
├── assets/
│   └── images/               # Imágenes migradas
│       ├── imagen1.jpg
│       └── imagen2.png
└── migration_scripts/        # Scripts de migración
    ├── wordpress_to_jekyll.py
    ├── simple_migration.py
    └── requirements.txt
```

## 🔧 **Conversión de Contenido**

### HTML a Markdown

El script convierte automáticamente:
- `<h1>` → `# Título`
- `<h2>` → `## Subtítulo`
- `<p>` → Párrafo normal
- `<strong>` → `**negrita**`
- `<em>` → `*cursiva*`
- `<a href="...">` → `[texto](url)`
- `<img src="...">` → `![alt](ruta)`

### Front Matter

Cada archivo incluye metadatos:

**Para posts:**
```yaml
---
title: "Título del post"
date: 2024-01-15 10:00:00 +0100
layout: single
author_profile: true
read_time: true
share: true
related: true
---
```

**Para páginas:**
```yaml
---
layout: single
title: "Título de la página"
permalink: /url-de-la-pagina/
author_profile: true
---
```

## 🖼️ **Migración de Imágenes**

### Opción 1: Automática (con script)
- El script descarga automáticamente las imágenes
- Las guarda en `assets/images/`
- Actualiza las rutas en el contenido

### Opción 2: Manual
1. Descarga todas las imágenes de WordPress
2. Colócalas en `assets/images/`
3. Actualiza manualmente las rutas en el contenido:
   - De: `https://tu-sitio.com/wp-content/uploads/imagen.jpg`
   - A: `/assets/images/imagen.jpg`

## ✅ **Verificación Post-Migración**

1. **Revisar archivos generados:**
   ```bash
   ls -la _posts/
   ls -la _pages/
   ls -la assets/images/
   ```

2. **Probar el sitio localmente:**
   ```bash
   jekyll serve
   ```

3. **Verificar en el navegador:**
   - Abre `http://localhost:4000`
   - Revisa que todos los posts y páginas se vean correctamente
   - Verifica que las imágenes se carguen

4. **Hacer commit y push:**
   ```bash
   git add .
   git commit -m "Migración de WordPress completada"
   git push origin main
   ```

## 🎯 **Consejos y Mejores Prácticas**

### SEO
- Mantén las URLs originales usando `permalink` en el front matter
- Configura redirecciones si es necesario
- Actualiza los meta tags

### Contenido
- Revisa manualmente el contenido convertido
- Ajusta el formato si es necesario
- Agrega categorías y tags relevantes

### Imágenes
- Optimiza las imágenes antes de subirlas
- Usa formatos modernos (WebP cuando sea posible)
- Mantén nombres de archivo descriptivos

## 🆘 **Solución de Problemas**

### Error: "Layout 'single' does not exist"
- Asegúrate de que Minimal Mistakes esté configurado correctamente
- Verifica el `_config.yml`

### Imágenes no se cargan
- Verifica las rutas en el contenido
- Asegúrate de que las imágenes estén en `assets/images/`

### Contenido mal formateado
- Revisa la conversión HTML → Markdown
- Ajusta manualmente si es necesario

## 📞 **Soporte**

Si encuentras problemas durante la migración:
1. Revisa los logs de Jekyll
2. Verifica la sintaxis de los archivos Markdown
3. Consulta la documentación de Minimal Mistakes

¡Buena suerte con tu migración! 🚀
