# WordPress to Static Site Migration Tool

Herramienta automatizada para migrar contenido de WordPress a un sitio estático HTML.

## 🚀 Características

- ✅ **Migración automática** de páginas y posts
- ✅ **Descarga automática** de imágenes
- ✅ **Optimización de contenido** HTML
- ✅ **Generación de navegación** automática
- ✅ **Blog index** con lista de posts
- ✅ **Responsive design** integrado
- ✅ **SEO optimizado** con meta tags

## 📋 Requisitos

- Python 3.7+
- Acceso al admin de WordPress
- Conexión a internet (para descargar imágenes)

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
cd migration_tools
python setup.py
```

2. **O instalar manualmente:**
```bash
pip install -r requirements.txt
```

## 📖 Uso

### Paso 1: Exportar WordPress

1. Ve a tu admin de WordPress
2. **Herramientas > Exportar**
3. Selecciona **"Todo el contenido"**
4. Haz clic en **"Descargar archivo de exportación"**
5. Guarda el archivo XML (ej: `wordpress_export.xml`)

### Paso 2: Ejecutar migración

```bash
python wordpress_to_static.py wordpress_export.xml
```

### Paso 3: Revisar resultados

El script creará:
- `pages/` - Páginas estáticas
- `blog/` - Posts del blog
- `assets/images/` - Imágenes descargadas
- `migration_report.json` - Reporte de migración

## 📁 Estructura generada

```
├── pages/
│   ├── about.html
│   ├── services.html
│   └── contact.html
├── blog/
│   ├── index.html          # Lista de posts
│   ├── post-1.html
│   ├── post-2.html
│   └── ...
├── assets/
│   └── images/
│       ├── image1.jpg
│       ├── image2.png
│       └── ...
└── migration_report.json
```

## ⚙️ Opciones avanzadas

### Migrar a directorio específico
```bash
python wordpress_to_static.py wordpress_export.xml /path/to/output
```

### Solo páginas (sin posts)
Modifica el script para filtrar por tipo de contenido.

## 🔧 Personalización

### Modificar plantilla HTML
Edita la función `generate_page_html()` en `wordpress_to_static.py`.

### Cambiar estilos CSS
Los archivos generados usan `/styles.css` - asegúrate de que existe.

### Ajustar navegación
Modifica la lista `nav_items` en `generate_page_html()`.

## 📊 Reporte de migración

El script genera `migration_report.json` con:
- Número de páginas migradas
- Número de posts migradas
- Número de imágenes descargadas
- Errores encontrados
- Timestamp de migración

## 🐛 Solución de problemas

### Error: "No module named 'beautifulsoup4'"
```bash
pip install beautifulsoup4 lxml requests python-frontmatter html2text Pillow
```

### Error: "Permission denied"
Asegúrate de tener permisos de escritura en el directorio de salida.

### Imágenes no se descargan
- Verifica la conexión a internet
- Algunas URLs pueden estar rotas
- Revisa el reporte de errores

### Contenido HTML mal formateado
- El script limpia automáticamente el HTML
- Revisa el archivo generado manualmente si es necesario

## 📝 Notas importantes

1. **Backup**: Siempre haz backup antes de migrar
2. **Revisión**: Revisa el contenido migrado manualmente
3. **Imágenes**: Algunas imágenes pueden fallar al descargar
4. **Enlaces**: Los enlaces internos pueden necesitar ajuste manual
5. **SEO**: Revisa las meta tags generadas

## 🆘 Soporte

Si encuentras problemas:
1. Revisa el archivo `migration_report.json`
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que el archivo XML sea válido
4. Revisa los permisos de archivos

## 📄 Licencia

Este script es de código abierto. Úsalo libremente para tus proyectos.
