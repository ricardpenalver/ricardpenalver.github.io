#!/bin/bash

# Script para conectar con GitHub
echo "Conectando con GitHub..."

# Navegar al directorio del proyecto
cd /Users/rilihouse/PROYECTOS/myweb/ricardpenalver.github.io

# Verificar si ya existe un remote
if git remote -v | grep -q "origin"; then
    echo "Ya existe un remote 'origin'. Mostrando configuración actual:"
    git remote -v
else
    echo "No existe un remote 'origin'. Necesitas agregar uno."
    echo "Para conectar con GitHub, ejecuta uno de estos comandos:"
    echo ""
    echo "Si ya tienes un repositorio en GitHub:"
    echo "git remote add origin https://github.com/ricardpenalver/ricardpenalver.github.io.git"
    echo ""
    echo "Si necesitas crear un nuevo repositorio en GitHub:"
    echo "1. Ve a https://github.com/new"
    echo "2. Crea un repositorio llamado 'ricardpenalver.github.io'"
    echo "3. Luego ejecuta:"
    echo "git remote add origin https://github.com/ricardpenalver/ricardpenalver.github.io.git"
    echo ""
fi

# Mostrar estado actual
echo "Estado actual del repositorio:"
git status

echo "Ramas disponibles:"
git branch -a

echo "Último commit:"
git log --oneline -1
