# Crypto-AI: Marketing Website

React + Vite site with a dark-navy glass design, Framer Motion animations, Lenis smooth scrolling, a custom cursor, and real brand icons from `react-icons`.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Stack

| Package | Used for |
| --- | --- |
| `framer-motion` | Blur-in headline, scroll-tilt terminal, stacking cards, layout pills, count-ups, accordions |
| `lenis` | Smooth scrolling (`components/layout/SmoothScroll.jsx`) |
| `react-icons` | UI icons (Remix `ri`), real coin logos (Simple Icons `si`), currency signs (`fa6`) |
| `react-router-dom` | `/`, `/pricing`, `/token` |

React Bits-style pieces (BlurText, ScrollVelocity ticker, ScrollStack, SpotlightCard, CountUp) are implemented in-house under `src/components/ui` and `src/sections`.

## Structure

```
src/
  config/site.js        Brand name, domain, token, contract (change the brand here)
  data/                 plans · markets · content (stats, steps, FAQ, security) · dashboard dummy data
  hooks/useLivePrices   Simulated price feed (swap for a real WebSocket)
  styles/               tokens.css (colours, radii, fonts) · base.css
  components/
    layout/             Header · TickerBar (sticky live headline) · Footer · Background · SmoothScroll
    ui/                 Button · GlassCard · Logo · CoinIcon · Cursor · BlurText · CountUp · Reveal · SectionHeading
  sections/             Hero · Stats · Products (bento) · HowItWorks (stack) · Pricing · Dashboard · Security · FAQ · CTA · Calculator · PageHero
  pages/                Home · PricingPage · TokenPage
```

Every component sits in its own folder with its own `.css` file.

## Before launch

- `site.token.contract` is a placeholder (`0x000…`). Put in the real deployed address.
- The waitlist form (`sections/CTA`) only validates on the front end. Connect it to the client's CRM or backend.
- Ticker and terminal prices are simulated (`hooks/useLivePrices.js`). Dashboard numbers are sample data.
- White paper, terms, privacy, blog and social links are `#` placeholders.
- Rates are labelled as targets and the stats as company-reported, and risk notices are included. Keep them, and have the client's legal team approve all return figures.
