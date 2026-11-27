import type { Metadata, Viewport } from "next";
import { Jura, Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

// Налаштовуємо Jura
const jura = Jura({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-jura", // Ця змінна передається в globals.css
});

// Налаштовуємо Inter
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter", // Ця змінна передається в globals.css
});

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://shchelakov-andrii.dev";
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: "Andrii Shchelakov — Розробка інтернет-магазинів та сайтів",
  description:
    "Індивідуальна розробка швидких інтернет-магазинів, лендінгів та бізнес-платформ. Живе демо під час роботи, адмін-панель, Telegram-бот бонусом та оплата після здачі.",
  keywords: [
    "розробка сайтів",
    "створення інтернет-магазину",
    "веб-розробник",
    "розробка сайту під ключ",
    "Next.js розробник",
    "лендінг під ключ",
    "Andrii Shchelakov",
    "Андрій Щелаков",
  ],
  authors: [{ name: "Andrii Shchelakov", url: siteUrl }],
  creator: "Andrii Shchelakov",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Andrii Shchelakov — Розробка інтернет-магазинів та сайтів",
    description:
      "Швидкі сайти, інтернет-магазини та бізнес-платформи без шаблонів. Оплата після затвердження демо.",
    url: siteUrl,
    siteName: "Andrii Shchelakov",
    type: "website",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrii Shchelakov — Розробка інтернет-магазинів та сайтів",
    description:
      "Швидкі сайти, інтернет-магазини та бізнес-платформи без шаблонів. Оплата після затвердження демо.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Andrii Shchelakov — Розробка інтернет-магазинів та сайтів",
    description:
      "Індивідуальна розробка швидких інтернет-магазинів, лендінгів та бізнес-платформ на Next.js і React.",
    url: siteUrl,
    areaServed: ["UA", "PL", "EU"],
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: "Andrii Shchelakov",
      jobTitle: "Fullstack Web Developer",
      sameAs: ["https://t.me/llixtar"],
    },
  };

  return (
    // Обов'язково додаємо змінні у клас html
    <html lang="uk" className={`${jura.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}