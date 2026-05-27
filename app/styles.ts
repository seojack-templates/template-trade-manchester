/**
 * Scoped CSS for the trade-manchester template.
 * EVERY selector must be prefixed with ".trade-manchester-demo" so the styles
 * cannot leak (this matters when the source is seeded into the builder).
 */
export const TRADE_MANCHESTER_CSS = `
.trade-manchester-demo {
    --ink: #14141a;
    --paper: #ffffff;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color: var(--ink);
    background: var(--paper);
}
.trade-manchester-demo * { box-sizing: border-box; }
.trade-manchester-demo h1 { font-size: clamp(2rem, 5vw, 3.5rem); margin: 0 0 1rem; }
`;