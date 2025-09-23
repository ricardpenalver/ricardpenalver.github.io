#!/usr/bin/env python3
"""
Post-processing script for migrated WordPress content
Optimizes and fixes common issues in generated HTML files
"""

import os
import re
from bs4 import BeautifulSoup

class PostProcessor:
    def __init__(self, base_dir="."):
        self.base_dir = base_dir
        self.pages_dir = os.path.join(base_dir, "pages")
        self.blog_dir = os.path.join(base_dir, "blog")
        self.fixes_applied = 0

    def fix_links(self, html_content):
        """Fix internal links to use correct paths"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        for link in soup.find_all('a', href=True):
            href = link['href']
            
            # Fix WordPress internal links
            if 'wordpress.com' in href or 'yourdomain.com' in href:
                # Extract the path and convert to static link
                if '/page/' in href:
                    # Convert page links
                    page_name = href.split('/')[-2] if href.endswith('/') else href.split('/')[-1]
                    link['href'] = f'/pages/{page_name}.html'
                elif '/post/' in href or '/blog/' in href:
                    # Convert post links
                    post_name = href.split('/')[-2] if href.endswith('/') else href.split('/')[-1]
                    link['href'] = f'/blog/{post_name}.html'
                else:
                    # Generic fix
                    link['href'] = '/'
        
        return str(soup)

    def optimize_images(self, html_content):
        """Optimize image tags"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        for img in soup.find_all('img'):
            # Add responsive classes
            if 'class' not in img.attrs:
                img['class'] = []
            elif isinstance(img['class'], str):
                img['class'] = [img['class']]
            
            if 'responsive-image' not in img['class']:
                img['class'].append('responsive-image')
            
            # Add lazy loading
            img['loading'] = 'lazy'
            
            # Add alt text if missing
            if not img.get('alt'):
                img['alt'] = 'Imagen'
        
        return str(soup)

    def add_responsive_styles(self):
        """Add responsive image styles to CSS"""
        css_file = os.path.join(self.base_dir, "styles.css")
        
        if not os.path.exists(css_file):
            print("⚠️ styles.css not found, skipping responsive styles")
            return
        
        responsive_css = """
/* Responsive images */
.responsive-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Article styles */
.content-article {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e0e0e0;
}

.article-title {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.article-meta {
    color: #666;
    font-size: 0.9rem;
}

.article-content {
    line-height: 1.8;
    font-size: 1.1rem;
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6 {
    color: var(--primary-color);
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.article-content p {
    margin-bottom: 1.5rem;
}

.article-content ul,
.article-content ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
}

.article-content li {
    margin-bottom: 0.5rem;
}

.article-content blockquote {
    border-left: 4px solid var(--accent-color);
    padding-left: 1rem;
    margin: 2rem 0;
    font-style: italic;
    color: #666;
}

.article-content code {
    background: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
}

.article-content pre {
    background: #f4f4f4;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1.5rem 0;
}

.article-content pre code {
    background: none;
    padding: 0;
}

/* Blog grid improvements */
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.blog-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.blog-card:hover {
    transform: translateY(-5px);
}

.blog-card a {
    text-decoration: none;
    color: inherit;
}

.blog-card a:hover {
    color: var(--accent-color);
}

/* Mobile improvements */
@media (max-width: 768px) {
    .content-article {
        padding: 1rem;
        margin: 1rem;
    }
    
    .article-title {
        font-size: 2rem;
    }
    
    .blog-grid {
        grid-template-columns: 1fr;
    }
}
"""
        
        # Append to CSS file
        with open(css_file, 'a', encoding='utf-8') as f:
            f.write(responsive_css)
        
        print("✅ Added responsive styles to CSS")

    def process_file(self, file_path):
        """Process a single HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Apply fixes
            content = self.fix_links(content)
            content = self.optimize_images(content)
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            self.fixes_applied += 1
            print(f"✓ Processed: {file_path}")
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")

    def process_directory(self, directory):
        """Process all HTML files in a directory"""
        if not os.path.exists(directory):
            print(f"⚠️ Directory not found: {directory}")
            return
        
        html_files = [f for f in os.listdir(directory) if f.endswith('.html')]
        
        for html_file in html_files:
            file_path = os.path.join(directory, html_file)
            self.process_file(file_path)

    def run(self):
        """Run post-processing"""
        print("🔧 Starting post-processing...")
        
        # Process pages
        print("\n📄 Processing pages...")
        self.process_directory(self.pages_dir)
        
        # Process blog posts
        print("\n📝 Processing blog posts...")
        self.process_directory(self.blog_dir)
        
        # Add responsive styles
        print("\n🎨 Adding responsive styles...")
        self.add_responsive_styles()
        
        print(f"\n✅ Post-processing completed!")
        print(f"📊 Files processed: {self.fixes_applied}")

def main():
    import sys
    
    base_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    
    processor = PostProcessor(base_dir)
    processor.run()

if __name__ == "__main__":
    main()
