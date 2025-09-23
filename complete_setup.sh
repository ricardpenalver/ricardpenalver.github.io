#!/bin/bash

# Script completo para conectar con GitHub y subir cambios
echo "=== CONFIGURACIÓN COMPLETA DE GITHUB ==="
echo ""

# Navegar al directorio del proyecto
cd /Users/rilihouse/PROYECTOS/myweb/ricardpenalver.github.io

# Agregar el archivo de conexión al repositorio
git add connect_github.sh complete_setup.sh

# Hacer commit de los scripts
git commit -m "Agregar scripts de configuración de GitHub"

# Agregar remote origin (esto conectará con GitHub)
echo "Conectando con GitHub..."
git remote add origin https://github.com/ricardpenalver/ricardpenalver.github.io.git

# Verificar la conexión
echo "Verificando conexión con GitHub..."
git remote -v

# Subir los cambios a GitHub
echo "Subiendo cambios a GitHub..."
git push -u origin main

echo ""
echo "=== CONFIGURACIÓN COMPLETADA ==="
echo "Tu sitio web ahora está conectado con GitHub!"
echo "Puedes verlo en: https://ricardpenalver.github.io"
echo ""
echo "Para futuras actualizaciones, usa estos comandos:"
echo "git add ."
echo "git commit -m 'Descripción de los cambios'"
echo "git push origin main"
