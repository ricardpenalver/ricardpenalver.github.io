#!/usr/bin/env node
/**
 * Genera blog-data.js desde los archivos Markdown en content/posts/
 * Uso: node build-blog-data.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const OUTPUT_FILE = path.join(__dirname, '..', 'blog', 'blog-data.js');

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
            // Eliminar comillas
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

// Generar excerpt del body si no existe
function generateExcerpt(body, maxLength = 200) {
    // Eliminar markdown headers y links
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

// Procesar todos los posts
function buildBlogData() {
    console.log('🔨 Generando blog-data.js desde archivos Markdown...\n');

    if (!fs.existsSync(POSTS_DIR)) {
        console.error(`❌ Directorio no encontrado: ${POSTS_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    console.log(`📁 Encontrados ${files.length} archivos .md\n`);

    const articles = [];
    let draftsCount = 0;

    for (const file of files) {
        const filePath = path.join(POSTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { meta, body } = parseFrontmatter(content);

        // Ignorar posts marcados como borrador
        if (meta.draft === 'true' || meta.draft === true) {
            draftsCount++;
            console.log(`   📝 Borrador ignorado: ${meta.title || file}`);
            continue;
        }

        const slug = meta.slug || file.replace('.md', '');

        articles.push({
            title: meta.title || 'Sin título',
            filename: `${slug}.html`,
            excerpt: meta.excerpt || generateExcerpt(body),
            date: meta.date || new Date().toISOString().split('T')[0],
            category: meta.category || 'Sin categoría',
            image: meta.image || null
        });
    }

    if (draftsCount > 0) {
        console.log(`\n📋 ${draftsCount} borrador(es) ignorado(s)\n`);
    }

    // Ordenar por fecha descendente
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generar JavaScript
    const jsContent = `// Blog articles data - Generado automáticamente
// Última actualización: ${new Date().toISOString()}
// Total de posts: ${articles.length}

const blogArticles = ${JSON.stringify(articles, null, 4)};
`;

    fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');
    console.log(`✅ Generado: ${OUTPUT_FILE}`);
    console.log(`   📝 Total posts: ${articles.length}`);
}

buildBlogData();
