import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Experience from '@/models/Experience';

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({}).sort({ order: 1 });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}