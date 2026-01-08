#!/usr/bin/env node
/**
 * Convierte posts Markdown a HTML usando la plantilla del blog
 * Uso: node build-html.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const OUTPUT_DIR = path.join(__dirname, '..', 'blog');

// Plantilla HTML para posts
const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>{{TITLE}} - Ricardo Peñalver García</title>
<meta content="{{EXCERPT}}" name="description"/>
<link href="/styles.css" rel="stylesheet"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>
</head>
<body>
<!-- Navigation -->
<nav class="navbar">
<div class="nav-container">
<a class="logo" href="/">Ricardo Peñalver García</a>
<ul class="nav-menu">
<li><a class="nav-link" href="/">Inicio</a></li>
<li><a class="nav-link" href="/pages/perfil.html">Sobre Mí</a></li>
<li><a class="nav-link" href="/pages/mis-proyectos.html">Proyectos</a></li>
<li><a class="nav-link" href="/blog/">Blog</a></li>
<li><a class="nav-link" href="/pages/contacto.html">Contacto</a></li>
</ul>
<button class="mobile-menu-toggle">☰</button>
</div>
</nav>
<!-- Main Content -->
<main class="main-content" style="margin-top: 80px; padding: 2rem 0;">
<div class="container">
<article class="content-article">
<header class="article-header">
<h1 class="article-title">{{TITLE}}</h1>
<div class="article-meta">
<time datetime="{{DATE}}">{{DATE_FORMATTED}}</time>
<span class="category">{{CATEGORY}}</span>
</div>
</header>
<div class="article-content">
{{CONTENT}}
</div>
</article>
</div>
</main>
<!-- Footer -->
<footer class="footer">
<div class="container">
<p>&copy; 2026 Ricardo Peñalver García. Todos los derechos reservados.</p>
<p class="footer-credit">Web diseñada, programada, alojada y mantenida por mi</p>
</div>
</footer>
<script src="/script.js"></script>
</body>
</html>`;

// Parsear frontmatter YAML simple
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return { meta: {}, body: content };

    const meta = {};
    const lines = match[1].split('\n');

    for (const line of lines) {
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0) {
            const key = line.substring(0, colonIdx).trim();
            let value = line.substring(colonIdx + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            meta[key] = value;
        }
    }

    const body = content.substring(match[0].length).trim();
    return { meta, body };
}

// Convertir Markdown a HTML
function markdownToHtml(md) {
    let html = md;

    // Headers
    html = html.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure><img src="$2" alt="$1"/><figcaption>$1</figcaption></figure>');

    // Code blocks
    html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Blockquotes
    html = html.replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>');

    // Unordered lists
    html = html.replace(/^-\s+(.*)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Paragraphs - wrap lines that aren't already HTML
    const lines = html.split('\n\n');
    html = lines.map(block => {
        block = block.trim();
        if (!block) return '';
        if (block.startsWith('<')) return block;
        return `<p>${block.replace(/\n/g, ' ')}</p>`;
    }).join('\n\n');

    return html;
}

// Formatear fecha
function formatDate(dateStr) {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const date = new Date(dateStr);
    return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

// Procesar un post
function buildPost(mdFile) {
    const filePath = path.join(POSTS_DIR, mdFile);
    const content = fs.readFileSync(filePath, 'utf8');
    const { meta, body } = parseFrontmatter(content);

    const slug = meta.slug || mdFile.replace('.md', '');
    const htmlContent = markdownToHtml(body);

    let html = HTML_TEMPLATE
        .replace(/\{\{TITLE\}\}/g, meta.title || 'Sin título')
        .replace(/\{\{EXCERPT\}\}/g, (meta.excerpt || '').substring(0, 160))
        .replace(/\{\{DATE\}\}/g, meta.date || '')
        .replace(/\{\{DATE_FORMATTED\}\}/g, formatDate(meta.date))
        .replace(/\{\{CATEGORY\}\}/g, meta.category || '')
        .replace(/\{\{CONTENT\}\}/g, htmlContent);

    const outputPath = path.join(OUTPUT_DIR, `${slug}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');

    return slug;
}

// Función principal
function main() {
    console.log('🔨 Construyendo posts HTML desde Markdown...\n');

    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`❌ Directorio no encontrado: ${POSTS_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    console.log(`📁 Encontrados ${files.length} archivos .md\n`);

    let count = 0;
    for (const file of files) {
        try {
            const slug = buildPost(file);
            console.log(`✅ ${slug}.html`);
            count++;
        } catch (e) {
            console.error(`❌ ${file}: ${e.message}`);
        }
    }

    console.log(`\n✨ Generados ${count} archivos HTML en ${OUTPUT_DIR}`);
}

main();
