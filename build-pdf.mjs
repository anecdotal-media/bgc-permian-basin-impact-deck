// Renders the horizontal-scroll deck as a landscape PDF where each card becomes one page.
// PDF is a fallback artifact — the deck is built for online viewing at the GitHub Pages URL.
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(__dirname, 'index.html');
const outPath = resolve(__dirname, 'bgc-permian-basin-impact-deck.pdf');

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(`file://${indexPath}`, { waitUntil: 'networkidle0' });
await page.evaluateHandle('document.fonts.ready');

// Force all reveal animations and count-up targets to final state before printing.
await page.evaluate(() => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('animate'));
    document.querySelectorAll('.bar-stage').forEach(el => el.classList.add('animate'));
    document.querySelectorAll('.count-up').forEach(el => {
        const target = el.dataset.target;
        if (target) el.textContent = target;
    });
    // Rebuild slider as a vertical stack with each card as its own print page.
    const slider = document.getElementById('slider');
    if (slider) {
        slider.style.cssText = 'display: block; padding: 0; mask-image: none; overflow: visible;';
        slider.querySelectorAll('section.slide-container').forEach(s => {
            s.style.cssText = 'width: 100%; height: 100vh; aspect-ratio: auto; page-break-after: always; break-after: page; border-radius: 0; margin: 0; box-shadow: none;';
        });
    }
    // Hide the floating nav so it doesn't print on every page.
    const nav = document.querySelector('nav');
    if (nav) nav.style.display = 'none';
    document.body.style.paddingTop = '0';
});

await new Promise(r => setTimeout(r, 800));

await page.pdf({
    path: outPath,
    width: '11in',
    height: '8.5in',
    landscape: true,
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log(`Wrote ${outPath}`);
