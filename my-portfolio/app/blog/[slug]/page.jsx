"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function BlogPostPage() {
  const params = useParams();
  const { slug } = params;
  
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blogs?slug=${slug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        
        const data = await response.json();
        
        if (data.length === 0) {
          throw new Error('Blog post not found');
        }
        
        setPost(data[0]);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);
  
  // Fallback content for development/preview
  const fallbackPost = {
    title: "The Future of Web Development",
    publishedDate: new Date("2023-05-15").toISOString(),
    category: "Technology",
    author: {
      name: "Ahamed Usman",
      image: ""
    },
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
    tags: ["WebAssembly", "AI", "Edge Computing", "Future Tech"],
    coverImage: ""
  };
  
  // Use fallback content if in development and no post is found
  const displayPost = post || (process.env.NODE_ENV === 'development' ? fallbackPost : null);
  
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
        <Footer />
      </main>
    );
  }
  
  if (error || !displayPost) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/blog"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors"
          >
            Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }
  
  // Format date
  const formattedDate = new Date(displayPost.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      {/* Blog Post Header */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Link 
                href="/blog"
                className="text-sm text-primary hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>
              <span className="text-foreground/40">•</span>
              <span className="text-sm text-foreground/60">{formattedDate}</span>
              <span className="text-foreground/40">•</span>
              <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                {displayPost.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{displayPost.title}</h1>
            
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                {displayPost.author.image ? (
                  <Image 
                    src={displayPost.author.image} 
                    alt={displayPost.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  displayPost.author.name.charAt(0)
                )}
              </div>
              <div>
                <p className="font-medium">{displayPost.author.name}</p>
                <p className="text-sm text-foreground/60">Author</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Image */}
      {displayPost.coverImage && (
        <section className="pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="aspect-video relative rounded-xl overflow-hidden">
              <Image
                src={displayPost.coverImage}
                alt={displayPost.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Content */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: displayPost.content }}
          />
          
          {/* Tags */}
          {displayPost.tags && displayPost.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {displayPost.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary/30 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}