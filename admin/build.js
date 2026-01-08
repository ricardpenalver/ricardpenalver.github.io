#!/usr/bin/env node
/**
 * Build completo: genera blog-data.js y convierte Markdown a HTML
 * Uso: node build.js
 */

const { execSync } = require('child_process');
const path = require('path');

const ADMIN_DIR = __dirname;

console.log('🚀 Build del blog iniciado...\n');
console.log('═'.repeat(50));

// Paso 1: Generar blog-data.js
console.log('\n📊 Paso 1: Generando blog-data.js...\n');
try {
    execSync(`node "${path.join(ADMIN_DIR, 'build-blog-data.js')}"`, {
        stdio: 'inherit',
        cwd: ADMIN_DIR
    });
} catch (e) {
    console.error('❌ Error en build-blog-data.js');
    process.exit(1);
}

console.log('\n' + '═'.repeat(50));

// Paso 2: Generar HTML
console.log('\n📄 Paso 2: Generando archivos HTML...\n');
try {
    execSync(`node "${path.join(ADMIN_DIR, 'build-html.js')}"`, {
        stdio: 'inherit',
        cwd: ADMIN_DIR
    });
} catch (e) {
    console.error('❌ Error en build-html.js');
    process.exit(1);
}

console.log('\n' + '═'.repeat(50));
console.log('\n✨ Build completado exitosamente!');
console.log('\n💡 Próximo paso: git add . && git commit -m "Build" && git push\n');
