'use client';

import { useEffect, useRef, useState } from 'react';
import SeojackCredit from './SeojackCredit';

const TRADE = 'Mancunia Trades';
const PHONE = '0161 555 0142';
const PHONE_TEL = '+441615550142';

const ACCREDITATIONS = ['Gas Safe', 'Checkatrade', 'TrustMark', 'Which? Trusted', 'Trustpilot ★ 4.9'];

const MEDIA_BASE = 'https://cdn.seojack.website/templates/tpl_trade_manchester';

type Stat = {
    value: number;
    suffix: string;
    label: string;
    sub: string;
    decimals?: number;
};
const STATS: Stat[] = [
    { value: 16, suffix: '', label: 'Years trading', sub: 'Since 2008' },
    { value: 12400, suffix: '+', label: 'Jobs completed', sub: 'Across Greater Manchester' },
    { value: 4.9, suffix: '★', label: 'Average rating', decimals: 1, sub: 'From 612 Google reviews' },
    { value: 98, suffix: '%', label: 'First-time fix rate', sub: 'Where parts allow' },
];

const WHY_US = [
    {
        title: 'No callout fee',
        body: 'We don’t charge you for showing up. Pay for the work, not the journey.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'Fixed-price quotes',
        body: 'Written quote before any spanner turns. No “while we’re here” surprises.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'Family-run, no subcontractors',
        body: 'The engineer on your job is on our payroll. Same faces, every visit.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'Same-day where possible',
        body: 'Most non-emergency callouts booked the same day. Emergencies, within the hour.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

// Service-section photos are real stock (Pexels). The `?v=` query forces browsers to
// drop the previously-cached AI-generated images served at the same R2 keys.
const SERVICE_IMG_V = 2;
const SERVICES = [
    {
        title: 'Installations',
        blurb: 'Boilers, rewires, full bathrooms — supplied and fitted to manufacturer spec with parts & labour warranty.',
        slug: 'install',
        alt: 'Professional plumber installing a radiator pipe in a UK home',
    },
    {
        title: 'Repairs & Callouts',
        blurb: 'Diagnosed and fixed on the first visit where parts allow. Fixed-price quotes before we start.',
        slug: 'repair',
        alt: 'Plumber installing pipe fittings under a kitchen sink',
    },
    {
        title: 'Servicing',
        blurb: 'Annual checks, gas safety certificates, landlord compliance. Reminder service included.',
        slug: 'service',
        alt: 'Gas engineer servicing a heating boiler system',
    },
    {
        title: 'Emergency 24/7',
        blurb: 'No heat, no water, no power — out-of-hours response across Greater Manchester. No callout fee.',
        slug: 'emergency',
        alt: 'Plumber in blue uniform repairing a leaking pipe with a wrench',
    },
] as const;

const BEFORE_AFTER = [
    {
        id: 'boiler',
        label: 'Combi boiler swap',
        meta: 'Didsbury · 1 day',
        beforeAlt: 'Old yellowed combi boiler before replacement',
        afterAlt: 'New white combi boiler after installation with clean pipework',
    },
    {
        id: 'bathroom',
        label: 'Full bathroom refit',
        meta: 'Chorlton · 5 days',
        beforeAlt: 'Dated 1990s UK bathroom before refit',
        afterAlt: 'Modern minimalist UK bathroom after refit',
    },
    {
        id: 'rewire',
        label: 'Consumer unit upgrade',
        meta: 'Sale · 1 day',
        beforeAlt: 'Old fuse box with messy wiring before upgrade',
        afterAlt: 'New consumer unit with clean wiring after upgrade',
    },
] as const;

const RECENT_JOBS = [
    {
        slug: 'job-kitchen-plumb',
        scope: 'Full kitchen plumb-in',
        meta: 'Altrincham · 2 days',
        tag: 'Plumbing',
    },
    {
        slug: 'job-ev-charger',
        scope: '7kW EV charger install',
        meta: 'Stockport · 1 day',
        tag: 'Electrical',
    },
    {
        slug: 'job-attic-insulation',
        scope: 'Loft insulation top-up',
        meta: 'Bury · 1 day',
        tag: 'Insulation',
    },
    {
        slug: 'job-radiator-install',
        scope: 'New living-room rad + balance',
        meta: 'Salford · ½ day',
        tag: 'Heating',
    },
    {
        slug: 'job-shower-fit',
        scope: 'Walk-in shower fit',
        meta: 'Trafford · 3 days',
        tag: 'Bathroom',
    },
    {
        slug: 'job-fuse-upgrade',
        scope: 'Fuse-board RCBO upgrade',
        meta: 'Tameside · 1 day',
        tag: 'Electrical',
    },
] as const;

const PROCESS = [
    {
        title: 'Tell us the job',
        body: 'Call us or use the form. Photos help. We’ll come back within the hour, working hours.',
    },
    {
        title: 'Fixed-price quote',
        body: 'Free site visit where needed. Written quote with timings before any work starts.',
    },
    {
        title: 'Booked & done',
        body: 'Date locked in. Same engineer arrives, dust sheets down, job done to manufacturer spec.',
    },
    {
        title: 'Aftercare & paperwork',
        body: 'Warranty papers, gas/electrical certificates and a 12-month workmanship guarantee.',
    },
] as const;

const ENGINEERS = [
    {
        slug: 'engineer-1',
        name: 'Dan Whitlock',
        role: 'Lead Gas Engineer',
        years: 18,
        badges: ['Gas Safe', 'OFTEC'],
    },
    {
        slug: 'engineer-2',
        name: 'Priya Mehta',
        role: 'Senior Plumber',
        years: 11,
        badges: ['WaterSafe', 'CIPHE'],
    },
    {
        slug: 'engineer-3',
        name: 'Marcus Adeyemi',
        role: 'Master Electrician',
        years: 22,
        badges: ['NICEIC', '18th Edition'],
    },
    {
        slug: 'engineer-4',
        name: 'Tom Pickering',
        role: 'Apprentice Engineer',
        years: 3,
        badges: ['NVQ Lvl 3', 'PAT Tested'],
    },
] as const;

const FAQS = [
    {
        q: 'Do you charge a callout fee?',
        a: 'No. We never charge just for showing up — not even for emergencies. You pay for the work we do, not the journey to your door.',
    },
    {
        q: 'How fast can you come out?',
        a: 'Emergency callouts (no heat, no water, no power) are typically within the hour across Greater Manchester. Non-emergency work is booked the same week, often the same day.',
    },
    {
        q: 'Are your prices fixed before the work starts?',
        a: 'Yes. Every job gets a written, fixed-price quote before a spanner turns. We don’t do hourly rates that drift, and we don’t do “while we’re here” add-ons without your sign-off.',
    },
    {
        q: 'Do you offer finance on bigger jobs?',
        a: 'Yes — 0% finance is available on boilers, bathrooms and rewires above £1,500, subject to status. Spread the cost over 12, 24 or 36 months. Regulated by the FCA.',
    },
    {
        q: 'What guarantee comes with the work?',
        a: 'Manufacturer warranty on every part we fit, plus a 12-month workmanship guarantee on every job. If something we did fails, we come back and put it right at no charge.',
    },
    {
        q: 'Are you insured and accredited?',
        a: 'Fully — £5m public liability, Gas Safe registered (123456), NICEIC for electrical work, Checkatrade verified and TrustMark government-endorsed. Numbers are on every invoice.',
    },
    {
        q: 'Which areas do you cover?',
        a: 'All of Greater Manchester and surrounding postcodes — Didsbury, Chorlton, Sale, Altrincham, Stockport, Bury, Bolton, Salford, Trafford, Tameside, Oldham, Wigan and everywhere in between.',
    },
    {
        q: 'Do you tidy up after the work?',
        a: 'Always. Dust sheets down before we start, debris bagged and removed at the end, surfaces wiped. You shouldn’t be able to tell we were there — apart from the new boiler.',
    },
];

const AREAS = [
    'Didsbury',
    'Chorlton',
    'Sale',
    'Altrincham',
    'Stockport',
    'Bury',
    'Bolton',
    'Salford',
    'Trafford',
    'Tameside',
    'Oldham',
    'Wigan',
];

const REVIEWS = [
    {
        name: 'Sarah K.',
        place: 'Didsbury',
        when: 'April 2025',
        body: 'Turned up when they said. Quoted what they said. Charged what they quoted. In our experience that’s three out of three more than most.',
        initial: 'S',
    },
    {
        name: 'Mark R.',
        place: 'Chorlton',
        when: 'March 2025',
        body: 'Boiler died on a Sunday morning. Engineer was here by 11. Replaced parts the same afternoon. Honest pricing, no upsell.',
        initial: 'M',
    },
    {
        name: 'Priya N.',
        place: 'Sale',
        when: 'February 2025',
        body: 'Used them three times now — install, service, and a callout. Same engineer every time, no scribbled invoices, proper warranty paperwork. Rare.',
        initial: 'P',
    },
] as const;

function CountUp({
    end,
    suffix = '',
    decimals = 0,
    duration = 1600,
}: {
    end: number;
    suffix?: string;
    decimals?: number;
    duration?: number;
}) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLSpanElement | null>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const reduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            setValue(end);
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !started.current) {
                        started.current = true;
                        const start = performance.now();
                        const tick = (now: number) => {
                            const t = Math.min(1, (now - start) / duration);
                            const eased = 1 - Math.pow(1 - t, 3);
                            setValue(end * eased);
                            if (t < 1) requestAnimationFrame(tick);
                        };
                        requestAnimationFrame(tick);
                    }
                });
            },
            { threshold: 0.35 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [end, duration]);

    const display =
        decimals > 0
            ? value.toFixed(decimals)
            : Math.round(value).toLocaleString('en-GB');

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
    );
}

function BeforeAfterSlider({
    id,
    label,
    meta,
    beforeAlt,
    afterAlt,
}: {
    id: string;
    label: string;
    meta: string;
    beforeAlt: string;
    afterAlt: string;
}) {
    const [pos, setPos] = useState(50);
    const ref = useRef<HTMLDivElement | null>(null);
    const dragging = useRef(false);

    const updateFromClientX = (clientX: number) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left;
        setPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    };

    return (
        <figure className="t-ba">
            <div
                ref={ref}
                className="t-ba__stage"
                onPointerDown={(e) => {
                    dragging.current = true;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    updateFromClientX(e.clientX);
                }}
                onPointerMove={(e) => {
                    if (dragging.current) updateFromClientX(e.clientX);
                }}
                onPointerUp={(e) => {
                    dragging.current = false;
                    try {
                        e.currentTarget.releasePointerCapture(e.pointerId);
                    } catch {}
                }}
                onPointerCancel={() => {
                    dragging.current = false;
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`${MEDIA_BASE}/before-${id}.avif`}
                    alt={beforeAlt}
                    className="t-ba__img"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`${MEDIA_BASE}/after-${id}.avif`}
                    alt={afterAlt}
                    className="t-ba__img t-ba__img--top"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
                />
                <span className="t-ba__tag t-ba__tag--before">Before</span>
                <span className="t-ba__tag t-ba__tag--after">After</span>
                <div className="t-ba__handle" style={{ left: `${pos}%` }} aria-hidden>
                    <div className="t-ba__knob">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <label className="sr-only" htmlFor={`t-ba-range-${id}`}>
                    {label} reveal
                </label>
                <input
                    id={`t-ba-range-${id}`}
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={pos}
                    onChange={(e) => setPos(Number(e.target.value))}
                    className="t-ba__range"
                    aria-label={`${label} before/after reveal`}
                />
            </div>
            <figcaption className="t-ba__cap">
                <strong>{label}</strong>
                <span>{meta}</span>
            </figcaption>
        </figure>
    );
}

function StickyMobileCTA() {
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const sentinel = document.getElementById('t-sticky-sentinel');
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) setShow(!entry.isIntersecting);
            },
            { threshold: 0 }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    if (dismissed) return null;

    return (
        <div
            className={`t-sticky-cta ${show ? 't-sticky-cta--in' : ''}`}
            role="region"
            aria-label="Quick contact"
        >
            <a className="t-sticky-cta__btn t-sticky-cta__btn--call" href={`tel:${PHONE_TEL}`}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Call
            </a>
            <a className="t-sticky-cta__btn t-sticky-cta__btn--quote" href="#quote">
                Get a quote
            </a>
            <button
                type="button"
                className="t-sticky-cta__close"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
            >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
}

function LogoMark({ size = 38 }: { size?: number }) {
    return (
        <svg
            viewBox="0 0 40 40"
            width={size}
            height={size}
            role="img"
            aria-label="Mancunia Trades"
            className="t-logo__svg"
        >
            <rect width="40" height="40" rx="10" fill="#1a1a1a" />
            {/* Double-rooftop silhouette — two adjacent house peaks, evoking
                "Manchester homes" and forming an M letterform. */}
            <path
                d="M9 28 L9 19 L14.5 13 L20 19 L25.5 13 L31 19 L31 28 Z"
                fill="#ffffff"
            />
            {/* Brand-accent foundation bar */}
            <rect x="9" y="29.5" width="22" height="2.2" rx="1" fill="#d14b2a" />
        </svg>
    );
}

function MapIllustration() {
    return (
        <svg
            viewBox="0 0 600 380"
            role="img"
            aria-label="Greater Manchester service area map"
            style={{ width: '100%', height: '100%', display: 'block' }}
        >
            <defs>
                <pattern id="dotgrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,.08)" />
                </pattern>
            </defs>
            <rect width="600" height="380" fill="#f6f3ec" />
            <rect width="600" height="380" fill="url(#dotgrid)" />

            <path
                d="M120 80 L220 60 L320 70 L420 90 L480 150 L490 230 L430 310 L320 340 L210 320 L130 270 L90 190 L100 130 Z"
                fill="#fff"
                stroke="#1a1a1a"
                strokeWidth="2"
            />
            <path
                d="M180 130 L260 120 L340 130 L390 160 L400 220 L350 270 L260 280 L190 260 L150 210 L160 160 Z"
                fill="rgba(209,75,42,0.08)"
                stroke="rgba(209,75,42,0.45)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
            />

            <g fontFamily="Inter, sans-serif" fontSize="11" fill="#1a1a1a">
                <circle cx="290" cy="200" r="6" fill="#d14b2a" />
                <text x="302" y="204" fontWeight="700">Manchester</text>

                <circle cx="240" cy="240" r="4" fill="#1a1a1a" />
                <text x="250" y="244">Didsbury</text>

                <circle cx="220" cy="200" r="4" fill="#1a1a1a" />
                <text x="170" y="195" textAnchor="end">Chorlton</text>

                <circle cx="180" cy="240" r="4" fill="#1a1a1a" />
                <text x="120" y="245" textAnchor="end">Sale</text>

                <circle cx="160" cy="195" r="4" fill="#1a1a1a" />
                <text x="105" y="180" textAnchor="end">Altrincham</text>

                <circle cx="350" cy="240" r="4" fill="#1a1a1a" />
                <text x="360" y="244">Stockport</text>

                <circle cx="320" cy="120" r="4" fill="#1a1a1a" />
                <text x="330" y="118">Bury</text>

                <circle cx="180" cy="120" r="4" fill="#1a1a1a" />
                <text x="170" y="115" textAnchor="end">Bolton</text>

                <circle cx="250" cy="155" r="4" fill="#1a1a1a" />
                <text x="240" y="150" textAnchor="end">Salford</text>

                <circle cx="400" cy="170" r="4" fill="#1a1a1a" />
                <text x="410" y="174">Oldham</text>
            </g>
        </svg>
    );
}

export default function DemoBody() {
    const year = new Date().getFullYear();

    // Scroll-reveal: observe every .t-reveal element and add .is-in when it enters viewport.
    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const elements = document.querySelectorAll<HTMLElement>('.trade-demo .t-reveal');
        if (reduced) {
            elements.forEach((el) => el.classList.add('is-in'));
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="trade-demo">
            <style>{`
.trade-demo {
  --t-accent: #d14b2a;
  --t-accent-dark: #b53d20;
  --t-ink: #1a1a1a;
  --t-ink-soft: rgba(0,0,0,.72);
  --t-ink-mute: rgba(0,0,0,.55);
  --t-border: #e3dfd6;
  --t-paper: #ffffff;
  --t-warm: #f6f3ec;
  --t-page: #f0eee9;
  background: var(--t-page);
  color: var(--t-ink);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}
/* Override host-app globals that would interfere with sticky positioning,
   focus styling, and z-context inside this template. */
.trade-demo, .trade-demo *, .trade-demo *::before, .trade-demo *::after {
  box-sizing: border-box;
  transform: none;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
}
.trade-demo *:focus { outline: none; }
.trade-demo *:focus-visible { outline: 2px solid var(--t-accent); outline-offset: 2px; }
.trade-demo a { color: inherit; text-decoration: none; }
.trade-demo button { font: inherit; cursor: pointer; }
.trade-demo input, .trade-demo textarea { font: inherit; color: inherit; }
.trade-demo h1, .trade-demo h2, .trade-demo h3, .trade-demo h4, .trade-demo p { margin: 0; }

.t-shell { max-width: 1240px; margin: 0 auto; }
.t-pad { padding-left: clamp(20px, 4vw, 40px); padding-right: clamp(20px, 4vw, 40px); }

/* Scroll reveal */
.trade-demo .t-reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity .6s cubic-bezier(.2,.7,.2,1), transform .6s cubic-bezier(.2,.7,.2,1);
  will-change: opacity, transform;
}
.trade-demo .t-reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .trade-demo .t-reveal, .trade-demo .t-reveal.is-in {
    opacity: 1; transform: none; transition: none;
  }
}

/* Nav */
.t-nav {
  position: sticky; top: 0; z-index: 30;
  background: rgba(255,255,255,.92);
  backdrop-filter: saturate(180%) blur(8px);
  -webkit-backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid var(--t-border);
}
.t-nav__inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 72px; gap: 24px;
}
.t-logo {
  display: flex; align-items: center; gap: 12px;
  font-weight: 800; font-size: 18px; letter-spacing: -0.2px;
}
.t-logo__svg {
  display: block; flex-shrink: 0;
  border-radius: 10px;
}
.t-nav__links {
  display: flex; align-items: center; gap: 26px;
  font-size: 14px; color: var(--t-ink-soft); font-weight: 500;
}
.t-nav__links a { transition: color .15s; }
.t-nav__links a:hover { color: var(--t-accent); }
.t-nav__phone {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 16px; border: 1.5px solid var(--t-accent);
  color: var(--t-accent); border-radius: 999px;
  font-weight: 700; font-size: 15px;
  transition: background .15s, color .15s;
}
.t-nav__phone:hover { background: var(--t-accent); color: #fff; }
@media (max-width: 900px) { .t-nav__links > a:not(:last-of-type) { display: none; } }
@media (max-width: 560px) { .t-nav__links { display: none; } .t-nav__links--always { display: inline-flex; } }

/* Hero */
.t-hero {
  display: grid; grid-template-columns: 1.45fr 1fr; gap: 48px;
  padding-top: 56px; padding-bottom: 56px;
  align-items: start;
}
@media (max-width: 960px) { .t-hero { grid-template-columns: 1fr; gap: 32px; } }
.t-h1 {
  margin: 18px 0 0; font-size: clamp(38px, 5.4vw, 60px); font-weight: 800;
  letter-spacing: -1.5px; line-height: 1.02; color: var(--t-ink);
}
.t-h1 .t-h1__accent { color: var(--t-accent); }
.t-hero__sub {
  margin-top: 20px; max-width: 520px; font-size: 17px; line-height: 1.55;
  color: var(--t-ink-soft);
}
.t-cta-row {
  display: flex; gap: 12px; align-items: center; flex-wrap: wrap;
  margin-top: 30px;
}
.t-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 22px; border-radius: 10px;
  font-weight: 800; font-size: 16px; letter-spacing: 0.2px;
  transition: transform .15s, box-shadow .15s, background .15s, color .15s;
}
.t-btn--phone {
  background: var(--t-accent); color: #fff;
  font-size: 20px; padding: 16px 24px;
  box-shadow: 0 8px 24px rgba(209,75,42,.25);
}
.t-btn--phone:hover { background: var(--t-accent-dark); transform: translateY(-1px); box-shadow: 0 12px 28px rgba(209,75,42,.32); }
.t-btn--ghost {
  background: transparent; color: var(--t-ink);
  border: 1.5px solid var(--t-ink);
}
.t-btn--ghost:hover { background: var(--t-ink); color: #fff; }
.t-rating {
  display: flex; align-items: center; gap: 14px; margin-top: 22px;
  font-size: 14px; color: var(--t-ink-soft);
}
.t-stars { display: inline-flex; gap: 2px; color: var(--t-accent); font-size: 18px; line-height: 1; }

/* Quote card */
.t-quote {
  background: #fffdf9; border: 2px solid var(--t-accent);
  border-radius: 14px; padding: 26px;
  box-shadow: 0 12px 32px rgba(26,26,26,.06);
  position: relative;
}
.t-quote::before {
  content: ''; position: absolute; inset: -2px;
  border-radius: 14px; pointer-events: none;
  background: linear-gradient(180deg, rgba(209,75,42,.04), transparent 60%);
}
.t-quote h2 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.4px; }
.t-quote__bar { width: 56px; height: 4px; background: var(--t-accent); border-radius: 2px; margin: 10px 0 18px; }
.t-form { display: grid; gap: 10px; }
.t-field {
  border: 1px solid var(--t-border); border-radius: 8px;
  padding: 12px 14px; font-size: 14px; background: #fff;
  transition: border-color .15s, box-shadow .15s;
  width: 100%;
}
.t-field:focus { outline: none; border-color: var(--t-accent); box-shadow: 0 0 0 3px rgba(209,75,42,.15); }
.t-form textarea.t-field { min-height: 82px; resize: vertical; font-family: inherit; }
.t-form__submit {
  margin-top: 4px; width: 100%;
  background: var(--t-accent); color: #fff; border: none;
  padding: 14px; border-radius: 10px;
  font-weight: 800; font-size: 16px;
  transition: background .15s;
}
.t-form__submit:hover { background: var(--t-accent-dark); }
.t-form__fine {
  text-align: center; font-size: 11px; color: var(--t-ink-mute);
  margin-top: 4px;
}

/* Stats band */
.t-stats {
  border-top: 1px solid var(--t-border);
  border-bottom: 1px solid var(--t-border);
  background: linear-gradient(180deg, var(--t-page), #ece9e1);
}
.t-stats__grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  padding: 28px 0;
}
.t-stats__cell {
  padding: 6px 18px;
  border-right: 1px dashed rgba(0,0,0,.14);
  text-align: center;
}
.t-stats__cell:last-child { border-right: none; }
.t-stats__num {
  font-size: clamp(30px, 3.6vw, 44px);
  font-weight: 800; letter-spacing: -1px;
  color: var(--t-ink);
  line-height: 1;
}
.t-stats__num--accent { color: var(--t-accent); }
.t-stats__lbl {
  margin-top: 8px;
  font-size: 13px; font-weight: 700;
  letter-spacing: 1.2px; text-transform: uppercase;
  color: var(--t-ink);
}
.t-stats__sub {
  margin-top: 4px; font-size: 12px; color: var(--t-ink-mute);
}
@media (max-width: 760px) {
  .t-stats__grid { grid-template-columns: repeat(2, 1fr); gap: 8px 0; padding: 20px 0; }
  .t-stats__cell { border-right: none; padding: 12px 8px; }
  .t-stats__cell:nth-child(odd) { border-right: 1px dashed rgba(0,0,0,.14); }
}

/* Trust strip */
.t-trust {
  background: var(--t-warm); border-top: 1px solid var(--t-border); border-bottom: 1px solid var(--t-border);
}
.t-trust__inner {
  display: grid; grid-template-columns: repeat(5, 1fr);
  text-align: center; font-size: 13px;
  color: var(--t-ink-mute); letter-spacing: 0.6px; text-transform: uppercase;
  font-weight: 600;
}
.t-trust__inner > div {
  padding: 18px 8px;
  border-right: 1px dashed rgba(0,0,0,.18);
}
.t-trust__inner > div:last-child { border-right: none; }
@media (max-width: 760px) {
  .t-trust__inner { grid-template-columns: repeat(2, 1fr); }
  .t-trust__inner > div { border-right: none; border-bottom: 1px dashed rgba(0,0,0,.18); }
}

/* Why us */
.t-section { padding-top: 64px; padding-bottom: 64px; }
.t-section__head { max-width: 720px; }
.t-h2 {
  font-size: clamp(28px, 3.4vw, 36px); font-weight: 800;
  letter-spacing: -0.8px; line-height: 1.1; margin: 0;
}
.t-h2__bar { width: 80px; height: 4px; background: var(--t-accent); border-radius: 2px; margin: 12px 0; }
.t-section__sub { color: var(--t-ink-soft); font-size: 16px; margin: 4px 0 0; }

.t-why {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  margin-top: 32px;
}
@media (max-width: 1000px) { .t-why { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .t-why { grid-template-columns: 1fr; } }
.t-why__card {
  background: var(--t-paper); border: 1px solid var(--t-border);
  border-radius: 14px; padding: 22px 22px 24px;
  transition: border-color .2s, transform .2s, box-shadow .2s;
}
.t-why__card:hover {
  border-color: rgba(209,75,42,.45);
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(26,26,26,.06);
}
.t-why__icon {
  width: 42px; height: 42px; border-radius: 10px;
  background: rgba(209,75,42,.08); color: var(--t-accent);
  display: grid; place-items: center;
  margin-bottom: 14px;
}
.t-why__icon svg { width: 22px; height: 22px; }
.t-why__title { font-size: 17px; font-weight: 800; letter-spacing: -.3px; margin: 0; }
.t-why__body { font-size: 14px; color: var(--t-ink-soft); line-height: 1.55; margin-top: 8px; }

/* Services */
.t-services {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
  margin-top: 36px;
}
@media (max-width: 1100px) { .t-services { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .t-services { grid-template-columns: 1fr; } }
.t-svc {
  background: var(--t-paper); border: 1px solid var(--t-border);
  border-radius: 14px; overflow: hidden; display: flex; flex-direction: column;
  transition: transform .2s, box-shadow .2s, border-color .2s;
}
.t-svc:hover { transform: translateY(-3px); box-shadow: 0 18px 36px rgba(26,26,26,.08); border-color: rgba(209,75,42,.4); }
.t-svc__media {
  height: 180px;
  background: var(--t-warm);
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--t-border);
}
.t-svc__img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  display: block;
  transition: transform .4s ease;
}
.t-svc:hover .t-svc__img { transform: scale(1.04); }
.t-svc__body { padding: 20px 20px 22px; }
.t-svc__title { font-size: 19px; font-weight: 800; letter-spacing: -0.3px; margin: 0; }
.t-svc__blurb { color: var(--t-ink-soft); font-size: 14px; line-height: 1.55; margin: 10px 0 16px; }
.t-svc__more {
  display: inline-flex; align-items: center; gap: 6px;
  color: var(--t-accent); font-weight: 700; font-size: 14px;
  transition: gap .2s;
}
.t-svc:hover .t-svc__more { gap: 10px; }

/* Before / After slider */
.t-ba-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  margin-top: 36px;
}
@media (max-width: 1000px) { .t-ba-grid { grid-template-columns: 1fr; max-width: 640px; margin-left: auto; margin-right: auto; } }
.t-ba {
  background: var(--t-paper); border: 1px solid var(--t-border);
  border-radius: 14px; overflow: hidden;
  display: flex; flex-direction: column;
}
.t-ba__stage {
  position: relative; aspect-ratio: 16/10;
  background: #1a1a1a; overflow: hidden;
  touch-action: none; user-select: none;
  cursor: ew-resize;
}
.t-ba__img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover; display: block;
  pointer-events: none;
}
.t-ba__img--top {
  z-index: 2;
}
.t-ba__tag {
  position: absolute; top: 12px; z-index: 4;
  padding: 4px 10px; border-radius: 999px;
  background: rgba(0,0,0,.72); color: #fff;
  font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
  pointer-events: none;
}
.t-ba__tag--before { left: 12px; }
.t-ba__tag--after { right: 12px; background: var(--t-accent); }
.t-ba__handle {
  position: absolute; top: 0; bottom: 0;
  width: 2px; background: #fff;
  box-shadow: 0 0 14px rgba(0,0,0,.4);
  transform: translateX(-1px);
  z-index: 3;
  pointer-events: none;
}
.t-ba__knob {
  position: absolute; top: 50%; left: 50%;
  width: 40px; height: 40px;
  background: #fff; color: var(--t-accent);
  border-radius: 999px;
  display: grid; place-items: center;
  transform: translate(-50%, -50%);
  box-shadow: 0 6px 16px rgba(0,0,0,.25), 0 0 0 2px var(--t-accent);
}
.t-ba__range {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  opacity: 0; cursor: ew-resize;
  z-index: 5;
}
.t-ba__cap {
  display: flex; justify-content: space-between; align-items: center;
  gap: 10px; padding: 14px 18px;
  font-size: 14px; color: var(--t-ink-soft);
}
.t-ba__cap strong {
  color: var(--t-ink); font-size: 15px; font-weight: 800;
}

/* Recent jobs */
.t-jobs {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
  margin-top: 36px;
}
@media (max-width: 1000px) { .t-jobs { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .t-jobs { grid-template-columns: 1fr; } }
.t-job {
  position: relative; aspect-ratio: 4/3; overflow: hidden;
  border-radius: 14px; border: 1px solid var(--t-border);
  background: var(--t-warm);
  display: block;
}
.t-job__img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .5s cubic-bezier(.2,.7,.2,1);
}
.t-job:hover .t-job__img { transform: scale(1.06); }
.t-job__shade {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,.72) 100%);
}
.t-job__tag {
  position: absolute; top: 12px; left: 12px;
  background: rgba(255,255,255,.92); color: var(--t-ink);
  font-size: 11px; font-weight: 800; letter-spacing: .6px;
  text-transform: uppercase;
  padding: 4px 10px; border-radius: 999px;
}
.t-job__body {
  position: absolute; left: 16px; right: 16px; bottom: 14px;
  color: #fff;
}
.t-job__scope { font-size: 16px; font-weight: 800; letter-spacing: -.2px; }
.t-job__meta { font-size: 12px; opacity: .82; margin-top: 4px; }
.t-job__more {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 8px;
  color: #fff; font-weight: 700; font-size: 12px;
  opacity: 0; transform: translateY(6px);
  transition: opacity .25s, transform .25s, gap .25s;
}
.t-job:hover .t-job__more { opacity: 1; transform: none; gap: 10px; }

/* Process / How it works */
.t-process {
  position: relative;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  margin-top: 40px;
}
.t-process::before {
  content: ''; position: absolute;
  left: 8%; right: 8%; top: 22px; height: 2px;
  background: linear-gradient(90deg, var(--t-accent), rgba(209,75,42,.25));
  z-index: 0;
}
@media (max-width: 860px) {
  .t-process { grid-template-columns: 1fr; gap: 18px; }
  .t-process::before { left: 22px; right: auto; top: 22px; bottom: 22px; width: 2px; height: auto; background: linear-gradient(180deg, var(--t-accent), rgba(209,75,42,.25)); }
}
.t-step {
  position: relative; z-index: 1;
  background: var(--t-paper); border: 1px solid var(--t-border);
  border-radius: 14px; padding: 22px;
}
.t-step__num {
  display: inline-grid; place-items: center;
  width: 44px; height: 44px; border-radius: 999px;
  background: var(--t-accent); color: #fff;
  font-size: 18px; font-weight: 800;
  box-shadow: 0 6px 16px rgba(209,75,42,.32);
  margin-bottom: 12px;
}
.t-step__title { font-size: 17px; font-weight: 800; letter-spacing: -.3px; margin: 0; }
.t-step__body { font-size: 14px; color: var(--t-ink-soft); line-height: 1.55; margin-top: 8px; }

/* Reviews band */
.t-reviews {
  background: var(--t-ink); color: #fff;
}
.t-reviews__head {
  display: flex; justify-content: space-between; align-items: end; gap: 24px;
  flex-wrap: wrap; margin-bottom: 28px;
}
.t-reviews__h { font-size: clamp(28px, 3.2vw, 36px); font-weight: 800; letter-spacing: -0.7px; margin: 0; }
.t-reviews__meta { color: rgba(255,255,255,.62); font-size: 14px; margin-top: 8px; }
.t-reviews__nav { display: flex; gap: 8px; }
.t-reviews__nav button {
  width: 40px; height: 40px; border-radius: 8px;
  background: transparent; color: #fff; border: 1px solid rgba(255,255,255,.3);
  display: grid; place-items: center;
  transition: background .15s, border-color .15s;
}
.t-reviews__nav button:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.55); }
.t-reviews__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
}
@media (max-width: 980px) { .t-reviews__grid { grid-template-columns: 1fr; } }
.t-review {
  background: #262626; border-radius: 12px; padding: 24px;
}
.t-review__body { font-size: 15px; line-height: 1.55; color: rgba(255,255,255,.88); margin: 14px 0 20px; }
.t-review__author { display: flex; align-items: center; gap: 12px; }
.t-review__avatar {
  width: 38px; height: 38px; border-radius: 999px;
  background: linear-gradient(135deg, var(--t-accent), #e07453);
  display: grid; place-items: center;
  color: #fff; font-weight: 800; font-size: 15px;
}
.t-review__who { font-weight: 700; font-size: 14px; }
.t-review__where { font-size: 12px; color: rgba(255,255,255,.55); }

/* Engineers */
.t-eng {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
  margin-top: 36px;
}
@media (max-width: 1000px) { .t-eng { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .t-eng { grid-template-columns: 1fr; max-width: 360px; margin-left: auto; margin-right: auto; } }
.t-eng__card {
  background: var(--t-paper); border: 1px solid var(--t-border);
  border-radius: 14px; overflow: hidden;
  transition: transform .2s, box-shadow .2s, border-color .2s;
}
.t-eng__card:hover {
  transform: translateY(-3px); box-shadow: 0 18px 36px rgba(26,26,26,.08); border-color: rgba(209,75,42,.4);
}
.t-eng__media { aspect-ratio: 4/5; background: var(--t-warm); overflow: hidden; }
.t-eng__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.t-eng__body { padding: 18px 18px 20px; }
.t-eng__name { font-size: 17px; font-weight: 800; letter-spacing: -.3px; margin: 0; }
.t-eng__role { font-size: 13px; color: var(--t-accent); font-weight: 700; margin-top: 2px; }
.t-eng__years { font-size: 12px; color: var(--t-ink-mute); margin-top: 6px; }
.t-eng__badges {
  display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px;
}
.t-eng__badges span {
  font-size: 11px; font-weight: 700; letter-spacing: .4px;
  padding: 3px 8px; border-radius: 6px;
  background: rgba(209,75,42,.08); color: var(--t-accent);
}

/* Areas */
.t-areas {
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: start;
}
@media (max-width: 960px) { .t-areas { grid-template-columns: 1fr; } }
.t-postcode {
  display: flex; margin-top: 20px; max-width: 460px;
}
.t-postcode input {
  flex: 1; border: 1px solid var(--t-border); border-right: 0;
  border-radius: 8px 0 0 8px; padding: 13px 14px;
  font-size: 14px; background: #fff;
}
.t-postcode input:focus { outline: none; border-color: var(--t-accent); }
.t-postcode button {
  padding: 13px 22px; background: var(--t-ink); color: #fff;
  border: 1px solid var(--t-ink); border-radius: 0 8px 8px 0;
  font-weight: 700; font-size: 14px;
  transition: background .15s;
}
.t-postcode button:hover { background: #000; }
.t-areas__pills {
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px;
}
.t-areas__pills span {
  display: inline-flex; padding: 7px 14px; border-radius: 999px;
  border: 1px solid var(--t-border); font-size: 13px; color: var(--t-ink-soft);
  background: #fff;
  transition: border-color .15s, color .15s, background .15s;
}
.t-areas__pills span:hover { border-color: var(--t-accent); color: var(--t-accent); background: rgba(209,75,42,.04); }
.t-map {
  height: 380px; border-radius: 14px; overflow: hidden;
  border: 1px solid var(--t-border); background: var(--t-warm);
  box-shadow: 0 8px 24px rgba(26,26,26,.06);
}

/* Finance strip */
.t-finance {
  background: var(--t-ink); color: #fff;
  border-top: 1px solid rgba(255,255,255,.1);
}
.t-finance__inner {
  display: flex; justify-content: space-between; align-items: center; gap: 24px;
  flex-wrap: wrap;
  padding: 26px 0;
}
.t-finance__copy { display: flex; align-items: center; gap: 16px; min-width: 0; }
.t-finance__badge {
  display: inline-grid; place-items: center;
  min-width: 64px; height: 64px; border-radius: 12px;
  background: var(--t-accent); color: #fff;
  font-weight: 800; font-size: 22px; letter-spacing: -.5px;
  padding: 0 8px;
  box-shadow: 0 8px 20px rgba(209,75,42,.35);
}
.t-finance__h { font-size: 20px; font-weight: 800; letter-spacing: -.4px; margin: 0; }
.t-finance__sub { color: rgba(255,255,255,.7); font-size: 13px; margin-top: 4px; }
.t-finance__cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 18px; border-radius: 10px;
  background: #fff; color: var(--t-ink);
  font-weight: 800; font-size: 14px;
  transition: background .15s, color .15s;
}
.t-finance__cta:hover { background: var(--t-accent); color: #fff; }
@media (max-width: 720px) { .t-finance__inner { flex-direction: column; align-items: flex-start; gap: 16px; } }

/* FAQ */
.t-faq { margin-top: 28px; max-width: 920px; }
.t-faq details {
  border-bottom: 1px solid var(--t-border);
  padding: 18px 0;
}
.t-faq details:first-of-type { border-top: 1px solid var(--t-border); }
.t-faq summary {
  display: flex; justify-content: space-between; align-items: center;
  gap: 16px; font-size: 17px; font-weight: 700; letter-spacing: -.2px;
  cursor: pointer; list-style: none;
}
.t-faq summary::-webkit-details-marker { display: none; }
.t-faq summary::after {
  content: '+'; font-size: 22px; font-weight: 800; color: var(--t-accent);
  width: 28px; height: 28px;
  display: grid; place-items: center;
  border-radius: 999px;
  background: rgba(209,75,42,.08);
  transition: transform .2s, background .2s;
}
.t-faq details[open] summary::after { content: '−'; transform: rotate(0deg); background: var(--t-accent); color: #fff; }
.t-faq__a {
  margin-top: 12px; color: var(--t-ink-soft);
  font-size: 15px; line-height: 1.6;
  max-width: 760px;
}

/* Final CTA */
.t-final {
  background: var(--t-warm); border-top: 1px solid var(--t-border);
  padding: 72px 24px; text-align: center;
}
.t-final h2 {
  font-size: clamp(32px, 4vw, 44px); font-weight: 800; letter-spacing: -1px;
  margin: 0 auto; max-width: 760px; line-height: 1.1;
}
.t-final p {
  margin: 16px auto 28px; max-width: 560px;
  font-size: 17px; color: var(--t-ink-soft); line-height: 1.55;
}
.t-final__bar { width: 80px; height: 4px; background: var(--t-accent); border-radius: 2px; margin: 16px auto; }
.t-final__cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

/* Footer */
.t-foot {
  background: var(--t-ink); color: rgba(255,255,255,.55);
  font-size: 13px;
}
.t-foot__inner {
  padding: 22px 0;
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  flex-wrap: wrap;
}

/* Sticky mobile CTA bar */
.t-sticky-cta {
  position: fixed; left: 12px; right: 12px; bottom: 12px;
  display: flex; gap: 8px;
  padding: 8px;
  background: rgba(26,26,26,.96);
  border-radius: 14px;
  box-shadow: 0 12px 36px rgba(0,0,0,.35);
  z-index: 25;
  transform: translateY(140%);
  opacity: 0;
  transition: transform .35s cubic-bezier(.2,.7,.2,1), opacity .25s;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.t-sticky-cta--in { transform: none; opacity: 1; }
@media (min-width: 901px) { .t-sticky-cta { display: none; } }
.t-sticky-cta__btn {
  flex: 1; display: inline-flex; align-items: center; justify-content: center;
  gap: 6px;
  padding: 12px; border-radius: 10px;
  font-weight: 800; font-size: 14px;
  color: #fff;
}
.t-sticky-cta__btn--call { background: rgba(255,255,255,.12); }
.t-sticky-cta__btn--call:hover { background: rgba(255,255,255,.18); }
.t-sticky-cta__btn--quote {
  background: var(--t-accent);
}
.t-sticky-cta__btn--quote:hover { background: var(--t-accent-dark); }
.t-sticky-cta__close {
  width: 36px; height: 36px; border-radius: 10px;
  background: transparent; color: rgba(255,255,255,.6);
  border: 1px solid rgba(255,255,255,.18);
  display: grid; place-items: center;
}
.t-sticky-cta__close:hover { color: #fff; border-color: rgba(255,255,255,.4); }

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
            `}</style>

            {/* NAV */}
            <header className="t-nav">
                <div className="t-shell t-pad">
                    <div className="t-nav__inner">
                        <div className="t-logo">
                            <LogoMark size={38} />
                            <span>{TRADE}</span>
                        </div>
                        <nav className="t-nav__links">
                            <a href="#services">Services</a>
                            <a href="#work">Our work</a>
                            <a href="#process">How it works</a>
                            <a href="#engineers">The team</a>
                            <a href="#faq">FAQ</a>
                            <a className="t-nav__phone t-nav__links--always" href={`tel:${PHONE_TEL}`}>
                                <span aria-hidden>☎</span> {PHONE}
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="t-shell t-pad">
                <div className="t-hero">
                    <div>
                        <h1 className="t-h1">
                            Premium trades<br />
                            done properly,<br />
                            <span className="t-h1__accent">first time.</span>
                        </h1>
                        <p className="t-hero__sub">
                            Family-run, fully insured, 5-star rated. Free no-obligation quotes across
                            Greater Manchester. Same-day callouts where possible.
                        </p>
                        <div className="t-cta-row">
                            <a className="t-btn t-btn--phone" href={`tel:${PHONE_TEL}`}>
                                <span aria-hidden>☎</span> {PHONE}
                            </a>
                            <a className="t-btn t-btn--ghost" href="#quote">
                                Get a free quote →
                            </a>
                        </div>
                        <div className="t-rating">
                            <span className="t-stars" aria-label="5 out of 5 stars">★★★★★</span>
                            <span>4.9 / 5 from 612 Google reviews</span>
                        </div>
                    </div>

                    <aside id="quote" className="t-quote" aria-label="Free quote form">
                        <h2>Free quote in 60 seconds</h2>
                        <div className="t-quote__bar" />
                        <form
                            className="t-form"
                            method="post"
                            action="#"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label className="sr-only" htmlFor="t-name">Your name</label>
                            <input className="t-field" id="t-name" name="name" placeholder="Your name" autoComplete="name" />
                            <label className="sr-only" htmlFor="t-phone">Phone number</label>
                            <input className="t-field" id="t-phone" name="phone" placeholder="Phone number" inputMode="tel" autoComplete="tel" />
                            <label className="sr-only" htmlFor="t-postcode">Postcode</label>
                            <input className="t-field" id="t-postcode" name="postcode" placeholder="Postcode" autoComplete="postal-code" />
                            <label className="sr-only" htmlFor="t-detail">What do you need?</label>
                            <textarea className="t-field" id="t-detail" name="detail" placeholder="What do you need?" rows={3} />
                            <button className="t-form__submit" type="submit">Request my free quote</button>
                            <p className="t-form__fine">No spam · GDPR · We reply within 1 working hour</p>
                        </form>
                    </aside>
                </div>
            </section>

            {/* Sentinel for the sticky mobile CTA — appears once user scrolls past the hero. */}
            <div id="t-sticky-sentinel" aria-hidden style={{ height: 1 }} />

            {/* STATS BAND */}
            <section className="t-stats" aria-label="Key numbers">
                <div className="t-shell t-pad">
                    <div className="t-stats__grid">
                        {STATS.map((s, i) => (
                            <div key={s.label} className="t-stats__cell">
                                <div className={`t-stats__num ${i === 0 || i === 2 ? 't-stats__num--accent' : ''}`}>
                                    <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                                </div>
                                <div className="t-stats__lbl">{s.label}</div>
                                <div className="t-stats__sub">{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUST STRIP */}
            <section className="t-trust" aria-label="Accreditations">
                <div className="t-shell t-pad">
                    <div className="t-trust__inner">
                        {ACCREDITATIONS.map((a) => (
                            <div key={a}>{a}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="t-shell t-pad t-section t-reveal">
                <div className="t-section__head">
                    <h2 className="t-h2">Why families pick us</h2>
                    <div className="t-h2__bar" />
                    <p className="t-section__sub">
                        Four promises that show up on every job, every time.
                    </p>
                </div>
                <div className="t-why">
                    {WHY_US.map((w) => (
                        <article key={w.title} className="t-why__card">
                            <div className="t-why__icon">{w.icon}</div>
                            <h3 className="t-why__title">{w.title}</h3>
                            <p className="t-why__body">{w.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="t-shell t-pad t-section t-reveal">
                <div className="t-section__head">
                    <h2 className="t-h2">Our services</h2>
                    <div className="t-h2__bar" />
                    <p className="t-section__sub">
                        Choose what you need — we&rsquo;ll book it the same day where possible.
                    </p>
                </div>
                <div className="t-services">
                    {SERVICES.map((s) => (
                        <article key={s.title} className="t-svc">
                            <div className="t-svc__media">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`${MEDIA_BASE}/${s.slug}.avif?v=${SERVICE_IMG_V}`}
                                    alt={s.alt}
                                    className="t-svc__img"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="t-svc__body">
                                <h3 className="t-svc__title">{s.title}</h3>
                                <p className="t-svc__blurb">{s.blurb}</p>
                                <a className="t-svc__more" href="#quote">Learn more →</a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* BEFORE / AFTER */}
            <section id="work" className="t-shell t-pad t-section t-reveal">
                <div className="t-section__head">
                    <h2 className="t-h2">See the difference</h2>
                    <div className="t-h2__bar" />
                    <p className="t-section__sub">
                        Drag the slider on any photo to reveal the work. Real jobs, real homes, real before-and-after.
                    </p>
                </div>
                <div className="t-ba-grid">
                    {BEFORE_AFTER.map((b) => (
                        <BeforeAfterSlider
                            key={b.id}
                            id={b.id}
                            label={b.label}
                            meta={b.meta}
                            beforeAlt={b.beforeAlt}
                            afterAlt={b.afterAlt}
                        />
                    ))}
                </div>
            </section>

            {/* RECENT JOBS */}
            <section className="t-shell t-pad t-section t-reveal" aria-label="Recent work">
                <div className="t-section__head">
                    <h2 className="t-h2">Recent jobs across Greater Manchester</h2>
                    <div className="t-h2__bar" />
                    <p className="t-section__sub">
                        A snapshot of the work we&rsquo;ve booked, quoted and completed in the last 30 days.
                    </p>
                </div>
                <div className="t-jobs">
                    {RECENT_JOBS.map((j) => (
                        <a key={j.slug} href="#quote" className="t-job" aria-label={`${j.scope} — ${j.meta}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`${MEDIA_BASE}/${j.slug}.avif`}
                                alt={j.scope}
                                className="t-job__img"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="t-job__shade" />
                            <span className="t-job__tag">{j.tag}</span>
                            <div className="t-job__body">
                                <div className="t-job__scope">{j.scope}</div>
                                <div className="t-job__meta">{j.meta}</div>
                                <span className="t-job__more">View case study →</span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* PROCESS */}
            <section id="process" style={{ background: 'var(--t-warm)', borderTop: '1px solid var(--t-border)', borderBottom: '1px solid var(--t-border)' }}>
                <div className="t-shell t-pad t-section t-reveal">
                    <div className="t-section__head">
                        <h2 className="t-h2">How it works</h2>
                        <div className="t-h2__bar" />
                        <p className="t-section__sub">
                            Four steps from your first call to a finished, certificated job. No nasty surprises.
                        </p>
                    </div>
                    <div className="t-process">
                        {PROCESS.map((p, i) => (
                            <div key={p.title} className="t-step">
                                <div className="t-step__num">{i + 1}</div>
                                <h3 className="t-step__title">{p.title}</h3>
                                <p className="t-step__body">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REVIEWS */}
            <section id="reviews" className="t-reviews">
                <div className="t-shell t-pad t-section t-reveal">
                    <div className="t-reviews__head">
                        <div>
                            <h2 className="t-reviews__h">What customers say</h2>
                            <div className="t-reviews__meta">612 reviews · 4.9 average · verified Google</div>
                        </div>
                        <div className="t-reviews__nav" aria-hidden>
                            <button type="button" aria-label="Previous review">←</button>
                            <button type="button" aria-label="Next review">→</button>
                        </div>
                    </div>
                    <div className="t-reviews__grid">
                        {REVIEWS.map((r) => (
                            <article key={r.name} className="t-review">
                                <span className="t-stars" aria-label="5 out of 5 stars">★★★★★</span>
                                <p className="t-review__body">&ldquo;{r.body}&rdquo;</p>
                                <div className="t-review__author">
                                    <div className="t-review__avatar" aria-hidden>{r.initial}</div>
                                    <div>
                                        <div className="t-review__who">{r.name}</div>
                                        <div className="t-review__where">{r.place} · {r.when}</div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ENGINEERS */}
            <section id="engineers" className="t-shell t-pad t-section t-reveal">
                <div className="t-section__head">
                    <h2 className="t-h2">Meet the engineers on your job</h2>
                    <div className="t-h2__bar" />
                    <p className="t-section__sub">
                        Same faces every visit. No subcontractors. No mystery vans.
                    </p>
                </div>
                <div className="t-eng">
                    {ENGINEERS.map((e) => (
                        <article key={e.slug} className="t-eng__card">
                            <div className="t-eng__media">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`${MEDIA_BASE}/${e.slug}.avif`}
                                    alt={`Portrait of ${e.name}, ${e.role}`}
                                    className="t-eng__img"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="t-eng__body">
                                <h3 className="t-eng__name">{e.name}</h3>
                                <div className="t-eng__role">{e.role}</div>
                                <div className="t-eng__years">{e.years} years in the trade</div>
                                <div className="t-eng__badges">
                                    {e.badges.map((b) => (
                                        <span key={b}>{b}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* AREAS */}
            <section id="areas" className="t-shell t-pad t-section t-reveal">
                <div className="t-areas">
                    <div>
                        <h2 className="t-h2">Where we cover</h2>
                        <div className="t-h2__bar" />
                        <p className="t-section__sub" style={{ maxWidth: 460 }}>
                            All of Greater Manchester and surrounding postcodes. Not sure?
                            Enter yours and we&rsquo;ll confirm in seconds.
                        </p>
                        <form className="t-postcode" action="#" onSubmit={(e) => e.preventDefault()}>
                            <label className="sr-only" htmlFor="t-areas-postcode">Postcode</label>
                            <input id="t-areas-postcode" placeholder="Enter your postcode" autoComplete="postal-code" />
                            <button type="submit">Check</button>
                        </form>
                        <div className="t-areas__pills">
                            {AREAS.map((a) => (
                                <span key={a}>{a}</span>
                            ))}
                        </div>
                    </div>
                    <div className="t-map">
                        <MapIllustration />
                    </div>
                </div>
            </section>

            {/* FINANCE */}
            <section className="t-finance">
                <div className="t-shell t-pad">
                    <div className="t-finance__inner">
                        <div className="t-finance__copy">
                            <div className="t-finance__badge">0%</div>
                            <div>
                                <h3 className="t-finance__h">Finance available on bigger jobs</h3>
                                <p className="t-finance__sub">
                                    Spread the cost of a boiler, bathroom or rewire over 12–36 months.
                                    0% APR options. Subject to status · FCA regulated.
                                </p>
                            </div>
                        </div>
                        <a className="t-finance__cta" href="#quote">
                            See my options →
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="t-shell t-pad t-section t-reveal">
                <div className="t-section__head">
                    <h2 className="t-h2">Questions, answered</h2>
                    <div className="t-h2__bar" />
                    <p className="t-section__sub">
                        Everything we get asked the most — straight answers, no fluff.
                    </p>
                </div>
                <div className="t-faq">
                    {FAQS.map((f, i) => (
                        <details key={f.q} open={i === 0}>
                            <summary>{f.q}</summary>
                            <p className="t-faq__a">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="t-final">
                <h2>Ready for a quote?</h2>
                <div className="t-final__bar" />
                <p>Call now, or send us your details and we&rsquo;ll be back within the hour.</p>
                <div className="t-final__cta">
                    <a className="t-btn t-btn--phone" href={`tel:${PHONE_TEL}`}>
                        <span aria-hidden>☎</span> {PHONE}
                    </a>
                    <a className="t-btn t-btn--ghost" href="#quote">
                        Get a free quote →
                    </a>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="t-foot">
                <div className="t-shell t-pad">
                    <div className="t-foot__inner">
                        <span>© {year} {TRADE} Ltd · Manchester</span>
                        <span>Gas Safe 123456 · Reg. 0987654</span>
                    </div>
                </div>
            </footer>

            <StickyMobileCTA />
            <SeojackCredit templateId="tpl_trade_manchester" />
        </div>
    );
}
