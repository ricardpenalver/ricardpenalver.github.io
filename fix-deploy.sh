#!/bin/bash

# Script para forzar el despliegue en Vercel

echo "Creando cambio menor para activar deploy..."

# Actualizar timestamp en un comentario
sed -i '' 's/<!-- Deploy timestamp: .* -->/<!-- Deploy timestamp: '$(date)' -->/g' pages/contacto.html

# Si no existe el comentario, agregarlo
if ! grep -q "Deploy timestamp" pages/contacto.html; then
    sed -i '' '1i\
<!-- Deploy timestamp: '$(date)' -->
' pages/contacto.html
fi

echo "Timestamp actualizado en contacto.html"

# Intentar commit y push
git add pages/contacto.html
git commit -m "Update deploy timestamp $(date +%s)"

echo "Trying push with exponential backoff..."

for i in {1..5}; do
    echo "Attempt $i/5..."
    if git push origin main; then
        echo "Push successful!"
        exit 0
    else
        echo "Push failed, waiting ${i}s before retry..."
        sleep $i
    fi
done

echo "All push attempts failed. Manual intervention required."
exit 1