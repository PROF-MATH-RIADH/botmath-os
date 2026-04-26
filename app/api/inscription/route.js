import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { nom, prenom, email, password, role } = await request.json();

    const user = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        mot_de_passe: password, // Note: Devrait être hashé en production
        role: role || 'ELEVE',
      },
    });

    return NextResponse.json({ success: true, id: user.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Erreur de base de données" }, { status: 500 });
  }
}