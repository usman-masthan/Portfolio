// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Extract form data
    const { name, email, subject, message } = body;
    
    // Validate form data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // In a real application, you would send an email here
    // For example, using a service like SendGrid, Mailgun, or AWS SES
    // For now, we'll just log the data and return a success response
    console.log('Contact form submission:', { name, email, subject, message });
    
    // Return success response
    return NextResponse.json(
      { message: 'Message sent successfully! We will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}