// app/testimonials/page.jsx
"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchTestimonials() {
            try {
                setIsLoading(true);
                const response = await fetch('/api/testimonials');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setError(error.message);
                // Fallback data in case of error
                setTestimonials([
                    {
                        name: "Sarah Johnson",
                        role: "Product Manager",
                        company: "TechInnovate",
                        text: "Working with Ahamed was a pleasure. He delivered the project on time and exceeded our expectations with the quality of his work. His attention to detail and problem-solving skills made a significant difference in our product."
                    },
                    {
                        name: "Michael Chen",
                        role: "Startup Founder",
                        company: "NexGen Solutions",
                        text: "Ahamed helped us build our MVP from scratch. His technical expertise and attention to detail made a huge difference in our product launch. He was responsive, proactive, and truly committed to our success."
                    },
                    {
                        name: "Jessica Williams",
                        role: "Marketing Director",
                        company: "Brand Elevate",
                        text: "We hired Ahamed to rebuild our company website and were thoroughly impressed with his work. He understood our brand and created a site that perfectly captured our vision while improving functionality."
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchTestimonials();
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            {/* Testimonials Header */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Testimonials</h1>
                        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                            Feedback from people I've had the pleasure of working with
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Loading State */}
            {isLoading && (
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-card p-6 rounded-xl shadow-sm border border-border animate-pulse">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-secondary/30"></div>
                                        <div className="ml-4">
                                            <div className="h-5 bg-secondary/30 rounded w-24 mb-2"></div>
                                            <div className="h-4 bg-secondary/30 rounded w-32"></div>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-secondary/30 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-secondary/30 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-secondary/30 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            
            {/* Error State */}
            {error && !isLoading && (
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
                            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Error Loading Testimonials</h2>
                            <p className="text-red-600 dark:text-red-300">{error}</p>
                            <p className="mt-4 text-foreground/70">Showing fallback content instead.</p>
                        </div>
                    </div>
                </section>
            )}
            
            {/* Testimonials Grid */}
            {!isLoading && (
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-card p-6 rounded-xl shadow-sm border border-border"
                                >
                                    <div className="flex items-center mb-4">
                                        {testimonial.imageUrl ? (
                                            <Image 
                                                src={testimonial.imageUrl}
                                                alt={testimonial.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="ml-4">
                                            <h3 className="font-bold">{testimonial.name}</h3>
                                            <p className="text-sm text-foreground/70">
                                                {testimonial.role}
                                                {testimonial.company && ` at ${testimonial.company}`}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="italic text-foreground/80">"{testimonial.text}"</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}