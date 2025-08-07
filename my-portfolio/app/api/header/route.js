import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Header from '@/models/Header';

export async function GET() {
  try {
    await dbConnect();
    // Since there should only be one header, we get the first one
    const header = await Header.findOne({});
    
    if (!header) {
      return NextResponse.json({ error: 'Header not found' }, { status: 404 });
    }
    
    return NextResponse.json(header);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}