import { useState } from "react";

const spreads = [
  {
    id: "one",
    title: "Una carta",
    subtitle: "Consejo o mensaje del momento",
    count: 1,
  },
  {
    id: "three",
    title: "Tres cartas",
    subtitle: "Pasado · Presente · Futuro",
    count: 3,
  },
  {
    id: "celtic",
    title: "Cruz Celta",
    subtitle: "Una lectura profunda de 10 cartas",
    count: 10,
  },
  {
    id: "custom",
    title: "Personalizada",
    subtitle: "Tú decides cuántas cartas sacar",
    count: 5,
  },
];

const demoCards = [
  { name: "El Loco", number: "0" },
  { name: "La Sacerdotisa", number: "II" },
  { name: "La Emperatriz", number: "III" },
  { name: "El Ermitaño", number: "IX" },
  { name: "La Estrella", number: "XVII" },
  { name: "La Luna", number: "XVIII" },
  { name: "El Sol", number: "XIX" },
  { name: "El Mundo", number: "XXI" },
];

function App() {
  const [screen, setScreen] = useState("home");
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [question, setQuestion] = useState("");

  const startSpread = (spread) => {
    setSelectedSpread(spread);
    setDrawn([]);
    setScreen("reading");
  };

  const drawCard = () => {
    const available = demoCards.filter(
      (card) => !drawn.some((drawnCard) => drawnCard.name === card.name)
    );

    if (!available.length) return;

    const card = available[Math.floor(Math.random() * available.length)];
    const reversed = Math.random() < 0.25;

    setDrawn([...drawn, { ...card, reversed }]);
  };

  const reset = () => {
    setSelectedSpread(null);
    setDrawn([]);
    setQuestion("");
    setScreen("home");
  };

  if (screen === "home") {
    return (
      <main className="app">
        <section className="home">
          <div className="ornament">✦</div>

          <div className="brand">
            <span className="brand-small">THE</span>
            <h1>MILLENNIAL</h1>
            <h2>TAROT</h2>
          </div>

          <p className="subtitle">Discover what the cards have to say.</p>

          <div className="deck-container">
            <div className="card-back">
              <div className="card-border">
                <span>✦</span>
              </div>
            </div>
          </div>

          <button className="primary-button" onClick={() => setScreen("spreads")}>
            <span>Hacer una tirada</span>
            <span>→</span>
          </button>

          <div className="secondary-links">
            <button onClick={() => setScreen("spreads")}>Mis tiradas</button>
            <span>·</span>
            <button>Las cartas</button>
          </div>

          <div className="ornament bottom">✦</div>
        </section>
      </main>
    );
  }

  if (screen === "spreads") {
    return (
      <main className="app">
        <section className="screen">
          <button className="back" onClick={reset}>← Volver</button>

          <div className="section-heading">
            <span>✦</span>
            <h1>Elige tu tirada</h1>
            <p>Elige la lectura que mejor encaje con tu pregunta.</p>
          </div>

          <div className="spread-grid">
            {spreads.map((spread) => (
              <button
                className="spread-card"
                key={spread.id}
                onClick={() => startSpread(spread)}
              >
                <span className="spread-count">{spread.count}</span>
                <strong>{spread.title}</strong>
                <small>{spread.subtitle}</small>
                <span className="arrow">→</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="screen reading-screen">
        <button className="back" onClick={() => setScreen("spreads")}>← Tiradas</button>

        <div className="reading-header">
          <span>✦ {selectedSpread?.title}</span>
          <h1>Concéntrate en tu pregunta</h1>
          <p>Cuando estés preparada, saca una carta del mazo.</p>
        </div>

        <textarea
          className="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Escribe tu pregunta (opcional)..."
          rows="2"
        />

        <div className="deck-area">
          <button
            className={`deck-button ${drawn.length ? "drawn" : ""}`}
            onClick={drawCard}
            disabled={drawn.length >= (selectedSpread?.count || 1)}
          >
            <div className="deck-inner">
              <span>✦</span>
            </div>
          </button>
        </div>

        <p className="draw-counter">
          {drawn.length} / {selectedSpread?.count} cartas
        </p>

        {drawn.length > 0 && (
          <div className="drawn-cards">
            {drawn.map((card, index) => (
              <article className="revealed-card" key={`${card.name}-${index}`}>
                <div className={`mini-card ${card.reversed ? "reversed" : ""}`}>
                  <span>{card.number}</span>
                  <b>✦</b>
                  <small>{card.name}</small>
                </div>
                <div>
                  <small>Carta {index + 1}</small>
                  <h3>{card.name}</h3>
                  {card.reversed && <em>Invertida</em>}
                </div>
              </article>
            ))}
          </div>
        )}

        {drawn.length >= (selectedSpread?.count || 1) && (
          <button className="primary-button result-button" onClick={() => setScreen("result")}>
            <span>Ver mi tirada</span>
            <span>→</span>
          </button>
        )}
      </section>
    </main>
  );
}

export default App;
