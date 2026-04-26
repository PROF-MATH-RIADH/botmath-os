// app/api/user-info/route.js
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. On récupère le dernier élève
    const user = await prisma.utilisateur.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true, nom: true, prenom: true }
    });

    if (!user) return NextResponse.json({ error: "Aucun utilisateur" });

    // 2. On calcule les vraies stats
    const countTotal = await prisma.chapitre.count();
    
    const countDone = await prisma.evaluationScore.count({
      where: { eleveId: user.id }
    });

    const avg = await prisma.evaluationScore.aggregate({
      where: { eleveId: user.id },
      _avg: { note: true }
    });

    return NextResponse.json({
      prenom: user.prenom,
      leconsTerminees: countDone || 0,
      totalLecons: countTotal || 0,
      moyenne: avg._avg.note ? parseFloat(avg._avg.note).toFixed(2) : "--"
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}