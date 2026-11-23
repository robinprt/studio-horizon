document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE NAVIGATION MENU
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen);
            
            // Prevent body scroll when menu is open
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. ACTIVE NAVIGATION HIGHLIGHT
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match home or deep pages
        if (currentPath.endsWith(href) || (href === 'index.html' && currentPath === '/') || (href.includes('zones') && currentPath.includes('zones'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. FAQ ACCORDION
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            let panel = trigger.nextElementSibling;
            
            // If panel is not found directly (e.g. nested layout variations)
            if (!panel || !panel.classList.contains('faq-panel')) {
                panel = parent.querySelector('.faq-panel');
            }
            
            if (!panel) return;

            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close other accordions in the same container for a accordion-like feel
            const container = parent.parentElement;
            if (container) {
                const siblingTriggers = container.querySelectorAll('.faq-trigger');
                siblingTriggers.forEach(sibTrigger => {
                    if (sibTrigger !== trigger && sibTrigger.getAttribute('aria-expanded') === 'true') {
                        sibTrigger.setAttribute('aria-expanded', 'false');
                        const sibPanel = sibTrigger.nextElementSibling || sibTrigger.parentElement.querySelector('.faq-panel');
                        if (sibPanel) {
                            sibPanel.style.maxHeight = null;
                            sibPanel.setAttribute('aria-hidden', 'true');
                        }
                    }
                });
            }

            // Toggle current accordion
            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = null;
                panel.setAttribute('aria-hidden', 'true');
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // 4. REVIEWS SLIDER CAROUSEL
    const reviewsSlider = document.getElementById('reviews-slider');
    const reviewPrev = document.getElementById('review-prev');
    const reviewNext = document.getElementById('review-next');
    const reviewDotsContainer = document.getElementById('reviews-dots');
    
    if (reviewsSlider && reviewPrev && reviewNext) {
        const reviewCards = reviewsSlider.querySelectorAll('.review-card');
        let currentIndex = 0;
        const totalCards = reviewCards.length;
        const dots = reviewDotsContainer ? reviewDotsContainer.querySelectorAll('.dot') : [];

        const updateSliderPosition = () => {
            reviewsSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        reviewNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSliderPosition();
        });

        reviewPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateSliderPosition();
        });

        // Click support on dots
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                if (!isNaN(index)) {
                    currentIndex = index;
                    updateSliderPosition();
                    stopAutoRotate();
                }
            });
        });

        // Touch support for mobile sliding
        let touchStartX = 0;
        let touchEndX = 0;

        reviewsSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        reviewsSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        }, { passive: true });

        const handleGesture = () => {
            if (touchStartX - touchEndX > 50) {
                // Swipe left -> next
                currentIndex = (currentIndex + 1) % totalCards;
                updateSliderPosition();
                stopAutoRotate();
            }
            if (touchEndX - touchStartX > 50) {
                // Swipe right -> prev
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                updateSliderPosition();
                stopAutoRotate();
            }
        };
        
        // Auto rotate review slides every 20 seconds
        let autoRotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSliderPosition();
        }, 20000);
        
        // Stop rotation on navigation click or interaction
        const stopAutoRotate = () => {
            clearInterval(autoRotateInterval);
        };
        
        reviewNext.addEventListener('click', stopAutoRotate);
        reviewPrev.addEventListener('click', stopAutoRotate);
    }

    // 5. REVEAL SECTIONS ON SCROLL (FADE IN EFFECTS)
    // Add 'reveal' class to sections we want to animate on scroll
    const sectionsToAnimate = document.querySelectorAll('section:not(.hero-section):not(.page-header-section)');
    sectionsToAnimate.forEach(sec => {
        sec.classList.add('reveal');
        // Add styling for reveal class inline to avoid layout shifts or in pages.css
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(20px)';
        sec.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    });

    const revealOnScroll = () => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                    observer.unobserve(target); // Only trigger once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    };

    if ('IntersectionObserver' in window) {
        revealOnScroll();
    } else {
        // Fallback for older browsers
        sectionsToAnimate.forEach(sec => {
            sec.style.opacity = '1';
            sec.style.transform = 'translateY(0)';
        });
    }
});
