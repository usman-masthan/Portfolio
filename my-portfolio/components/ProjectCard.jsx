// components/ProjectCard.jsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({ project, index }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    
    // Default values for project properties if not provided
    const projectData = {
        title: project.title || `Project Title ${index}`,
        description: project.description || "A full-featured application with modern design and robust functionality.",
        technologies: project.technologies || ["React", "Node.js", "MongoDB"],
        role: project.role || "Lead Developer",
        challenge: project.challenge || "Creating a seamless user experience while handling complex data relationships and ensuring optimal performance.",
        outcome: project.outcome || "Successfully delivered a solution that improved efficiency by 40% and received positive user feedback for its intuitive interface.",
        duration: project.duration || "3 months",
        year: project.year || "2024"
    };
    
    // Get image sources - use images array if available, fallback to imageUrl, or default
    const imageSources = project.images && project.images.length > 0 
        ? project.images 
        : project.imageUrl 
            ? [project.imageUrl] 
            : [`/project-${index}.jpg`];
    
    // Handle image navigation
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === imageSources.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? imageSources.length - 1 : prevIndex - 1
        );
    };
    
    // Handle video modal
    const openVideoModal = (video) => {
        setCurrentVideo(video);
        setShowVideoModal(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group"
            whileHover={{ y: -5 }}
        >
            <div className="h-48 bg-secondary/30 relative overflow-hidden">
                <Image
                    src={imageSources[currentImageIndex]}
                    alt={`${project.title || `Project ${index}`} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Image navigation controls - only show if multiple images */}
                {imageSources.length > 1 && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
                
                {/* Image counter */}
                {imageSources.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        {currentImageIndex + 1}/{imageSources.length}
                    </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white/90 text-xs font-medium bg-primary/80 px-2 py-1 rounded-full backdrop-blur-sm">
                        {projectData.year} • {projectData.duration}
                    </span>
                </div>
            </div>
            
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{projectData.title}</h3>
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary hover:text-primary/80 transition-colors"
                        aria-label={isExpanded ? "Show less details" : "Show more details"}
                        aria-expanded={isExpanded}
                        aria-controls={`project-details-${index}`}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                
                <p className="text-foreground/90 mb-4">
                    {projectData.description}
                </p>
                
                {/* Technology tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {projectData.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>
                
                {/* Expanded details */}
                <motion.div 
                    id={`project-details-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mb-4"
                    aria-hidden={!isExpanded}
                    role="region"
                    tabIndex={isExpanded ? 0 : -1}
                >
                    <div className="grid gap-3 pt-2 border-t border-border/50 mt-2">
                        <div>
                            <h4 className="text-sm font-semibold text-primary">My Role</h4>
                            <p className="text-sm text-foreground/90">{projectData.role}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-primary">Challenge</h4>
                            <p className="text-sm text-foreground/90">{projectData.challenge}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-primary">Outcome</h4>
                            <p className="text-sm text-foreground/90">{projectData.outcome}</p>
                        </div>
                    </div>
                </motion.div>
            
                {/* Videos section - only show if videos exist */}
                {project.videos && project.videos.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/50">
                        <h4 className="text-sm font-semibold text-primary mb-2">Project Videos</h4>
                        <div className="grid gap-2">
                            {project.videos.map((video, vidIndex) => (
                                <button
                                    key={vidIndex}
                                    onClick={() => openVideoModal(video)}
                                    className="flex items-center text-sm text-foreground/90 hover:text-primary transition-colors"
                                >
                                    <div className="mr-2 bg-primary/10 text-primary p-1 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    {video.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                <Link
                    href={`/portfolio/project-${index}`}
                    className="text-primary font-medium flex items-center group/link mt-4"
                >
                    View Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
            
            {/* Video Modal */}
            {showVideoModal && currentVideo && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-card rounded-lg overflow-hidden max-w-4xl w-full">
                        <div className="p-4 flex justify-between items-center border-b border-border">
                            <h3 className="font-medium">{currentVideo.title}</h3>
                            <button 
                                onClick={() => setShowVideoModal(false)}
                                className="text-foreground/70 hover:text-foreground"
                                aria-label="Close video"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="aspect-video bg-black">
                            <iframe
                                src={currentVideo.url}
                                className="w-full h-full"
                                title={currentVideo.title}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}