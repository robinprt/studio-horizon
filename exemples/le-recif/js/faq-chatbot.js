// ===================================
// FAQ CHATBOT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Créer le bouton FAQ Chatbot
    const faqBtn = document.createElement('button');
    faqBtn.className = 'faq-chatbot-btn';
    faqBtn.setAttribute('aria-label', 'Ouvrir FAQ');
    faqBtn.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
    `;
    document.body.appendChild(faqBtn);

    // Créer le modal FAQ
    const faqModal = document.createElement('div');
    faqModal.className = 'faq-chatbot-modal';
    faqModal.innerHTML = `
        <div class="faq-chatbot-header">
            <h3 data-translate="faq-chatbot-title">Questions Fréquentes</h3>
            <button class="faq-chatbot-close" aria-label="Fermer">&times;</button>
        </div>
        <div class="faq-chatbot-content">
            <div class="faq-chatbot-item">
                <div class="faq-chatbot-question">
                    <span data-translate="faq-q1">Faut-il réserver ?</span>
                    <span class="icon">+</span>
                </div>
                <div class="faq-chatbot-answer">
                    <p data-translate="faq-a1">Oui, la réservation est fortement conseillée, surtout en haute saison et le week-end. Appelez-nous au 02 28 10 90 01.</p>
                </div>
            </div>

            <div class="faq-chatbot-item">
                <div class="faq-chatbot-question">
                    <span data-translate="faq-q2">Proposez-vous des plats végétariens ?</span>
                    <span class="icon">+</span>
                </div>
                <div class="faq-chatbot-answer">
                    <p data-translate="faq-a2">Tout à fait ! Nos galettes végétariennes sont garnies de légumes frais de saison et de fromages locaux.</p>
                </div>
            </div>

            <div class="faq-chatbot-item">
                <div class="faq-chatbot-question">
                    <span data-translate="faq-q3">Les animaux sont-ils acceptés ?</span>
                    <span class="icon">+</span>
                </div>
                <div class="faq-chatbot-answer">
                    <p data-translate="faq-a3">Oui, vos compagnons à quatre pattes sont les bienvenus sur notre terrasse.</p>
                </div>
            </div>

            <div class="faq-chatbot-item">
                <div class="faq-chatbot-question">
                    <span data-translate="faq-q4">Acceptez-vous les groupes ?</span>
                    <span class="icon">+</span>
                </div>
                <div class="faq-chatbot-answer">
                    <p data-translate="faq-a4">Oui, nous pouvons accueillir des groupes. Merci de nous prévenir à l'avance pour une meilleure organisation.</p>
                </div>
            </div>

            <div class="faq-chatbot-item">
                <div class="faq-chatbot-question">
                    <span data-translate="faq-q5">Acceptez-vous les tickets restaurants et les chèques vacances ?</span>
                    <span class="icon">+</span>
                </div>
                <div class="faq-chatbot-answer">
                    <p data-translate="faq-a5">Les tickets restaurant, chèques et cartes déjeuner & chèques vacances ne sont pas acceptés pour le moment.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(faqModal);

    // Toggle modal
    const closeBtn = faqModal.querySelector('.faq-chatbot-close');

    faqBtn.addEventListener('click', () => {
        faqModal.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        faqModal.classList.remove('active');
    });

    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (!faqModal.contains(e.target) && !faqBtn.contains(e.target)) {
            faqModal.classList.remove('active');
        }
    });

    // Toggle questions
    const questions = faqModal.querySelectorAll('.faq-chatbot-question');
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-chatbot-item');
            item.classList.toggle('active');
        });
    });

    // Afficher le bouton au scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            faqBtn.classList.add('visible');
        } else {
            faqBtn.classList.remove('visible');
        }
    });
});
