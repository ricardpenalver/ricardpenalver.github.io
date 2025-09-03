#!/usr/bin/env python3
"""
WordPress to Static Site Migration Tool
Migrates WordPress XML export to static HTML files
"""

import xml.etree.ElementTree as ET
import os
import re
import requests
from datetime import datetime
from urllib.parse import urlparse, unquote
import html2text
from bs4 import BeautifulSoup
import json

class WordPressMigrator:
    def __init__(self, xml_file, output_dir="."):
        self.xml_file = xml_file
        self.output_dir = output_dir
        self.pages_dir = os.path.join(output_dir, "pages")
        self.blog_dir = os.path.join(output_dir, "blog")
        self.assets_dir = os.path.join(output_dir, "assets", "images")
        self.media_dir = os.path.join(output_dir, "assets", "media")
        
        # Create directories
        os.makedirs(self.pages_dir, exist_ok=True)
        os.makedirs(self.blog_dir, exist_ok=True)
        os.makedirs(self.assets_dir, exist_ok=True)
        os.makedirs(self.media_dir, exist_ok=True)
        
        # HTML to Markdown converter
        self.h2t = html2text.HTML2Text()
        self.h2t.ignore_links = False
        self.h2t.ignore_images = False
        
        # Statistics
        self.stats = {
            'pages': 0,
            'posts': 0,
            'images': 0,
            'errors': []
        }

    def clean_filename(self, title):
        """Convert title to safe filename"""
        if not title:
            return "sin-titulo"
        
        # Remove HTML tags
        title = re.sub(r'<[^>]+>', '', title)
        # Replace special characters
        title = re.sub(r'[^\w\s-]', '', title)
        # Replace spaces with hyphens
        title = re.sub(r'[-\s]+', '-', title)
        # Remove leading/trailing hyphens
        title = title.strip('-')
        return title.lower() if title else "sin-titulo"

    def clean_content(self, content):
        """Clean and optimize HTML content"""
        if not content:
            return ""
        
        # Parse with BeautifulSoup
        soup = BeautifulSoup(content, 'html.parser')
        
        # Remove WordPress-specific classes and IDs
        for element in soup.find_all(class_=re.compile(r'wp-|align')):
            element.unwrap()
        
        # Clean up images
        for img in soup.find_all('img'):
            # Remove WordPress-specific attributes
            for attr in ['class', 'id', 'width', 'height']:
                if attr in img.attrs:
                    del img.attrs[attr]
            
            # Add responsive class
            img['class'] = 'responsive-image'
            img['loading'] = 'lazy'
        
        # Clean up links
        for link in soup.find_all('a'):
            # Remove WordPress-specific classes
            if 'class' in link.attrs:
                classes = link.attrs['class']
                link.attrs['class'] = [c for c in classes if not c.startswith('wp-')]
                if not link.attrs['class']:
                    del link.attrs['class']
        
        return str(soup)

    def download_image(self, url, filename):
        """Download image from URL"""
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            filepath = os.path.join(self.assets_dir, filename)
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            self.stats['images'] += 1
            return f"assets/images/{filename}"
        except Exception as e:
            self.stats['errors'].append(f"Error downloading {url}: {str(e)}")
            return url

    def process_images(self, content):
        """Process and download images in content"""
        soup = BeautifulSoup(content, 'html.parser')
        
        for img in soup.find_all('img'):
            src = img.get('src')
            if src:
                # Extract filename from URL
                parsed_url = urlparse(src)
                filename = os.path.basename(unquote(parsed_url.path))
                
                # Generate unique filename if needed
                if not filename or '.' not in filename:
                    filename = f"image_{hash(src) % 10000}.jpg"
                
                # Download image
                local_path = self.download_image(src, filename)
                img['src'] = local_path
        
        return str(soup)

    def generate_page_html(self, title, content, post_type, date=None, slug=None):
        """Generate HTML for a page or post"""
        # Clean content
        content = self.clean_content(content)
        content = self.process_images(content)
        
        # Generate navigation
        nav_items = [
            ('Inicio', '/'),
            ('Sobre Mí', '/pages/about.html'),
            ('Proyectos', '/pages/projects.html'),
            ('Blog', '/blog/'),
            ('Contacto', '/pages/contact.html')
        ]
        
        nav_html = '\n'.join([
            f'                <li><a href="{url}" class="nav-link">{"Inicio" if title == "Inicio" else name}</a></li>'
            for name, url in nav_items
        ])
        
        # Generate HTML template
        html_template = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Ricard Penalver</title>
    <meta name="description" content="{title} - Desarrollador Full Stack">
    <link rel="stylesheet" href="/styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="/" class="logo">Ricard Penalver</a>
            <ul class="nav-menu">
{nav_html}
            </ul>
            <button class="mobile-menu-toggle">☰</button>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content" style="margin-top: 80px; padding: 2rem 0;">
        <div class="container">
            <article class="content-article">
                <header class="article-header">
                    <h1 class="article-title">{title}</h1>"""
        
        if date and post_type == 'post':
            html_template += f"""
                    <div class="article-meta">
                        <time datetime="{date}">{datetime.fromisoformat(date.replace('Z', '+00:00')).strftime('%d de %B, %Y')}</time>
                    </div>"""
        
        html_template += f"""
                </header>
                
                <div class="article-content">
                    {content}
                </div>
            </article>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Ricard Penalver. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="/script.js"></script>
</body>
</html>"""
        
        return html_template

    def process_item(self, item):
        """Process a single WordPress item (page or post)"""
        title_element = item.find('title')
        title = title_element.text if title_element is not None and title_element.text else "Sin título"
        
        content_element = item.find('{http://purl.org/rss/1.0/modules/content/}encoded')
        content = content_element.text if content_element is not None and content_element.text else ""
        
        post_type_element = item.find('{http://wordpress.org/export/1.2/}post_type')
        post_type = post_type_element.text if post_type_element is not None and post_type_element.text else "post"
        
        post_date_element = item.find('{http://wordpress.org/export/1.2/}post_date')
        post_date = post_date_element.text if post_date_element is not None and post_date_element.text else None
        
        post_name_element = item.find('{http://wordpress.org/export/1.2/}post_name')
        post_name = post_name_element.text if post_name_element is not None and post_name_element.text else self.clean_filename(title)
        
        # Generate filename
        filename = f"{self.clean_filename(title)}.html"
        
        # Generate HTML
        html_content = self.generate_page_html(title, content, post_type, post_date, post_name)
        
        # Determine output directory
        if post_type == 'page':
            output_path = os.path.join(self.pages_dir, filename)
            self.stats['pages'] += 1
        else:
            output_path = os.path.join(self.blog_dir, filename)
            self.stats['posts'] += 1
        
        # Write file
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            print(f"✓ Created: {output_path}")
        except Exception as e:
            self.stats['errors'].append(f"Error writing {output_path}: {str(e)}")

    def generate_blog_index(self, posts):
        """Generate blog index page"""
        blog_index_html = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Ricard Penalver</title>
    <meta name="description" content="Blog de Ricard Penalver - Artículos sobre desarrollo web y tecnología">
    <link rel="stylesheet" href="/styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="/" class="logo">Ricard Penalver</a>
            <ul class="nav-menu">
                <li><a href="/" class="nav-link">Inicio</a></li>
                <li><a href="/pages/about.html" class="nav-link">Sobre Mí</a></li>
                <li><a href="/pages/projects.html" class="nav-link">Proyectos</a></li>
                <li><a href="/blog/" class="nav-link active">Blog</a></li>
                <li><a href="/pages/contact.html" class="nav-link">Contacto</a></li>
            </ul>
            <button class="mobile-menu-toggle">☰</button>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content" style="margin-top: 80px; padding: 2rem 0;">
        <div class="container">
            <h1 class="section-title">Blog</h1>
            <div class="blog-grid">"""
        
        # Add blog posts
        for post in posts[:10]:  # Show latest 10 posts
            title = post.find('title').text if post.find('title') is not None else "Sin título"
            post_date = post.find('{http://wordpress.org/export/1.2/}post_date').text if post.find('{http://wordpress.org/export/1.2/}post_date') is not None else None
            post_name = post.find('{http://wordpress.org/export/1.2/}post_name').text if post.find('{http://wordpress.org/export/1.2/}post_name') is not None else self.clean_filename(title)
            filename = f"{self.clean_filename(title)}.html"
            
            # Extract excerpt
            content_element = post.find('{http://purl.org/rss/1.0/modules/content/}encoded')
            content = content_element.text if content_element is not None and content_element.text else ""
            
            if content:
                soup = BeautifulSoup(content, 'html.parser')
                excerpt = soup.get_text()[:200] + "..." if len(soup.get_text()) > 200 else soup.get_text()
            else:
                excerpt = "Sin contenido disponible"
            
            date_str = ""
            if post_date:
                try:
                    date_obj = datetime.fromisoformat(post_date.replace('Z', '+00:00'))
                    date_str = date_obj.strftime('%d de %B, %Y')
                except:
                    date_str = post_date
            
            blog_index_html += f"""
                <article class="blog-card">
                    <div class="blog-image">
                        <i class="fas fa-blog"></i>
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title"><a href="{filename}">{title}</a></h3>
                        <p class="blog-excerpt">{excerpt}</p>
                        <span class="blog-date">{date_str}</span>
                    </div>
                </article>"""
        
        blog_index_html += """
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Ricard Penalver. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="/script.js"></script>
</body>
</html>"""
        
        # Write blog index
        with open(os.path.join(self.blog_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(blog_index_html)
        print("✓ Created: blog/index.html")

    def migrate(self):
        """Main migration function"""
        print("🚀 Starting WordPress to Static Site Migration...")
        print(f"📁 Output directory: {self.output_dir}")
        
        # Parse XML
        try:
            tree = ET.parse(self.xml_file)
            root = tree.getroot()
        except Exception as e:
            print(f"❌ Error parsing XML file: {e}")
            return
        
        # Find all items
        items = root.findall('.//item')
        print(f"📄 Found {len(items)} items to process")
        
        # Separate pages and posts
        pages = []
        posts = []
        
        for item in items:
            post_type = item.find('{http://wordpress.org/export/1.2/}post_type').text if item.find('{http://wordpress.org/export/1.2/}post_type') is not None else "post"
            if post_type == 'page':
                pages.append(item)
            else:
                posts.append(item)
        
        print(f"📄 Pages: {len(pages)}")
        print(f"📝 Posts: {len(posts)}")
        
        # Process pages
        print("\n📄 Processing pages...")
        for page in pages:
            self.process_item(page)
        
        # Process posts
        print("\n📝 Processing posts...")
        for post in posts:
            self.process_item(post)
        
        # Generate blog index
        if posts:
            print("\n📝 Generating blog index...")
            self.generate_blog_index(posts)
        
        # Print statistics
        print(f"\n✅ Migration completed!")
        print(f"📄 Pages created: {self.stats['pages']}")
        print(f"📝 Posts created: {self.stats['posts']}")
        print(f"🖼️ Images downloaded: {self.stats['images']}")
        
        if self.stats['errors']:
            print(f"\n⚠️ Errors encountered: {len(self.stats['errors'])}")
            for error in self.stats['errors']:
                print(f"  - {error}")
        
        # Save migration report
        report = {
            'timestamp': datetime.now().isoformat(),
            'stats': self.stats,
            'files_created': {
                'pages': self.stats['pages'],
                'posts': self.stats['posts'],
                'images': self.stats['images']
            }
        }
        
        with open(os.path.join(self.output_dir, 'migration_report.json'), 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"\n📊 Migration report saved to: migration_report.json")

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python wordpress_to_static.py <wordpress_export.xml> [output_directory]")
        print("Example: python wordpress_to_static.py wordpress_export.xml .")
        sys.exit(1)
    
    xml_file = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "."
    
    if not os.path.exists(xml_file):
        print(f"❌ XML file not found: {xml_file}")
        sys.exit(1)
    
    migrator = WordPressMigrator(xml_file, output_dir)
    migrator.migrate()

if __name__ == "__main__":
    main()
