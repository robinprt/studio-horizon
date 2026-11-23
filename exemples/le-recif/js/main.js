// ===================================
// VARIABLES GLOBALES
// ===================================
const header = document.getElementById('header');
const logo = document.querySelector('.logo');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Cache des éléments pour la performance (évite de les requêter à chaque scroll)
const heroSection = document.querySelector('.hero') || document.querySelector('.page-header');
let heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
window.addEventListener('resize', () => {
    if (heroSection) heroHeight = heroSection.offsetHeight;
}, { passive: true });

// ===================================
// HEADER SCROLL EFFECT
// ===================================
function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Gestion de la couleur du logo (Blanc sur Hero, Bleu sur fond beige)
    if (logo) {
        const threshold = heroHeight - 50;
        if (scrollY > threshold) {
            logo.classList.add('scrolled');
        } else {
            logo.classList.remove('scrolled');
        }
    }
}

// ===================================
// HIDE/SHOW HEADER ON SCROLL
// ===================================
let lastScrollTop = 0;
const scrollThreshold = 5;

function handleScrollDirection() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas - cacher le header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - afficher le header
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }
}

// ===================================
// MENU MOBILE TOGGLE
// ===================================
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Écouter le clic sur le bouton menu
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Fermer le menu au clic sur un lien
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignorer les liens vides ou juste "#"
        if (href === '#' || href === '#reservation') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            // Calcul de l'offset : Sur mobile le header est en haut, sur desktop c'est une sidebar
            let headerOffset = 0;
            if (window.innerWidth <= 768) {
                headerOffset = header.offsetHeight;
            }

            const targetPosition = target.offsetTop - headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fermer le menu mobile si ouvert
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
});

// ===================================
// ANIMATION AU SCROLL (Intersection Observer)
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    const animatedElements = document.querySelectorAll('.passion-image, .gallery-item, .suppliers-section, .footer, .rdv-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Les animations seront initialisées dans le listener consolidé

// ===================================
// LAZY LOADING DES IMAGES
// ===================================
// Le lazy loading natif (loading="lazy") est supporté par tous les navigateurs modernes
// Pas besoin de polyfill supplémentaire

// ===================================
// PARALLAX EFFECT (Hero Section)
// ===================================

// ===================================
// GESTIONNAIRE SCROLL UNIFIÉ (OPTIMISÉ)
// ===================================
let ticking = false;
const isMobile = window.innerWidth <= 768;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            handleScrollDirection();
            // Bouton retour en haut (fusionné ici pour éviter un listener supplémentaire)
            if (window._backToTopBtn) {
                window._backToTopBtn.classList.toggle('visible', window.scrollY > 300);
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ===================================
// GESTION DES ÉVÉNEMENTS DE RESIZE
// ===================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Fermer le menu mobile si on passe en desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    }, 250);
});


// ===================================
// BOUTON RETOUR EN HAUT (optionnel)
// ===================================
function createBackToTopButton() {
    // Vérifier si le bouton existe déjà pour éviter les doublons
    if (document.querySelector('.back-to-top')) return;

    const button = document.createElement('button');
    button.textContent = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Retour en haut');

    document.body.appendChild(button);

    // Clic : scroll vers le haut
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Exposer le bouton pour le listener principal
    window._backToTopBtn = button;
}

// Créer le bouton retour en haut
createBackToTopButton();

// ===================================
// PERFORMANCE: Désactiver les animations sur les appareils peu performants
// ===================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
}

// ===================================
// SYSTÈME MULTILINGUE (FR/EN)
// ===================================
let currentLang = localStorage.getItem('language') || 'fr';

// Fonction pour changer la langue
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = lang;

    // Mettre à jour tous les éléments avec data-translate
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Mettre à jour les boutons de langue
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// La langue sera initialisée dans le listener consolidé

// Fonction d'initialisation de la langue
function initLanguage() {
    changeLanguage(currentLang);

    // Écouter les clics sur les boutons de langue
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}


// ===================================
// DEBUG MODE (Production: désactivé)
// ===================================
// Pour activer les logs en développement, décommenter les lignes suivantes :
// console.log('%cBienvenue sur Le Récif 🌊', 'color: #1e3a8a; font-size: 24px; font-weight: bold;');
// console.log('%cRestaurant de galettes et de crêpes', 'color: #ff6b4a; font-size: 16px;');

// ===================================
// SLIDER CONCEPT
// ===================================
function initSlider() {
    const track = document.querySelector('.slider-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.slider-nav.next');
    const prevButton = document.querySelector('.slider-nav.prev');
    let currentIndex = 0;

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }

    if (nextButton) nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    if (prevButton) prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);

    function resetAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Support tactile (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Swipe Gauche -> Suivant
            resetAutoSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide(); // Swipe Droite -> Précédent
            resetAutoSlide();
        }
    }

    // Accessibilité: Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });
}

// Le slider sera initialisé dans le listener consolidé

// ===================================
// LOADER GAME
// ===================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const panContainer = document.querySelector('.pan-container');
    const crepe = document.querySelector('.crepe');
    const scoreElement = document.getElementById('crepe-score');
    let score = 0;

    // Logique du jeu
    if (panContainer && crepe && scoreElement) {
        panContainer.addEventListener('click', () => {
            if (!crepe.classList.contains('jump')) {
                crepe.classList.add('jump');
                score++;
                scoreElement.textContent = score;
                
                // Retirer la classe après l'animation pour pouvoir rejouer
                setTimeout(() => {
                    crepe.classList.remove('jump');
                }, 600);
            }
        });
    }

    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2000); // Délai augmenté à 2s pour laisser le temps de faire sauter la crêpe !
    }
});


// ===================================
// LIGHTBOX GALERIE
// ===================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryItems = document.querySelectorAll('.full-gallery .gallery-item');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightbox && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            lightbox.style.display = "block";
            lightboxImg.src = src;
            document.body.style.overflow = 'hidden'; // Empêcher le scroll
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = "none";
        document.body.style.overflow = ''; // Réactiver le scroll (restitue le CSS)
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Accessibilité: Fermer avec touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}

// ===================================
// FAQ ACCORDION
// ===================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Toggle la classe active sur l'élément cliqué
                item.classList.toggle('active');
                
                // Accessibilité
                const isExpanded = item.classList.contains('active');
                question.setAttribute('aria-expanded', isExpanded);
            });
        }
    });
}

// ===================================
// INITIALISATION CONSOLIDÉE
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser toutes les fonctionnalités
    initScrollAnimations();
    initLanguage();
    initSlider();
    initFAQ();
});
