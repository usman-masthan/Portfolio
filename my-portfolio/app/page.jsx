// app/page.jsx
"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import ScrollProgressBar from "../components/ScrollProgressBar";

export default function HomePage() {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [profile, setProfile] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch projects
                const projectsResponse = await fetch('/api/projects');
                if (!projectsResponse.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const projectsData = await projectsResponse.json();
                setFeaturedProjects(projectsData);
                
                // Fetch profile
                const profileResponse = await fetch('/api/profile');
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    setProfile(profileData);
                } else {
                    console.error('Failed to fetch profile data');
                }
                
                // Fetch services
                const servicesResponse = await fetch('/api/services');
                if (servicesResponse.ok) {
                    const servicesData = await servicesResponse.json();
                    setServices(servicesData);
                } else {
                    console.error('Failed to fetch services data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Fallback data in case of error
                setFeaturedProjects([
                    {
                        title: "Portfolio Website Deployment with AWS, Terraform, and GitHub Actions",
                        description: "Designed and deployed a production-grade personal portfolio using Next.js hosted on AWS S3 with CloudFront CDN for global distribution.",
                        technologies: ["AWS (S3, CloudFront, EC2)", "Terraform", "GitHub Actions", "CloudWatch", "Bash"],
                        role: "DevOps Engineer",
                        challenge: "Setting up a reliable, scalable infrastructure with automated deployments while ensuring optimal performance and security.",
                        outcome: "Documented an incident response process with metrics and recovery steps, following SRE principles.",
                        duration: "2 months",
                        year: "2025"
                    },
                    {
                        title: "Flask Microservice with Docker, Kubernetes, Helm, and GitOps",
                        description: "Developed a lightweight Flask API and containerized it using Docker. Deployed the application to a Kubernetes cluster with Helm charts for modular configuration.",
                        technologies: ["Flask", "Docker", "Kubernetes (Minikube)", "Helm", "ArgoCD", "Prometheus", "Grafana"],
                        role: "Cloud Native Developer",
                        challenge: "Implementing a GitOps workflow with proper observability while ensuring the application could scale and recover automatically from failures.",
                        outcome: "Set up observability using Prometheus + Grafana, and simulated pod crashes to test auto-recovery and alerting.",
                        duration: "3 months",
                        year: "2025"
                    },
                    {
                        title: "Infrastructure Automation with Pulumi, Ansible, and GitLab CI/CD",
                        description: "Provisioned an EC2-based LAMP stack (Linux, Apache, MySQL, PHP) on AWS using Pulumi (Python-based IaC).",
                        technologies: ["Pulumi (Python)", "Ansible", "GitLab CI/CD", "Apache", "MySQL", "Bash"],
                        role: "Infrastructure Engineer",
                        challenge: "Creating a fully automated infrastructure provisioning and configuration process with proper CI/CD integration.",
                        outcome: "Developed monitoring scripts in Bash and documented incident resolution steps after simulating service failure scenarios.",
                        duration: "4 months",
                        year: "2025"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
            {/* Scroll progress indicator */}
            <ScrollProgressBar />
            
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                {/* Top-right decorative circle */}
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-primary/5 to-accent/10 blur-3xl" />
                
                {/* Bottom-left decorative circle */}
                <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-accent/5 to-primary/10 blur-3xl" />
                
                {/* Subtle grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.015]" />
            </div>
            
            <Navbar />

            {/* Hero Section - Main content starts here */}
            <motion.section
                id="main-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center pt-32 md:pt-40 pb-20 px-4 max-w-6xl mx-auto w-full"
            >
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {profile ? profile.title : "Full Stack Developer"}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Hello, I'm <span className="text-primary">{profile ? profile.name : "Ahamed Usman"}</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-foreground/90 max-w-xl">
                        {profile ? profile.tagline : "I create thoughtfully crafted digital experiences that combine elegant design with powerful functionality."}
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
                                src={profile ? profile.profileImage : "/profile.jpg"}
                                alt={profile ? profile.name : "Ahamed Usman"}
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

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProjects.map((project, index) => (
                                <ProjectCard key={project._id || index} project={project} index={index + 1} />
                            ))}
                        </div>
                    )}

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
            <section className="py-16 relative">
                {/* Tech section background */}
                <div className="absolute inset-0 bg-secondary/5">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent"></div>
                    <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] bg-repeat opacity-[0.03]"></div>
                </div>
                
                <div className="max-w-6xl mx-auto px-4 relative z-10">
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
            <section className="py-16 relative">
                {/* What I Do section background */}
                <div className="absolute inset-0">
                    <div className="absolute right-0 top-1/4 w-[25%] h-[50%] bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl opacity-60"></div>
                    <div className="absolute left-0 bottom-1/4 w-[20%] h-[40%] bg-gradient-to-r from-accent/5 to-transparent rounded-full blur-3xl opacity-60"></div>
                </div>
                
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What I Do</h2>
                        <p className="text-foreground/70 max-w-2xl mx-auto">
                            Specialized services tailored to meet your digital needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(services.length > 0 ? services : [
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
                        ]).map((service, i) => (
                            <motion.div
                                key={service._id || i}
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
            <section className="py-16 relative">
                {/* Contact CTA background */}
                <div className="absolute inset-0 bg-secondary/5">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/3 via-transparent to-accent/3"></div>
                    <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] bg-repeat opacity-[0.02]"></div>
                </div>
                
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-card p-8 md:p-12 rounded-2xl shadow-lg border border-border text-center backdrop-blur-sm bg-card/90"
                    >
                        <h2 className="text-3xl font-bold mb-4">{profile ? profile.contactCTA : "Interested in working together?"}</h2>
                        <p className="text-foreground/80 mb-8 max-w-xl mx-auto">
                            {profile ? profile.availability : "I'm currently available for freelance projects and full-time opportunities. Let's create something amazing together."}
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
