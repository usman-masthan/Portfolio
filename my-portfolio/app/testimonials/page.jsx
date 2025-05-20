// app/testimonials/page.jsx
"use client"

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TestimonialsPage() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Product Manager",
            text: "Working with Ahamed was a pleasure. He delivered the project on time and exceeded our expectations with the quality of his work. His attention to detail and problem-solving skills made a significant difference in our product."
        },
        {
            name: "Michael Chen",
            role: "Startup Founder",
            text: "Ahamed helped us build our MVP from scratch. His technical expertise and attention to detail made a huge difference in our product launch. He was responsive, proactive, and truly committed to our success."
        },
        {
            name: "Jessica Williams",
            role: "Marketing Director",
            text: "We hired Ahamed to rebuild our company website and were thoroughly impressed with his work. He understood our brand and created a site that perfectly captured our vision while improving functionality."
        },
        {
            name: "David Rodriguez",
            role: "E-commerce Manager",
            text: "Ahamed developed a custom e-commerce solution that transformed our online business. His work was clean, well-documented, and delivered ahead of schedule. I highly recommend his services."
        },
        {
            name: "Emma Thompson",
            role: "Design Agency Owner",
            text: "As a design agency, we partnered with Ahamed for the development work on several client projects. His code quality and communication skills are exceptional, making collaboration seamless."
        },
        {
            name: "Robert Kim",
            role: "Tech Entrepreneur",
            text: "Ahamed's expertise in React and Node.js helped us launch our SaaS platform. He's not just a developer but a true problem solver who brings valuable insights to every project."
        }
    ];

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

            {/* Testimonials Grid */}
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
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold">{testimonial.name}</h3>
                                        <p className="text-sm text-foreground/70">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="italic text-foreground/80">"{testimonial.text}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}