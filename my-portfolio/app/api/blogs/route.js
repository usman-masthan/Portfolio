import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Blog from '../../../models/Blog';

export async function GET(request) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Get the URL parameters
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null;
    
    // Build the query
    let query = {};
    
    // If slug is provided, filter by slug
    if (slug) {
      query.slug = slug;
    }
    
    // If featured is provided, filter by featured
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Create the base query
    let blogQuery = Blog.find(query).sort({ publishedDate: -1 }); // Sort by publishedDate descending (newest first)
    
    // Apply limit if provided
    if (limit) {
      blogQuery = blogQuery.limit(limit);
    }
    
    // Execute the query
    const blogs = await blogQuery;
    
    // If searching for a specific slug and no blog found, return 404
    if (slug && blogs.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Return the blogs as JSON
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Parse the request body
    const body = await request.json();
    
    // Create a new blog post
    const blog = await Blog.create(body);
    
    // Return the created blog post as JSON
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}