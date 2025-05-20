// app/portfolio/page.jsx
"use client"

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";

export default function PortfolioPage() {
    const projects = [
        {
            title: "E-commerce Platform",
            description: "A full-featured online store with payments, inventory management and analytics.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
            title: "Healthcare Dashboard",
            description: "Interactive analytics dashboard for healthcare providers.",
            technologies: ["Next.js", "TypeScript", "D3.js", "Firebase"]
        },
        {
            title: "Educational App",
            description: "Mobile application for interactive learning.",
            technologies: ["React Native", "Redux", "Express", "PostgreSQL"]
        },
        {
            title: "Content Management System",
            description: "Custom CMS for digital content creators.",
            technologies: ["Vue.js", "Node.js", "GraphQL", "MongoDB"]
        },
        {
            title: "Social Media Platform",
            description: "Niche social network with real-time features.",
            technologies: ["React", "Socket.io", "Express", "Redis"]
        },
        {
            title: "Fitness Tracker",
            description: "Web and mobile app for tracking workouts and nutrition.",
            technologies: ["React", "React Native", "Node.js", "MongoDB"]
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            {/* Portfolio Header */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">My Portfolio</h1>
                        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                            A collection of projects I've worked on throughout my career
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index + 1} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}