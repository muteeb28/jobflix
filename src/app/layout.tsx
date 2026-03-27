import type { Metadata } from "next";
import { Geist, Geist_Mono, Pixelify_Sans, JetBrains_Mono, Playfair_Display, Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Level Up - Transform Your Future",
  description: "Level Up offers study abroad consultation, professional courses, and career launchpad programs to help you achieve your goals.",
};

import { UserProgressProvider } from "@/context/UserProgressContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} ${bricolageGrotesque.variable} antialiased`}
        suppressHydrationWarning
      >
        <UserProgressProvider>
          {children}
        </UserProgressProvider>
      </body>
    </html>
  );
}
