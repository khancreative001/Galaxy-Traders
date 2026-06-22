// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Handle CTA button
const ctaStart = document.getElementById("cta-start");
ctaStart.addEventListener("click", () => {
  const marketsSection = document.getElementById("markets");
  marketsSection.scrollIntoView({ behavior: "smooth" });
});

// Load market data from data.json
async function loadMarkets() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    renderMarkets(data.markets);
  } catch (error) {
    console.error("Error loading markets:", error);
  }
}

function renderMarkets(markets) {
  const container = document.getElementById("market-list");
  container.innerHTML = "";

  markets.forEach((market) => {
    const card = document.createElement("div");
    card.className = "gt-market-card";

    const title = document.createElement("div");
    title.className = "gt-market-title";
    title.textContent = market.name;

    const symbol = document.createElement("div");
    symbol.className = "gt-market-symbol";
    symbol.textContent = market.symbol;

    const price = document.createElement("div");
    price.className = "gt-market-price";
    price.textContent = `$${market.price.toLocaleString()}`;

    const change = document.createElement("div");
    change.className = "gt-market-change";
    change.textContent = `${market.change > 0 ? "+" : ""}${market.change.toFixed(2)}%`;
    change.classList.add(market.change >= 0 ? "positive" : "negative");

    card.appendChild(title);
    card.appendChild(symbol);
    card.appendChild(price);
    card.appendChild(change);

    container.appendChild(card);
  });
}

// Simple contact form handler (front‑end only)
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    contactStatus.textContent = "Please fill in all fields.";
    return;
  }

  // Here you would send data to your backend/API
  contactStatus.textContent = "Message sent (demo). We’ll get back to you among the stars.";
  contactForm.reset();
});

// Init
loadMarkets();
