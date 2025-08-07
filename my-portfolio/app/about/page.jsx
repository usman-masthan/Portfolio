// app/about/page.jsx
"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch profile
                const profileResponse = await fetch('/api/profile');
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    setProfile(profileData);
                } else {
                    console.error('Failed to fetch profile data');
                }
                
                // Fetch skills
                const skillsResponse = await fetch('/api/skills');
                if (skillsResponse.ok) {
                    const skillsData = await skillsResponse.json();
                    setSkills(skillsData);
                } else {
                    console.error('Failed to fetch skills data');
                }
                
                // Fetch experiences
                const experiencesResponse = await fetch('/api/experiences');
                if (experiencesResponse.ok) {
                    const experiencesData = await experiencesResponse.json();
                    setExperiences(experiencesData);
                } else {
                    console.error('Failed to fetch experiences data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            {/* About Header */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
                        <p className="text-xl text-foreground/70 max-w-3xl">
                            {profile ? profile.about : "I'm a passionate Full Stack Developer with expertise in modern web technologies."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main About Content */}
            <section className="py-16 bg-secondary/5">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row gap-12 items-center"
                    >
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">My Journey</h2>
                            <div className="text-foreground/80 mb-6">
                                {profile ? (
                                    <p>{profile.journey}</p>
                                ) : (
                                    <>
                                        <p className="mb-4">
                                            I'm a passionate Full Stack Developer with expertise in modern web technologies.
                                            With a keen eye for design and strong technical skills, I build applications that
                                            are not just functional but also provide exceptional user experiences.
                                        </p>
                                        <p className="mb-4">
                                            My journey in tech started 5 years ago, and since then I've worked with startups
                                            and established companies to deliver impactful digital solutions.
                                        </p>
                                        <p>
                                            I believe in continuous learning and staying updated with the latest industry trends.
                                            When I'm not coding, you can find me contributing to open-source projects or mentoring
                                            aspiring developers.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-2 gap-4">
                            {(skills.length > 0 ? skills : ["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "TailwindCSS", "MongoDB", "GraphQL"].map(name => ({ name }))).map((skill, i) => (
                                <motion.div
                                    key={skill._id || i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-card p-4 rounded-lg shadow-sm hover:shadow border border-border"
                                >
                                    <h3 className="font-medium">{skill.name}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">My Experience</h2>
                    <div className="space-y-8">
                        {(experiences.length > 0 ? experiences : [
                            {
                                role: "Senior Developer",
                                company: "Tech Solutions Inc",
                                period: "2021 - Present",
                                description: "Led development of multiple web applications using React and Node.js"
                            },
                            {
                                role: "Full Stack Developer",
                                company: "Digital Innovations",
                                period: "2018 - 2021",
                                description: "Worked on e-commerce platforms and content management systems"
                            },
                            {
                                role: "Frontend Developer",
                                company: "Creative Studio",
                                period: "2016 - 2018",
                                description: "Developed responsive websites and interactive user interfaces"
                            }
                        ]).map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card p-6 rounded-xl border border-border shadow-sm"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">{exp.role}</h3>
                                        <p className="text-primary">{exp.company}</p>
                                    </div>
                                    <span className="text-foreground/60 text-sm mt-2 md:mt-0">{exp.period}</span>
                                </div>
                                <p className="text-foreground/80">{exp.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}