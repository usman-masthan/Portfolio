import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import SkipLink from "../components/SkipLink";

// Primary font for body text
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Monospace font for code blocks
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Secondary font for headings to create visual hierarchy
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Ahamed Usman | Full Stack Developer",
  description: "Portfolio of Ahamed Usman, a Full Stack Developer specializing in React, Node.js, and modern web technologies.",
  keywords: ["full stack developer", "web development", "react", "next.js"],
  openGraph: {
    title: "Ahamed Usman | Full Stack Developer",
    description: "Portfolio of Ahamed Usman, a Full Stack Developer",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground">
        {/* Accessibility skip link */}
        <SkipLink />
        
        {/* ScrollProgressBar is imported dynamically with client directive inside each page that needs it */}
        {children}
      </body>
    </html>
  );
}
