// scripts/seed-all.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert exec to promise-based
const execPromise = promisify(exec);

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

async function runSeedScript(scriptName) {
  console.log(`Running ${scriptName}...`);
  try {
    const scriptPath = path.join(__dirname, scriptName);
    const { stdout, stderr } = await execPromise(`node ${scriptPath}`);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    console.log(`${scriptName} completed successfully\n`);
    return true;
  } catch (error) {
    console.error(`Error running ${scriptName}:`, error);
    return false;
  }
}

async function seedAll() {
  console.log('Starting database seeding process...\n');
  
  // Run all seed scripts
  const scripts = [
    'seed-profile.js',
    'seed-skills.js',
    'seed-experiences.js',
    'seed-services.js',
    'seed-db.js', // Projects seeding
    'seed-header.js',
    'seed-footer.js'
  ];
  
  let successCount = 0;
  
  for (const script of scripts) {
    const success = await runSeedScript(script);
    if (success) successCount++;
  }
  
  console.log(`\nSeeding completed. ${successCount}/${scripts.length} scripts executed successfully.`);
}

// Run the seeding function
seedAll();