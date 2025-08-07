import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Testimonial from '../../../models/Testimonial';

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();
    
    // Fetch all testimonials, sorted by order field
    const testimonials = await Testimonial.find({}).sort({ order: 1 });
    
    // Return the testimonials as JSON
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
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
    
    // Create a new testimonial
    const testimonial = await Testimonial.create(body);
    
    // Return the created testimonial as JSON
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}