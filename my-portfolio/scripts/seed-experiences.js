// scripts/seed-experiences.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import the Experience model
import Experience from '../models/Experience.js';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Sample experiences data
const experiencesData = [
  {
    role: "Senior Developer",
    company: "Tech Solutions Inc",
    period: "2021 - Present",
    description: "Led development of multiple web applications using React and Node.js",
    startDate: new Date("2021-01-01"),
    current: true,
    order: 1
  },
  {
    role: "Full Stack Developer",
    company: "Digital Innovations",
    period: "2018 - 2021",
    description: "Worked on e-commerce platforms and content management systems",
    startDate: new Date("2018-01-01"),
    endDate: new Date("2020-12-31"),
    current: false,
    order: 2
  },
  {
    role: "Frontend Developer",
    company: "Creative Studio",
    period: "2016 - 2018",
    description: "Developed responsive websites and interactive user interfaces",
    startDate: new Date("2016-01-01"),
    endDate: new Date("2017-12-31"),
    current: false,
    order: 3
  }
];

// Connect to MongoDB
async function seedExperiences() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing experiences
    await Experience.deleteMany({});
    console.log('Cleared existing experiences');

    // Insert new experiences
    const result = await Experience.insertMany(experiencesData);
    console.log(`Seeded ${result.length} experiences`);

    console.log('Experiences seeding completed successfully');
  } catch (error) {
    console.error('Error seeding experiences:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedExperiences();