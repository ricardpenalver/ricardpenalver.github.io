#!/bin/bash

# Script para configurar Git y conectar con GitHub
echo "Configurando repositorio Git..."

# Navegar al directorio del proyecto
cd /Users/rilihouse/PROYECTOS/myweb/ricardpenalver.github.io

# Verificar si ya existe un repositorio Git
if [ -d ".git" ]; then
    echo "Repositorio Git ya existe. Reinicializando..."
    rm -rf .git
fi

# Inicializar repositorio Git
echo "Inicializando repositorio Git..."
git init

# Configurar usuario (reemplaza con tus datos)
git config user.name "Ricard Penalver"
git config user.email "ricard@example.com"

# Agregar todos los archivos
echo "Agregando archivos al repositorio..."
git add .

# Hacer commit inicial
echo "Haciendo commit inicial..."
git commit -m "Initial commit - Sitio web personal"

# Mostrar estado
echo "Estado del repositorio:"
git status

echo "Configuración completada. Ahora puedes conectar con GitHub."
