// components/Footer.jsx
"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
    const [footerData, setFooterData] = useState({
        copyright: "© 2025 Ahamed Usman. All rights reserved.",
        socialLinks: [
            { platform: "GitHub", url: "https://github.com/username", icon: "github" },
            { platform: "LinkedIn", url: "https://linkedin.com/in/username", icon: "linkedin" },
            { platform: "Twitter", url: "https://twitter.com/username", icon: "twitter" }
        ],
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" }
        ],
        credits: "Designed and built by Ahamed Usman"
    });

    useEffect(() => {
        // Fetch footer data from API
        const fetchFooterData = async () => {
            try {
                const response = await fetch('/api/footer');
                if (response.ok) {
                    const data = await response.json();
                    setFooterData(data);
                }
            } catch (error) {
                console.error('Error fetching footer data:', error);
            }
        };

        fetchFooterData();
    }, []);
    return (
        <footer className="w-full py-12 border-t border-muted bg-card/30">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Ahamed Usman</h3>
                        <p className="text-foreground/70 mb-4">
                            Full Stack Developer crafting elegant digital experiences.
                        </p>
                        <div className="flex space-x-4">
                            {footerData.socialLinks.map(social => (
                                <a 
                                    key={social.platform} 
                                    href={social.url} 
                                    className="text-foreground/60 hover:text-primary transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">{social.platform}</span>
                                    <div className="w-6 h-6">
                                        {/* Icon would be rendered based on social.icon */}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {["Home", "About", "Portfolio", "Blog", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-foreground/70 hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Services</h3>
                        <ul className="space-y-2">
                            {["Web Development", "UI/UX Design", "Mobile Apps", "Consulting"].map((item) => (
                                <li key={item} className="text-foreground/70">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-foreground/70">
                            <li>contact@example.com</li>
                            <li>San Francisco, CA</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-muted pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-foreground/70 mb-4 md:mb-0">
                        {footerData.copyright}
                    </div>
                    <div className="flex space-x-6">
                        {footerData.links.map(link => (
                            <Link 
                                key={link.label}
                                href={link.href} 
                                className="text-foreground/70 hover:text-primary transition-colors text-sm"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                {footerData.credits && (
                    <div className="text-center text-foreground/50 text-sm mt-6">
                        {footerData.credits}
                    </div>
                )}
            </div>
        </footer>
    );
}