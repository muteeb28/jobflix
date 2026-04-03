import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Pixelify_Sans,
  JetBrains_Mono,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Bricolage_Grotesque,
} from "next/font/google";
import "./globals.css";
import { UserProgressProvider } from "@/context/UserProgressContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const pixelifySans = Pixelify_Sans({ variable: "--font-pixel", subsets: ["latin"], display: "swap" });
const playfairDisplay = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });
const plusJakartaSans = Plus_Jakarta_Sans({ variable: "--font-plus-jakarta", subsets: ["latin"], display: "swap" });
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jobflix - Land Your Dream Role",
  description: "Curated courses, live mock interviews, and real job opportunities—all in one place. Jobflix is your carrier operating system.",
};

// Injected before React hydrates — prevents flash of wrong theme.
// Reads localStorage; falls back to light (the site default).
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Run before first paint to eliminate FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} ${bricolageGrotesque.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <UserProgressProvider>{children}</UserProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
