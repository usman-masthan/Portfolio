// app/blog/page.jsx
"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BlogPage() {
    const blogPosts = [
        {
            title: "The Future of Web Development",
            excerpt: "Exploring upcoming technologies and trends that will shape web development in the coming years.",
            date: "May 15, 2023",
            category: "Technology"
        },
        {
            title: "Best Practices for React Performance",
            excerpt: "Tips and tricks to optimize your React applications for better performance and user experience.",
            date: "April 28, 2023",
            category: "React"
        },
        {
            title: "Getting Started with TypeScript",
            excerpt: "A beginner's guide to integrating TypeScript into your JavaScript projects.",
            date: "March 12, 2023",
            category: "TypeScript"
        },
        {
            title: "Building Accessible Web Applications",
            excerpt: "Why accessibility matters and how to implement it in your web development projects.",
            date: "February 5, 2023",
            category: "Accessibility"
        }
    ];

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

            {/* Blog Posts */}
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
                                        <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-6xl font-bold">
                                            Blog
                                        </div>
                                    </div>
                                    <div className="md:w-2/3">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-sm text-foreground/60">{post.date}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                                        <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                                        <Link
                                            href={`/blog/${i + 1}`}
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

            <Footer />
        </main>
    );
}