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
        title: "IAs generativas y productividad laboral",
        filename: "ias-generativas-y-productividad-laboral.html",
        excerpt: "La democratización de las IAs generativas está transformando la productividad laboral. Análisis del impacto y oportunidades de estas tecnologías para mejorar la eficiencia profesional...",
        date: "2023-08-05",
        category: "Tecnología"
    },
    {
        title: "Cómo gestionar mejor tu correo electrónico",
        filename: "cómo-gestionar-mejor-tu-correo-electrónico.html",
        excerpt: "Estrategias prácticas para organizar tu bandeja de entrada con filtros, carpetas y técnicas de gestión eficiente del email profesional...",
        date: "2023-07-15",
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
        title: "Business Model Canvas como herramienta para emprendedores",
        filename: "business-model-canvas-como-herramienta-para-emprendedores.html",
        excerpt: "Análisis detallado del Business Model Canvas de Osterwalder: 9 elementos clave para diseñar modelos de negocio exitosos y validar ideas emprendedoras...",
        date: "2013-06-27",
        category: "Emprendimiento"
    },
    {
        title: "Del garaje a la incubadora pasando por el vivero",
        filename: "del-garaje-a-la-incubadora-pasando-por-el-vivero.html",
        excerpt: "Evolución del ecosistema emprendedor moderno: diferencias entre incubadoras, viveros de empresas y aceleradoras. Guía completa de estructuras de apoyo al emprendimiento...",
        date: "2013-10-26",
        category: "Emprendimiento"
    },
    {
        title: "La estrategia del océano azul",
        filename: "estrategia-del-océano-azul.html",
        excerpt: "Estrategia de no competencia basada en W. Chan Kim: crear nuevos mercados vs. competir en océanos rojos saturados. Metodología para innovación disruptiva...",
        date: "2013-12-26",
        category: "Estrategia"
    },
    {
        title: "Mínimo Producto Viable (MVP)",
        filename: "mínimo-producto-viable-mvp.html",
        excerpt: "El concepto MVP dentro de la metodología Lean Startup: cómo validar productos en el mercado antes de invertir tiempo y recursos en desarrollo completo...",
        date: "2014-06-26",
        category: "Emprendimiento"
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
    },
    {
        title: "Comunicación, confianza y respeto",
        filename: "comunicación-confianza-y-respeto.html",
        excerpt: "La fórmula del trabajo en equipo. Pilares fundamentales para relaciones profesionales efectivas en entornos colaborativos y equipos de alto rendimiento...",
        date: "2024-11-24",
        category: "Desarrollo Profesional"
    },
    {
        title: "Mejora tu productividad con la eficiencia automatizada",
        filename: "mejora-tu-productividad-con-la-eficiencia-automatizada.html",
        excerpt: "El tiempo es un recurso valioso y finito. Estrategias de automatización inteligente para liberar tiempo creativo y optimizar flujos de trabajo profesionales...",
        date: "2023-07-08",
        category: "Productividad"
    },
    {
        title: "7 consejos para escribir correctamente un email profesional",
        filename: "7-consejos-para-escribir-correctamente-un-email-profesional.html",
        excerpt: "Buenas prácticas para comunicación profesional por email: estructura, claridad y etiqueta para maximizar efectividad en el entorno laboral...",
        date: "2014-07-26",
        category: "Productividad"
    },
    {
        title: "Conectar para aprender",
        filename: "conectar-para-aprender.html",
        excerpt: "Networking como herramienta de aprendizaje continuo y crecimiento profesional. La importancia de las conexiones humanas en el desarrollo de carrera...",
        date: "2014-08-15",
        category: "Desarrollo Profesional"
    },
    {
        title: "Consejos para maquetar tu curriculum vitae",
        filename: "consejos-para-maquetar-tu-curriculum-vitae.html",
        excerpt: "Guía práctica para diseñar CVs efectivos que destaquen competencias y experiencia. Principios de diseño y estructura para captar atención de reclutadores...",
        date: "2014-06-15",
        category: "Desarrollo Profesional"
    },
    {
        title: "Cómo hacerse autónomo en España",
        filename: "cómo-hacerse-autónomo-en-españa.html",
        excerpt: "Guía práctica para el proceso de alta como trabajador autónomo en España. Pasos, documentación y consideraciones legales y fiscales esenciales...",
        date: "2014-05-20",
        category: "Emprendimiento"
    },
    {
        title: "Email marketing para emprendedores",
        filename: "email-marketing-para-emprendedores.html",
        excerpt: "Estrategias de email marketing para startups y emprendedores: construcción de audiencia, segmentación y técnicas de conversión efectivas...",
        date: "2013-11-15",
        category: "Marketing"
    },
    {
        title: "4000 semanas",
        filename: "4000-semanas.html",
        excerpt: "Perspectiva sobre gestión del tiempo considerando la finitud de la vida profesional. Reflexión profunda sobre productividad y propósito vital...",
        date: "2023-06-20",
        category: "Productividad"
    },
    {
        title: "Productividad integrando tecnología en el día a día",
        filename: "productividad-integrando-tecnologia-en-el-dia-a-dia.html",
        excerpt: "Estrategias para integrar herramientas tecnológicas en rutinas profesionales sin perder el factor humano. Balance entre eficiencia y bienestar...",
        date: "2023-05-15",
        category: "Productividad"
    },
    {
        title: "Integrando humanidad y tecnología",
        filename: "integrando-humanidad-y-tecnología.html",
        excerpt: "Balance entre avance tecnológico y valores humanos en el entorno profesional moderno. Reflexión sobre el futuro del trabajo humanizado...",
        date: "2023-04-10",
        category: "Tecnología"
    },
    {
        title: "5 apps para aprender idiomas en tu tiempo libre",
        filename: "5-apps-para-aprender-idiomas-en-tu-tiempo-libre.html",
        excerpt: "Herramientas móviles para aprendizaje de idiomas optimizando tiempos muertos. Comparativa de aplicaciones y metodologías de aprendizaje efectivas...",
        date: "2014-03-25",
        category: "Desarrollo Personal"
    },
    {
        title: "5 App para aprender inglés",
        filename: "5-app-para-aprender-inglés.html",
        excerpt: "Selección especializada de aplicaciones móviles para dominar el inglés. Análisis detallado de funcionalidades y efectividad de cada herramienta...",
        date: "2014-02-18",
        category: "Desarrollo Personal"
    },
    {
        title: "Crisis, emprendedores y sostenibilidad",
        filename: "crisis-emprendedores-y-sostenibilidad.html",
        excerpt: "Oportunidades de negocio sostenible en contextos de crisis económica. Cómo convertir desafíos globales en oportunidades emprendedoras responsables...",
        date: "2013-09-20",
        category: "Emprendimiento"
    },
    {
        title: "El monje que vendió su Ferrari",
        filename: "el-monje-que-vendió-su-ferrari.html",
        excerpt: "Reflexiones sobre liderazgo y desarrollo personal basadas en la obra de Robin Sharma. Lecciones para equilibrar éxito profesional y bienestar personal...",
        date: "2013-08-10",
        category: "Desarrollo Personal"
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
