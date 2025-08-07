import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Footer from '@/models/Footer';

export async function GET() {
  try {
    await dbConnect();
    // Since there should only be one footer, we get the first one
    const footer = await Footer.findOne({});
    
    if (!footer) {
      return NextResponse.json({ error: 'Footer not found' }, { status: 404 });
    }
    
    return NextResponse.json(footer);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}