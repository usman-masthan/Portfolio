// components/Navbar.jsx
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
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
                    <span className="text-primary">Ahamed Usman</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>

                <nav className="hidden md:flex space-x-8 text-base font-medium">
                    {["About", "Portfolio", "Blog", "Testimonials"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="relative hover:text-primary transition-colors py-2 group"
                        >
                            {item}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="bg-primary hover:bg-primary/90 px-5 py-2 rounded-lg transition-all text-primary-foreground font-semibold shadow-md hover:shadow-lg"
                    >
                        Contact
                    </Link>
                </nav>

                <button
                    className="md:hidden text-foreground p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-card/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-96 py-4" : "max-h-0"}`}>
                <div className="flex flex-col space-y-3 px-4 pb-4">
                    {["About", "Portfolio", "Blog", "Testimonials"].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="py-2 hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="bg-primary mt-2 px-4 py-2 rounded-lg text-center text-primary-foreground font-semibold"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </header>
    );
}