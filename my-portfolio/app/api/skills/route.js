import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Skill from '@/models/Skill';

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({}).sort({ order: 1 });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}