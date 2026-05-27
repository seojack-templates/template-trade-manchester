import type { Metadata, Viewport } from 'next';
import './globals.css';

const BASE_URL = 'https://template-trade-manchester.seojack.site';

const BUSINESS_DESCRIPTION =
    'Family-run multi-trade firm serving Greater Manchester since 2008. Gas Safe plumbing, central heating, NICEIC electrical, full bathroom refits, and loft insulation. No callout fee, fixed-price quotes, 24/7 emergency cover.';

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'Emergency Plumber & Trades Manchester | Mancunia',
    description:
        'Gas Safe plumber, electrician & bathroom fitter in Manchester. No callout fee, fixed-price quotes, 24/7 emergency cover. Call 0161 555 0142.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'Emergency Plumber & Trades Manchester | Mancunia',
        description:
            'Gas Safe plumber, electrician & bathroom fitter in Manchester. No callout fee, fixed-price quotes, 24/7 emergency cover. Call 0161 555 0142.',
        url: BASE_URL,
        siteName: 'Mancunia Trades',
        type: 'website',
        locale: 'en_GB',
        images: [{ url: 'https://cdn.seojack.website/templates/tpl_trade_manchester.avif', width: 1600, height: 1000 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Emergency Plumber & Trades Manchester | Mancunia',
        description:
            'Gas Safe plumber, electrician & bathroom fitter in Manchester. No callout fee, fixed-price quotes, 24/7 emergency cover. Call 0161 555 0142.',
        images: ['https://cdn.seojack.website/templates/tpl_trade_manchester.avif'],
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#102a30' };

const jsonLdBusiness = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Mancunia Trades',
    description: BUSINESS_DESCRIPTION,
    url: BASE_URL,
    image: 'https://cdn.seojack.website/templates/tpl_trade_manchester.avif',
    telephone: '+441615550142',
    priceRange: '££',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Manchester',
        addressRegion: 'Greater Manchester',
        addressCountry: 'GB',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 53.4808,
        longitude: -2.2426,
    },
    areaServed: [
        { '@type': 'City', name: 'Manchester' },
        { '@type': 'Place', name: 'Didsbury' },
        { '@type': 'Place', name: 'Chorlton' },
        { '@type': 'Place', name: 'Sale' },
        { '@type': 'Place', name: 'Altrincham' },
        { '@type': 'Place', name: 'Stockport' },
        { '@type': 'Place', name: 'Salford' },
        { '@type': 'Place', name: 'Bury' },
        { '@type': 'Place', name: 'Bolton' },
        { '@type': 'Place', name: 'Trafford' },
        { '@type': 'Place', name: 'Tameside' },
        { '@type': 'Place', name: 'Oldham' },
        { '@type': 'Place', name: 'Wigan' },
    ],
    openingHours: [
        'Mo-Fr 07:00-20:00',
        'Sa 08:00-18:00',
        'Su 09:00-17:00',
    ],
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        description: '24/7 emergency callouts available outside standard hours',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '612',
        bestRating: '5',
        worstRating: '1',
    },
    sameAs: [
        'https://www.checkatrade.com/',
        'https://www.trustmark.org.uk/',
        'https://www.trustpilot.com/',
    ],
    hasCredential: [
        'Gas Safe Registered',
        'NICEIC Approved',
        'TrustMark Government Endorsed',
        'Which? Trusted Trader',
        'Checkatrade Verified',
    ],
    foundingDate: '2008',
};

const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Do you charge a callout fee?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. We never charge just for showing up — not even for emergencies. You pay for the work we do, not the journey to your door.',
            },
        },
        {
            '@type': 'Question',
            name: 'How fast can you come out?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Emergency callouts (no heat, no water, no power) are typically within the hour across Greater Manchester. Non-emergency work is booked the same week, often the same day.',
            },
        },
        {
            '@type': 'Question',
            name: 'Are your prices fixed before the work starts?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Every job gets a written, fixed-price quote before a spanner turns. We don’t do hourly rates that drift, and we don’t do “while we’re here” add-ons without your sign-off.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you offer finance on bigger jobs?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes — 0% finance is available on boilers, bathrooms and rewires above £1,500, subject to status. Spread the cost over 12, 24 or 36 months. Regulated by the FCA.',
            },
        },
        {
            '@type': 'Question',
            name: 'What guarantee comes with the work?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Manufacturer warranty on every part we fit, plus a 12-month workmanship guarantee on every job. If something we did fails, we come back and put it right at no charge.',
            },
        },
        {
            '@type': 'Question',
            name: 'Are you insured and accredited?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Fully — £5m public liability, Gas Safe registered (123456), NICEIC for electrical work, Checkatrade verified and TrustMark government-endorsed. Numbers are on every invoice.',
            },
        },
        {
            '@type': 'Question',
            name: 'Which areas do you cover?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'All of Greater Manchester and surrounding postcodes — Didsbury, Chorlton, Sale, Altrincham, Stockport, Bury, Bolton, Salford, Trafford, Tameside, Oldham, Wigan and everywhere in between.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you tidy up after the work?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Always. Dust sheets down before we start, debris bagged and removed at the end, surfaces wiped. You shouldn’t be able to tell we were there — apart from the new boiler.',
            },
        },
    ],
};

const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Mancunia Trades',
            item: BASE_URL,
        },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-GB">
            <body>
                {children}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBusiness) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
                />
            </body>
        </html>
    );
}
