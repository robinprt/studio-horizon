# Le Récif - Guide du Projet

## 📋 Vue d'ensemble

**Le Récif** est un site web vitrine pour une crêperie (restaurant de galettes et de crêpes).

### Objectifs principaux
- Présenter les services et la carte de la crêperie
- Générer des contacts et réservations
- Attirer une clientèle locale et touristique

### Public cible
Clients locaux et touristes cherchant un lieu de restauration authentique proposant des galettes et crêpes.

---

## 🛠️ Technologies

- **Frontend**: HTML/CSS/JavaScript vanilla
- **Structure**: Structure simple avec fichiers organisés en dossiers
- **Hébergement**: Vercel (vercel.com)
- **Domaine**: creperielerecif.fr → www.creperielerecif.fr (enregistré chez OVH)
- **URL de production**: https://www.creperielerecif.fr
- **Réservation en ligne**: https://app.overfull.fr (Overfull)

---

## 📁 Structure du projet

```
le recif website/docs/
├── index.html              # Page d'accueil
├── menu.html               # Carte / menu
├── concept.html            # Notre histoire & équipe
├── galerie.html            # Galerie photos
├── mentions-legales.html   # Mentions légales (noindex)
├── 404.html                # Page d'erreur (noindex)
├── vercel.json             # Config Vercel (cleanUrls, headers sécu, redirect www)
├── sitemap.xml             # Sitemap FR + EN avec hreflang
├── robots.txt              # Accès crawlers
├── llms.txt                # Données structurées pour IA (RSL 1.0)
├── .htaccess               # Config Apache (ignoré par Vercel, conservé pour référence)
├── css/                    # Feuilles de style
│   └── styles.css
├── js/                     # Scripts JavaScript
│   ├── main.js
│   ├── components.js       # Header/footer/logo injectés dynamiquement
│   ├── translations.js     # Traductions FR/EN
│   └── faq-chatbot.js
├── images/                 # Images et assets
│   ├── logo/
│   └── photos-originales/  # Photos .webp optimisées
├── fonts/                  # Police locale MarketDeco
└── video/                  # Vidéo homepage (video1.webm)
```

---

## ✨ Fonctionnalités clés

### 1. Menu/Carte en ligne
- Affichage de la carte des galettes et crêpes
- Organisation par catégories (galettes salées, crêpes sucrées, boissons)
- Prix et descriptions des produits

### 2. Système de réservation
- **Phase 1** : Affichage du numéro de téléphone pour réservation (02 28 10 90 01)
- **Phase 2** (à définir ultérieurement) : Formulaire de réservation en ligne

### 3. Informations de contact
- Adresse physique et carte interactive
- Numéro de téléphone et email
- Horaires d'ouverture détaillés
- Liens vers les réseaux sociaux

### 4. Multilingue
- Site disponible en deux langues
- Français (langue principale)
- Anglais (langue secondaire)
- Sélecteur de langue dans le header

---

## 💻 Conventions de code

### Style et formatage
- **Indentation**: 4 espaces
- **Commentaires**: En français
- **Noms de variables/fonctions**: camelCase en JavaScript, kebab-case pour CSS
- **Organisation**: Code clair et commenté, éviter la complexité inutile

### Bonnes pratiques
- HTML sémantique pour l'accessibilité
- CSS responsive (mobile-first)
- JavaScript non-intrusif avec gestion d'erreurs
- Optimisation des images pour le web
- SEO de base (meta tags, alt text, etc.)

---

## 🎨 Design et UX - Principes Directeurs

### 🎯 Philosophie de Design : "Authentic Seaside Elegance"

Le design du Récif suit une approche **élégante, épurée et professionnelle**, inspirée de l'authenticité d'une crêperie en bord de mer. **PAS de gamification, PAS d'effets trop ludiques ou enfantins**.

### ⚠️ CE QU'IL NE FAUT JAMAIS FAIRE

**INTERDIT - Éléments gamifiés à éviter absolument :**
- ❌ Badges colorés type "🔄 Voir en 3D" avec dégradés flashy
- ❌ Animations pulses excessives ou clignotantes
- ❌ Emojis dans les interfaces (sauf contenu éditorial)
- ❌ Effets "glow" ou lueurs néon
- ❌ Gradients trop voyants (bleu → corail)
- ❌ Rotations automatiques ou animations 3D complexes
- ❌ Textures ou effets "fun" type cartoon
- ❌ Skew transforms excessifs
- ❌ Tout ce qui ressemble à un jeu vidéo ou une application ludique

**Style à privilégier :**
- ✅ Sobre et élégant
- ✅ Professionnel mais chaleureux
- ✅ Minimaliste avec espaces aérés
- ✅ Effets discrets et subtils
- ✅ Transitions fluides et naturelles

---

### 🎨 Palette de Couleurs - "Authentic Seaside"

#### Couleurs Principales
```css
--color-bg-deep: #fef9f5;      /* Beige clair chaleureux */
--color-bg-light: #ffffff;      /* Blanc pur */
--color-primary: #1e3a8a;       /* Bleu marine élégant */
--color-secondary: #ff6b4a;     /* Corail/Orange (accents uniquement) */
--color-accent: #ff6b4a;        /* Pour CTA et éléments importants */
```

#### Couleurs de Texte
```css
--color-text: #2d3748;          /* Gris foncé (lisibilité) */
--color-text-light: #718096;    /* Gris moyen (descriptions) */
--color-white: #ffffff;
--color-overlay: rgba(30, 58, 138, 0.4); /* Overlay bleu marine */
```

#### Mode Sombre (Dark Mode)
```css
--color-bg-deep: #1a1f2e;       /* Bleu marine très sombre */
--color-bg-light: #242b3d;      /* Bleu marine sombre */
--color-primary: #5b8bd0;       /* Bleu clair (version claire du bleu marine) */
--color-text: #e8e9ed;          /* Blanc cassé légèrement gris */
--color-text-light: #a0a4b8;    /* Gris bleuté doux */
--color-white: #2a3142;         /* Bleu marine moyen (cartes) */
```

**Note :** Le mode sombre conserve l'harmonie avec la palette de base (bleu marine), simplement inversée et assombrie. Le corail (#ff6b4a) reste identique pour les CTA.

**Usage des couleurs :**
- **Bleu marine (#1e3a8a)** : Titres, navigation, éléments principaux
- **Beige (#fef9f5)** : Fond de page chaleureux
- **Corail (#ff6b4a)** : UNIQUEMENT pour les boutons CTA et prix
- **Blanc** : Cartes, modal backgrounds
- **Gris** : Texte descriptif, éléments secondaires

---

### 📐 Typographie - Élégance & Lisibilité

#### Polices de Caractères
```css
--font-heading: 'Playfair Display', serif;    /* Titres élégants */
--font-script: 'Dancing Script', cursive;     /* Logo uniquement */
--font-body: 'Inter', 'Montserrat', sans-serif; /* Texte corps */
```

**Hiérarchie typographique :**
- **H1** : 3.5rem - Logo "Le Récif" (Dancing Script)
- **H2** : 2.5-3rem - Titres de sections (Playfair Display)
- **H3** : 1.5-2rem - Sous-titres
- **Body** : 1rem (16px) - Inter/Montserrat
- **Small** : 0.85-0.9rem - Descriptions, notes

**Règles :**
- Toujours utiliser Playfair Display pour les titres (pas Dancing Script)
- Dancing Script réservé au logo uniquement
- Line-height: 1.6 pour le body (lisibilité)
- Letter-spacing: normal (pas d'espacement excessif)

---

### 🎭 Effets Visuels - Subtilité & Élégance

#### Glass Morphism (Navigation, Cartes)
```css
--glass-bg: rgba(255, 255, 255, 0.85);
--glass-border: 1px solid rgba(30, 58, 138, 0.1);
--glass-shadow: 0 8px 32px 0 rgba(30, 58, 138, 0.1);
--backdrop-blur: blur(10px);
```

**Usage :**
- Navigation sidebar/header
- Cartes flottantes
- Overlay de modals

#### Ombres - Profondeur Discrète
```css
--shadow-md: 0 10px 30px -10px rgba(30, 58, 138, 0.15);  /* Cartes */
--shadow-lg: 0 20px 30px -15px rgba(30, 58, 138, 0.2);   /* Modal */
--shadow-glow: 0 5px 15px rgba(255, 107, 74, 0.3);       /* CTA hover */
```

**Principe :**
- Ombres douces et naturelles
- Pas d'ombres dures ou portées excessives
- Utiliser la couleur primaire (bleu) pour les ombres, pas du noir

#### Border Radius - Formes Organiques
```css
--radius-sm: 4px;     /* Petits éléments */
--radius-md: 12px;    /* Cartes, boutons */
--radius-lg: 24px;    /* Modal, grandes sections */
--radius-full: 50px;  /* Badges, boutons ronds */
```

**Principe :**
- Coins arrondis mais pas excessifs
- Cohérence : toujours utiliser les variables

#### Transitions - Fluidité Naturelle
```css
--transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
```

**Usage :**
- Tous les hovers de boutons/liens
- Changements d'état
- Animations d'entrée/sortie

**Règle :**
- JAMAIS d'animation automatique au chargement (pas de pulse, rotate, etc.)
- Animations déclenchées par l'utilisateur uniquement (hover, click, scroll)

---

### 🏗️ Layout & Espacement

#### Espacements Cohérents
```css
--spacing-xs: 0.5rem;  /* 8px */
--spacing-sm: 1rem;    /* 16px */
--spacing-md: 2rem;    /* 32px */
--spacing-lg: 4rem;    /* 64px */
--spacing-xl: 6rem;    /* 96px */
```

**Usage :**
- `--spacing-xs` : Gap entre éléments proches (badges, tags)
- `--spacing-sm` : Padding de cartes, gap de grille
- `--spacing-md` : Margin entre sections
- `--spacing-lg` : Padding vertical de sections
- `--spacing-xl` : Grande séparation entre sections majeures

#### Container & Grille
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    padding-left: calc(var(--spacing-md) + 80px); /* Sidebar offset */
}
```

**Grilles adaptatives :**
```css
/* Menu items, galeries */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 1.5rem 2rem;
```

---

### 🎯 Composants UI - Standards

#### Boutons (CTA)
```css
.btn-primary {
    background: var(--color-accent);     /* Corail */
    color: var(--color-white);
    padding: 0.8rem 2rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    transition: var(--transition);
}

.btn-primary:hover {
    background: #e05e40;  /* Corail plus sombre */
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
}
```

**Règles :**
- Toujours utiliser `transform: translateY(-2px)` au hover
- Jamais de `scale()` ou `rotate()` sur les boutons
- Ombre légère au hover uniquement

#### Cartes (Menu Items, Galerie)
```css
.menu-item {
    padding: 1rem;
    background: var(--color-white);
    border-radius: var(--radius-md);
    border: 1px solid rgba(30, 58, 138, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: var(--transition);
}

.menu-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.15);
    border-color: var(--color-accent);
}
```

**Règles :**
- Fond blanc pur
- Bordure subtile bleu marine
- Hover : légère élévation + bordure corail
- PAS de skew, rotate ou effets complexes

#### Modal / Overlay
```css
.modal {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    padding: 2rem;
    max-width: 800px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-overlay {
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
}
```

**Règles :**
- Overlay sombre avec flou
- Modal centré, fond blanc
- Animation d'entrée : fade + scale(0.9 → 1)
- Bouton close : simple X, pas de rotation au hover

---

### 📱 Responsive Design - Mobile First

#### Breakpoints
```css
/* Mobile first approche */
@media (max-width: 768px) { /* Tablette */
    .menu-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

@media (max-width: 480px) { /* Mobile */
    --spacing-xl: 4rem; /* Réduire les espacements */
}
```

**Adaptations mobile :**
- Navigation sidebar → header horizontal
- Grilles 3 colonnes → 1 colonne
- Textes réduits (1.5rem → 1.2rem pour h2)
- Padding réduit (2rem → 1.5rem)
- Touch-friendly : 44px minimum pour boutons

---

### 🎨 Sections & Patterns

#### Hero Section
```css
.hero {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Parallax */
}

.hero-overlay {
    background: var(--color-overlay); /* Bleu marine transparent */
}
```

**Règles :**
- Photo plein écran avec overlay bleu marine
- Texte blanc centré
- CTA corail bien visible
- Parallax subtle (fixed background)

#### Feature Items (Points clés)
```css
.feature-item {
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-md);
    padding: 1.2rem;
    background: transparent;
    transform: skewX(-5deg); /* Légère inclinaison */
}

.feature-item span {
    transform: skewX(5deg); /* Contre-inclinaison du texte */
    text-transform: uppercase;
}
```

**Règles :**
- Skew très léger uniquement (-5deg, pas plus)
- Bordure bleu marine
- Fond transparent ou blanc
- Hover : fond corail + texte blanc

---

### ✅ Checklist de Design pour Nouvelles Fonctionnalités

Avant d'ajouter un nouveau composant, vérifier :

**Couleurs :**
- [ ] Utilise uniquement les variables CSS définies
- [ ] Bleu marine pour éléments principaux
- [ ] Corail uniquement pour CTA et prix
- [ ] Pas de dégradés flashy

**Effets :**
- [ ] Transitions fluides (0.4s cubic-bezier)
- [ ] Hover discret (translateY -2px)
- [ ] Pas d'animations automatiques
- [ ] Ombres subtiles

**Typographie :**
- [ ] Playfair Display pour titres
- [ ] Inter/Montserrat pour body
- [ ] Line-height 1.6 minimum
- [ ] Tailles cohérentes

**Spacing :**
- [ ] Utilise les variables --spacing-*
- [ ] Padding/margin cohérents
- [ ] Responsive adapté

**Sobriété :**
- [ ] Pas d'emojis dans l'UI
- [ ] Pas d'effets gamifiés
- [ ] Design professionnel et élégant
- [ ] Accessible et lisible

---

### Accessibilité
- Contraste minimum 4.5:1 (WCAG AA)
- Navigation au clavier complète
- Alt text descriptifs pour toutes les images
- Structure HTML sémantique (header, nav, main, section, footer)
- Aria-labels sur les boutons d'action
- Focus visible sur tous les éléments interactifs

---

## 📝 Notes importantes

### Priorités de développement
1. Page d'accueil accueillante avec présentation
2. Carte/menu bien organisé et lisible
3. Système de réservation fonctionnel
4. Page contact avec informations complètes
5. Implémentation multilingue

### Points d'attention
- Le site doit être responsive (mobile, tablette, desktop)
- Les images doivent être optimisées pour ne pas ralentir le chargement
- Le formulaire de réservation doit être sécurisé
- Les informations de contact doivent être facilement accessibles

---

## 🚀 Workflow de développement

### Avant de commencer une tâche
1. Lire le code existant concerné
2. Comprendre la structure actuelle
3. Planifier les modifications nécessaires

### Pendant le développement
- Commenter le code en français
- Tester sur différents navigateurs et tailles d'écran
- Valider le HTML/CSS
- Vérifier l'accessibilité

### Après les modifications
- Tester toutes les fonctionnalités impactées
- Vérifier la responsiveness
- S'assurer que le code est propre et commenté

---

## 📞 Informations de contact

**Adresse**: 20 Boulevard de la Mer, 85800 Saint-Gilles-Croix-de-Vie

**Téléphone réservation**: 02 28 10 90 01

**Email**: creperielerecif@gmail.com

**Localisation**: Vue imprenable sur la plage de Boisvinet

**Réseaux sociaux**:
- Instagram : https://www.instagram.com/lerecif_sgxv/
- Facebook : https://www.facebook.com/lerecifsgxv

---

## 📋 Contenu du site

### Slogan / Baseline
"Restaurant de galettes et de crêpes"

### Section "Notre savoir-faire"
**Titre**: Animés par notre passion, nous vous proposons

**Texte**: Des galettes, des crêpes et des coupes glacées généreuses, préparées avec des produits frais, locaux et de qualité.

**Points clés**:
- Produits frais et locaux
- Farine de sarrasin
- Recettes traditionnelles bretonnes

**Section Provenance**:
Nos produits sont issus de fournisseurs locaux et passionnés, tout comme nous !

**Provenances**:
- Saint-Gilles-Croix-de-Vie
- Vendée
- Pays de la Loire

### Section "Le Récif - Le goût de la Bretagne"

**Texte**: Le Récif est un restaurant de crêperie alliant traditions et modernités, installé au cœur de Saint-Gilles-Croix-de-Vie.

Galettes, gaufres, et burgers bretons sont également à déguster. Venez tester nos glaces faites en Vendée et desserts maison !

**Ouvert 7J/7 - EN CONTINU**

Réservez à votre heure ! Une carte copieuse à prix d'enfer.

20 Bd de la Mer,
85800 Saint-Gilles-Croix-de-Vie

### Section "Notre équipe"

**Carol-Ann & Richard**: Les deux passionnés qui vous ouvrent les portes du Récif !

---

## 🍽️ Menu Complet

### Un peu de Bretagne dans votre assiette

Trois catégories principales :
- **Galettes croustillantes** (Farine de sarrasin locale et bio)
- **Crêpes gourmandes** (Farine de froment locale et bio)
- **Coupes glacées rafraîchissantes**

---

### GALETTES (Salées)

| Nom | Ingrédients | Prix |
|-----|-------------|------|
| **Jambon ou Emmental ou Œuf** | Choisissez un de ces trois ingrédients | 7.50€ |
| **Jambon, emmental** | | 8.80€ |
| **Complète** | Jambon, emmental, œuf | 9.50€ |
| **Capaccino** | Tomate séchée, roquette, jambon sec, parmesan, vinaigre balsamique | 8€ |
| **Végétarienne** | Champignons, tomates, oignons, crème fraîche, emmental | 10.50€ |
| **Bargire** | Steak haché, salade, oignons | 11.50€ |
| **Fermière** | Lardons, champignons, pommes de terre, crème fraîche, emmental | 12.50 |
| **Gourmande** | Andouille, pommes de terre, moutarde à l'ancienne, crème fraîche | 13.00€ |
| **YOYO** | Chèvre, pommes, tomates confites, miel | 13.50€ |
| **Vendéenne** | Jambon de Vendée, mogette, crème de curry, chèvre, tomates confites | 14.50€ |

---

### CRÊPES (Sucrées)

| Nom | Ingrédients | Prix |
|-----|-------------|------|
| **Sucre** | | 3.50€ |
| **Beurre sucre** | | 4.00€ |
| **Beurre sucre, jus de citron** | | 4.50€ |
| **Miel ou confiture** | | 4.50€ |
| **Nutella ou chocolat maison** | | 5.50€ |
| **Caramel beurre salé maison** | | 6.50€ |
| **Duo** | Deux garnitures au choix : caramel beurre salé maison, confiture maison, Nutella, chocolat maison, chantilly | 7.50€ |
| **Fruitée** | Fruits de saison, coulis de fruits rouges, chantilly | 8.50€ |
| **Ti-punch** | Rhum, citron vert, sucre de canne | 9.50€ |
| **Suzette** | Grand Marnier ou Cointreau, orange, zeste de citron, chantilly | 9.50€ |

---

### Suggestions à l'ardoise
En fonction de la saison

---

## 🎨 Identité Visuelle - Résumé

### Logo
"Le Récif" en Dancing Script - Police cursive élégante

### Palette (voir section Design complète ci-dessus)
- **#1e3a8a** - Bleu marine (principal)
- **#fef9f5** - Beige clair (fond)
- **#ff6b4a** - Corail (CTA uniquement)
- **#2d3748** - Gris foncé (texte)

### Typographie
- **Playfair Display** - Titres
- **Dancing Script** - Logo uniquement
- **Inter/Montserrat** - Corps de texte

### Style
- Élégant, sobre et professionnel
- Bord de mer authentique
- Pas de gamification
- Minimaliste avec espaces aérés

### Assets et ressources
- **Images** : Disponibles sur Google Drive
- **Lien Drive** : https://drive.google.com/drive/folders/1szeC0GLjUfgiD5M9O34smUzVvhAVybzm?usp=drive_link

---

## 📞 Informations pratiques complètes

**Nom**: Le Récif

**Type**: Crêperie / Restaurant de galettes et crêpes

**Adresse**: 20 Boulevard de la Mer, 85800 Saint-Gilles-Croix-de-Vie

**Téléphone**: 02 28 10 90 01

**Email**: creperielerecif@gmail.com

**Horaires**: Ouvert 7J/7 de 11h à 21h, en service continu

**Emplacement**: Vue imprenable sur la plage de Boisvinet

**Gérants**: Carol-Ann & Richard

**Coordonnées GPS**: 46.699259, -1.946859

---

## 🌐 SEO — État actuel

### Configuration technique
- `vercel.json` : cleanUrls, redirect non-www→www, headers sécurité (CSP, X-Frame-Options, Permissions-Policy, Referrer-Policy)
- `sitemap.xml` : 8 entrées (4 pages × 2 langues), hreflang `xhtml:link` par entrée, namespace `xmlns:xhtml`
- `robots.txt` : `User-agent: * Allow: /` uniquement (simplifié)
- `llms.txt` : menu complet avec prix, lien réservation, infos pratiques, paragraphe citable 148 mots

### Schema.org en place
| Page | Schémas |
|------|---------|
| index.html | `Restaurant` (@id, openingHoursSpecification 11h-21h, hasMenu enrichi) + `WebSite` |
| menu.html | `BreadcrumbList` + `Menu` complet (10 galettes + 10 crêpes avec prix) |
| concept.html | `BreadcrumbList` + `Person @graph` (Carol-Ann + Richard) + `FAQPage` |
| galerie.html | `BreadcrumbList` + `ImageGallery` |

### Meta tags
- `og:locale: fr_FR` sur toutes les pages
- Canonical + hreflang FR/EN sur toutes les pages indexables
- `noindex` sur mentions-legales et 404

### Points d'attention SEO restants
- La navigation est injectée via JS (components.js) — les crawlers sans JS ne voient pas le header/footer
- Le délai de 2s dans le loader impacte le LCP (Core Web Vitals)
- Le multilingue FR/EN est client-side (`?lang=en`) — limites pour le SEO EN
- Pas de bannière de consentement cookies (RGPD) — à implémenter

---

**Dernière mise à jour**: 2026-04-02
