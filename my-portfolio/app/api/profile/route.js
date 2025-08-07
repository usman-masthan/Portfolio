import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Profile from '@/models/Profile';

export async function GET() {
  try {
    await dbConnect();
    // Since there should only be one profile, we get the first one
    const profile = await Profile.findOne({});
    
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}