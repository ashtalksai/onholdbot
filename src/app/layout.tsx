import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "OnHoldBot — Never Wait On Hold Again",
  description: "AI navigates phone menus while you stay muted. Get unmuted instantly when a human picks up. Save hours of your time every month.",
  keywords: ["hold time", "phone wait", "AI assistant", "customer service", "time saver"],
  openGraph: {
    title: "OnHoldBot — Never Wait On Hold Again",
    description: "AI navigates phone menus while you stay muted. Get unmuted instantly when a human picks up.",
    type: "website",
    url: "https://onholdbot.ashketing.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OnHoldBot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OnHoldBot — Never Wait On Hold Again",
    description: "AI navigates phone menus while you stay muted. Get unmuted instantly when a human picks up.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-[var(--background)] text-[var(--text-primary)]`}
      >
        {children}
      </body>
    </html>
  );
}
