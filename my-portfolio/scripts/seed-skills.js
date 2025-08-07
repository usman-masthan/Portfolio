// scripts/seed-skills.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import the Skill model
import Skill from '../models/Skill.js';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Sample skills data
const skillsData = [
  {
    name: "JavaScript",
    category: "frontend",
    icon: "javascript.svg",
    order: 1
  },
  {
    name: "React",
    category: "frontend",
    icon: "react.svg",
    order: 2
  },
  {
    name: "Node.js",
    category: "backend",
    icon: "node.svg",
    order: 3
  },
  {
    name: "TypeScript",
    category: "frontend",
    icon: "typescript.svg",
    order: 4
  },
  {
    name: "Next.js",
    category: "frontend",
    icon: "next.svg",
    order: 5
  },
  {
    name: "TailwindCSS",
    category: "frontend",
    icon: "tailwind.svg",
    order: 6
  },
  {
    name: "MongoDB",
    category: "database",
    icon: "mongodb.svg",
    order: 7
  },
  {
    name: "GraphQL",
    category: "backend",
    icon: "graphql.svg",
    order: 8
  }
];

// Connect to MongoDB
async function seedSkills() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing skills
    await Skill.deleteMany({});
    console.log('Cleared existing skills');

    // Insert new skills
    const result = await Skill.insertMany(skillsData);
    console.log(`Seeded ${result.length} skills`);

    console.log('Skills seeding completed successfully');
  } catch (error) {
    console.error('Error seeding skills:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedSkills();