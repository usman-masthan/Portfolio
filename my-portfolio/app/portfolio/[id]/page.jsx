// app/portfolio/[id]/page.jsx
"use client"

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function ProjectDetailPage() {
    const params = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Extract project ID from the URL
    // The URL format is /portfolio/project-{index}
    // We need to extract the index number
    const projectId = params.id;
    const projectIndex = projectId.startsWith('project-') 
        ? parseInt(projectId.replace('project-', ''), 10) 
        : null;

    useEffect(() => {
        async function fetchProject() {
            try {
                // First try to fetch from API
                const response = await fetch('/api/projects');
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                
                const projects = await response.json();
                
                // Find the project with the matching index
                // Note: In a real app, you'd likely have a dedicated API endpoint for a single project
                const foundProject = projects[projectIndex - 1]; // Adjust for 0-based array
                
                if (foundProject) {
                    setProject(foundProject);
                } else {
                    throw new Error("Project not found");
                }
                
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch project:", err);
                setError("Failed to load project details. Please try again later.");
                setLoading(false);
                
                // Fallback to sample data if API fails
                // Using the same fallback data structure as in portfolio page
                const fallbackProjects = [
                    {
                        title: "Portfolio Website Deployment with AWS, Terraform, and GitHub Actions",
                        description: "Designed and deployed a production-grade personal portfolio using Next.js hosted on AWS S3 with CloudFront CDN for global distribution.",
                        technologies: ["AWS (S3, CloudFront, EC2)", "Terraform", "GitHub Actions", "CloudWatch", "Bash"],
                        role: "DevOps Engineer",
                        challenge: "Setting up a reliable, scalable infrastructure with automated deployments while ensuring optimal performance and security.",
                        outcome: "Documented an incident response process with metrics and recovery steps, following SRE principles.",
                        duration: "2 months",
                        year: "2025",
                        images: ["/projects/project-1.jpg", "/projects/project-1-detail-1.jpg", "/projects/project-1-detail-2.jpg"]
                    },
                    {
                        title: "Flask Microservice with Docker, Kubernetes, Helm, and GitOps",
                        description: "Developed a lightweight Flask API and containerized it using Docker. Deployed the application to a Kubernetes cluster with Helm charts for modular configuration.",
                        technologies: ["Flask", "Docker", "Kubernetes (Minikube)", "Helm", "ArgoCD", "Prometheus", "Grafana"],
                        role: "Cloud Native Developer",
                        challenge: "Implementing a GitOps workflow with proper observability while ensuring the application could scale and recover automatically from failures.",
                        outcome: "Set up observability using Prometheus + Grafana, and simulated pod crashes to test auto-recovery and alerting.",
                        duration: "3 months",
                        year: "2025",
                        images: ["/projects/project-2.jpg", "/projects/project-2-detail-1.jpg", "/projects/project-2-detail-2.jpg"]
                    },
                    {
                        title: "Infrastructure Automation with Pulumi, Ansible, and GitLab CI/CD",
                        description: "Provisioned an EC2-based LAMP stack (Linux, Apache, MySQL, PHP) on AWS using Pulumi (Python-based IaC).",
                        technologies: ["Pulumi (Python)", "Ansible", "GitLab CI/CD", "Apache", "MySQL", "Bash"],
                        role: "Infrastructure Engineer",
                        challenge: "Creating a fully automated infrastructure provisioning and configuration process with proper CI/CD integration.",
                        outcome: "Developed monitoring scripts in Bash and documented incident resolution steps after simulating service failure scenarios.",
                        duration: "4 months",
                        year: "2025",
                        images: ["/projects/project-3.jpg", "/projects/project-3-detail-1.jpg", "/projects/project-3-detail-2.jpg"]
                    }
                ];
                
                if (projectIndex && projectIndex <= fallbackProjects.length) {
                    setProject(fallbackProjects[projectIndex - 1]);
                } else {
                    setError("Project not found");
                }
            }
        }
        
        if (projectIndex) {
            fetchProject();
        } else {
            setError("Invalid project ID");
            setLoading(false);
        }
    }, [projectIndex]);

    // Handle image navigation
    const nextImage = () => {
        if (project && project.images && project.images.length > 0) {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };
    
    const prevImage = () => {
        if (project && project.images && project.images.length > 0) {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
            );
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
                            <p className="mb-8">The project you're looking for could not be found.</p>
                            <Link 
                                href="/portfolio" 
                                className="bg-primary hover:bg-primary/90 transition-all px-6 py-3 rounded-lg font-semibold shadow-md text-primary-foreground"
                            >
                                Back to Portfolio
                            </Link>
                        </div>
                    ) : project ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Project Header */}
                            <div className="mb-8">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <Link 
                                        href="/portfolio" 
                                        className="text-primary hover:text-primary/80 transition-colors flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Portfolio
                                    </Link>
                                    <span className="text-foreground/50">•</span>
                                    <span className="text-foreground/70">{project.year}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                                <p className="text-xl text-foreground/70 max-w-3xl">
                                    {project.description}
                                </p>
                            </div>

                            {/* Project Images */}
                            {project.images && project.images.length > 0 && (
                                <div className="mb-12 relative rounded-xl overflow-hidden shadow-lg">
                                    <div className="aspect-video relative bg-secondary/30">
                                        <Image
                                            src={project.images[currentImageIndex]}
                                            alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                        />
                                        
                                        {/* Image navigation controls */}
                                        {project.images.length > 1 && (
                                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                                                <button 
                                                    onClick={prevImage}
                                                    className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                                                    aria-label="Previous image"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={nextImage}
                                                    className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                                                    aria-label="Next image"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                        
                                        {/* Image counter */}
                                        {project.images.length > 1 && (
                                            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                                                {currentImageIndex + 1}/{project.images.length}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Project Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                <div className="md:col-span-2">
                                    <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                                    <p className="text-foreground/80 mb-6">
                                        {project.description}
                                    </p>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">The Challenge</h3>
                                            <p className="text-foreground/80">
                                                {project.challenge}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">The Outcome</h3>
                                            <p className="text-foreground/80">
                                                {project.outcome}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="bg-card p-6 rounded-xl border border-border">
                                        <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium text-foreground/60">My Role</h4>
                                                <p className="font-medium">{project.role}</p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium text-foreground/60">Duration</h4>
                                                <p className="font-medium">{project.duration}</p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium text-foreground/60">Year</h4>
                                                <p className="font-medium">{project.year}</p>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium text-foreground/60">Technologies</h4>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {project.technologies.map((tech) => (
                                                        <span key={tech} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Videos */}
                            {project.videos && project.videos.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold mb-4">Project Videos</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {project.videos.map((video, index) => (
                                            <div key={index} className="bg-card rounded-xl overflow-hidden shadow-md">
                                                <div className="aspect-video relative bg-black">
                                                    <iframe
                                                        src={video.url}
                                                        title={video.title}
                                                        className="absolute inset-0 w-full h-full"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-medium">{video.title}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Navigation to other projects */}
                            <div className="flex justify-between items-center pt-8 border-t border-border">
                                <Link 
                                    href={`/portfolio/project-${projectIndex > 1 ? projectIndex - 1 : 3}`} 
                                    className="text-primary hover:text-primary/80 transition-colors flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Previous Project
                                </Link>
                                <Link 
                                    href="/portfolio" 
                                    className="text-foreground/70 hover:text-foreground transition-colors"
                                >
                                    All Projects
                                </Link>
                                <Link 
                                    href={`/portfolio/project-${projectIndex < 3 ? projectIndex + 1 : 1}`} 
                                    className="text-primary hover:text-primary/80 transition-colors flex items-center"
                                >
                                    Next Project
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    ) : null}
                </div>
            </section>

            <Footer />
        </main>
    );
}