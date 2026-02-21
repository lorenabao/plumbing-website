import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CallButton } from "@/components/ui/CallButton";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/gdpr/CookieConsent";
import { LanguageProvider } from "@/lib/i18n";
import { business } from "@/content/business";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://arturomorgadanes.com"),
  title: {
    default: `${business.name} - Fontanero en Vigo | Urgencias 24h`,
    template: `%s | ${business.name}`,
  },
  description: `${business.tagline}. Más de ${business.experience} años de experiencia. Desatascos, fugas, reformas de baños. Presupuesto sin compromiso. ${business.phone}`,
  keywords: [
    "arturo morgadanes",
    "fontanero vigo",
    "fontanero urgente vigo",
    "desatascos vigo",
    "fontanería vigo",
    "reparación fugas vigo",
    "fontanero pontevedra",
    "fontanero 24 horas vigo",
    "fontanero profesional vigo",
    "plumber vigo",
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://arturomorgadanes.com",
    siteName: business.name,
    title: `${business.name} - Fontanero en Vigo`,
    description: business.tagline,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${business.name} - Fontanero Profesional`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} - Fontanero en Vigo`,
    description: business.tagline,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  alternates: {
    canonical: "https://arturomorgadanes.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <LocalBusinessSchema />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <GoogleAnalytics />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CallButton />
          <CookieConsent />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
