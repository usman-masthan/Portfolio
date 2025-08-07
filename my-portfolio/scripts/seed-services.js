// scripts/seed-services.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import the Service model
import Service from '../models/Service.js';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Sample services data
const servicesData = [
  {
    title: "Web Development",
    description: "I build responsive, performant websites with modern frameworks and best practices.",
    icon: "🌐",
    order: 1
  },
  {
    title: "Mobile Applications",
    description: "Cross-platform mobile apps that provide native-like experiences on all devices.",
    icon: "📱",
    order: 2
  },
  {
    title: "UI/UX Design",
    description: "User-centered design that balances aesthetics with functionality and accessibility.",
    icon: "🎨",
    order: 3
  }
];

// Connect to MongoDB
async function seedServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Insert new services
    const result = await Service.insertMany(servicesData);
    console.log(`Seeded ${result.length} services`);

    console.log('Services seeding completed successfully');
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedServices();