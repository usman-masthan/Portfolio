// components/ProjectCard.jsx
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
        >
            <div className="h-48 bg-secondary/30 relative">
                <Image
                    src={`/project-${index}.jpg`}
                    alt={`Project ${index}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title || `Project Title ${index}`}</h3>
                <p className="text-foreground/70 mb-4">
                    {project.description || "A brief description of the project, highlighting key features and technologies used."}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || ["React", "Node.js", "MongoDB"]).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-secondary/30 rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>
                <Link
                    href={`/portfolio/project-${index}`}
                    className="text-primary font-medium flex items-center group"
                >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
}