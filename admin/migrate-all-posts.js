#!/usr/bin/env node
/**
 * Script de migración completo: convierte TODOS los posts HTML del blog a Markdown
 * Uso: node migrate-all-posts.js
 */

const fs = require('fs');
const path = require('path');

// Directorios
const BLOG_DIR = path.join(__dirname, '..', 'blog');
const OUTPUT_DIR = path.join(__dirname, '..', 'content', 'posts');
const BLOG_DATA_PATH = path.join(BLOG_DIR, 'blog-data.js');

// Archivos a ignorar
const IGNORE_FILES = ['index.html', 'blog-data.js', 'header.html', 'footer.html', 'navigation.html'];

// Cargar blog-data.js para obtener metadatos
function loadBlogData() {
    try {
        const content = fs.readFileSync(BLOG_DATA_PATH, 'utf8');
        const match = content.match(/const blogArticles = (\[[\s\S]*?\]);/);
        if (!match) return {};

        const articles = eval(match[1]);
        const map = {};
        for (const article of articles) {
            if (article.filename) {
                map[article.filename] = article;
            }
        }
        return map;
    } catch (e) {
        console.error('Error cargando blog-data.js:', e.message);
        return {};
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

// Extraer título del HTML
function extractTitle(html, filename) {
    // Intentar desde <title>
    const titleMatch = html.match(/<title>([^<]+)/);
    if (titleMatch) {
        let title = titleMatch[1].replace(/ - Ricardo Peñalver.*$/, '').trim();
        if (title) return title;
    }

    // Intentar desde <h1>
    const h1Match = html.match(/<h1[^>]*>([^<]+)/);
    if (h1Match) return h1Match[1].trim();

    // Generar desde filename
    return filename
        .replace('.html', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

// Extraer fecha del HTML
function extractDate(html) {
    // Buscar <time datetime="...">
    const timeMatch = html.match(/<time[^>]*datetime="([^"]+)"/);
    if (timeMatch) {
        const date = timeMatch[1].split(' ')[0].split('T')[0];
        if (date.match(/^\d{4}-\d{2}-\d{2}$/)) return date;
    }

    // Default: fecha actual
    return new Date().toISOString().split('T')[0];
}

// Extraer contenido del artículo
function extractArticleContent(html) {
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
}

// Escapar caracteres especiales en YAML
function escapeYaml(str) {
    if (!str) return '';
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
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Migrar un archivo HTML
function migrateFile(filename, metadata, index, total) {
    const htmlPath = path.join(BLOG_DIR, filename);

    try {
        const html = fs.readFileSync(htmlPath, 'utf8');
        const content = extractArticleContent(html);

        // Si no hay contenido significativo, saltar
        if (content.length < 50) {
            console.log(`⏭️  [${index}/${total}] ${filename} (sin contenido)`);
            return 'skipped';
        }

        const slug = filenameToSlug(filename);
        const title = metadata?.title || extractTitle(html, filename);
        const date = metadata?.date || extractDate(html);
        const category = metadata?.category || 'Sin categoría';

        // Crear frontmatter
        const frontmatter = [
            '---',
            `title: ${escapeYaml(title)}`,
            `date: ${date}`,
            `category: ${escapeYaml(category)}`,
            `slug: ${slug}`,
        ];

        if (metadata?.excerpt) {
            frontmatter.push(`excerpt: ${escapeYaml(metadata.excerpt)}`);
        }

        if (metadata?.image) {
            frontmatter.push(`image: ${escapeYaml(metadata.image)}`);
        }

        frontmatter.push('---', '');

        // Crear archivo Markdown
        const mdContent = frontmatter.join('\n') + '\n' + content;
        const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);

        fs.writeFileSync(outputPath, mdContent, 'utf8');
        console.log(`✅ [${index}/${total}] ${title.substring(0, 50)}...`);
        return 'success';
    } catch (e) {
        console.log(`❌ [${index}/${total}] ${filename}: ${e.message}`);
        return 'error';
    }
}

// Función principal
function main() {
    console.log('🚀 Iniciando migración completa de posts HTML a Markdown...\n');

    // Crear directorio de salida
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Cargar metadatos existentes
    const metadataMap = loadBlogData();
    console.log(`📚 Metadatos cargados: ${Object.keys(metadataMap).length} posts\n`);

    // Listar todos los archivos HTML
    const allFiles = fs.readdirSync(BLOG_DIR)
        .filter(f => f.endsWith('.html') && !IGNORE_FILES.includes(f));

    console.log(`📁 Archivos HTML encontrados: ${allFiles.length}\n`);

    // Migrar cada archivo
    let success = 0, skipped = 0, errors = 0;

    for (let i = 0; i < allFiles.length; i++) {
        const filename = allFiles[i];
        const metadata = metadataMap[filename] || null;
        const result = migrateFile(filename, metadata, i + 1, allFiles.length);

        if (result === 'success') success++;
        else if (result === 'skipped') skipped++;
        else errors++;
    }

    console.log(`\n✨ Migración completada:`);
    console.log(`   ✅ Exitosos: ${success}`);
    console.log(`   ⏭️  Saltados: ${skipped}`);
    console.log(`   ❌ Errores: ${errors}`);
    console.log(`\n📁 Posts guardados en: ${OUTPUT_DIR}`);
}

main();
