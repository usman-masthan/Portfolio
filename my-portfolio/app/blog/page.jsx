// app/blog/page.jsx
"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchBlogPosts() {
            try {
                setIsLoading(true);
                const response = await fetch('/api/blogs');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                
                const data = await response.json();
                setBlogPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
                setError(error.message);
                // Fallback data in case of error
                setBlogPosts([
                    {
                        title: "The Future of Web Development",
                        slug: "future-of-web-development",
                        excerpt: "Exploring upcoming technologies and trends that will shape web development in the coming years.",
                        publishedDate: new Date("2023-05-15").toISOString(),
                        category: "Technology"
                    },
                    {
                        title: "Best Practices for React Performance",
                        slug: "react-performance-best-practices",
                        excerpt: "Tips and tricks to optimize your React applications for better performance and user experience.",
                        publishedDate: new Date("2023-04-28").toISOString(),
                        category: "React"
                    },
                    {
                        title: "Getting Started with TypeScript",
                        slug: "getting-started-with-typescript",
                        excerpt: "A beginner's guide to integrating TypeScript into your JavaScript projects.",
                        publishedDate: new Date("2023-03-12").toISOString(),
                        category: "TypeScript"
                    },
                    {
                        title: "Building Accessible Web Applications",
                        slug: "building-accessible-web-applications",
                        excerpt: "Why accessibility matters and how to implement it in your web development projects.",
                        publishedDate: new Date("2023-02-05").toISOString(),
                        category: "Accessibility"
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchBlogPosts();
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            {/* Blog Header */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
                        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                            Thoughts, insights and updates from my journey as a developer
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Loading State */}
            {isLoading && (
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="space-y-12">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-card p-6 rounded-xl shadow-sm border border-border animate-pulse">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/3 h-48 bg-secondary/30 rounded-lg"></div>
                                        <div className="md:w-2/3">
                                            <div className="h-6 bg-secondary/30 rounded w-1/4 mb-3"></div>
                                            <div className="h-8 bg-secondary/30 rounded w-3/4 mb-3"></div>
                                            <div className="h-4 bg-secondary/30 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-secondary/30 rounded w-2/3 mb-4"></div>
                                            <div className="h-6 bg-secondary/30 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            
            {/* Error State */}
            {error && !isLoading && (
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
                            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Error Loading Blog Posts</h2>
                            <p className="text-red-600 dark:text-red-300">{error}</p>
                            <p className="mt-4 text-foreground/70">Showing fallback content instead.</p>
                        </div>
                    </div>
                </section>
            )}
            
            {/* Blog Posts */}
            {!isLoading && (
                <section className="py-16">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="space-y-12">
                            {blogPosts.map((post, i) => (
                                <motion.article
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-card p-6 rounded-xl shadow-sm border border-border"
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/3 h-48 bg-secondary/30 rounded-lg relative overflow-hidden">
                                            {post.coverImage ? (
                                                <Image 
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-6xl font-bold">
                                                    Blog
                                                </div>
                                            )}
                                        </div>
                                        <div className="md:w-2/3">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                    {post.category}
                                                </span>
                                                <span className="text-sm text-foreground/60">
                                                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                                            <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="text-primary font-medium flex items-center group"
                                            >
                                                Read more
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}