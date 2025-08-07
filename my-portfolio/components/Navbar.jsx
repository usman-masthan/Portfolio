// components/Navbar.jsx
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [headerData, setHeaderData] = useState({
        logo: "Ahamed Usman",
        navigation: [
            { label: "About", href: "/about" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Blog", href: "/blog" },
            { label: "Testimonials", href: "/testimonials" }
        ],
        ctaButton: { label: "Contact", href: "/contact" }
    });

    useEffect(() => {
        // Fetch header data from API
        const fetchHeaderData = async () => {
            try {
                const response = await fetch('/api/header');
                if (response.ok) {
                    const data = await response.json();
                    setHeaderData(data);
                }
            } catch (error) {
                console.error('Error fetching header data:', error);
            }
        };

        fetchHeaderData();

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4 bg-background/80 backdrop-blur-md shadow-sm" : "py-6"}`}>
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="font-extrabold text-2xl tracking-tight relative group">
                    <span className="text-primary">{headerData.logo}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
                    {headerData.navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="relative hover:text-primary transition-colors py-2 group"
                            target={item.isExternal ? "_blank" : "_self"}
                            rel={item.isExternal ? "noopener noreferrer" : ""}
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <Link
                        href={headerData.ctaButton.href}
                        className="bg-primary hover:bg-primary/90 px-5 py-2 rounded-lg transition-all text-primary-foreground font-semibold shadow-md hover:shadow-lg"
                    >
                        {headerData.ctaButton.label}
                    </Link>
                    <ThemeToggle />
                </nav>

                <div className="flex items-center md:hidden">
                    <ThemeToggle />
                    <button
                        className="text-foreground p-2 ml-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-card/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-96 py-4" : "max-h-0"}`}>
                <div className="flex flex-col space-y-3 px-4 pb-4">
                    {headerData.navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="py-2 hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                            target={item.isExternal ? "_blank" : "_self"}
                            rel={item.isExternal ? "noopener noreferrer" : ""}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href={headerData.ctaButton.href}
                        className="bg-primary mt-2 px-4 py-2 rounded-lg text-center text-primary-foreground font-semibold"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {headerData.ctaButton.label}
                    </Link>
                </div>
            </div>
        </header>
    );
}