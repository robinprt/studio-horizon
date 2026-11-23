// =============================================
// STUDIO HORIZON — main.js
// Preloader · Curseur · FAQ · Offres · Contact · Simulateur
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- PRELOADER ----
    const preloader     = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloaderFill');
    // Plus de faux chargement : la page s'affiche immédiatement.
    requestAnimationFrame(hidePreloader);

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('done');
        }
        animateHeroWords();
    }

    // ---- WORD REVEAL (Hero) ----
    function animateHeroWords() {
        const words = document.querySelectorAll('.word');
        words.forEach((word, i) => {
            word.style.transition = `transform .6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`;
            word.style.transform  = 'translateY(0)';
        });
    }

    // ---- CURSEUR INTERACTIF ----
    const dot    = document.getElementById('cursorDot');
    const ring   = document.getElementById('cursorRing');

    if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
        let mx = -100, my = -100;
        let rx = -100, ry = -100;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top  = my + 'px';
        }, { passive: true });

        function lerpCursor() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px';
            ring.style.top  = ry + 'px';
            requestAnimationFrame(lerpCursor);
        }
        lerpCursor();

        document.addEventListener('mouseenter', () => {
            ring.classList.remove('hidden');
            dot.style.opacity = '1';
        });
        document.addEventListener('mouseleave', () => {
            ring.classList.add('hidden');
            dot.style.opacity = '0';
        });

        // Liaison des survols pour agrandir le cercle
        const interactives = 'a, button, .faq-question, input, select, textarea, .service-card, .secteur-card, .project-card, .sim-view-btn';
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest(interactives)) {
                ring.classList.add('hover');
            }
        });
        document.body.addEventListener('mouseout', (e) => {
            if (!e.target.closest(interactives)) {
                ring.classList.remove('hover');
            }
        });
    }

    // ---- NAVIGATION STICKY (Fallback scroll listener) ----
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // ---- BARRE DE PROGRESSION ----
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const max  = document.documentElement.scrollHeight - window.innerHeight;
            const pct  = max > 0 ? (window.scrollY / max) * 100 : 0;
            progressBar.style.width = pct + '%';
        }, { passive: true });
    }

    // ---- SCROLL REVEAL ----
    const revealEls   = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObs.observe(el));

    // ---- FAQ ACCORDION ----
    const faqItems = document.querySelectorAll('.faq-item');

    if (!('onbeforematch' in HTMLElement.prototype)) {
        faqItems.forEach((el) => {
            el.removeAttribute('hidden');
        });
    }

    faqItems.forEach((item) => {
        item.addEventListener('beforematch', () => {
            item.open = true;
        });
    });

    faqItems.forEach((item) => {
        const summary = item.querySelector('summary');
        if (summary) {
            summary.addEventListener('click', () => {
                if (!item.open) {
                    faqItems.forEach((otherItem) => {
                        if (otherItem !== item && otherItem.open) {
                            otherItem.open = false;
                        }
                    });
                }
            });
        }
    });

    // ---- LIAISON BOUTONS D'OFFRES -> FORMULAIRE ----
    const offerButtons = document.querySelectorAll('.offer-select-btn');
    const projectTypeSelect = document.getElementById('projectType');
    const clientMessageTextarea = document.getElementById('clientMessage');

    offerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const offerName = btn.getAttribute('data-offer');
            
            if (projectTypeSelect) {
                if (offerName === 'Essentiel' || offerName === 'Professionnel') {
                    projectTypeSelect.value = 'creation';
                } else if (offerName === 'Premium') {
                    projectTypeSelect.value = 'autre';
                }
            }

            if (clientMessageTextarea) {
                clientMessageTextarea.value = `Bonjour, je suis intéressé(e) par votre offre "${offerName}" pour mon activité. Je souhaiterais obtenir un devis gratuit ou planifier un appel pour discuter de mon projet. Merci !`;
            }

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const firstInput = document.getElementById('clientName');
                    if (firstInput) firstInput.focus();
                }, 800);
            }
        });
    });

    // ---- VALIDATION & SOUBOISSION DE FORMULAIRE ----
    const contactForm = document.getElementById('contactForm');
    const formSuccessAlert = document.getElementById('formSuccessMessage');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

    if (contactForm && formSuccessAlert) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.6';
                submitBtn.querySelector('span').textContent = 'Envoi en cours...';
            }

            fetch(contactForm.action, {
                method: contactForm.method,
                headers: { 'Accept': 'application/json' },
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.querySelector('span').textContent = 'Envoyer ma demande';
                    }
                    contactForm.style.opacity = '0';
                    formSuccessAlert.classList.add('active');
                    formSuccessAlert.setAttribute('aria-hidden', 'false');
                    contactForm.reset();
                } else {
                    throw new Error('Erreur réseau');
                }
            })
            .catch(error => {
                console.error('Erreur :', error);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.querySelector('span').textContent = 'Erreur. Réessayer ?';
                }
            });
        });
    }

    if (closeSuccessBtn && contactForm && formSuccessAlert) {
        closeSuccessBtn.addEventListener('click', () => {
            formSuccessAlert.classList.remove('active');
            formSuccessAlert.setAttribute('aria-hidden', 'true');
            contactForm.style.opacity = '1';
        });
    }

    // ---- INTERACTIVE SITE SIMULATOR (IFRAME CONTROLLER) ----
    const siteSimulator = document.getElementById('siteSimulator');
    const simulatorIframe = document.getElementById('simulatorIframe');
    const simulatorProjectName = document.getElementById('simulatorProjectName');
    const simulatorExternalLink = document.getElementById('simulatorExternalLink');
    const iframeContainer = document.getElementById('iframeContainer');
    
    const demoButtons = document.querySelectorAll('.demo-launch-btn');
    const closeSimulatorBtn = document.getElementById('closeSimulatorBtn');
    const viewSizeButtons = document.querySelectorAll('.sim-view-btn');

    // Ouverture et chargement du simulateur
    demoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-url');
            const name = btn.getAttribute('data-name');

            if (siteSimulator && simulatorIframe && simulatorProjectName && simulatorExternalLink) {
                simulatorIframe.src = url;
                simulatorProjectName.textContent = name;
                simulatorExternalLink.href = url;

                siteSimulator.classList.add('active');
                siteSimulator.setAttribute('aria-hidden', 'false');
                
                if (iframeContainer) {
                    iframeContainer.style.width = '100%';
                }
                viewSizeButtons.forEach(b => {
                    b.classList.toggle('active', b.getAttribute('data-width') === '100%');
                });
            }
        });
    });

    // Fermeture du simulateur
    if (closeSimulatorBtn && siteSimulator && simulatorIframe) {
        const closeSim = () => {
            siteSimulator.classList.remove('active');
            siteSimulator.setAttribute('aria-hidden', 'true');
            simulatorIframe.src = '';
        };

        closeSimulatorBtn.addEventListener('click', closeSim);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && siteSimulator.classList.contains('active')) {
                closeSim();
            }
        });
    }

    // Redimensionnement de l'iframe simulateur (Bureau, Tablette, Mobile)
    viewSizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const width = btn.getAttribute('data-width');
            if (iframeContainer) {
                iframeContainer.style.width = width;
            }
            viewSizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ---- EFFET PARALLAXE DE FOND ----
    const orbs = document.querySelectorAll('.glow-orb');
    const blobsContainer = document.querySelector('.hero-blobs-container');
    
    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        
        // Parallaxe sur les orbes lumineuses
        orbs.forEach((orb, idx) => {
            const factor = (idx + 1) * 20;
            orb.style.transform = `translate3d(${dx * factor}px, ${dy * factor}px, 0)`;
        });
        
        // Parallaxe sur les blobs 3D du Hero
        if (blobsContainer) {
            blobsContainer.style.transform = `translate3d(${dx * 35}px, ${dy * 35}px, 0)`;
        }
    }, { passive: true });

    // ---- CANVAS GRID INTERACTIF (BEYONDS) ----
    const canvas = document.getElementById('heroGridCanvas');
    if (canvas) {
        class InteractiveGrid {
            constructor(canvasElement) {
                this.canvas = canvasElement;
                this.ctx = this.canvas.getContext('2d');
                this.points = [];
                this.gridSize = 45; // taille des mailles
                this.influenceRadius = 200; // rayon d'effet de la souris
                this.maxDisplacement = 40; // déplacement maximum des points
                this.easing = 0.08; // retour élastique
                this.mouse = { x: -1000, y: -1000, active: false };
                this.cols = 0;
                this.rows = 0;

                this.init();
                this.bindEvents();
                this.animate();
            }

            init() {
                this.resize();
            }

            resize() {
                const dpr = window.devicePixelRatio || 1;
                const rect = this.canvas.getBoundingClientRect();
                this.canvas.width = rect.width * dpr;
                this.canvas.height = rect.height * dpr;
                this.ctx.scale(dpr, dpr);

                this.width = rect.width;
                this.height = rect.height;

                this.cols = Math.ceil(this.width / this.gridSize) + 1;
                this.rows = Math.ceil(this.height / this.gridSize) + 1;

                this.points = [];
                for (let c = 0; c < this.cols; c++) {
                    this.points[c] = [];
                    for (let r = 0; r < this.rows; r++) {
                        const bx = c * this.gridSize;
                        const by = r * this.gridSize;
                        this.points[c][r] = {
                            bx: bx,
                            by: by,
                            x: bx,
                            y: by
                        };
                    }
                }
            }

            bindEvents() {
                const heroSection = this.canvas.closest('.hero') || window;
                
                heroSection.addEventListener('mousemove', (e) => {
                    const rect = this.canvas.getBoundingClientRect();
                    this.mouse.x = e.clientX - rect.left;
                    this.mouse.y = e.clientY - rect.top;
                    this.mouse.active = true;
                    this.kick();
                }, { passive: true });

                heroSection.addEventListener('mouseleave', () => {
                    this.mouse.active = false;
                    this.mouse.x = -1000;
                    this.mouse.y = -1000;
                    this.kick();
                }, { passive: true });

                window.addEventListener('resize', () => {
                    this.resize();
                    this.kick();
                }, { passive: true });
            }

            // Ne redessine que lorsque la souris bouge ou que la grille revient en place.
            kick() {
                if (!this.loop) { this.loop = true; requestAnimationFrame(() => this.animate()); }
            }

            animate() {
                this.update();
                this.draw();
                if (this.mouse.active || this.moving) {
                    requestAnimationFrame(() => this.animate());
                } else {
                    this.loop = false;
                }
            }

            update() {
                this.moving = false;
                for (let c = 0; c < this.cols; c++) {
                    for (let r = 0; r < this.rows; r++) {
                        const p = this.points[c][r];
                        let targetX = p.bx;
                        let targetY = p.by;

                        if (this.mouse.active) {
                            const dx = p.bx - this.mouse.x;
                            const dy = p.by - this.mouse.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < this.influenceRadius && dist > 0) {
                                const force = (1 - dist / this.influenceRadius);
                                const displacement = force * this.maxDisplacement;
                                targetX = p.bx + (dx / dist) * displacement;
                                targetY = p.by + (dy / dist) * displacement;
                            }
                        }

                        if (Math.abs(targetX - p.x) > 0.1 || Math.abs(targetY - p.y) > 0.1) this.moving = true;
                        p.x += (targetX - p.x) * this.easing;
                        p.y += (targetY - p.y) * this.easing;
                    }
                }
            }

            draw() {
                this.ctx.clearRect(0, 0, this.width, this.height);

                // 1. Halo lumineux sous la souris
                if (this.mouse.active) {
                    const grad = this.ctx.createRadialGradient(
                        this.mouse.x, this.mouse.y, 0,
                        this.mouse.x, this.mouse.y, this.influenceRadius
                    );
                    grad.addColorStop(0, 'rgba(0, 210, 255, 0.12)');
                    grad.addColorStop(0.5, 'rgba(0, 85, 255, 0.04)');
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    this.ctx.fillStyle = grad;
                    this.ctx.beginPath();
                    this.ctx.arc(this.mouse.x, this.mouse.y, this.influenceRadius, 0, Math.PI * 2);
                    this.ctx.fill();
                }

                // 2. Lignes horizontales
                for (let r = 0; r < this.rows; r++) {
                    this.ctx.beginPath();
                    for (let c = 0; c < this.cols; c++) {
                        const p = this.points[c][r];
                        if (c === 0) {
                            this.ctx.moveTo(p.x, p.y);
                        } else {
                            this.ctx.lineTo(p.x, p.y);
                        }
                    }
                    this.ctx.strokeStyle = 'rgba(0, 85, 255, 0.08)';
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }

                // 3. Lignes verticales
                for (let c = 0; c < this.cols; c++) {
                    this.ctx.beginPath();
                    for (let r = 0; r < this.rows; r++) {
                        const p = this.points[c][r];
                        if (r === 0) {
                            this.ctx.moveTo(p.x, p.y);
                        } else {
                            this.ctx.lineTo(p.x, p.y);
                        }
                    }
                    this.ctx.strokeStyle = 'rgba(0, 85, 255, 0.08)';
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }

                // 4. Surbrillance des lignes autour de la souris (déformation lumineuse)
                if (this.mouse.active) {
                    for (let r = 0; r < this.rows; r++) {
                        for (let c = 0; c < this.cols - 1; c++) {
                            const p1 = this.points[c][r];
                            const p2 = this.points[c + 1][r];
                            const midX = (p1.x + p2.x) / 2;
                            const midY = (p1.y + p2.y) / 2;
                            const dx = midX - this.mouse.x;
                            const dy = midY - this.mouse.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < this.influenceRadius) {
                                const opacity = (1 - dist / this.influenceRadius) * 0.45;
                                this.ctx.beginPath();
                                this.ctx.moveTo(p1.x, p1.y);
                                this.ctx.lineTo(p2.x, p2.y);
                                this.ctx.strokeStyle = `rgba(0, 210, 255, ${opacity})`;
                                this.ctx.lineWidth = 1.5;
                                this.ctx.stroke();
                            }
                        }
                    }

                    for (let c = 0; c < this.cols; c++) {
                        for (let r = 0; r < this.rows - 1; r++) {
                            const p1 = this.points[c][r];
                            const p2 = this.points[c][r + 1];
                            const midX = (p1.x + p2.x) / 2;
                            const midY = (p1.y + p2.y) / 2;
                            const dx = midX - this.mouse.x;
                            const dy = midY - this.mouse.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < this.influenceRadius) {
                                const opacity = (1 - dist / this.influenceRadius) * 0.45;
                                this.ctx.beginPath();
                                this.ctx.moveTo(p1.x, p1.y);
                                this.ctx.lineTo(p2.x, p2.y);
                                this.ctx.strokeStyle = `rgba(0, 210, 255, ${opacity})`;
                                this.ctx.lineWidth = 1.5;
                                this.ctx.stroke();
                            }
                        }
                    }
                }

                // 5. Points d'intersection de grille (effet numérique/premium)
                for (let c = 0; c < this.cols; c++) {
                    for (let r = 0; r < this.rows; r++) {
                        const p = this.points[c][r];
                        if (this.mouse.active) {
                            const dx = p.x - this.mouse.x;
                            const dy = p.y - this.mouse.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < this.influenceRadius) {
                                const opacity = 0.15 + (1 - dist / this.influenceRadius) * 0.55;
                                this.ctx.fillStyle = `rgba(0, 210, 255, ${opacity})`;
                                this.ctx.fillRect(p.x - 1, p.y - 1, 2.5, 2.5);
                                continue;
                            }
                        }
                        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
                        this.ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
                    }
                }
            }
        }

        new InteractiveGrid(canvas);
    }
});
