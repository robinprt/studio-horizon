const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, 'src');
const TEMPLATES_DIR = path.join(SRC_DIR, 'templates');
const DATA_DIR = path.join(SRC_DIR, 'data');
const DIST_DIR = __dirname; // Compile directly to root directory for easy static hosting

// Helper: Ensure directory exists
function ensureDirectoryExistence(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Dossier créé : ${dirPath}`);
    }
}

// Helper: Load layout template
const layoutTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'layout.html'), 'utf-8');

// Function to compile a single page
function compilePage(templateName, outputFile, pageData, pathPrefix = './') {
    const templatePath = path.join(TEMPLATES_DIR, templateName);
    if (!fs.existsSync(templatePath)) {
        console.error(`Erreur : Le template ${templateName} n'existe pas.`);
        return;
    }

    let pageContent = fs.readFileSync(templatePath, 'utf-8');

    // Replace page-specific data in the page content
    for (const [key, value] of Object.entries(pageData)) {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        pageContent = pageContent.replace(placeholder, value);
    }

    // Insert page content into master layout
    let finalHtml = layoutTemplate
        .replace(/{{content}}/g, pageContent)
        .replace(/{{title}}/g, pageData.title || "Ostéopathe Saint-Hilaire-de-Riez | Solenne Billet")
        .replace(/{{description}}/g, pageData.description || "Cabinet d'ostéopathie douce à Saint-Hilaire-de-Riez.")
        .replace(/{{pathPrefix}}/g, pathPrefix);

    // Write file to output location
    const outputFilePath = path.join(DIST_DIR, outputFile);
    ensureDirectoryExistence(path.dirname(outputFilePath));
    fs.writeFileSync(outputFilePath, finalHtml, 'utf-8');
    console.log(`Compilé : ${outputFile}`);
}

// MAIN BUILD PIPELINE
function build() {
    console.log('Début de la génération du site...');

    // 1. Compile Main Pages (index, services, contact, legal)
    compilePage('index.html', 'index.html', {
        title: "Ostéopathe Saint-Hilaire-de-Riez | Cabinet Solenne Billet",
        description: "Ostéopathie douce et personnalisée à Saint-Hilaire-de-Riez : pédiatrie, périnatalité, sport et bien-être. Prenez rendez-vous en ligne sur Doctolib."
    }, './');

    compilePage('services.html', 'services.html', {
        title: "Services d'ostéopathie à Saint-Hilaire-de-Riez | Saint-Gilles & Challans",
        description: "Services d'ostéopathie douce à Saint-Hilaire-de-Riez et alentours : mal de dos, douleurs sportives, troubles digestifs, nourrisson, senior, femme enceinte."
    }, './');

    compilePage('contact.html', 'contact.html', {
        title: "Contact ostéopathe à Saint-Hilaire-de-Riez | Doctolib & Accès",
        description: "Adresse, téléphone, horaires d'ouverture et prise de rendez-vous pour le cabinet d'ostéopathie Solenne Billet à Saint-Hilaire-de-Riez."
    }, './');

    compilePage('mentions-legales.html', 'mentions-legales.html', {
        title: "Mentions Légales | Cabinet d'Ostéopathie Solenne Billet",
        description: "Mentions légales réglementaires pour le site internet d'ostéopathie de Saint-Hilaire-de-Riez."
    }, './');

    compilePage('confidentialite.html', 'confidentialite.html', {
        title: "Politique de Confidentialité | Ostéopathe Solenne Billet",
        description: "Politique de confidentialité et RGPD pour le traitement des données patients du cabinet d'ostéopathie."
    }, './');

    // 2. Compile Local SEO Pages (Zones)
    const zonesDataPath = path.join(DATA_DIR, 'zones.json');
    if (fs.existsSync(zonesDataPath)) {
        const zones = JSON.parse(fs.readFileSync(zonesDataPath, 'utf-8'));
        
        // Generate index of zones
        let zonesListMarkup = '';
        zones.forEach(zone => {
            // Links on the zones-list page are relative to /zones/
            if (zone.slug === 'saint-hilaire-de-riez') {
                zonesListMarkup += `
                <div class="zone-directory-card">
                    <div class="zone-dir-header">
                        <h3>${zone.name}</h3>
                        <span class="zone-dir-tag">Cabinet</span>
                    </div>
                    <p>Cabinet situé au cœur de ${zone.name}, avenue de la Forêt.</p>
                    <a href="${zone.slug}.html" class="link text-highlight">Voir les accès & itinéraire &rarr;</a>
                </div>`;
            } else {
                zonesListMarkup += `
                <div class="zone-directory-card">
                    <div class="zone-dir-header">
                        <h3>${zone.name}</h3>
                        <span class="zone-dir-tag">${zone.distance.split(' ')[0]} min</span>
                    </div>
                    <p>Cabinet situé à Saint-Hilaire-de-Riez, facilement accessible depuis ${zone.name} (${zone.distance}).</p>
                    <a href="${zone.slug}.html" class="link text-highlight">Voir les accès & itinéraire &rarr;</a>
                </div>`;
            }
        });

        // Write zones list page (zones/index.html)
        compilePage('zones-list.html', 'zones/index.html', {
            title: "Ostéopathe en Vendée | Villes desservies",
            description: "Itinéraires et accès au cabinet d'ostéopathie de Saint-Hilaire-de-Riez depuis Challans, Notre-Dame-de-Riez, Saint-Gilles-Croix-de-Vie et autres.",
            zonesListMarkup: zonesListMarkup
        }, '../');

        // Write individual zone pages
        zones.forEach(zone => {
            compilePage('zone-detail.html', `zones/${zone.slug}.html`, {
                title: zone.title,
                description: zone.description,
                zoneName: zone.name,
                zoneDistance: zone.distance,
                zoneRoute: zone.route,
                zoneIntro: zone.intro,
                zoneSeoText: zone.seoText
            }, '../');
        });
    }

    // 3. Compile Blog Pages
    const blogDataPath = path.join(DATA_DIR, 'blog.json');
    if (fs.existsSync(blogDataPath)) {
        const articles = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));

        // Generate blog archive listing
        let blogListMarkup = '';
        articles.forEach(art => {
            blogListMarkup += `
            <div class="blog-card">
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-category">${art.category}</span>
                        <span class="blog-date">${art.date}</span>
                    </div>
                    <h3>${art.title}</h3>
                    <p>${art.summary}</p>
                    <a href="${art.slug}.html" class="read-more text-highlight">Lire l'article &rarr;</a>
                </div>
            </div>`;
        });

        // Write blog list page (blog/index.html)
        compilePage('blog-list.html', 'blog/index.html', {
            title: "Blog d'Ostéopathie Vendée | Conseils & Bien-être",
            description: "Conseils de prévention, exercices d'étirements, et articles sur l'ostéopathie pédiatrique, sportive et périnatale par Solenne Billet.",
            blogListMarkup: blogListMarkup
        }, '../');

        // Write individual blog articles
        articles.forEach(art => {
            compilePage('blog-detail.html', `blog/${art.slug}.html`, {
                title: `${art.title} | Blog Solenne Billet`,
                description: art.summary,
                blogTitle: art.title,
                blogCategory: art.category,
                blogDate: art.date,
                blogContent: art.content
            }, '../');
        });
    }

    console.log('Site internet généré avec succès !');
}

// Execute build
build();
