// app/page.jsx
"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

export default function HomePage() {
    // Featured projects data - just a small selection of your best work
    const featuredProjects = [
        {
            title: "E-commerce Platform",
            description: "A full-featured online store with payments integration",
            technologies: ["React", "Node.js", "MongoDB"]
        },
        {
            title: "Healthcare Dashboard",
            description: "Analytics dashboard for healthcare providers",
            technologies: ["Next.js", "TypeScript", "D3.js"]
        },
        {
            title: "Educational App",
            description: "Mobile application for interactive learning",
            technologies: ["React Native", "Redux", "Express"]
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center pt-32 md:pt-40 pb-20 px-4 max-w-6xl mx-auto w-full"
            >
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        Full Stack Developer
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Hello, I'm <span className="text-primary">Ahamed Usman</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-xl">
                        I create thoughtfully crafted digital experiences that combine elegant design with powerful functionality.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="/portfolio"
                            className="bg-primary hover:bg-primary/90 transition-all px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:translate-y-[-2px] text-primary-foreground"
                        >
                            View My Work
                        </Link>
                        <Link
                            href="/contact"
                            className="border border-primary hover:bg-primary/10 transition-all px-8 py-3 rounded-lg font-semibold hover:translate-y-[-2px]"
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30"></div>
                        <div className="relative rounded-full border-2 border-primary/20 shadow-xl overflow-hidden w-64 h-64">
                            <Image
                                src="/profile.jpg"
                                alt="Ahamed Usman"
                                width={256}
                                height={256}
                                className="rounded-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Featured Projects - Just highlighting a few */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                        <p className="text-foreground/70 max-w-2xl mx-auto">
                            A glimpse of my best work. Visit my portfolio for the complete showcase.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index + 1} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/portfolio"
                            className="bg-primary hover:bg-primary/90 transition-all px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg inline-flex items-center text-primary-foreground"
                        >
                            Explore Full Portfolio
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-16 bg-secondary/5">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold mb-2">
                            Technologies I Work With
                        </h2>
                        <p className="text-foreground/70 max-w-2xl mx-auto">
                            I leverage modern technologies to build robust, scalable applications
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8 justify-items-center">
                        {['next.svg', 'vercel.svg', 'globe.svg', 'react.svg', 'node.svg', 'tailwind.svg'].map((icon, i) => (
                            <motion.div
                                key={icon}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px]"
                            >
                                <Image
                                    src={`/${icon}`}
                                    alt={icon.split('.')[0]}
                                    width={50}
                                    height={50}
                                    className="opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What I Do Section - Added as additional content */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What I Do</h2>
                        <p className="text-foreground/70 max-w-2xl mx-auto">
                            Specialized services tailored to meet your digital needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Web Development",
                                description: "I build responsive, performant websites with modern frameworks and best practices.",
                                icon: "🌐"
                            },
                            {
                                title: "Mobile Applications",
                                description: "Cross-platform mobile apps that provide native-like experiences on all devices.",
                                icon: "📱"
                            },
                            {
                                title: "UI/UX Design",
                                description: "User-centered design that balances aesthetics with functionality and accessibility.",
                                icon: "🎨"
                            }
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all"
                            >
                                <div className="text-3xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-foreground/70">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-secondary/5">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-card p-8 md:p-12 rounded-2xl shadow-lg border border-border text-center"
                    >
                        <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
                        <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
                            I'm currently available for freelance projects and full-time opportunities.
                            Let's create something amazing together.
                        </p>
                        <Link
                            href="/contact"
                            className="bg-primary hover:bg-primary/90 transition-all px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg inline-flex items-center text-primary-foreground"
                        >
                            Get in Touch
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
