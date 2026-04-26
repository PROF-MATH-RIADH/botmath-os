// app/api/themes/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const themes = await prisma.theme.findMany();
    return NextResponse.json(themes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const theme = await prisma.theme.create({
      data: body
    });
    return NextResponse.json(theme);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
