# Página Web Personal - Ricardo Penalver

¡Bienvenido a mi página web personal! Este sitio está construido con Jekyll y alojado en GitHub Pages.

## 🚀 Características

- **Diseño responsive** con el tema Minimal Mistakes de Jekyll
- **Blog integrado** para compartir artículos y pensamientos
- **Páginas estáticas** para información personal y proyectos
- **Optimización SEO** con sitemap y feed RSS
- **Integración con GitHub** para control de versiones
- **Navegación intuitiva** con menú lateral y breadcrumbs
- **Búsqueda integrada** para encontrar contenido rápidamente
- **Compartir en redes sociales** con botones de compartir
- **Tiempo de lectura** estimado para cada artículo
- **Posts relacionados** para mejorar la navegación

## 📁 Estructura del sitio

```
├── _config.yml          # Configuración principal de Jekyll
├── _pages/              # Páginas estáticas
│   ├── about.md         # Página "Acerca de mí"
│   ├── projects.md      # Página de proyectos
│   └── contact.md       # Página de contacto
├── _posts/              # Artículos del blog
├── assets/              # Recursos estáticos (CSS, imágenes)
├── index.md             # Página principal
└── Gemfile              # Dependencias de Ruby
```

## 🛠️ Desarrollo local

### Prerrequisitos

- Ruby 2.7 o superior
- Bundler gem

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/ricardpenalver/ricardpenalver.github.io.git
cd ricardpenalver.github.io
```

2. Instala las dependencias:
```bash
bundle install
```

3. Ejecuta el servidor local:
```bash
bundle exec jekyll serve
```

4. Abre tu navegador en `http://localhost:4000`

### Comandos útiles

```bash
# Construir el sitio
bundle exec jekyll build

# Servidor con recarga automática
bundle exec jekyll serve --livereload

# Servidor con borradores
bundle exec jekyll serve --drafts
```

## 📝 Agregar contenido

### Nuevo artículo del blog

1. Crea un archivo en `_posts/` con el formato: `YYYY-MM-DD-titulo.md`
2. Incluye el front matter necesario:
```yaml
---
title: "Título del artículo"
date: 2024-01-15 10:00:00 +0100
categories: [Categoría]
tags: [tag1, tag2]
layout: post
---
```

### Nueva página

1. Crea un archivo en `_pages/` con el nombre deseado
2. Incluye el front matter:
```yaml
---
layout: page
title: "Título de la página"
permalink: /url-de-la-pagina/
---
```

## 🎨 Personalización

### Tema

El sitio usa el tema **Minimal Mistakes** de Jekyll. Para personalizar:

1. Modifica `_config.yml` para cambiar colores, fuentes, etc.
2. Cambia el skin en `minimal_mistakes_skin` (opciones: "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise")
3. Crea archivos en `_sass/` para estilos personalizados
4. Sobrescribe layouts en `_layouts/` si es necesario
5. Personaliza la navegación en `_data/navigation.yml`

### Configuración

Edita `_config.yml` para personalizar:
- Información del sitio (título, descripción, URL)
- Información del autor
- Plugins habilitados
- Configuración de paginación

## 🚀 Despliegue

El sitio se despliega automáticamente en GitHub Pages cuando haces push a la rama `main`. No necesitas configuración adicional.

### Despliegue manual

Si prefieres desplegar manualmente:

```bash
bundle exec jekyll build
# Sube el contenido de _site/ a tu servidor
```

## 📚 Recursos útiles

- [Documentación de Jekyll](https://jekyllrb.com/docs/)
- [Tema Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)
- [GitHub Pages](https://pages.github.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Minimal Mistakes Documentation](https://mmistakes.github.io/minimal-mistakes/docs/configuration/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún error o tienes sugerencias:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

- **Email**: ricard@example.com
- **GitHub**: [@ricardpenalver](https://github.com/ricardpenalver)
- **LinkedIn**: [Tu perfil de LinkedIn]

---

*Construido con ❤️ usando Jekyll y GitHub Pages*
