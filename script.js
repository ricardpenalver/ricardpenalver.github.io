// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skills section scroll effect (similar to hero)
window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the section is visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const totalHeight = rect.height;
        const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / totalHeight));
        
        // Adjust overlay opacity based on scroll position
        const overlay = skillsSection.querySelector('::before');
        if (visibilityRatio > 0) {
            // Start with full overlay, fade as user scrolls
            const opacity = Math.max(0.3, 0.9 - (visibilityRatio * 0.6));
            skillsSection.style.setProperty('--overlay-opacity', opacity);
        }
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would typically send the data to a server
        alert(`Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto.`);
        
        // Reset form
        this.reset();
    });
}

// Add hover effects for cards
document.querySelectorAll('.project-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Make blog cards clickable (navigate to post)
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Solo navegar si no se hizo clic en un enlace específico
        if (e.target.tagName !== 'A') {
            const link = this.querySelector('.blog-title a');
            if (link) {
                window.location.href = link.href;
            }
        }
    });

    // Agregar cursor pointer para indicar que es clickeable
    card.style.cursor = 'pointer';
});



// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Contact form handling with validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            message: 'El nombre debe tener entre 2 y 50 caracteres'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Por favor ingresa un email válido'
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 100,
            message: 'El asunto debe tener entre 5 y 100 caracteres'
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            message: 'El mensaje debe tener entre 10 y 1000 caracteres'
        }
    };

    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return true;

        // Required check
        if (rules.required && (!value || value.trim() === '')) {
            return 'Este campo es obligatorio';
        }

        // Length checks
        if (rules.minLength && value.length < rules.minLength) {
            return rules.message;
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            return rules.message;
        }

        // Pattern check
        if (rules.pattern && !rules.pattern.test(value)) {
            return rules.message;
        }

        return null;
    }

    // Show field error
    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field && errorElement) {
            field.classList.add('error');
            field.classList.remove('success');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    // Clear field error
    function clearFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (field && errorElement) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    }

    // Show success message
    function showSuccessMessage() {
        const successElement = document.getElementById('form-success');
        const errorElement = document.getElementById('form-error');
        
        if (successElement) {
            successElement.style.display = 'flex';
        }
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Show error message
    function showErrorMessage() {
        const successElement = document.getElementById('form-success');
        const errorElement = document.getElementById('form-error');
        
        if (successElement) {
            successElement.style.display = 'none';
        }
        if (errorElement) {
            errorElement.style.display = 'flex';
        }
    }

    // Hide all messages
    function hideMessages() {
        const successElement = document.getElementById('form-success');
        const errorElement = document.getElementById('form-error');
        
        if (successElement) {
            successElement.style.display = 'none';
        }
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                const error = validateField(fieldName, this.value);
                if (error) {
                    showFieldError(fieldName, error);
                } else {
                    clearFieldError(fieldName);
                }
            });

            field.addEventListener('input', function() {
                // Clear error on input if field becomes valid
                const error = validateField(fieldName, this.value);
                if (!error) {
                    clearFieldError(fieldName);
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        hideMessages();

        // Validate all fields
        let isValid = true;
        const formData = {};

        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                const value = field.value.trim();
                const error = validateField(fieldName, value);
                
                if (error) {
                    showFieldError(fieldName, error);
                    isValid = false;
                } else {
                    clearFieldError(fieldName);
                    formData[fieldName] = value;
                }
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would typically send the data to your server
            console.log('Form data:', formData);
            
            // Show success message
            showSuccessMessage();
            contactForm.reset();
            
            // Clear all field states
            Object.keys(validationRules).forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field) {
                    field.classList.remove('error', 'success');
                }
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorMessage();
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    });
});

