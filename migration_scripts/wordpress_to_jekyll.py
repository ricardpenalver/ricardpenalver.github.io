#!/usr/bin/env python3
"""
Script para migrar contenido de WordPress a Jekyll
Convierte posts, páginas e imágenes al formato Jekyll
"""

import xml.etree.ElementTree as ET
import os
import re
import requests
from datetime import datetime
from urllib.parse import urlparse
import html2text

class WordPressToJekyll:
    def __init__(self, xml_file, output_dir):
        self.xml_file = xml_file
        self.output_dir = output_dir
        self.posts_dir = os.path.join(output_dir, '_posts')
        self.pages_dir = os.path.join(output_dir, '_pages')
        self.images_dir = os.path.join(output_dir, 'assets', 'images')
        
        # Crear directorios si no existen
        os.makedirs(self.posts_dir, exist_ok=True)
        os.makedirs(self.pages_dir, exist_ok=True)
        os.makedirs(self.images_dir, exist_ok=True)
        
        # Configurar html2text
        self.h = html2text.HTML2Text()
        self.h.ignore_links = False
        self.h.ignore_images = False
        
    def parse_wordpress_xml(self):
        """Parsear el archivo XML de WordPress"""
        tree = ET.parse(self.xml_file)
        root = tree.getroot()
        
        # Buscar namespace
        namespace = ''
        if root.tag.startswith('{'):
            namespace = root.tag.split('}')[0] + '}'
        
        items = root.findall(f'.//{namespace}item')
        return items, namespace
    
    def clean_filename(self, title):
        """Limpiar título para usar como nombre de archivo"""
        # Remover caracteres especiales
        filename = re.sub(r'[^\w\s-]', '', title)
        # Reemplazar espacios con guiones
        filename = re.sub(r'[-\s]+', '-', filename)
        # Convertir a minúsculas
        return filename.lower()
    
    def extract_images(self, content, base_url):
        """Extraer URLs de imágenes del contenido"""
        img_pattern = r'<img[^>]+src="([^"]+)"[^>]*>'
        images = re.findall(img_pattern, content)
        
        # Filtrar solo imágenes del mismo dominio
        domain_images = []
        for img_url in images:
            if base_url in img_url:
                domain_images.append(img_url)
        
        return domain_images
    
    def download_image(self, img_url, filename):
        """Descargar imagen y guardarla localmente"""
        try:
            response = requests.get(img_url, timeout=10)
            if response.status_code == 200:
                filepath = os.path.join(self.images_dir, filename)
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                return f"/assets/images/{filename}"
        except Exception as e:
            print(f"Error descargando imagen {img_url}: {e}")
        return img_url
    
    def convert_content(self, content, base_url):
        """Convertir contenido HTML a Markdown y procesar imágenes"""
        # Extraer imágenes
        images = self.extract_images(content, base_url)
        
        # Descargar y reemplazar imágenes
        for img_url in images:
            filename = os.path.basename(urlparse(img_url).path)
            if not filename:
                filename = f"image_{hash(img_url)}.jpg"
            
            local_path = self.download_image(img_url, filename)
            content = content.replace(img_url, local_path)
        
        # Convertir HTML a Markdown
        markdown_content = self.h.handle(content)
        return markdown_content
    
    def create_jekyll_post(self, item, namespace, base_url):
        """Crear archivo de post de Jekyll"""
        title = item.find(f'{namespace}title').text
        content = item.find(f'{namespace}content').text or ""
        pub_date = item.find(f'{namespace}pubDate').text
        post_type = item.find(f'{namespace}post_type').text
        
        # Solo procesar posts (no páginas)
        if post_type != 'post':
            return
        
        # Convertir fecha
        date_obj = datetime.strptime(pub_date, '%a, %d %b %Y %H:%M:%S %z')
        date_str = date_obj.strftime('%Y-%m-%d')
        
        # Limpiar título para filename
        filename = self.clean_filename(title)
        filename = f"{date_str}-{filename}.md"
        
        # Convertir contenido
        markdown_content = self.convert_content(content, base_url)
        
        # Crear front matter
        front_matter = f"""---
title: "{title}"
date: {date_obj.strftime('%Y-%m-%d %H:%M:%S %z')}
layout: single
author_profile: true
read_time: true
share: true
related: true
---

{markdown_content}
"""
        
        # Guardar archivo
        filepath = os.path.join(self.posts_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(front_matter)
        
        print(f"Post creado: {filename}")
    
    def create_jekyll_page(self, item, namespace, base_url):
        """Crear archivo de página de Jekyll"""
        title = item.find(f'{namespace}title').text
        content = item.find(f'{namespace}content').text or ""
        post_type = item.find(f'{namespace}post_type').text
        
        # Solo procesar páginas
        if post_type != 'page':
            return
        
        # Limpiar título para filename
        filename = self.clean_filename(title)
        filename = f"{filename}.md"
        
        # Convertir contenido
        markdown_content = self.convert_content(content, base_url)
        
        # Crear front matter
        front_matter = f"""---
layout: single
title: "{title}"
permalink: /{filename.replace('.md', '')}/
author_profile: true
---

{markdown_content}
"""
        
        # Guardar archivo
        filepath = os.path.join(self.pages_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(front_matter)
        
        print(f"Página creada: {filename}")
    
    def migrate(self, base_url):
        """Ejecutar migración completa"""
        print("Iniciando migración de WordPress a Jekyll...")
        
        items, namespace = self.parse_wordpress_xml()
        
        for item in items:
            post_type = item.find(f'{namespace}post_type').text
            
            if post_type == 'post':
                self.create_jekyll_post(item, namespace, base_url)
            elif post_type == 'page':
                self.create_jekyll_page(item, namespace, base_url)
        
        print("Migración completada!")

if __name__ == "__main__":
    # Configuración
    XML_FILE = "wordpress_export.xml"  # Archivo XML exportado de WordPress
    OUTPUT_DIR = "."  # Directorio actual (donde está Jekyll)
    BASE_URL = "https://tu-sitio-wordpress.com"  # URL base de tu WordPress
    
    # Ejecutar migración
    migrator = WordPressToJekyll(XML_FILE, OUTPUT_DIR)
    migrator.migrate(BASE_URL)
