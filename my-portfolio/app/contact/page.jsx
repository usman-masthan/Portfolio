// app/contact/page.jsx
"use client"

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    
    const [status, setStatus] = useState({
        message: "",
        isError: false,
        isSubmitting: false
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset status
        setStatus({
            message: "",
            isError: false,
            isSubmitting: true
        });
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            
            // Clear form on success
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
            
            setStatus({
                message: data.message,
                isError: false,
                isSubmitting: false
            });
        } catch (error) {
            setStatus({
                message: error.message,
                isError: true,
                isSubmitting: false
            });
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            {/* Contact Header */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                            Have a project in mind? Let's discuss how I can help bring your ideas to life.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-card p-8 rounded-xl shadow-md border border-border">
                        {status.message && (
                            <div className={`mb-6 p-4 rounded-lg ${status.isError ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                                {status.message}
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Your email"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Subject"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Your message"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status.isSubmitting}
                                className="bg-primary hover:bg-primary/90 transition-all px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg text-primary-foreground w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status.isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 bg-secondary/5">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Email",
                                value: "contact@example.com",
                                icon: "✉️"
                            },
                            {
                                title: "Location",
                                value: "San Francisco, CA",
                                icon: "📍"
                            },
                            {
                                title: "Social Media",
                                value: "@username",
                                icon: "🌐"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-6 rounded-xl text-center shadow-sm border border-border"
                            >
                                <div className="text-3xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-foreground/70">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}