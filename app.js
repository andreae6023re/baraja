const app = document.getElementById("app");

const spreads = [
  { id: "one", name: "Una carta", description: "Una carta para iluminar tu pregunta.", cards: 1 },
  { id: "three", name: "Tres cartas", description: "Pasado · Presente · Futuro.", cards: 3 },
  { id: "celtic", name: "Cruz Celta", description: "La tirada clásica de 10 cartas.", cards: 10 },
  { id: "custom", name: "Personalizada", description: "Elige tú misma el número de cartas.", cards: 5 }
];

const demoCards = [
  ["The Fool", "El Loco", "Nuevos comienzos, libertad y confianza."],
  ["The Magician", "El Mago", "Recursos, iniciativa y capacidad de crear."],
  ["The High Priestess", "La Sacerdotisa", "Intuición, misterio y conocimiento interior."],
  ["The Empress", "La Emperatriz", "Creatividad, abundancia y cuidado."],
  ["The Emperor", "El Emperador", "Estructura, estabilidad y autoridad."],
  ["The Lovers", "Los Enamorados", "Elecciones, vínculos y valores personales."],
  ["The Chariot", "El Carro", "Dirección, determinación y avance."],
  ["Strength", "La Fuerza", "Coraje, paciencia y autocontrol."],
  ["The Hermit", "El Ermitaño", "Introspección, búsqueda y pausa."],
  ["Wheel of Fortune", "La Rueda de la Fortuna", "Cambios, ciclos y movimiento."]
];

let selectedSpread = null;
let drawnCards = [];

function renderHome() {
  app.innerHTML = `
    <main class="page home">
      <div class="ornament">✦</div>
      <p class="eyebrow">MILLENNIAL TAROT</p>
      <h1>Tu lectura.<br><em>Tu intuición.</em></h1>
      <p class="intro">Elige una tirada, respira y deja que las cartas hablen.</p>
      <button class="primary" id="start">Comenzar lectura</button>
      <div class="footer-note">A little magic for ordinary days ✦</div>
    </main>
  `;
  document.getElementById("start").onclick = renderSpreads;
}

function renderSpreads() {
  app.innerHTML = `
    <main class="page">
      <button class="back" id="back">← Volver</button>
      <p class="eyebrow">MILLENNIAL TAROT</p>
      <h2>Elige tu tirada</h2>
      <p class="intro">¿Qué quieres explorar hoy?</p>
      <section class="spread-list">
        ${spreads.map(s => `
          <button class="spread-card" data-id="${s.id}">
            <span class="spread-number">${String(s.cards).padStart(2, "0")}</span>
            <span>
              <strong>${s.name}</strong>
              <small>${s.description}</small>
            </span>
            <span class="arrow">→</span>
          </button>
        `).join("")}
      </section>
    </main>
  `;
  document.getElementById("back").onclick = renderHome;
  document.querySelectorAll(".spread-card").forEach(btn => {
    btn.onclick = () => {
      selectedSpread = spreads.find(s => s.id === btn.dataset.id);
      drawnCards = [];
      renderReading();
    };
  });
}

function drawCard() {
  const available = demoCards.filter(c => !drawnCards.some(d => d[0] === c[0]));
  const card = available[Math.floor(Math.random() * available.length)] || demoCards[0];
  const reversed = Math.random() < 0.25;
  drawnCards.push([...card, reversed]);
  renderReading();
}

function renderReading() {
  const total = selectedSpread.cards;
  const isComplete = drawnCards.length >= total;

  app.innerHTML = `
    <main class="page reading">
      <button class="back" id="back">← Tiradas</button>
      <p class="eyebrow">${selectedSpread.name.toUpperCase()}</p>
      <h2>${isComplete ? "Tu lectura" : "Concéntrate en tu pregunta"}</h2>
      <p class="intro">${isComplete ? "Estas son tus cartas." : `${drawnCards.length} de ${total} cartas reveladas`}</p>

      <section class="cards">
        ${drawnCards.map((c, i) => `
          <article class="tarot-card ${c[3] ? "reversed" : ""}">
            <div class="card-symbol">${["☽","✦","♢","☀","♜","♡","☄","♧","✧","◌"][i % 10]}</div>
            <div class="card-count">${i + 1}</div>
            <h3>${c[1]}</h3>
            <span>${c[3] ? "INVERTIDA" : "AL DERECHO"}</span>
            <p>${c[2]}</p>
          </article>
        `).join("")}
        ${!isComplete ? `<button class="draw-card" id="draw">Revelar ${drawnCards.length + 1}ª carta <span>✦</span></button>` : ""}
      </section>

      ${isComplete ? `
        <button class="primary" id="new">Nueva lectura</button>
      ` : ""}
    </main>
  `;

  document.getElementById("back").onclick = renderSpreads;
  if (!isComplete) document.getElementById("draw").onclick = drawCard;
  if (isComplete) document.getElementById("new").onclick = renderSpreads;
}

renderHome();
