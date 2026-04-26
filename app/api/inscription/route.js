import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { nom, prenom, email, password, role } = await request.json();

    const [result] = await pool.query(
      'INSERT INTO Utilisateur (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, email, password, role]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Erreur de base de données" }, { status: 500 });
  }
}