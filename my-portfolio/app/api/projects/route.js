import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/Project';

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();
    
    // Fetch all projects, sorted by order field
    const projects = await Project.find({}).sort({ order: 1 });
    
    // Return the projects as JSON
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}