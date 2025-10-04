#!/bin/bash

# Script mejorado para deploy en Vercel
# Autor: Ricardo Peñalver
# Fecha: $(date)

set -e  # Salir si hay errores

echo "🚀 Iniciando proceso de deploy..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "index.html" ]; then
    error "No se encontró index.html. Asegúrate de estar en el directorio del proyecto."
    exit 1
fi

# Verificar estado de git
log "Verificando estado de Git..."
if [ -n "$(git status --porcelain)" ]; then
    warning "Hay cambios sin commitear:"
    git status --short
    
    read -p "¿Deseas continuar con el deploy? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log "Deploy cancelado por el usuario."
        exit 0
    fi
fi

# Verificar conexión con GitHub
log "Verificando conexión con GitHub..."
if ! git remote get-url origin > /dev/null 2>&1; then
    error "No se pudo obtener la URL del repositorio remoto."
    exit 1
fi

# Crear timestamp único
TIMESTAMP=$(date +%s)
COMMIT_MSG="Deploy $(date '+%Y-%m-%d %H:%M:%S') - Timestamp: $TIMESTAMP"

# Actualizar timestamp en un archivo de metadatos
echo "<!-- Deploy timestamp: $TIMESTAMP -->" > deploy-info.html

# Agregar archivos al staging
log "Agregando archivos al staging..."
git add .

# Crear commit
log "Creando commit..."
git commit -m "$COMMIT_MSG" || {
    warning "No hay cambios para commitear."
    exit 0
}

# Intentar push con reintentos
log "Enviando cambios a GitHub..."
MAX_ATTEMPTS=3
ATTEMPT=1

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    log "Intento $ATTEMPT/$MAX_ATTEMPTS..."
    
    if git push origin main; then
        success "Push exitoso a GitHub!"
        break
    else
        error "Push falló en intento $ATTEMPT"
        
        if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
            WAIT_TIME=$((ATTEMPT * 2))
            warning "Esperando ${WAIT_TIME}s antes del siguiente intento..."
            sleep $WAIT_TIME
        else
            error "Todos los intentos de push fallaron."
            exit 1
        fi
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
done

# Verificar que el push fue exitoso
log "Verificando que el push fue exitoso..."
if git fetch origin main && git diff HEAD origin/main --quiet; then
    success "✅ Deploy completado exitosamente!"
    success "🔗 Vercel debería detectar los cambios automáticamente."
    success "📊 Revisa el dashboard de Vercel para ver el progreso del deploy."
else
    warning "El push parece haber fallado. Verifica manualmente."
    exit 1
fi

# Limpiar archivo temporal
rm -f deploy-info.html

echo ""
echo "🎉 Proceso de deploy completado!"
echo "📝 Commit: $COMMIT_MSG"
echo "⏰ Timestamp: $TIMESTAMP"
echo ""
echo "💡 Próximos pasos:"
echo "   1. Revisa el dashboard de Vercel"
echo "   2. Verifica que el deploy se complete sin errores"
echo "   3. Prueba tu sitio web en la URL de Vercel"
