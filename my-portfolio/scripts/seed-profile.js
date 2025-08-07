// scripts/seed-profile.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import the Profile model
import Profile from '../models/Profile.js';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Sample profile data
const profileData = {
  name: "Ahamed Usman",
  title: "Full Stack Developer",
  tagline: "I create thoughtfully crafted digital experiences that combine elegant design with powerful functionality.",
  about: "I'm a passionate Full Stack Developer with expertise in modern web technologies.",
  journey: "I'm a passionate Full Stack Developer with expertise in modern web technologies. With a keen eye for design and strong technical skills, I build applications that are not just functional but also provide exceptional user experiences. My journey in tech started 5 years ago, and since then I've worked with startups and established companies to deliver impactful digital solutions. I believe in continuous learning and staying updated with the latest industry trends. When I'm not coding, you can find me contributing to open-source projects or mentoring aspiring developers.",
  availability: "I'm currently available for freelance projects and full-time opportunities. Let's create something amazing together.",
  profileImage: "/profile.jpg",
  contactCTA: "Interested in working together?",
};

// Connect to MongoDB
async function seedProfile() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing profile
    await Profile.deleteMany({});
    console.log('Cleared existing profile');

    // Insert new profile
    const result = await Profile.create(profileData);
    console.log(`Seeded profile: ${result.name}`);

    console.log('Profile seeding completed successfully');
  } catch (error) {
    console.error('Error seeding profile:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedProfile();