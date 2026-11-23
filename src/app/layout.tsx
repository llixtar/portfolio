import type { Metadata, Viewport } from "next";
import { Jura, Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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

export const metadata: Metadata = {
  title: "Портфоліо",
  description: "Ексклюзивні веб-сайти для вашої справи та бренду",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Обов'язково додаємо змінні у клас html
    <html lang="uk" className={`${jura.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}