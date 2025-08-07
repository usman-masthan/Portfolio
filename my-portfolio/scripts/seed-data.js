// scripts/seed-data.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import dbConnect from '../lib/dbConnect.js';
import Project from '../models/Project.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';
import Profile from '../models/Profile.js';
import Experience from '../models/Experience.js';
import Service from '../models/Service.js';
import Skill from '../models/Skill.js';
import Header from '../models/Header.js';
import Footer from '../models/Footer.js';

// Sample data for projects
const projectsData = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Next.js, Node.js, and MongoDB. Includes product management, cart functionality, user authentication, and payment processing.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "TailwindCSS"],
    role: "Full Stack Developer",
    challenge: "Creating a seamless shopping experience while ensuring secure payment processing and efficient inventory management.",
    outcome: "Increased conversion rates by 25% and reduced cart abandonment by implementing an optimized checkout flow.",
    duration: "4 months",
    year: "2024",
    images: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
    videos: [
      {
        url: "https://www.youtube.com/watch?v=example1",
        title: "E-commerce Demo",
        thumbnail: "/projects/ecommerce-thumbnail.jpg"
      }
    ],
    order: 1
  },
  {
    title: "Health & Fitness App",
    description: "A mobile-first web application for tracking workouts, nutrition, and health metrics. Features include custom workout plans, meal tracking, and progress visualization.",
    technologies: ["React", "Firebase", "Chart.js", "PWA", "TailwindCSS"],
    role: "Frontend Developer & UX Designer",
    challenge: "Designing an intuitive interface that motivates users to maintain their fitness routines and track their progress effectively.",
    outcome: "Achieved 80% user retention rate after 3 months, with users reporting improved fitness outcomes.",
    duration: "3 months",
    year: "2023",
    images: ["/projects/fitness-1.jpg", "/projects/fitness-2.jpg"],
    order: 2
  },
  {
    title: "Real Estate Management System",
    description: "A comprehensive platform for real estate agencies to manage properties, clients, and transactions. Includes property listings, client CRM, document management, and analytics.",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker", "AWS"],
    role: "Lead Developer",
    challenge: "Building a scalable system that handles complex relationships between properties, clients, and transactions while ensuring data security.",
    outcome: "Reduced administrative workload by 40% and improved lead conversion by implementing automated follow-up processes.",
    duration: "6 months",
    year: "2023",
    images: ["/projects/realestate-1.jpg", "/projects/realestate-2.jpg"],
    order: 3
  },
  {
    title: "AI-Powered Content Generator",
    description: "A tool that uses AI to generate marketing content, blog posts, and social media updates based on user inputs and preferences.",
    technologies: ["Python", "TensorFlow", "OpenAI API", "FastAPI", "React"],
    role: "Backend Developer & AI Specialist",
    challenge: "Integrating multiple AI models to create coherent, high-quality content that matches the user's brand voice and requirements.",
    outcome: "Helped marketing teams reduce content creation time by 60% while maintaining consistent brand messaging.",
    duration: "5 months",
    year: "2024",
    images: ["/projects/ai-content-1.jpg", "/projects/ai-content-2.jpg"],
    order: 4
  }
];

// Sample data for blog posts
const blogsData = [
  {
    title: "The Future of Web Development",
    slug: "future-of-web-development",
    excerpt: "Exploring upcoming technologies and trends that will shape web development in the coming years.",
    content: `
      <p>The web development landscape is constantly evolving, with new technologies and approaches emerging regularly. As we look to the future, several trends are likely to shape how we build and experience the web.</p>
      
      <h2>1. WebAssembly Will Gain More Traction</h2>
      <p>WebAssembly (Wasm) allows code written in languages like C, C++, and Rust to run in the browser at near-native speed. This technology opens up new possibilities for web applications, including:</p>
      <ul>
        <li>Running computationally intensive tasks in the browser</li>
        <li>Porting existing desktop applications to the web</li>
        <li>Creating more sophisticated browser-based games</li>
      </ul>
      
      <h2>2. AI-Assisted Development Will Become Mainstream</h2>
      <p>AI tools are already helping developers write code more efficiently. In the future, we can expect:</p>
      <ul>
        <li>More sophisticated code completion and generation</li>
        <li>Automated testing and debugging</li>
        <li>AI-powered design-to-code conversion</li>
      </ul>
      
      <h2>3. Edge Computing Will Transform Web Architecture</h2>
      <p>Edge computing moves processing closer to the user, reducing latency and improving performance. This approach will lead to:</p>
      <ul>
        <li>Faster, more responsive web applications</li>
        <li>Reduced server costs</li>
        <li>Better user experiences in regions with limited connectivity</li>
      </ul>
      
      <p>As web developers, staying ahead of these trends will be crucial for building the next generation of web applications that are faster, more capable, and more accessible to users around the world.</p>
    `,
    category: "Technology",
    tags: ["WebAssembly", "AI", "Edge Computing", "Future Tech"],
    publishedDate: new Date("2023-05-15"),
    author: {
      name: "Ahamed Usman",
      image: ""
    },
    featured: true,
    metaTitle: "The Future of Web Development | Ahamed Usman's Blog",
    metaDescription: "Explore the emerging technologies and trends that will shape the future of web development, including WebAssembly, AI-assisted development, and edge computing."
  },
  {
    title: "Best Practices for React Performance",
    slug: "react-performance-best-practices",
    excerpt: "Tips and tricks to optimize your React applications for better performance and user experience.",
    content: `
      <p>React is a powerful library for building user interfaces, but without proper optimization, your applications can become slow and unresponsive. Here are some best practices to ensure your React apps perform at their best.</p>
      
      <h2>1. Use React.memo for Component Memoization</h2>
      <p>React.memo is a higher-order component that memoizes your component, preventing unnecessary re-renders when props haven't changed:</p>
      <pre><code>const MyComponent = React.memo(function MyComponent(props) {
  // Your component logic
});</code></pre>
      
      <h2>2. Virtualize Long Lists</h2>
      <p>When rendering long lists, use virtualization libraries like react-window or react-virtualized to only render items that are currently visible in the viewport:</p>
      <pre><code>import { FixedSizeList } from 'react-window';

function MyList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index]}</div>
  );
  
  return (
    <FixedSizeList
      height={500}
      width={300}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}</code></pre>
      
      <h2>3. Optimize Context API Usage</h2>
      <p>Split your context into smaller, more focused contexts to prevent unnecessary re-renders:</p>
      <pre><code>// Instead of one large context
const AppContext = React.createContext();

// Use multiple focused contexts
const UserContext = React.createContext();
const ThemeContext = React.createContext();
const SettingsContext = React.createContext();</code></pre>
      
      <h2>4. Use the useCallback and useMemo Hooks</h2>
      <p>These hooks help prevent unnecessary function recreations and expensive calculations:</p>
      <pre><code>// Memoize a function
const handleClick = useCallback(() => {
  // Function logic
}, [dependency]);

// Memoize a calculation
const expensiveResult = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);</code></pre>
      
      <p>By implementing these practices, you can significantly improve the performance of your React applications, providing a better experience for your users.</p>
    `,
    category: "React",
    tags: ["React", "Performance", "JavaScript", "Optimization"],
    publishedDate: new Date("2023-04-28"),
    author: {
      name: "Ahamed Usman",
      image: ""
    },
    featured: true,
    metaTitle: "Best Practices for React Performance | Ahamed Usman's Blog",
    metaDescription: "Learn essential techniques to optimize your React applications for better performance, including memoization, virtualization, and efficient state management."
  },
  {
    title: "Getting Started with TypeScript",
    slug: "getting-started-with-typescript",
    excerpt: "A beginner's guide to integrating TypeScript into your JavaScript projects.",
    content: `
      <p>TypeScript has become an essential tool for many JavaScript developers, offering static typing and improved tooling. This guide will help you get started with TypeScript in your projects.</p>
      
      <h2>What is TypeScript?</h2>
      <p>TypeScript is a superset of JavaScript that adds static type definitions. Types provide a way to describe the shape of an object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.</p>
      
      <h2>Setting Up TypeScript</h2>
      <p>To start using TypeScript, you'll need to install it and set up a configuration file:</p>
      <pre><code># Install TypeScript
npm install -g typescript

# Initialize a TypeScript configuration file
tsc --init</code></pre>
      
      <p>This creates a <code>tsconfig.json</code> file that controls the TypeScript compiler options for your project.</p>
      
      <h2>Basic Types</h2>
      <p>TypeScript supports several basic types:</p>
      <pre><code>// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;

// String
let color: string = "blue";

// Array
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // Generic array type

// Tuple
let x: [string, number] = ["hello", 10];

// Enum
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = "maybe a string";

// Void
function warnUser(): void {
  console.log("This is a warning message");
}</code></pre>
      
      <h2>Interfaces</h2>
      <p>Interfaces are a powerful way to define contracts within your code:</p>
      <pre><code>interface User {
  name: string;
  id: number;
  email?: string; // Optional property
  readonly createdAt: Date; // Read-only property
}

function createUser(user: User): User {
  return user;
}</code></pre>
      
      <h2>Converting a JavaScript Project to TypeScript</h2>
      <p>To convert an existing JavaScript project to TypeScript:</p>
      <ol>
        <li>Rename your <code>.js</code> files to <code>.ts</code> (or <code>.jsx</code> to <code>.tsx</code> for React)</li>
        <li>Add a <code>tsconfig.json</code> file</li>
        <li>Use the <code>allowJs</code> compiler option to allow JavaScript files to be compiled</li>
        <li>Add types gradually, starting with the <code>any</code> type and refining as you go</li>
      </ol>
      
      <p>TypeScript can significantly improve your development experience by catching errors early and providing better tooling support. Start with these basics and gradually incorporate more advanced features as you become comfortable with the language.</p>
    `,
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Web Development", "Programming"],
    publishedDate: new Date("2023-03-12"),
    author: {
      name: "Ahamed Usman",
      image: ""
    },
    featured: false,
    metaTitle: "Getting Started with TypeScript | Ahamed Usman's Blog",
    metaDescription: "Learn how to integrate TypeScript into your JavaScript projects with this beginner-friendly guide covering basic types, interfaces, and project setup."
  },
  {
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt: "Why accessibility matters and how to implement it in your web development projects.",
    content: `
      <p>Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites and tools. Here's why it matters and how to implement it in your projects.</p>
      
      <h2>Why Accessibility Matters</h2>
      <p>Accessibility is not just about compliance with laws and regulations—it's about creating an inclusive web that everyone can use. Benefits include:</p>
      <ul>
        <li>Reaching a wider audience (approximately 15% of the world's population has some form of disability)</li>
        <li>Improving SEO (many accessibility practices align with SEO best practices)</li>
        <li>Enhancing usability for all users</li>
        <li>Demonstrating social responsibility</li>
      </ul>
      
      <h2>Key Accessibility Principles</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) define four main principles:</p>
      <ol>
        <li><strong>Perceivable</strong>: Information must be presentable to users in ways they can perceive.</li>
        <li><strong>Operable</strong>: User interface components must be operable by all users.</li>
        <li><strong>Understandable</strong>: Information and operation must be understandable.</li>
        <li><strong>Robust</strong>: Content must be robust enough to be interpreted by a wide variety of user agents.</li>
      </ol>
      
      <h2>Practical Implementation Tips</h2>
      
      <h3>1. Semantic HTML</h3>
      <p>Use HTML elements according to their intended purpose:</p>
      <pre><code><!-- Instead of this -->
<div class="heading">My Heading</div>
<div onclick="submitForm()">Submit</div>

<!-- Use this -->
<h2>My Heading</h2>
<button onclick="submitForm()">Submit</button></code></pre>
      
      <h3>2. Keyboard Navigation</h3>
      <p>Ensure all interactive elements are keyboard accessible:</p>
      <ul>
        <li>Use proper focus states (<code>:focus</code> CSS)</li>
        <li>Maintain a logical tab order</li>
        <li>Provide skip links for navigation</li>
      </ul>
      
      <h3>3. Alternative Text for Images</h3>
      <pre><code><img src="chart.png" alt="Bar chart showing sales growth of 25% in Q1 2023"></code></pre>
      
      <h3>4. ARIA When Necessary</h3>
      <p>Use ARIA (Accessible Rich Internet Applications) attributes when HTML semantics aren't sufficient:</p>
      <pre><code><div role="alert" aria-live="assertive">
  Form submitted successfully!
</div></code></pre>
      
      <h3>5. Color and Contrast</h3>
      <p>Ensure sufficient color contrast (WCAG recommends a ratio of at least 4.5:1 for normal text) and don't rely solely on color to convey information.</p>
      
      <h3>6. Testing Tools</h3>
      <p>Use these tools to evaluate accessibility:</p>
      <ul>
        <li>WAVE Web Accessibility Evaluation Tool</li>
        <li>Axe DevTools</li>
        <li>Lighthouse in Chrome DevTools</li>
        <li>Screen readers (NVDA, VoiceOver, JAWS)</li>
      </ul>
      
      <p>Building accessible web applications is not just a nice-to-have feature—it's an essential aspect of modern web development. By following these guidelines, you can create websites that are usable by everyone, regardless of their abilities or disabilities.</p>
    `,
    category: "Accessibility",
    tags: ["Accessibility", "WCAG", "Web Development", "Inclusive Design"],
    publishedDate: new Date("2023-02-05"),
    author: {
      name: "Ahamed Usman",
      image: ""
    },
    featured: false,
    metaTitle: "Building Accessible Web Applications | Ahamed Usman's Blog",
    metaDescription: "Learn why web accessibility matters and how to implement WCAG principles in your projects to create inclusive, usable websites for everyone."
  }
];

// Sample data for testimonials
const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechInnovate",
    text: "Working with Ahamed was a pleasure. He delivered the project on time and exceeded our expectations with the quality of his work. His attention to detail and problem-solving skills made a significant difference in our product.",
    imageUrl: "/testimonials/sarah.jpg",
    order: 1,
    featured: true
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "NexGen Solutions",
    text: "Ahamed helped us build our MVP from scratch. His technical expertise and attention to detail made a huge difference in our product launch. He was responsive, proactive, and truly committed to our success.",
    imageUrl: "/testimonials/michael.jpg",
    order: 2,
    featured: true
  },
  {
    name: "Jessica Williams",
    role: "Marketing Director",
    company: "Brand Elevate",
    text: "We hired Ahamed to rebuild our company website and were thoroughly impressed with his work. He understood our brand and created a site that perfectly captured our vision while improving functionality.",
    imageUrl: "/testimonials/jessica.jpg",
    order: 3,
    featured: false
  },
  {
    name: "David Rodriguez",
    role: "E-commerce Manager",
    company: "ShopSmart",
    text: "Ahamed developed a custom e-commerce solution that transformed our online business. His work was clean, well-documented, and delivered ahead of schedule. I highly recommend his services.",
    imageUrl: "/testimonials/david.jpg",
    order: 4,
    featured: false
  },
  {
    name: "Emma Thompson",
    role: "Design Agency Owner",
    company: "Creative Pulse",
    text: "As a design agency, we partnered with Ahamed for the development work on several client projects. His code quality and communication skills are exceptional, making collaboration seamless.",
    imageUrl: "/testimonials/emma.jpg",
    order: 5,
    featured: false
  },
  {
    name: "Robert Kim",
    role: "Tech Entrepreneur",
    company: "Innovate Labs",
    text: "Ahamed's expertise in React and Node.js helped us launch our SaaS platform. He's not just a developer but a true problem solver who brings valuable insights to every project.",
    imageUrl: "/testimonials/robert.jpg",
    order: 6,
    featured: false
  }
];

// Sample data for profile
const profileData = {
  name: "Ahamed Usman",
  title: "Full Stack Developer",
  bio: "I'm a passionate Full Stack Developer with over 5 years of experience building modern web applications. I specialize in React, Node.js, and cloud technologies, with a focus on creating performant, accessible, and user-friendly experiences.",
  location: "San Francisco, CA",
  email: "contact@ahamedusman.com",
  phone: "+1 (555) 123-4567",
  availability: "Available for freelance projects",
  avatar: "/profile/avatar.jpg",
  coverImage: "/profile/cover.jpg",
  resumeUrl: "/profile/resume.pdf",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/ahamedusman",
      username: "ahamedusman"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/ahamedusman",
      username: "ahamedusman"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/ahamedusman",
      username: "@ahamedusman"
    }
  ]
};

// Sample data for experiences
const experiencesData = [
  {
    company: "TechInnovate",
    position: "Senior Full Stack Developer",
    startDate: new Date("2022-03-01"),
    endDate: null, // Current position
    isCurrent: true,
    description: "Leading the development of a SaaS platform using Next.js, Node.js, and MongoDB. Implemented CI/CD pipelines, improved performance by 40%, and mentored junior developers.",
    technologies: ["Next.js", "Node.js", "MongoDB", "AWS", "Docker", "GitHub Actions"],
    achievements: [
      "Reduced page load time by 60% through code optimization and implementing CDN",
      "Designed and implemented a scalable microservices architecture",
      "Led the migration from monolith to microservices architecture"
    ],
    order: 1
  },
  {
    company: "WebSolutions Inc.",
    position: "Full Stack Developer",
    startDate: new Date("2020-01-15"),
    endDate: new Date("2022-02-28"),
    isCurrent: false,
    description: "Developed and maintained multiple client websites and web applications. Worked with React, Express, and PostgreSQL to deliver high-quality solutions.",
    technologies: ["React", "Express", "PostgreSQL", "Redux", "TailwindCSS", "Jest"],
    achievements: [
      "Implemented authentication system with multi-factor authentication",
      "Developed reusable component library used across multiple projects",
      "Optimized database queries resulting in 30% faster response times"
    ],
    order: 2
  },
  {
    company: "Digital Creations",
    position: "Frontend Developer",
    startDate: new Date("2018-06-01"),
    endDate: new Date("2019-12-31"),
    isCurrent: false,
    description: "Created responsive and accessible user interfaces for various client projects. Focused on performance optimization and cross-browser compatibility.",
    technologies: ["JavaScript", "HTML", "CSS", "Vue.js", "Sass", "Webpack"],
    achievements: [
      "Improved accessibility compliance to WCAG AA standards",
      "Reduced bundle size by 35% through code splitting and lazy loading",
      "Implemented automated testing that caught 90% of UI bugs before deployment"
    ],
    order: 3
  }
];

// Sample data for services
const servicesData = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application development using modern technologies. From database design to frontend implementation, I build complete solutions that meet your business needs.",
    icon: "code",
    features: [
      "Custom web application development",
      "API development and integration",
      "Database design and optimization",
      "Frontend and backend implementation"
    ],
    order: 1
  },
  {
    title: "Frontend Development",
    description: "Creating responsive, accessible, and performant user interfaces that provide excellent user experiences across all devices and browsers.",
    icon: "layout",
    features: [
      "Responsive web design",
      "Single Page Applications (SPAs)",
      "Progressive Web Apps (PWAs)",
      "Cross-browser compatibility",
      "Accessibility implementation"
    ],
    order: 2
  },
  {
    title: "Backend Development",
    description: "Building robust server-side applications and APIs that power your web and mobile applications with a focus on security, scalability, and performance.",
    icon: "server",
    features: [
      "RESTful API development",
      "GraphQL API implementation",
      "Authentication and authorization",
      "Database integration",
      "Server-side rendering"
    ],
    order: 3
  },
  {
    title: "Performance Optimization",
    description: "Analyzing and improving the performance of existing web applications to provide faster load times and better user experiences.",
    icon: "zap",
    features: [
      "Frontend performance audits",
      "Code optimization",
      "Database query optimization",
      "Caching strategies",
      "Load time reduction"
    ],
    order: 4
  }
];

// Sample data for skills
const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 90 },
      { name: "TailwindCSS", level: 90 },
      { name: "Redux", level: 85 }
    ],
    order: 1
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "GraphQL", level: 80 },
      { name: "REST API", level: 90 }
    ],
    order: 2
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
      { name: "CI/CD", level: 80 },
      { name: "Jest", level: 85 },
      { name: "Webpack", level: 80 }
    ],
    order: 3
  }
];

// Sample data for header
const headerData = {
  logo: "Ahamed Usman",
  navigation: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Testimonials", href: "/testimonials" }
  ],
  ctaButton: { label: "Contact", href: "/contact" }
};

// Sample data for footer
const footerData = {
  copyright: "© 2025 Ahamed Usman. All rights reserved.",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/ahamedusman",
      icon: "github"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/ahamedusman",
      icon: "linkedin"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/ahamedusman",
      icon: "twitter"
    }
  ],
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ],
  credits: "Designed and built with Next.js and TailwindCSS"
};

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to the database
    await dbConnect();
    
    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Blog.deleteMany({}),
      Testimonial.deleteMany({}),
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Service.deleteMany({}),
      Skill.deleteMany({}),
      Header.deleteMany({}),
      Footer.deleteMany({})
    ]);
    
    console.log('Existing data cleared');
    
    // Insert new data
    await Promise.all([
      Project.insertMany(projectsData),
      Blog.insertMany(blogsData),
      Testimonial.insertMany(testimonialsData),
      Profile.create(profileData),
      Experience.insertMany(experiencesData),
      Service.insertMany(servicesData),
      Skill.insertMany(skillsData),
      Header.create(headerData),
      Footer.create(footerData)
    ]);
    
    console.log('Database seeded successfully');
    
    // Disconnect from the database
    await mongoose.disconnect();
    
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();