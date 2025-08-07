// app/portfolio/page.jsx
"use client"

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";

export default function PortfolioPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/api/projects');
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                const data = await response.json();
                setProjects(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Failed to load projects. Please try again later.");
                setLoading(false);
                
                // Fallback to sample data if API fails
                setProjects([
                    {
                        title: "Portfolio Website Deployment with AWS, Terraform, and GitHub Actions",
                        description: "Designed and deployed a production-grade personal portfolio using Next.js hosted on AWS S3 with CloudFront CDN for global distribution.",
                        technologies: ["AWS (S3, CloudFront, EC2)", "Terraform", "GitHub Actions", "CloudWatch", "Bash"]
                    },
                    {
                        title: "Flask Microservice with Docker, Kubernetes, Helm, and GitOps",
                        description: "Developed a lightweight Flask API and containerized it using Docker. Deployed the application to a Kubernetes cluster with Helm charts for modular configuration.",
                        technologies: ["Flask", "Docker", "Kubernetes (Minikube)", "Helm", "ArgoCD", "Prometheus", "Grafana"]
                    },
                    {
                        title: "Infrastructure Automation with Pulumi, Ansible, and GitLab CI/CD",
                        description: "Provisioned an EC2-based LAMP stack (Linux, Apache, MySQL, PHP) on AWS using Pulumi (Python-based IaC).",
                        technologies: ["Pulumi (Python)", "Ansible", "GitLab CI/CD", "Apache", "MySQL", "Bash"]
                    }
                ]);
            }
        }
        
        fetchProjects();
    }, []);

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