const loyaltyForm = document.querySelector("#loyaltyForm");
const loyaltyResult = document.querySelector("#loyaltyResult");
const isFilePreview = window.location.protocol === "file:";
const apiBase = isFilePreview ? "" : window.location.origin;

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function showLoyaltyMessage(message, type = "error") {
  if (!loyaltyResult) return;
  loyaltyResult.hidden = false;
  loyaltyResult.innerHTML = `<div class="empty-state ${type === "success" ? "is-success" : ""}">${escapeHtml(message)}</div>`;
}

async function loyaltyRequest(path, options = {}) {
  if (!apiBase) throw new Error("La carte fidélité fonctionne une fois le site publié sur Vercel.");

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    let parsedError = "";
    try {
      parsedError = JSON.parse(text).error;
    } catch {}
    throw new Error(parsedError || text || "Erreur fidélité");
  }

  return response.json();
}

function loyaltyStampsHtml(customer) {
  const active = Number(customer.stamps_total || 0) % 10;
  return Array.from({ length: 10 }, (_, index) => {
    return `<span class="${index < active ? "is-filled" : ""}">${index + 1}</span>`;
  }).join("");
}

async function renderQrCode(canvas, value) {
  if (!canvas || !value) return;

  if (window.qrcode) {
    const qr = window.qrcode(0, "M");
    qr.addData(value);
    qr.make();

    const image = document.createElement("img");
    image.src = qr.createDataURL(8, 1);
    image.width = 220;
    image.height = 220;
    image.alt = "QR code fidélité MOW&MY";
    image.className = "loyalty-qr-image";
    canvas.replaceWith(image);
    return;
  }

  const fallback = document.createElement("a");
  fallback.className = "btn btn--outline";
  fallback.href = value;
  fallback.textContent = "Ouvrir le QR fidélité";
  canvas.replaceWith(fallback);
}

function emailStatusText(emailStatus) {
  if (!emailStatus) return "";
  if (emailStatus.ok) return "Email envoyé avec le lien de votre carte.";
  if (emailStatus.reason?.startsWith("missing_env")) return "Carte créée. Email non envoyé : configuration Resend incomplète.";
  return `Carte créée. Email non envoyé : ${emailStatus.reason || "erreur Resend"}.`;
}

async function renderLoyaltyCard(customer, emailStatus = null) {
  if (!loyaltyResult) return;
  const emailText = emailStatusText(emailStatus);

  loyaltyResult.hidden = false;
  loyaltyResult.innerHTML = `
    <div class="loyalty-card-display">
      <div>
        <p class="label">Carte personnelle</p>
        <h2>${escapeHtml(customer.name)}</h2>
        <p>${escapeHtml(customer.stamps_total)} point(s) au total · ${escapeHtml(customer.rewards_earned)} récompense(s) gagnée(s)</p>
        <div class="stamp-grid">${loyaltyStampsHtml(customer)}</div>
        <p class="dashboard-note">Présentez ce QR code au comptoir. L'équipe MOW&MY le scanne pour ajouter un point.</p>
        ${emailText ? `<p class="dashboard-note">${escapeHtml(emailText)}</p>` : ""}
      </div>
      <canvas id="loyaltyQr" aria-label="QR code fidélité MOW&MY"></canvas>
    </div>
  `;

  await renderQrCode(document.querySelector("#loyaltyQr"), customer.dashboard_url);
}

async function loadLoyaltyCardFromUrl() {
  if (!loyaltyResult) return;
  const token = new URLSearchParams(window.location.search).get("token");
  if (!token) return;

  try {
    const data = await loyaltyRequest(`/api/loyalty?token=${encodeURIComponent(token)}`);
    if (loyaltyForm) loyaltyForm.hidden = true;
    await renderLoyaltyCard(data.customer);
  } catch (error) {
    showLoyaltyMessage(error.message);
  }
}

loyaltyForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = loyaltyForm.querySelector("button[type='submit']");
  const formData = new FormData(loyaltyForm);
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();

  if (!name || !phone || !email) {
    showLoyaltyMessage("Renseignez le nom, le téléphone et l'email pour créer la carte.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Création...";

  try {
    const data = await loyaltyRequest("/api/loyalty", {
      method: "POST",
      body: JSON.stringify({ name, phone, email })
    });
    loyaltyForm.hidden = true;
    await renderLoyaltyCard(data.customer, data.email_status);
    window.history.replaceState({}, "", `loyalty.html?token=${encodeURIComponent(data.customer.token)}`);
  } catch (error) {
    showLoyaltyMessage(error.message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Créer ma carte";
  }
});

loadLoyaltyCardFromUrl();
