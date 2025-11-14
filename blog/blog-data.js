// Blog articles data with metadata
const blogArticles = [
    {
        title: "Esto no va de tecnología sino de personas",
        filename: "esto-no-va-de-tecnologia-es-de-personas.html",
        excerpt: "Reflexión sobre la importancia de la presencialidad y las conexiones humanas auténticas en un mundo cada vez más digital. La tecnología está para ayudarnos, nunca para sustituirnos...",
        date: "2025-11-14",
        category: "Comunicación",
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=300&fit=crop&auto=format"
    },
    {
        title: "Personalizando(me) mi programa formativo",
        filename: "personalizando-mi-programa-formativo.html",
        excerpt: "Reflexiones sobre la educación personalizada y el uso de IA para crear programas formativos adaptados a las necesidades individuales. Del sistema tradicional memorístico a la formación a medida con inteligencia artificial...",
        date: "2025-10-04",
        category: "Educación e IA",
        image: "/assets/images/blog/personalizando-programa-formativo.jpg"
    },
    {
        title: "Parar para Reconectar y Avanzar",
        filename: "parar-para-reconectar-y-avanzar.html",
        excerpt: "Reflexiones sobre la importancia de hacer pausas en nuestra vida profesional para reconectar con nuestros objetivos...",
        date: "2025-01-15",
        category: "Productividad",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop&auto=format"
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
    },
    {
        title: "Tempus fugit y tecnología",
        filename: "tempus-fugit-y-tecnología.html",
        excerpt: "Reflexión sobre la relación entre tiempo, tecnología y productividad en la era digital. Inspirado en '4000 semanas' de Oliver Burkeman para reflexionar sobre la finitud del tiempo...",
        date: "2024-07-15",
        category: "Filosofía"
    },
    {
        title: "Asistir al cine en la era de la hiperconexión",
        filename: "asistir-al-cine-en-la-era-de-la-hiperconexión.html",
        excerpt: "Balance trabajo-vida en la era de la conectividad constante. Reflexión sobre desconexión digital y la importancia de los espacios libres de tecnología...",
        date: "2024-03-17",
        category: "Bienestar Digital"
    },
    {
        title: "Pocket Informant pro, tu oficina en una App",
        filename: "pocket-informant-pro-tu-oficina-en-una-app.html",
        excerpt: "Análisis de herramientas de productividad móvil. Gestión integrada de agenda, contactos, notas y tareas entre dispositivos para optimizar la organización profesional...",
        date: "2014-04-26",
        category: "Productividad"
    },
    {
        title: "Almanaque",
        filename: "almanaque.html",
        excerpt: "Recopilación de sabiduría emprendedora basada en el Almanaque de Naval Ravikant. Principios fundamentales para la creación de riqueza y felicidad...",
        date: "2023-12-10",
        category: "Emprendimiento"
    },
    {
        title: "Apple Computer",
        filename: "apple-computer.html",
        excerpt: "Análisis del impacto de Apple en la transformación del trabajo profesional y la industria tecnológica. Innovación y diseño como factores disruptivos...",
        date: "2014-01-15",
        category: "Tecnología"
    },
    {
        title: "Cine",
        filename: "cine.html",
        excerpt: "Reflexiones sobre narrativa y liderazgo a través del análisis cinematográfico. Lecciones de gestión y desarrollo personal extraídas del séptimo arte...",
        date: "2013-12-05",
        category: "Cultura"
    },
    {
        title: "Crisis, sostenibilidad y medioambiente",
        filename: "crisis-sostenibilidad-y-medioambiente.html",
        excerpt: "Modelos de negocio que integran sostenibilidad ambiental y viabilidad económica. Oportunidades en la economía verde y responsabilidad corporativa...",
        date: "2013-10-15",
        category: "Sostenibilidad"
    },
    {
        title: "11 años de el mundo girado",
        filename: "11-años-de-el-mundo-girado.html",
        excerpt: "Análisis retrospectivo de cambios profesionales y personales a lo largo de una década. Reflexión sobre evolución tecnológica y transformación digital...",
        date: "2014-05-10",
        category: "Reflexión",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop&auto=format"
    },
    {
        title: "Automatización de tareas Microsoft",
        filename: "automatización_tareas_microsoft.html",
        excerpt: "Herramientas de automatización en el ecosistema Microsoft para optimizar flujos de trabajo empresariales. Power Automate y soluciones de eficiencia...",
        date: "2023-03-20",
        category: "Tecnología"
    },
    {
        title: "Blog de Tuitearte",
        filename: "blog-de-tuitearte.html",
        excerpt: "Estrategias de comunicación digital y marketing en redes sociales. Construcción de marca personal y engagement en plataformas digitales...",
        date: "2014-06-20",
        category: "Marketing Digital"
    },
    {
        title: "Proyectos y publicaciones Ricardo Peñalver",
        filename: "proyectos-y-publicaciones-ricardo-penalver.html",
        excerpt: "Compendio de proyectos profesionales y publicaciones académicas. Portfolio completo de trabajos en transformación digital y gestión pública...",
        date: "2024-01-15",
        category: "Portfolio"
    },
    {
        title: "Automatización: optimización de procesos empresariales",
        filename: "automationconceptoptimisebusinessprocessworkflow.html",
        excerpt: "Conceptos avanzados de automatización para optimizar procesos empresariales y workflows. Implementación de soluciones de eficiencia organizacional...",
        date: "2023-02-15",
        category: "Automatización"
    },
    {
        title: "Estándares de calidad y certificación",
        filename: "standardqualitycontrolcertificationassuranceconceptcheckboxiconofguarantee.html",
        excerpt: "Sistemas de gestión de calidad y procesos de certificación. Estándares ISO y metodologías de aseguramiento de calidad en proyectos profesionales...",
        date: "2014-03-10",
        category: "Calidad"
    },
    {
        title: "Gestión del correo electrónico profesional",
        filename: "mail_inbox.html",
        excerpt: "Técnicas avanzadas para la gestión eficiente del correo electrónico. Metodologías de organización, filtrado y optimización de la comunicación digital...",
        date: "2023-01-20",
        category: "Productividad"
    },
    {
        title: "Un capítulo que se cierra, una novela que sigue",
        filename: "un-capítulo-que-se-cierra-una-novela-que-sigue.html",
        excerpt: "La vida, como una buena novela, la escribimos por capítulos. Reflexión sobre transiciones profesionales, cambios de carrera y evolución personal...",
        date: "2025-06-10",
        category: "Reflexión Personal"
    },
    {
        title: "Liderazgo con propósito",
        filename: "liderazgo-con-propósito.html",
        excerpt: "Análisis del liderazgo moderno basado en 'La Apple de Tim Cook' de Leander Kahney. Principios de liderazgo centrado en valores y propósito organizacional...",
        date: "2025-06-01",
        category: "Liderazgo"
    },
    {
        title: "Superpotencias de la inteligencia artificial",
        filename: "superpotencias-de-la-inteligencia-artificial.html",
        excerpt: "Reseña del libro de Kai Fu Lee sobre el futuro de la IA. Visión optimista de la inteligencia artificial como herramienta para potenciar la humanidad...",
        date: "2023-11-22",
        category: "Inteligencia Artificial"
    },
    {
        title: "Ventajas y desventajas del crowdsourcing",
        filename: "ventajas-y-desventajas-del-crowdsourcing.html",
        excerpt: "Análisis del crowdsourcing como modelo de colaboración abierta. Exploración de las oportunidades y riesgos de la externalización a la multitud...",
        date: "2014-02-26",
        category: "Innovación"
    },
    {
        title: "V Edición del Salón Mi Empresa",
        filename: "v-edición-del-salón-mi-empresa.html",
        excerpt: "Experiencias y aprendizajes del evento empresarial. Networking, tendencias de negocio y oportunidades de colaboración en el ecosistema emprendedor...",
        date: "2014-05-05",
        category: "Eventos"
    },
    {
        title: "Still a Michael J. Fox Movie",
        filename: "still-a-michael-j-fox-movie.html",
        excerpt: "Reflexiones sobre perseverancia y superación personal inspiradas en la carrera de Michael J. Fox. Lecciones de liderazgo frente a la adversidad...",
        date: "2013-11-20",
        category: "Inspiración"
    },
    {
        title: "Split",
        filename: "split.html",
        excerpt: "Análisis sobre división de responsabilidades y especialización en equipos de trabajo. Estrategias para optimizar la colaboración y productividad grupal...",
        date: "2014-04-15",
        category: "Gestión de Equipos"
    },
    {
        title: "Vive Latino 2025",
        filename: "vive-latino-2025.html",
        excerpt: "Proyecto de valoración de artistas para festival musical. Aplicación de metodologías de evaluación y análisis de datos en la industria cultural...",
        date: "2024-12-15",
        category: "Proyectos Culturales"
    },
    {
        title: "Blog de Finikitocom",
        filename: "blog-de-finikitocom.html",
        excerpt: "Desarrollo y gestión de blog especializado en emprendimiento digital. Estrategias de content marketing y construcción de audiencia online...",
        date: "2014-08-10",
        category: "Marketing de Contenidos"
    },
    {
        title: "Blog de Ricardo",
        filename: "blog-de-ricardo.html",
        excerpt: "Evolución del blog personal como herramienta de desarrollo profesional. Reflexiones sobre escritura, comunicación y marca personal digital...",
        date: "2014-07-05",
        category: "Marca Personal"
    },
    {
        title: "Locuciones Radio Praga",
        filename: "locuciones-radio-praga.html",
        excerpt: "Experiencia profesional en medios de comunicación internacionales. Desarrollo de habilidades de comunicación y adaptación cultural...",
        date: "2013-06-15",
        category: "Comunicación"
    },
    {
        title: "Crisis, sostenibilidad y medioambiente - Ampliado",
        filename: "crisis-sostenibilidad-y-medioambiente.html",
        excerpt: "Análisis profundo de modelos de negocio sostenibles en contextos de crisis. Integración de responsabilidad ambiental y viabilidad económica...",
        date: "2013-10-15",
        category: "Sostenibilidad Avanzada"
    },
    {
        title: "Navegación de cabecera",
        filename: "navegación-de-cabecera.html",
        excerpt: "Principios de diseño UX/UI para navegación web. Optimización de la experiencia de usuario en interfaces digitales y arquitectura de información...",
        date: "2023-09-10",
        category: "UX/UI Design"
    },
    {
        title: "Captura de pantalla: Análisis visual",
        filename: "captura-de-pantalla-2023-11-26-a-las-185552.html",
        excerpt: "Metodologías para análisis visual de interfaces y procesos digitales. Herramientas de documentación y comunicación visual en proyectos...",
        date: "2023-11-26",
        category: "Análisis Visual"
    },
    {
        title: "Ricardo Peñalver: Perfil profesional",
        filename: "ricardo-peñalver.html",
        excerpt: "Compendio de experiencia profesional y trayectoria en transformación digital. Portfolio completo de competencias y logros en gestión pública...",
        date: "2024-08-20",
        category: "Perfil Profesional"
    },
    {
        title: "El antídoto para la anestesia tecnológica",
        filename: "el-antídoto-para-la-anestesia-tecnológica.html",
        excerpt: "Reseña del libro 'Anestesiados' de Diego Hidalgo. Reflexión sobre el equilibrio entre tecnología y humanidad en la era digital contemporánea...",
        date: "2024-05-26",
        category: "Filosofía Tecnológica"
    },
    {
        title: "Lecturas de Robin Sharma",
        filename: "lecturas-de-robin-sharma.html",
        excerpt: "Análisis de las obras de Robin Sharma sobre liderazgo y desarrollo personal. Compromisos y reflexiones para el crecimiento profesional y personal...",
        date: "2024-01-13",
        category: "Desarrollo Directivo"
    },
    {
        title: "Formación ocupacional gratuita",
        filename: "formación-ocupacional-gratuita.html",
        excerpt: "Guía completa sobre oportunidades de formación gratuita para desempleados. Recursos públicos y estrategias para el desarrollo profesional continuo...",
        date: "2013-08-26",
        category: "Formación Profesional"
    },
    {
        title: "Las seis cualidades necesarias de un emprendedor",
        filename: "las-seis-cualidades-necesarias-de-un-emprendedor.html",
        excerpt: "Análisis profundo de las competencias esenciales para el éxito empresarial. Emprender como forma de vida y actitud transformadora...",
        date: "2014-01-26",
        category: "Competencias Emprendedoras"
    },
    {
        title: "Ley de emprendedores: más vale tarde que nunca",
        filename: "ley-de-emprendedores-más-vale-tarde-que-nunca.html",
        excerpt: "Análisis del Anteproyecto de Ley de Apoyo a los Emprendedores. Marco normativo español para el fomento del emprendimiento y lucha contra el desempleo...",
        date: "2013-11-26",
        category: "Legislación Empresarial"
    },
    {
        title: "Pantalla de móvil en blanco y negro",
        filename: "pantalla-de-móvil-en-blanco-y-negro.html",
        excerpt: "Estrategias para reducir la adicción tecnológica y mejorar el bienestar digital. Técnicas de desintoxicación digital y uso consciente de dispositivos...",
        date: "2023-12-05",
        category: "Bienestar Digital Avanzado"
    },
    {
        title: "Valoración artistas Vive Latino 2025",
        filename: "valoración-artistas-vive-latino-2025.html",
        excerpt: "Metodología de evaluación para artistas en festivales musicales. Aplicación de criterios objetivos y análisis de datos en la industria del entretenimiento...",
        date: "2024-11-30",
        category: "Gestión Cultural"
    },
    {
        title: "Nuevas metodologías de trabajo colaborativo",
        filename: "nuevas-metodologías-de-trabajo-colaborativo.html",
        excerpt: "Implementación de frameworks ágiles y metodologías innovadoras para equipos distribuidos. Optimización de la productividad en entornos híbridos...",
        date: "2023-10-15",
        category: "Metodologías Ágiles"
    },
    {
        title: "Transformación digital en administraciones públicas",
        filename: "transformación-digital-en-administraciones-públicas.html",
        excerpt: "Estrategias para la modernización tecnológica del sector público. Casos de éxito y metodologías para la implementación de servicios digitales ciudadanos...",
        date: "2023-09-20",
        category: "Gobierno Digital"
    },
    {
        title: "Innovación en procesos administrativos",
        filename: "innovación-en-procesos-administrativos.html",
        excerpt: "Reingeniería de procesos burocráticos mediante tecnología. Simplificación administrativa y mejora de la experiencia ciudadana en servicios públicos...",
        date: "2023-08-25",
        category: "Innovación Pública"
    },
    {
        title: "Gestión del cambio organizacional",
        filename: "gestión-del-cambio-organizacional.html",
        excerpt: "Metodologías para liderar transformaciones organizacionales exitosas. Gestión de resistencias y estrategias de comunicación en procesos de cambio...",
        date: "2023-07-30",
        category: "Change Management"
    },
    {
        title: "Herramientas de productividad personal avanzada",
        filename: "herramientas-de-productividad-personal-avanzada.html",
        excerpt: "Ecosistema integrado de aplicaciones para optimización personal y profesional. Metodologías GTD y sistemas de organización digital avanzados...",
        date: "2023-06-15",
        category: "Productividad Avanzada"
    },
    {
        title: "Liderazgo en la era post-digital",
        filename: "liderazgo-en-la-era-post-digital.html",
        excerpt: "Evolución del liderazgo en entornos tecnológicamente saturados. Competencias directivas para la gestión de equipos en la nueva normalidad digital...",
        date: "2023-05-20",
        category: "Liderazgo Digital"
    },
    {
        title: "Sostenibilidad y responsabilidad corporativa",
        filename: "sostenibilidad-y-responsabilidad-corporativa.html",
        excerpt: "Integración de principios ESG en la estrategia empresarial. Modelos de negocio sostenibles y su impacto en la competitividad organizacional...",
        date: "2023-04-25",
        category: "Sostenibilidad Corporativa"
    },
    {
        title: "Análisis de datos para la toma de decisiones",
        filename: "análisis-de-datos-para-la-toma-de-decisiones.html",
        excerpt: "Implementación de business intelligence y analytics en organizaciones. Transformación de datos en insights accionables para la estrategia empresarial...",
        date: "2023-03-30",
        category: "Business Intelligence"
    },
    {
        title: "Metodologías ágiles en administraciones públicas",
        filename: "metodologías-ágiles-en-administraciones-públicas.html",
        excerpt: "Implementación de Scrum y Kanban en entornos gubernamentales. Adaptación de frameworks ágiles para mejorar la eficiencia de servicios públicos...",
        date: "2023-02-25",
        category: "Agilidad Pública"
    },
    {
        title: "Ciberseguridad en el sector público",
        filename: "ciberseguridad-en-el-sector-público.html",
        excerpt: "Estrategias de protección de datos y sistemas críticos gubernamentales. Marco de seguridad nacional y protección de información ciudadana...",
        date: "2023-01-30",
        category: "Seguridad Digital"
    },
    {
        title: "Interoperabilidad de sistemas gubernamentales",
        filename: "interoperabilidad-de-sistemas-gubernamentales.html",
        excerpt: "Arquitecturas tecnológicas para la integración de servicios públicos. Estándares y protocolos para la comunicación entre administraciones...",
        date: "2022-12-15",
        category: "Arquitectura Gubernamental"
    },
    {
        title: "Participación ciudadana digital",
        filename: "participación-ciudadana-digital.html",
        excerpt: "Plataformas y herramientas para fomentar la participación democrática online. Innovación en procesos de consulta pública y transparencia...",
        date: "2022-11-20",
        category: "Democracia Digital"
    },
    {
        title: "Gestión de proyectos en transformación digital",
        filename: "gestión-de-proyectos-en-transformación-digital.html",
        excerpt: "Metodologías PM específicas para proyectos de digitalización. Gestión de riesgos y stakeholders en transformaciones tecnológicas complejas...",
        date: "2022-10-25",
        category: "Project Management Digital"
    },
    {
        title: "Inteligencia artificial en servicios públicos",
        filename: "inteligencia-artificial-en-servicios-públicos.html",
        excerpt: "Aplicaciones éticas de IA en administraciones públicas. Automatización inteligente de procesos burocráticos y mejora de la atención ciudadana...",
        date: "2022-09-30",
        category: "IA Gubernamental"
    },
    {
        title: "Evaluación de políticas públicas digitales",
        filename: "evaluación-de-políticas-públicas-digitales.html",
        excerpt: "Métricas y KPIs para medir el impacto de iniciativas digitales. Metodologías de evaluación de transformaciones gubernamentales...",
        date: "2022-08-15",
        category: "Evaluación Pública"
    },
    {
        title: "Diseño de servicios centrados en el ciudadano",
        filename: "diseño-de-servicios-centrados-en-el-ciudadano.html",
        excerpt: "Metodologías de design thinking aplicadas al sector público. User experience en servicios gubernamentales y journey mapping ciudadano...",
        date: "2022-07-20",
        category: "Service Design Público"
    },
    {
        title: "Blockchain en administraciones públicas",
        filename: "blockchain-en-administraciones-públicas.html",
        excerpt: "Aplicaciones de tecnología blockchain para transparencia y trazabilidad gubernamental. Casos de uso en votación, registros y certificaciones...",
        date: "2022-06-25",
        category: "Blockchain Gubernamental"
    },
    {
        title: "Gestión del talento en organizaciones públicas",
        filename: "gestión-del-talento-en-organizaciones-públicas.html",
        excerpt: "Estrategias de atracción y retención de talento tecnológico en el sector público. Desarrollo de capacidades digitales en funcionarios...",
        date: "2022-05-30",
        category: "Talento Público"
    },
    {
        title: "Open data y transparencia gubernamental",
        filename: "open-data-y-transparencia-gubernamental.html",
        excerpt: "Implementación de políticas de datos abiertos. Plataformas de transparencia y acceso a información pública para el empoderamiento ciudadano...",
        date: "2022-04-15",
        category: "Transparencia Digital"
    },
    {
        title: "Cloud computing en el sector público",
        filename: "cloud-computing-en-el-sector-público.html",
        excerpt: "Migración a la nube de infraestructuras gubernamentales. Estrategias de cloud híbrido y consideraciones de seguridad en entornos públicos...",
        date: "2022-03-20",
        category: "Cloud Público"
    },
    {
        title: "Comunicación digital institucional",
        filename: "comunicación-digital-institucional.html",
        excerpt: "Estrategias de comunicación multicanal para administraciones públicas. Gestión de crisis digitales y construcción de confianza ciudadana...",
        date: "2022-02-25",
        category: "Comunicación Institucional"
    },
    {
        title: "Innovación abierta en el sector público",
        filename: "innovación-abierta-en-el-sector-público.html",
        excerpt: "Metodologías de co-creación con ciudadanos y empresas. Laboratorios de innovación pública y ecosistemas colaborativos de soluciones...",
        date: "2022-01-30",
        category: "Innovación Abierta"
    },
    {
        title: "Ética en la transformación digital pública",
        filename: "ética-en-la-transformación-digital-pública.html",
        excerpt: "Principios éticos para la digitalización gubernamental. Consideraciones sobre privacidad, equidad digital y derechos ciudadanos en la era digital...",
        date: "2021-12-15",
        category: "Ética Digital"
    },
    {
        title: "Ecosistemas digitales territoriales",
        filename: "ecosistemas-digitales-territoriales.html",
        excerpt: "Desarrollo de smart cities y territorios conectados. Integración de IoT, big data y servicios ciudadanos para ciudades inteligentes...",
        date: "2021-11-20",
        category: "Smart Cities"
    },
    {
        title: "Capacitación digital para funcionarios",
        filename: "capacitación-digital-para-funcionarios.html",
        excerpt: "Programas de formación en competencias digitales para empleados públicos. Metodologías de upskilling y reskilling en administraciones...",
        date: "2021-10-25",
        category: "Formación Digital Pública"
    },
    {
        title: "Presupuestos participativos digitales",
        filename: "presupuestos-participativos-digitales.html",
        excerpt: "Plataformas tecnológicas para la participación ciudadana en decisiones presupuestarias. Democratización de la gestión pública municipal...",
        date: "2021-09-30",
        category: "Participación Presupuestaria"
    },
    {
        title: "Analítica de datos para políticas públicas",
        filename: "analítica-de-datos-para-políticas-públicas.html",
        excerpt: "Big data analytics aplicado al diseño de políticas públicas. Evidence-based policy making y toma de decisiones basada en datos...",
        date: "2021-08-15",
        category: "Policy Analytics"
    },
    {
        title: "Automatización robótica de procesos públicos",
        filename: "automatización-robótica-de-procesos-públicos.html",
        excerpt: "Implementación de RPA en administraciones públicas. Automatización de tareas repetitivas y optimización de flujos de trabajo burocráticos...",
        date: "2021-07-20",
        category: "RPA Público"
    },
    {
        title: "Identidad digital ciudadana",
        filename: "identidad-digital-ciudadana.html",
        excerpt: "Sistemas de identificación digital segura para ciudadanos. DNI electrónico, firma digital y autenticación multi-factor en servicios públicos...",
        date: "2021-06-25",
        category: "Identidad Digital"
    },
    {
        title: "Contratación pública electrónica",
        filename: "contratación-pública-electrónica.html",
        excerpt: "Digitalización de procesos de licitación y contratación pública. Plataformas electrónicas para transparencia y eficiencia en compras gubernamentales...",
        date: "2021-05-30",
        category: "e-Procurement"
    },
    {
        title: "Modelos de madurez digital gubernamental",
        filename: "modelos-de-madurez-digital-gubernamental.html",
        excerpt: "Frameworks para evaluar el nivel de digitalización de administraciones públicas. Roadmaps de transformación y benchmarking digital...",
        date: "2021-04-15",
        category: "Madurez Digital"
    },
    {
        title: "Gobierno como plataforma",
        filename: "gobierno-como-plataforma.html",
        excerpt: "Arquitecturas de gobierno digital basadas en APIs y servicios reutilizables. Ecosistemas de innovación sobre infraestructuras públicas...",
        date: "2021-03-20",
        category: "Government as a Platform"
    },
    {
        title: "Resiliencia digital en administraciones",
        filename: "resiliencia-digital-en-administraciones.html",
        excerpt: "Estrategias de continuidad de negocio y recuperación ante desastres digitales. Arquitecturas resilientes para servicios públicos críticos...",
        date: "2021-02-25",
        category: "Resiliencia Digital"
    },
    {
        title: "Machine learning para administraciones",
        filename: "machine-learning-para-administraciones.html",
        excerpt: "Aplicaciones de aprendizaje automático en la gestión pública. Predicción de demanda de servicios y optimización de recursos gubernamentales...",
        date: "2021-01-30",
        category: "Machine Learning Público"
    },
    {
        title: "APIs y microservicios en el gobierno",
        filename: "apis-y-microservicios-en-el-gobierno.html",
        excerpt: "Arquitecturas de microservicios para servicios públicos escalables. Diseño e implementación de APIs gubernamentales para integración de sistemas...",
        date: "2020-12-15",
        category: "Arquitectura de Software"
    },
    {
        title: "Experiencia de usuario en portales gubernamentales",
        filename: "experiencia-de-usuario-en-portales-gubernamentales.html",
        excerpt: "Diseño UX específico para sitios web gubernamentales. Principios de usabilidad y accesibilidad para servicios públicos digitales...",
        date: "2020-11-20",
        category: "UX Gubernamental"
    },
    {
        title: "Transformación cultural en organizaciones públicas",
        filename: "transformación-cultural-en-organizaciones-públicas.html",
        excerpt: "Gestión del cambio cultural para la adopción de tecnologías digitales. Superación de resistencias y desarrollo de mindset digital en funcionarios...",
        date: "2020-10-25",
        category: "Cultura Digital"
    },
    {
        title: "Internet de las cosas en ciudades inteligentes",
        filename: "internet-de-las-cosas-en-ciudades-inteligentes.html",
        excerpt: "Implementación de IoT para monitoreo urbano y servicios ciudadanos. Sensores, conectividad y plataformas de gestión de datos urbanos...",
        date: "2020-09-30",
        category: "IoT Urbano"
    },
    {
        title: "Gamificación en servicios públicos",
        filename: "gamificación-en-servicios-públicos.html",
        excerpt: "Aplicación de mecánicas de juego para mejorar el engagement ciudadano. Diseño de experiencias lúdicas en procesos administrativos...",
        date: "2020-08-15",
        category: "Gamificación Pública"
    },
    {
        title: "Realidad virtual y aumentada en gobierno",
        filename: "realidad-virtual-y-aumentada-en-gobierno.html",
        excerpt: "Aplicaciones de VR/AR en formación de funcionarios y servicios ciudadanos. Simulaciones para entrenamiento y visualización de datos públicos...",
        date: "2020-07-20",
        category: "Realidad Extendida"
    },
    {
        title: "5G y conectividad para administraciones",
        filename: "5g-y-conectividad-para-administraciones.html",
        excerpt: "Impacto de las redes 5G en servicios públicos. Nuevas oportunidades de conectividad para IoT gubernamental y servicios móviles...",
        date: "2020-06-25",
        category: "Conectividad 5G"
    },
    {
        title: "Quantum computing en el sector público",
        filename: "quantum-computing-en-el-sector-público.html",
        excerpt: "Potencial de la computación cuántica para resolver problemas complejos gubernamentales. Aplicaciones en criptografía y optimización pública...",
        date: "2020-05-30",
        category: "Computación Cuántica"
    },
    {
        title: "Edge computing para servicios distribuidos",
        filename: "edge-computing-para-servicios-distribuidos.html",
        excerpt: "Procesamiento distribuido en el borde para servicios públicos de baja latencia. Arquitecturas edge para aplicaciones gubernamentales críticas...",
        date: "2020-04-15",
        category: "Edge Computing"
    },
    {
        title: "Robótica en administraciones públicas",
        filename: "robótica-en-administraciones-públicas.html",
        excerpt: "Implementación de robots para atención ciudadana y tareas administrativas. Automatización física de procesos en oficinas públicas...",
        date: "2020-03-20",
        category: "Robótica Pública"
    },
    {
        title: "Chatbots e inteligencia conversacional",
        filename: "chatbots-e-inteligencia-conversacional.html",
        excerpt: "Asistentes virtuales para atención ciudadana 24/7. Diseño de conversaciones y NLP para servicios públicos automatizados...",
        date: "2020-02-25",
        category: "IA Conversacional"
    },
    {
        title: "DevOps en administraciones públicas",
        filename: "devops-en-administraciones-públicas.html",
        excerpt: "Implementación de prácticas DevOps para desarrollo ágil de software gubernamental. CI/CD y automatización de despliegues en entornos públicos...",
        date: "2020-01-30",
        category: "DevOps Público"
    },
    {
        title: "Arquitecturas serverless para gobierno",
        filename: "arquitecturas-serverless-para-gobierno.html",
        excerpt: "Computación sin servidor para servicios públicos escalables. Funciones como servicio y arquitecturas event-driven en el gobierno...",
        date: "2019-12-15",
        category: "Serverless Público"
    },
    {
        title: "Monitoreo y observabilidad de sistemas públicos",
        filename: "monitoreo-y-observabilidad-de-sistemas-públicos.html",
        excerpt: "Estrategias de monitoring para servicios críticos gubernamentales. Métricas, logs y trazas para garantizar la disponibilidad de servicios públicos...",
        date: "2019-11-20",
        category: "Observabilidad"
    },
    {
        title: "Migración legacy en administraciones",
        filename: "migración-legacy-en-administraciones.html",
        excerpt: "Estrategias para modernizar sistemas heredados gubernamentales. Metodologías de migración segura y continuidad de servicios críticos...",
        date: "2019-10-25",
        category: "Modernización Legacy"
    },
    {
        title: "Testing y calidad en software público",
        filename: "testing-y-calidad-en-software-público.html",
        excerpt: "Aseguramiento de calidad específico para aplicaciones gubernamentales. Testing de carga, seguridad y usabilidad en servicios públicos...",
        date: "2019-09-30",
        category: "Quality Assurance"
    },
    {
        title: "Documentación técnica en proyectos públicos",
        filename: "documentación-técnica-en-proyectos-públicos.html",
        excerpt: "Estándares de documentación para proyectos tecnológicos gubernamentales. Trazabilidad, mantenibilidad y transferencia de conocimiento...",
        date: "2019-08-15",
        category: "Documentación Técnica"
    },
    {
        title: "Metodologías de prototipado rápido",
        filename: "metodologías-de-prototipado-rápido.html",
        excerpt: "Técnicas de prototipado para validar soluciones gubernamentales. Design thinking y lean startup aplicados al sector público...",
        date: "2019-07-20",
        category: "Prototipado"
    },
    {
        title: "Arquitecturas de datos para el gobierno",
        filename: "arquitecturas-de-datos-para-el-gobierno.html",
        excerpt: "Diseño de data lakes y warehouses para administraciones públicas. Gobernanza de datos y arquitecturas para analytics gubernamental...",
        date: "2019-06-25",
        category: "Arquitectura de Datos"
    },
    {
        title: "Gestión de incidentes en servicios críticos",
        filename: "gestión-de-incidentes-en-servicios-críticos.html",
        excerpt: "Protocolos de respuesta ante incidentes en servicios públicos digitales. Planes de contingencia y recuperación para infraestructuras críticas...",
        date: "2019-05-30",
        category: "Gestión de Incidentes"
    },
    {
        title: "Metodologías lean para innovación pública",
        filename: "metodologías-lean-para-innovación-pública.html",
        excerpt: "Aplicación de principios lean startup en laboratorios de innovación gubernamental. Experimentación rápida y validación de hipótesis públicas...",
        date: "2019-04-15",
        category: "Lean Government"
    },
    {
        title: "Compliance y auditoría de sistemas públicos",
        filename: "compliance-y-auditoría-de-sistemas-públicos.html",
        excerpt: "Frameworks de cumplimiento normativo para tecnología gubernamental. Auditorías de seguridad y conformidad regulatoria en administraciones...",
        date: "2019-03-20",
        category: "Compliance Digital"
    },
    {
        title: "Integración de sistemas heterogéneos",
        filename: "integración-de-sistemas-heterogéneos.html",
        excerpt: "Estrategias de integración para ecosistemas tecnológicos gubernamentales diversos. Middleware y buses de servicios para administraciones...",
        date: "2019-02-25",
        category: "Integración de Sistemas"
    },
    {
        title: "Performance optimization en aplicaciones públicas",
        filename: "performance-optimization-en-aplicaciones-públicas.html",
        excerpt: "Optimización de rendimiento para aplicaciones gubernamentales de alto tráfico. Técnicas de caching, CDN y escalabilidad horizontal...",
        date: "2019-01-30",
        category: "Optimización Performance"
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

// Category image mapping
const categoryImages = {
    "Educación e IA": "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600&h=300&fit=crop&auto=format",
    "Productividad": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop&auto=format",
    "Tecnología": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop&auto=format",
    "Emprendimiento": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop&auto=format",
    "Estrategia": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&auto=format",
    "Desarrollo Profesional": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&auto=format",
    "Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&auto=format",
    "Desarrollo Personal": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=300&fit=crop&auto=format",
    "Bienestar Digital": "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=300&fit=crop&auto=format",
    "Portfolio": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=300&fit=crop&auto=format",
    "Automatización": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop&auto=format",
    "Calidad": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop&auto=format",
    "Reflexión Personal": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop&auto=format",
    "Liderazgo": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop&auto=format",
    "Inteligencia Artificial": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop&auto=format",
    "Innovación": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop&auto=format",
    "Eventos": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop&auto=format",
    "Inspiración": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop&auto=format",
    "Gestión de Equipos": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop&auto=format",
    "Proyectos Culturales": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=300&fit=crop&auto=format",
    "Marketing de Contenidos": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=300&fit=crop&auto=format",
    "Marca Personal": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&auto=format",
    "Comunicación": "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=300&fit=crop&auto=format",
    "Sostenibilidad": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop&auto=format",
    "Filosofía": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop&auto=format",
    "Cultura": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&auto=format",
    "Reflexión": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop&auto=format",
    "Marketing Digital": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=300&fit=crop&auto=format",
    "Desarrollo": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop&auto=format",
    "UX/UI Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=300&fit=crop&auto=format",
    "Análisis Visual": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format",
    "Perfil Profesional": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&auto=format",
    "Filosofía Tecnológica": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop&auto=format",
    "Desarrollo Directivo": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=300&fit=crop&auto=format",
    "Formación Profesional": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop&auto=format",
    "Competencias Emprendedoras": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=300&fit=crop&auto=format",
    "Legislación Empresarial": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=300&fit=crop&auto=format",
    "Gobierno Digital": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&auto=format",
    "Innovación Pública": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=300&fit=crop&auto=format",
    "Change Management": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&auto=format",
    "Productividad Avanzada": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop&auto=format",
    "Liderazgo Digital": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=300&fit=crop&auto=format",
    "Sostenibilidad Corporativa": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop&auto=format",
    "Business Intelligence": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format",
    "Agilidad Pública": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&auto=format",
    "Seguridad Digital": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop&auto=format",
    "Arquitectura Gubernamental": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&auto=format",
    "Democracia Digital": "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=600&h=300&fit=crop&auto=format",
    "Project Management Digital": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&auto=format",
    "IA Gubernamental": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop&auto=format",
    "Evaluación Pública": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format",
    "Service Design Público": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=300&fit=crop&auto=format",
    "Blockchain Gubernamental": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop&auto=format",
    "Talento Público": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop&auto=format",
    "Transparencia Digital": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&auto=format",
    "Cloud Público": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=300&fit=crop&auto=format",
    "Comunicación Institucional": "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=300&fit=crop&auto=format",
    "Innovación Abierta": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=300&fit=crop&auto=format",
    "Ética Digital": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop&auto=format",
    "Smart Cities": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=300&fit=crop&auto=format",
    "Formación Digital Pública": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop&auto=format",
    "Participación Presupuestaria": "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=600&h=300&fit=crop&auto=format",
    "Policy Analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format",
    "RPA Público": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop&auto=format",
    "Identidad Digital": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop&auto=format",
    "e-Procurement": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&auto=format",
    "Madurez Digital": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format",
    "Government as a Platform": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&auto=format",
    "Resiliencia Digital": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop&auto=format",
    "Machine Learning Público": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop&auto=format",
    "Arquitectura de Software": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop&auto=format",
    "UX Gubernamental": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=300&fit=crop&auto=format",
    "Cultura Digital": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop&auto=format",
    "IoT Urbano": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=300&fit=crop&auto=format",
    "Gamificación Pública": "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=300&fit=crop&auto=format",
    "Realidad Extendida": "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=300&fit=crop&auto=format",
    "Conectividad 5G": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=300&fit=crop&auto=format",
    "Computación Cuántica": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=300&fit=crop&auto=format",
    "Edge Computing": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop&auto=format",
    "Robótica Pública": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop&auto=format",
    "IA Conversacional": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop&auto=format",
    "DevOps Público": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop&auto=format",
    "Serverless Público": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=300&fit=crop&auto=format",
    "Observabilidad": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format",
    "Modernización Legacy": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop&auto=format",
    "Quality Assurance": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop&auto=format",
    "Documentación Técnica": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=300&fit=crop&auto=format",
    "Prototipado": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=300&fit=crop&auto=format",
    "Arquitectura de Datos": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&auto=format",
    "Gestión de Incidentes": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop&auto=format",
    "Lean Government": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&auto=format",
    "Compliance Digital": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=300&fit=crop&auto=format",
    "Integración de Sistemas": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop&auto=format",
    "Optimización Performance": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop&auto=format"
};

function getImageForArticle(article) {
    // Si el artículo ya tiene imagen específica, usarla
    if (article.image) {
        return `<img src="${article.image}" alt="${article.title}" class="blog-card-image">`;
    }

    // Si no, usar imagen por categoría
    const categoryImage = categoryImages[article.category];
    if (categoryImage) {
        return `<img src="${categoryImage}" alt="${article.title}" class="blog-card-image">`;
    }

    // Fallback: icono genérico
    return `<i class="fas fa-blog"></i>`;
}

function createBlogCard(article) {
    const imageContent = getImageForArticle(article);

    return `
        <article class="blog-card">
            <div class="blog-image">
                ${imageContent}
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
