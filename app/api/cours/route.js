// app/api/cours/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { titre_fr, titre_ar, id_chapitre, type_activite, langue_mode, diapos } = await request.json();

    const cours = await prisma.cours.create({
      data: {
        titre_fr,
        titre_ar,
        langue_mode,
        id_chapitre: parseInt(id_chapitre),
        type_activite,
        diapos: {
          create: diapos.map(diapo => ({
            ordre: diapo.ordre,
            bg_color: diapo.bg_color,
            bg_image: diapo.bg_image,
            blocs: {
              create: diapo.blocs.map(bloc => ({
                id: bloc.id,
                type: bloc.type,
                x: bloc.x,
                y: bloc.y,
                width: bloc.width,
                height: bloc.height,
                contenu_fr: bloc.contenu_fr,
                contenu_ar: bloc.contenu_ar,
                props: bloc.props,
                design: bloc.design,
                action: bloc.action
              }))
            }
          }))
        }
      }
    });

    return NextResponse.json(cours);
  } catch (error) {
    console.error('Save Cours Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
