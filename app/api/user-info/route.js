// app/api/user-info/route.js
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. On récupère le dernier élève
    const [users] = await pool.query('SELECT id, nom, prenom FROM Utilisateur ORDER BY id DESC LIMIT 1');
    const user = users[0];

    if (!user) return NextResponse.json({ error: "Aucun utilisateur" });

    // 2. On calcule les vraies stats (Exemple de requêtes)
    const [countTotal] = await pool.query('SELECT COUNT(*) as total FROM Chapitre');
    const [countDone] = await pool.query('SELECT COUNT(*) as fait FROM EvaluationScore WHERE eleveId = ?', [user.id]);
    const [avg] = await pool.query('SELECT AVG(note) as moyenne FROM EvaluationScore WHERE eleveId = ?', [user.id]);

    return NextResponse.json({
      prenom: user.prenom,
      leconsTerminees: countDone[0].fait || 0,
      totalLecons: countTotal[0].total || 0,
      moyenne: avg[0].moyenne ? parseFloat(avg[0].moyenne).toFixed(2) : "--"
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}