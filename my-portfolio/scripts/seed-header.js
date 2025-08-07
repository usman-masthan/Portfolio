// scripts/seed-header.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import the Header model
import Header from '../models/Header.js';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Sample header data
const headerData = {
  logo: "Ahamed Usman",
  navigation: [
    {
      label: "Home",
      href: "/",
      isExternal: false
    },
    {
      label: "About",
      href: "/about",
      isExternal: false
    },
    {
      label: "Projects",
      href: "/projects",
      isExternal: false
    },
    {
      label: "Services",
      href: "/services",
      isExternal: false
    },
    {
      label: "Contact",
      href: "/contact",
      isExternal: false
    }
  ],
  ctaButton: {
    label: "Get in Touch",
    href: "/contact"
  }
};

// Connect to MongoDB
async function seedHeader() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing header
    await Header.deleteMany({});
    console.log('Cleared existing header');

    // Insert new header
    const result = await Header.create(headerData);
    console.log(`Seeded header with ${result.navigation.length} navigation items`);

    console.log('Header seeding completed successfully');
  } catch (error) {
    console.error('Error seeding header:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedHeader();