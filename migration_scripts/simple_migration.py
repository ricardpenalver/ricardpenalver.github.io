#!/usr/bin/env python3
"""
Script simple para migrar contenido básico de WordPress a Jekyll
Para casos donde no tienes acceso al XML de exportación
"""

import os
import re
from datetime import datetime

def create_post_template(title, content, date=None):
    """Crear template de post de Jekyll"""
    if not date:
        date = datetime.now().strftime('%Y-%m-%d %H:%M:%S %z')
    
    # Limpiar título para filename
    filename = re.sub(r'[^\w\s-]', '', title)
    filename = re.sub(r'[-\s]+', '-', filename).lower()
    
    front_matter = f"""---
title: "{title}"
date: {date}
layout: single
author_profile: true
read_time: true
share: true
related: true
---

{content}
"""
    
    return front_matter, filename

def create_page_template(title, content, permalink=None):
    """Crear template de página de Jekyll"""
    if not permalink:
        permalink = re.sub(r'[^\w\s-]', '', title)
        permalink = re.sub(r'[-\s]+', '-', permalink).lower()
    
    front_matter = f"""---
layout: single
title: "{title}"
permalink: /{permalink}/
author_profile: true
---

{content}
"""
    
    return front_matter, permalink

def html_to_markdown_simple(html_content):
    """Conversión básica de HTML a Markdown"""
    # Reemplazos básicos
    markdown = html_content
    
    # Headers
    markdown = re.sub(r'<h1[^>]*>(.*?)</h1>', r'# \1', markdown)
    markdown = re.sub(r'<h2[^>]*>(.*?)</h2>', r'## \1', markdown)
    markdown = re.sub(r'<h3[^>]*>(.*?)</h3>', r'### \1', markdown)
    markdown = re.sub(r'<h4[^>]*>(.*?)</h4>', r'#### \1', markdown)
    
    # Párrafos
    markdown = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n\n', markdown)
    
    # Enlaces
    markdown = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', r'[\2](\1)', markdown)
    
    # Imágenes
    markdown = re.sub(r'<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>', r'![\2](\1)', markdown)
    markdown = re.sub(r'<img[^>]*src="([^"]*)"[^>]*>', r'![](\1)', markdown)
    
    # Listas
    markdown = re.sub(r'<ul[^>]*>(.*?)</ul>', r'\1', markdown, flags=re.DOTALL)
    markdown = re.sub(r'<li[^>]*>(.*?)</li>', r'- \1\n', markdown)
    
    # Negrita e itálica
    markdown = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', markdown)
    markdown = re.sub(r'<b[^>]*>(.*?)</b>', r'**\1**', markdown)
    markdown = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', markdown)
    markdown = re.sub(r'<i[^>]*>(.*?)</i>', r'*\1*', markdown)
    
    # Limpiar HTML restante
    markdown = re.sub(r'<[^>]+>', '', markdown)
    
    # Limpiar espacios extra
    markdown = re.sub(r'\n\s*\n\s*\n', '\n\n', markdown)
    
    return markdown.strip()

# Ejemplos de uso
if __name__ == "__main__":
    print("Script de migración simple de WordPress a Jekyll")
    print("=" * 50)
    
    # Ejemplo de post
    post_title = "Mi primer post migrado"
    post_content = """
    <h2>Introducción</h2>
    <p>Este es mi primer post migrado desde WordPress.</p>
    
    <h3>Contenido</h3>
    <p>Aquí va el contenido del post con <strong>texto en negrita</strong> y <em>texto en cursiva</em>.</p>
    
    <ul>
        <li>Punto 1</li>
        <li>Punto 2</li>
        <li>Punto 3</li>
    </ul>
    
    <p>También podemos incluir <a href="https://ejemplo.com">enlaces</a> e imágenes.</p>
    """
    
    # Convertir a Markdown
    markdown_content = html_to_markdown_simple(post_content)
    
    # Crear post
    front_matter, filename = create_post_template(post_title, markdown_content)
    
    print("Post generado:")
    print(front_matter)
    print(f"\nNombre de archivo sugerido: {filename}.md")
    
    # Ejemplo de página
    page_title = "Sobre mí"
    page_content = """
    <h1>Mi biografía</h1>
    <p>Soy un desarrollador apasionado por la tecnología.</p>
    <p>Me especializo en desarrollo web y aplicaciones móviles.</p>
    """
    
    markdown_page = html_to_markdown_simple(page_content)
    page_front_matter, page_permalink = create_page_template(page_title, markdown_page)
    
    print("\n" + "=" * 50)
    print("Página generada:")
    print(page_front_matter)
    print(f"\nPermalink sugerido: /{page_permalink}/")
