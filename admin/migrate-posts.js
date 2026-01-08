#!/usr/bin/env node
/**
 * Script de migración: convierte posts HTML del blog a Markdown
 * Uso: node migrate-posts.js
 */

const fs = require('fs');
const path = require('path');

// Directorios
const BLOG_DIR = path.join(__dirname, '..', 'blog');
const OUTPUT_DIR = path.join(__dirname, '..', 'content', 'posts');
const BLOG_DATA_PATH = path.join(BLOG_DIR, 'blog-data.js');

// Cargar blog-data.js para obtener metadatos
function loadBlogData() {
    const content = fs.readFileSync(BLOG_DATA_PATH, 'utf8');
    // Extraer el array blogArticles
    const match = content.match(/const blogArticles = (\[[\s\S]*?\]);/);
    if (!match) {
        console.error('No se pudo encontrar blogArticles en blog-data.js');
        return [];
    }
    try {
        // Evaluar el array (cuidado: solo para datos confiables)
        return eval(match[1]);
    } catch (e) {
        console.error('Error parseando blog-data.js:', e);
        return [];
    }
}

// Convertir HTML a Markdown básico
function htmlToMarkdown(html) {
    if (!html) return '';

    let md = html;

    // Eliminar comentarios de WordPress
    md = md.replace(/<!--\s*wp:\w+[^>]*-->/g, '');
    md = md.replace(/<!--\s*\/wp:\w+\s*-->/g, '');

    // Convertir encabezados
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');

    // Convertir párrafos
    md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

    // Convertir negritas y cursivas
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

    // Convertir enlaces
    md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

    // Convertir listas
    md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
        return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n') + '\n';
    });
    md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
        let i = 1;
        return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => `${i++}. $1\n`) + '\n';
    });

    // Convertir imágenes
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)');

    // Convertir blockquotes
    md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (match, content) => {
        return content.split('\n').map(line => `> ${line}`).join('\n') + '\n\n';
    });

    // Convertir código
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
    md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n');

    // Eliminar tags HTML restantes
    md = md.replace(/<br\s*\/?>/gi, '\n');
    md = md.replace(/<[^>]+>/g, '');

    // Decodificar entidades HTML
    md = md.replace(/&amp;/g, '&');
    md = md.replace(/&lt;/g, '<');
    md = md.replace(/&gt;/g, '>');
    md = md.replace(/&quot;/g, '"');
    md = md.replace(/&nbsp;/g, ' ');
    md = md.replace(/&#8217;/g, "'");
    md = md.replace(/&#8220;/g, '"');
    md = md.replace(/&#8221;/g, '"');
    md = md.replace(/&copy;/g, '©');

    // Limpiar espacios múltiples y líneas vacías
    md = md.replace(/\n{3,}/g, '\n\n');
    md = md.trim();

    return md;
}

// Extraer contenido del artículo de un archivo HTML
function extractArticleContent(htmlPath) {
    try {
        const html = fs.readFileSync(htmlPath, 'utf8');

        // Buscar el contenido dentro de article-content
        const articleMatch = html.match(/<div class="article-content">([\s\S]*?)<\/div>\s*<\/article>/);
        if (articleMatch) {
            return htmlToMarkdown(articleMatch[1]);
        }

        // Fallback: buscar main content
        const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
        if (mainMatch) {
            return htmlToMarkdown(mainMatch[1]);
        }

        return '';
    } catch (e) {
        console.error(`Error leyendo ${htmlPath}:`, e.message);
        return '';
    }
}

// Escapar caracteres especiales en YAML
function escapeYaml(str) {
    if (!str) return '';
    // Si contiene caracteres especiales, envolver en comillas
    if (/[:\-\#\[\]\{\}\,\&\*\?\|\>\<\=\!\%\@\`\"\'\\]/.test(str) || str.includes('\n')) {
        return `"${str.replace(/"/g, '\\"')}"`;
    }
    return str;
}

// Generar slug desde filename
function filenameToSlug(filename) {
    return filename
        .replace('.html', '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Migrar un post
function migratePost(article, index) {
    const htmlPath = path.join(BLOG_DIR, article.filename);

    if (!fs.existsSync(htmlPath)) {
        console.log(`⚠️  No encontrado: ${article.filename}`);
        return false;
    }

    const content = extractArticleContent(htmlPath);
    const slug = filenameToSlug(article.filename);

    // Crear frontmatter
    const frontmatter = [
        '---',
        `title: ${escapeYaml(article.title)}`,
        `date: ${article.date || new Date().toISOString().split('T')[0]}`,
        `category: ${escapeYaml(article.category || 'Sin categoría')}`,
        `slug: ${slug}`,
    ];

    if (article.excerpt) {
        frontmatter.push(`excerpt: ${escapeYaml(article.excerpt)}`);
    }

    if (article.image) {
        frontmatter.push(`image: ${escapeYaml(article.image)}`);
    }

    frontmatter.push('---', '');

    // Crear archivo Markdown
    const mdContent = frontmatter.join('\n') + '\n' + content;
    const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);

    fs.writeFileSync(outputPath, mdContent, 'utf8');
    console.log(`✅ [${index + 1}] ${article.title}`);
    return true;
}

// Función principal
function main() {
    console.log('🚀 Iniciando migración de posts HTML a Markdown...\n');

    // Crear directorio de salida
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Cargar datos del blog
    const articles = loadBlogData();
    console.log(`📚 Encontrados ${articles.length} posts en blog-data.js\n`);

    // Filtrar duplicados por filename
    const uniqueArticles = [];
    const seen = new Set();
    for (const article of articles) {
        if (!seen.has(article.filename)) {
            seen.add(article.filename);
            uniqueArticles.push(article);
        }
    }
    console.log(`📝 Posts únicos: ${uniqueArticles.length}\n`);

    // Migrar cada post
    let success = 0;
    let failed = 0;

    for (let i = 0; i < uniqueArticles.length; i++) {
        if (migratePost(uniqueArticles[i], i)) {
            success++;
        } else {
            failed++;
        }
    }

    console.log(`\n✨ Migración completada:`);
    console.log(`   ✅ Exitosos: ${success}`);
    console.log(`   ⚠️  Fallidos: ${failed}`);
    console.log(`\n📁 Posts guardados en: ${OUTPUT_DIR}`);
}

main();
