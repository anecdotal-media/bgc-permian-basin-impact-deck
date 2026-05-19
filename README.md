# Boys & Girls Club of the Permian Basin — Impact Story Deck

Live at: https://anecdotal-media.github.io/bgc-permian-basin-impact-deck/

A donor-facing impact story for **Boys & Girls Club of the Permian Basin** (Odessa + Midland), modeled after the DonorSpark Impact deck format. Single-file HTML, horizontal snap-scroll, 8 cards.

## Slides

1. **Hero** — "Great Futures Start HERE."
2. **Mission** — A positive place for kids + four pillars
3. **The Need** — West Texas after-school gap + the Club's solution
4. **By the Numbers** — 1,000 daily · 73,400+ meals · 17,000+ snacks · 450,000+ reading questions · 86% post-secondary
5. **Programs** — Power Hour, Stride, Smart Moves, sports, arts, gardening
6. **How We're Funded** — Revenue mix bar chart (individuals are 31% — the largest single source)
7. **Partners** — UTPB, Odessa College, Midland College, West Texas Food Bank, United Way, schools, city governments
8. **CTA** — Donate via existing PayPal button, plus phone, email, website

## Build

```bash
npm install
npm run og    # rebuild og-image.png from og.html
npm run pdf   # rebuild bgc-permian-basin-impact-deck.pdf from index.html
```

## Source content

All facts drawn from basinkids.org (mission, programs, stats, revenue mix) and the Boys & Girls Club of the Permian Basin "About" page (founding years, partners, contact). No invented stats.

## Stack

- Single `index.html` — no build step required to view
- Tailwind via CDN, Lucide icons, Google Fonts (Montserrat + Source Serif 4)
- IntersectionObserver-based reveal + count-up animations
- Puppeteer for OG image + PDF generation

Donate link points to BGCPB's existing PayPal hosted button.
