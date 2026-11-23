// ===================================
// COMPOSANTS RÉUTILISABLES
// ===================================

const COMPONENTS = {
    loader: `
    <div id="loader" class="loader-wrapper">
        <div class="loader-game">
            <p class="loader-text">Faites sauter la crêpe !</p>
            <div class="score-board">Score: <span id="crepe-score">0</span></div>
            <div class="pan-container">
                <div class="pan"></div>
                <div class="crepe"></div>
                <div class="handle"></div>
            </div>
            <p class="loading-status">Chargement...</p>
        </div>
    </div>`,

    logo: `
    <div class="logo">
        <a href="/" aria-label="Accueil Le Récif">
            <img src="images/logo/le-recif-creperie-blanc.png" alt="Le Récif" class="logo-blanc">
            <img src="images/logo/le-recif-creperie-logo-noir.png" alt="Le Récif" class="logo-noir">
        </a>
    </div>`,

    header: `
    <header id="header" class="header">
        <div class="container">
            <nav class="navbar">
                <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-menu">
                    <li><a href="/" data-translate="nav-home" aria-label="Accueil - Le Récif">Accueil</a></li>
                    <li><a href="/concept" data-translate="nav-concept" aria-label="Découvrir la crêperie Le Récif">Concept</a></li>
                    <li><a href="/menu" data-translate="nav-menu" aria-label="Voir la carte galettes et crêpes">Menu</a></li>
                    <li><a href="/galerie" data-translate="nav-gallery" aria-label="Galerie photos du Récif">Galerie</a></li>
                    <li><a href="/#actualites" data-translate="nav-actualites" aria-label="Actualités du Récif">Actualités</a></li>
                    <li><a href="/#contact" data-translate="nav-contact" aria-label="Contacter et réserver au Récif">Contact</a></li>
                </ul>

                <div class="language-selector">
                    <button class="lang-btn active" data-lang="fr" aria-label="Français">FR</button>
                    <button class="lang-btn" data-lang="en" aria-label="English">EN</button>
                </div>

            </nav>
        </div>
    </header>`,

    footer: `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <img src="images/logo/le-recif-creperie-blanc.png" alt="Le Récif" class="footer-logo-img" style="max-width: 200px; margin-bottom: 1rem;">
                    <p class="footer-tagline" data-translate="footer-tagline">Restaurant de galettes et de crêpes</p>
                    <p data-translate="footer-description">Une expérience culinaire authentique en bord de mer, alliant traditions bretonnes et produits locaux de qualité.</p>
                    <div class="contact-info">
                        <div class="contact-info-item">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>20 Bd de la Mer, 85800 Saint-Gilles-Croix-de-Vie</span>
                        </div>
                        <div class="contact-info-item">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <a href="tel:+33228109001" style="color: inherit;">02 28 10 90 01</a>
                        </div>
                    </div>
                </div>
                <div class="footer-col">
                    <h3 data-translate="footer-nav-title">Le Récif</h3>
                    <ul>
                        <li><a href="/" data-translate="nav-home">Accueil</a></li>
                        <li><a href="/concept" data-translate="nav-concept">Concept</a></li>
                        <li><a href="/menu" data-translate="nav-menu">Menu</a></li>
                        <li><a href="/galerie" data-translate="nav-gallery">Galerie</a></li>
                        <li><a href="/concept#recrutement" data-translate="nav-recrutement">Rejoignez-nous !</a></li>
                        <li><a href="/#contact" data-translate="nav-contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3 data-translate="footer-hours-title">Horaires</h3>
                    <p data-translate="footer-hours-open">Ouvert 7J/7</p>
                    <p data-translate="footer-hours-continuous">Service continu</p>
                    <p style="margin-top: 1rem; font-weight: 600; color: var(--color-accent);" data-translate="footer-reservation">Réservation conseillée</p>
                </div>
                <div class="footer-col">
                    <h3 data-translate="footer-follow-title">Suivez-nous</h3>
                    <p data-translate="footer-follow-text">Restez informés de nos actualités et événements spéciaux</p>
                    <div class="social-links">
                        <a href="https://www.instagram.com/lerecif_sgxv/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Le Récif">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                        <a href="https://www.facebook.com/lerecifsgxv" target="_blank" rel="noopener noreferrer" aria-label="Facebook Le Récif">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Le Récif. <span data-translate="footer-rights">Tous droits réservés</span>.</p>
                <span class="separator">•</span>
                <a href="/mentions-legales" data-translate="footer-legal">Mentions légales</a>
            </div>
        </div>
    </footer>`,

};

function injectComponent(id, html) {
    const placeholder = document.getElementById(id);
    if (placeholder) {
        placeholder.outerHTML = html;
    }
}

// Injection immédiate
injectComponent('loader-placeholder', COMPONENTS.loader);
injectComponent('logo-placeholder', COMPONENTS.logo);
injectComponent('header-placeholder', COMPONENTS.header);
injectComponent('footer-placeholder', COMPONENTS.footer);

// Bouton Réserver fixe (toutes les pages)
(function() {
    if (document.querySelector('.fixed-reserve-btn')) return;
    const btn = document.createElement('a');
    btn.href = 'https://app.overfull.fr/booking-v2?key_id=AbFr8evzbNs&source=Web&lang=fr';
    btn.className = 'btn btn-primary fixed-reserve-btn';
    btn.setAttribute('aria-label', 'Réserver une table en ligne');
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.setAttribute('data-translate', 'nav-book');
    btn.textContent = 'Réserver';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
})();
