// components/Footer.jsx
import Link from "next/link";

export default function Footer() {
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
                            {['github', 'linkedin', 'twitter'].map(platform => (
                                <a key={platform} href={`https://${platform}.com/yourhandle`} className="text-foreground/60 hover:text-primary transition-colors">
                                    <span className="sr-only">{platform}</span>
                                    <div className="w-6 h-6">
                                        {/* You can add actual SVG icons here */}
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
                                    <Link href={item === "Home" ? "/my-portfolio/public" : `/${item.toLowerCase()}`} className="text-foreground/70 hover:text-primary transition-colors">
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
                        &copy; {new Date().getFullYear()} Ahamed Usman. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}