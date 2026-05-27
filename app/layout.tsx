import type { Metadata, Viewport } from 'next';
import './globals.css';

const BASE_URL = 'https://trade-manchester.templates.seojack.website';

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'Mancunia Trades — Manchester',
    description: 'Conversion-grade landing page for a family-run UK trade firm: sticky callback form, before/after gallery, accreditations, recent jobs, and 0% finance.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'Mancunia Trades',
        description: 'Conversion-grade landing page for a family-run UK trade firm: sticky callback form, before/after gallery, accreditations, recent jobs, and 0% finance.',
        url: BASE_URL,
        siteName: 'Mancunia Trades',
        type: 'website',
        locale: 'en_GB',
        images: [{ url: 'https://cdn.seojack.website/templates/tpl_trade_manchester.avif', width: 1600, height: 1000 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mancunia Trades',
        description: 'Conversion-grade landing page for a family-run UK trade firm: sticky callback form, before/after gallery, accreditations, recent jobs, and 0% finance.',
        images: ['https://cdn.seojack.website/templates/tpl_trade_manchester.avif'],
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#102a30' };

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Mancunia Trades',
    description: 'Conversion-grade landing page for a family-run UK trade firm: sticky callback form, before/after gallery, accreditations, recent jobs, and 0% finance.',
    url: BASE_URL,
    image: 'https://cdn.seojack.website/templates/tpl_trade_manchester.avif',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-GB">
            <body>
                {children}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </body>
        </html>
    );
}