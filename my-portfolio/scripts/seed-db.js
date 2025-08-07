// scripts/seed-db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import the Project model
import Project from '../models/Project.js';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

// Sample project data
const projectsData = [
  {
    title: "Portfolio Website Deployment with AWS, Terraform, and GitHub Actions",
    description: "Designed and deployed a production-grade personal portfolio using Next.js hosted on AWS S3 with CloudFront CDN for global distribution.",
    technologies: ["AWS (S3, CloudFront, EC2)", "Terraform", "GitHub Actions", "CloudWatch", "Bash"],
    role: "DevOps Engineer",
    challenge: "Setting up a reliable, scalable infrastructure with automated deployments while ensuring optimal performance and security.",
    outcome: "Documented an incident response process with metrics and recovery steps, following SRE principles.",
    duration: "2 months",
    year: "2025",
    imageUrl: "/projects/project-1.jpg",
    images: [
      "/projects/project-1.jpg",
      "/projects/project-1-detail-1.jpg",
      "/projects/project-1-detail-2.jpg"
    ],
    videos: [
      {
        url: "https://example.com/videos/portfolio-deployment-demo.mp4",
        title: "AWS Portfolio Deployment Demo",
        thumbnail: "/projects/project-1-video-thumbnail.jpg"
      }
    ],
    order: 1
  },
  {
    title: "Flask Microservice with Docker, Kubernetes, Helm, and GitOps",
    description: "Developed a lightweight Flask API and containerized it using Docker. Deployed the application to a Kubernetes cluster with Helm charts for modular configuration.",
    technologies: ["Flask", "Docker", "Kubernetes (Minikube)", "Helm", "ArgoCD", "Prometheus", "Grafana"],
    role: "Cloud Native Developer",
    challenge: "Implementing a GitOps workflow with proper observability while ensuring the application could scale and recover automatically from failures.",
    outcome: "Set up observability using Prometheus + Grafana, and simulated pod crashes to test auto-recovery and alerting.",
    duration: "3 months",
    year: "2025",
    imageUrl: "/projects/project-2.jpg",
    images: [
      "/projects/project-2.jpg",
      "/projects/project-2-detail-1.jpg",
      "/projects/project-2-detail-2.jpg"
    ],
    videos: [
      {
        url: "https://example.com/videos/kubernetes-demo.mp4",
        title: "Kubernetes Deployment Walkthrough",
        thumbnail: "/projects/project-2-video-thumbnail.jpg"
      }
    ],
    order: 2
  },
  {
    title: "Infrastructure Automation with Pulumi, Ansible, and GitLab CI/CD",
    description: "Provisioned an EC2-based LAMP stack (Linux, Apache, MySQL, PHP) on AWS using Pulumi (Python-based IaC).",
    technologies: ["Pulumi (Python)", "Ansible", "GitLab CI/CD", "Apache", "MySQL", "Bash"],
    role: "Infrastructure Engineer",
    challenge: "Creating a fully automated infrastructure provisioning and configuration process with proper CI/CD integration.",
    outcome: "Developed monitoring scripts in Bash and documented incident resolution steps after simulating service failure scenarios.",
    duration: "4 months",
    year: "2025",
    imageUrl: "/projects/project-3.jpg",
    images: [
      "/projects/project-3.jpg",
      "/projects/project-3-detail-1.jpg",
      "/projects/project-3-detail-2.jpg"
    ],
    videos: [
      {
        url: "https://example.com/videos/infrastructure-automation-demo.mp4",
        title: "Infrastructure Automation Features",
        thumbnail: "/projects/project-3-video-thumbnail.jpg"
      },
      {
        url: "https://example.com/videos/pulumi-demo.mp4",
        title: "Pulumi Deployment Demo",
        thumbnail: "/projects/project-3-video-testimonial-thumbnail.jpg"
      }
    ],
    order: 3
  }
];

// Connect to MongoDB
async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    const result = await Project.insertMany(projectsData);
    console.log(`Seeded ${result.length} projects`);

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedDatabase();