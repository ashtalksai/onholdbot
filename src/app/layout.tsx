import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "OnHoldBot — Never Wait On Hold Again",
  description: "AI navigates phone menus while you stay muted. Get unmuted instantly when a human picks up.",
  openGraph: {
    title: "OnHoldBot — Never Wait On Hold Again",
    description: "AI navigates phone menus while you stay muted. Get unmuted instantly when a human picks up.",
    type: "website",
    url: "https://onholdbot.ashketing.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnHoldBot — Never Wait On Hold Again",
    description: "AI navigates phone menus while you stay muted. Get unmuted instantly when a human picks up.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
