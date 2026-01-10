#!/usr/bin/env node
/**
 * Actualiza la sección de blog en index.html con los 3 posts más recientes
 * Uso: node build-homepage.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const INDEX_FILE = path.join(__dirname, '..', 'index.html');

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

// Generar excerpt del body
function generateExcerpt(body, maxLength = 120) {
    let text = body
        .replace(/^#+\s+.*$/gm, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
        .replace(/\n+/g, ' ')
        .trim();

    if (text.length > maxLength) {
        text = text.substring(0, maxLength) + '...';
    }
    return text;
}

// Formatear fecha para mostrar
function formatDate(dateStr) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date(dateStr);
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Obtener los 3 posts más recientes
function getLatestPosts(count = 3) {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

    const posts = files.map(file => {
        const filePath = path.join(POSTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { meta, body } = parseFrontmatter(content);

        // Determinar la ruta de la imagen
        let imagePath = meta.image || '';
        if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
            imagePath = `/blog/${imagePath}`;
        } else if (!imagePath) {
            imagePath = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=300&fit=crop&auto=format';
        }

        return {
            title: meta.title || 'Sin título',
            slug: meta.slug || file.replace('.md', ''),
            date: meta.date || '1970-01-01',
            excerpt: meta.excerpt || generateExcerpt(body),
            image: imagePath,
            category: meta.category || 'General'
        };
    });

    // Ordenar por fecha descendente
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return posts.slice(0, count);
}

// Generar HTML de un blog card
function generateBlogCard(post) {
    return `                    <a href="blog/${post.slug}.html" class="blog-card">
                        <div class="blog-image">
                            <img src="${post.image}" alt="${post.title}" class="blog-card-image">
                        </div>
                        <div class="blog-content">
                            <h3 class="blog-title">${post.title}</h3>
                            <p class="blog-excerpt">${post.excerpt}</p>
                            <span class="blog-date">${formatDate(post.date)}</span>
                        </div>
                    </a>`;
}

// Actualizar index.html
function updateHomepage() {
    console.log('🏠 Actualizando homepage con posts recientes...\n');

    const posts = getLatestPosts(3);
    console.log('📝 Posts más recientes:');
    posts.forEach((p, i) => console.log(`   ${i + 1}. ${p.title} (${p.date})`));

    // Generar HTML de los blog cards
    const blogCardsHtml = posts.map(generateBlogCard).join('\n');

    // Leer index.html
    let indexHtml = fs.readFileSync(INDEX_FILE, 'utf8');

    // Buscar y reemplazar la sección de blog-grid
    const blogGridRegex = /(<div class="blog-grid">)([\s\S]*?)(<\/div>\s*<div class="blog-cta">)/;
    const match = indexHtml.match(blogGridRegex);

    if (!match) {
        console.error('❌ No se encontró la sección blog-grid en index.html');
        return false;
    }

    const newBlogSection = `$1\n${blogCardsHtml}\n                $3`;
    indexHtml = indexHtml.replace(blogGridRegex, newBlogSection);

    // Guardar index.html
    fs.writeFileSync(INDEX_FILE, indexHtml, 'utf8');
    console.log('\n✅ index.html actualizado con los 3 posts más recientes');

    return true;
}

updateHomepage();
