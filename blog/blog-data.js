// Blog articles data with metadata
const blogArticles = [
    {
        title: "Parar para Reconectar y Avanzar",
        filename: "parar-para-reconectar-y-avanzar.html",
        excerpt: "Reflexiones sobre la importancia de hacer pausas en nuestra vida profesional para reconectar con nuestros objetivos...",
        date: "2025-01-15",
        category: "Productividad"
    },
    {
        title: "Agenda de Conciertos de un Festival con IA",
        filename: "agenda-de-conciertos-de-un-festival-con-ia.html",
        excerpt: "Cómo la inteligencia artificial puede ayudarnos a crear agendas personalizadas para festivales de música...",
        date: "2025-01-10",
        category: "Tecnología"
    },
    {
        title: "La Pausa Necesaria",
        filename: "la-pausa-necesaria-cuando-frenar-es-la-clave-para-acelerar.html",
        excerpt: "Cuando frenar es la clave para acelerar. Reflexiones sobre productividad y bienestar personal...",
        date: "2025-01-05",
        category: "Productividad"
    },
    {
        title: "3 frases célebres para emprendedores",
        filename: "3-frases-célebres-para-emprendedores.html",
        excerpt: "A lo largo de la historia muchos célebres empresarios, inventores, artistas y personas con espíritu emprendedor han enunciado frases que han pasado a la posteridad...",
        date: "2014-10-26",
        category: "Emprendimiento"
    },
    {
        title: "3 compromisos profesionales para el nuevo curso",
        filename: "3-compromisos-profesionales-para-el-nuevo-curso.html",
        excerpt: "Septiembre es el mes del inicio del curso, una época que, al igual que ocurre en año nuevo, nos incentiva al cambio y a la mejora...",
        date: "2014-09-15",
        category: "Desarrollo Profesional"
    },
    {
        title: "La importancia de compartir los objetivos",
        filename: "la-importancia-de-compartir-los-objetivos.html",
        excerpt: "Compartir nuestros objetivos con otras personas puede ser una herramienta muy poderosa para alcanzarlos...",
        date: "2014-08-20",
        category: "Productividad"
    },
    {
        title: "Del garaje a la incubadora pasando por el vivero",
        filename: "del-garaje-a-la-incubadora-pasando-por-el-vivero.html",
        excerpt: "El ecosistema emprendedor ha evolucionado significativamente en las últimas décadas...",
        date: "2014-07-10",
        category: "Emprendimiento"
    },
    {
        title: "La estrategia del océano azul",
        filename: "estrategia-del-océano-azul.html",
        excerpt: "La estrategia del océano azul es un enfoque innovador para crear nuevos espacios de mercado...",
        date: "2014-06-05",
        category: "Estrategia"
    },
    {
        title: "Business Model Canvas como herramienta para emprendedores",
        filename: "business-model-canvas-como-herramienta-para-emprendedores.html",
        excerpt: "El Business Model Canvas es una herramienta visual que permite describir y diseñar modelos de negocio...",
        date: "2014-05-15",
        category: "Emprendimiento"
    },
    {
        title: "Mínimo Producto Viable (MVP)",
        filename: "mínimo-producto-viable-mvp.html",
        excerpt: "El concepto de MVP (Minimum Viable Product) es fundamental en el desarrollo de productos digitales...",
        date: "2014-04-20",
        category: "Desarrollo"
    }
];

// Configuration
const ARTICLES_PER_PAGE = 6;

// Sort articles by date (newest first)
const sortedArticles = blogArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

// Pagination functions
function getTotalPages() {
    return Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE);
}

function getArticlesForPage(page) {
    const startIndex = (page - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    return sortedArticles.slice(startIndex, endIndex);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function createBlogCard(article) {
    return `
        <article class="blog-card">
            <div class="blog-image">
                <i class="fas fa-blog"></i>
            </div>
            <div class="blog-content">
                <h3 class="blog-title">
                    <a href="${article.filename}">${article.title}</a>
                </h3>
                <p class="blog-excerpt">${article.excerpt}</p>
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(article.date)}</span>
                    <span class="blog-category">${article.category}</span>
                </div>
            </div>
        </article>
    `;
}

function createPagination(currentPage, totalPages) {
    let paginationHTML = '<div class="pagination">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<a href="#" class="pagination-btn" data-page="${currentPage - 1}">
            <i class="fas fa-chevron-left"></i> Anterior
        </a>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `<a href="#" class="pagination-btn" data-page="1">1</a>`;
        if (startPage > 2) {
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationHTML += `<a href="#" class="pagination-btn ${activeClass}" data-page="${i}">${i}</a>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
        }
        paginationHTML += `<a href="#" class="pagination-btn" data-page="${totalPages}">${totalPages}</a>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<a href="#" class="pagination-btn" data-page="${currentPage + 1}">
            Siguiente <i class="fas fa-chevron-right"></i>
        </a>`;
    }
    
    paginationHTML += '</div>';
    return paginationHTML;
}

function renderBlog(page = 1) {
    const articles = getArticlesForPage(page);
    const totalPages = getTotalPages();
    
    // Render articles
    const blogGrid = document.querySelector('.blog-grid');
    if (blogGrid) {
        blogGrid.innerHTML = articles.map(createBlogCard).join('');
    }
    
    // Render pagination
    const paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
        paginationContainer.innerHTML = createPagination(page, totalPages);
    }
    
    // Update URL without page reload
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;
    renderBlog(currentPage);
    
    // Add event listeners for pagination
    document.addEventListener('click', function(e) {
        if (e.target.closest('.pagination-btn')) {
            e.preventDefault();
            const page = parseInt(e.target.closest('.pagination-btn').dataset.page);
            if (page) {
                renderBlog(page);
                // Scroll to top of blog section
                document.querySelector('.blog-grid').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    });
});
