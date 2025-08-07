// scripts/seed-footer.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import the Footer model
import Footer from '../models/Footer.js';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Sample footer data
const footerData = {
  copyright: "© 2025 Ahamed Usman. All rights reserved.",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/username",
      icon: "github"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: "linkedin"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/username",
      icon: "twitter"
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/username",
      icon: "instagram"
    }
  ],
  links: [
    {
      label: "Privacy Policy",
      href: "/privacy"
    },
    {
      label: "Terms of Service",
      href: "/terms"
    }
  ],
  credits: "Designed and built by Ahamed Usman"
};

// Connect to MongoDB
async function seedFooter() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing footer
    await Footer.deleteMany({});
    console.log('Cleared existing footer');

    // Insert new footer
    const result = await Footer.create(footerData);
    console.log(`Seeded footer with ${result.socialLinks.length} social links`);

    console.log('Footer seeding completed successfully');
  } catch (error) {
    console.error('Error seeding footer:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedFooter();