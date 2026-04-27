// app/professeur/activite/creer/page.js
"use client";
import React, { useState } from 'react';
import { DynamicNav } from '@/components/ThemeBuilder';
import { Plus, Image as ImageIcon, Video, Music, Type, Sigma, ChevronLeft, ChevronRight, Save, Trash2 } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ActiviteCreator() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([
    { id: 1, blocs: [], bg_color: '#ffffff', bg_image: null }
  ]);
  const [coursInfo, setCoursInfo] = useState({
    titre_fr: '', 
    titre_ar: '', 
    id_chapitre: '', 
    id_theme: '', 
    type_activite: 'savoir',
    langue_mode: 'BILINGUE', // BILINGUE, FR, AR
    validation_admin: false
  });

  // Paramètres par défaut de la navigation (Atelier 1)
  const navSettings = {
    bgColor: '#110f19',
    btnMode: 'both',
    btnBg: 'transparent',
    btnHoverBg: '#d4af37',
    btnColor: '#ffffff',
    btnHoverColor: '#110f19',
    btnBorderSize: '1px',
    btnBorderColor: '#d4af37'
  };

  const generateAudio = async (blocId, lang) => {
    const updatedSlides = [...slides];
    const bloc = updatedSlides[currentSlide].blocs.find(b => b.id === blocId);
    const text = lang === 'fr' ? bloc.texte_vocal_fr || bloc.contenu_fr : bloc.texte_vocal_ar || bloc.contenu_ar;

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        if (lang === 'fr') bloc.audio_url_fr = url;
        else bloc.audio_url_ar = url;
        setSlides(updatedSlides);
        const audio = new Audio(url);
        audio.play();
      }
    } catch (error) {
      console.error('TTS Error:', error);
    }
  };

  const addSlide = () => {
    setSlides([...slides, { id: Date.now(), blocs: [], bg_color: '#ffffff', bg_image: null }]);
  };

  const saveCours = async () => {
    try {
      const response = await fetch('/api/cours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...coursInfo,
          diapos: slides.map((s, idx) => ({
            ordre: idx,
            bg_color: s.bg_color,
            bg_image: s.bg_image,
            blocs: s.blocs
          }))
        })
      });
      const data = await response.json();
      if (data.id) alert('Cours sauvegardé !');
    } catch (error) {
      alert('Erreur de sauvegarde');
    }
  };

  const addElement = (type) => {
    const newBloc = {
      id: `bloc_${Date.now()}`,
      custom_id: '',
      type: type,
      cible: 'canvas',
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      z_index: 10,
      masque_depart: false,
      contenu_fr: type === 'LATEX' ? 'E = mc^2' : 'Texte Français',
      contenu_ar: type === 'LATEX' ? 'E = mc^2' : 'نص عربي',
      props: {
        font_size_fr: 1,
        font_size_ar: 1,
        couleur_fr: '#110f19',
        couleur_ar: '#110f19'
      }
    };
    const updatedSlides = [...slides];
    updatedSlides[currentSlide].blocs.push(newBloc);
    setSlides(updatedSlides);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* EN-TÊTE DYNAMIQUE (Atelier 1) */}
      <DynamicNav 
        settings={navSettings} 
        onNavigate={(type) => console.log('Action:', type)} 
      />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '250px 1fr 300px', gap: '2px', background: '#ddd' }}>
        
        {/* BARRE LATERALE GAUCHE : INFOS & DIAPOS */}
        <div style={{ background: '#f8f9fa', padding: '15px', overflowY: 'auto' }}>
          <h3 className="section-title" style={{ fontSize: '14px' }}>Infos Activité</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Titre Français" 
              className="btn-os" 
              style={{ background: '#fff', color: '#110f19', textAlign: 'left', display: coursInfo.langue_mode === 'AR' ? 'none' : 'block' }}
              value={coursInfo.titre_fr}
              onChange={(e) => setCoursInfo({...coursInfo, titre_fr: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="العنوان بالعربية" 
              className="btn-os" 
              style={{ background: '#fff', color: '#110f19', textAlign: 'right', direction: 'rtl', display: coursInfo.langue_mode === 'FR' ? 'none' : 'block' }}
              value={coursInfo.titre_ar}
              onChange={(e) => setCoursInfo({...coursInfo, titre_ar: e.target.value})}
            />
            <select 
              className="btn-os" 
              style={{ background: '#fff', color: '#110f19' }}
              value={coursInfo.langue_mode}
              onChange={(e) => setCoursInfo({...coursInfo, langue_mode: e.target.value})}
            >
              <option value="BILINGUE">Mode: Bilingue (FR/AR)</option>
              <option value="FR">Mode: Français Uniquement</option>
              <option value="AR">Mode: Arabe Uniquement</option>
            </select>
            <select 
              className="btn-os" 
              style={{ background: '#fff', color: '#110f19' }}
              value={coursInfo.type_activite}
              onChange={(e) => setCoursInfo({...coursInfo, type_activite: e.target.value})}
            >
              <option value="savoir">Type: Savoir</option>
              <option value="evaluation">Type: Évaluation</option>
              <option value="devoir">Type: Devoir</option>
              <option value="examen">Type: Examen</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>Diapositives</span>
            <button onClick={addSlide} className="btn-os" style={{ padding: '5px 10px' }}><Plus size={16}/></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {slides.map((s, idx) => (
              <div 
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  height: '60px',
                  background: currentSlide === idx ? 'var(--accent-or)' : 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}
              >
                Diapo {idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* ZONE DE TRAVAIL (BODY) */}
        <div style={{ 
          background: slides[currentSlide].bg_color, 
          backgroundImage: slides[currentSlide].bg_image ? `url(${slides[currentSlide].bg_image})` : 'none',
          backgroundSize: 'cover',
          position: 'relative',
          padding: '0', // Supprimer padding pour positionnement absolu
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative'
          }}>
            {slides[currentSlide].blocs.map(el => (
              <div 
                key={el.id} 
                style={{ 
                  position: 'absolute',
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  width: `${el.width}px`,
                  height: `${el.height}px`,
                  zIndex: el.z_index,
                  border: '1px dotted #888',
                  cursor: 'move',
                  direction: 'ltr', // Par défaut
                  padding: '5px'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ fontSize: '10px', color: '#888', marginBottom: '2px' }}>{el.type.toUpperCase()}</div>
                  {el.type === 'TEXT' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {(coursInfo.langue_mode === 'BILINGUE' || coursInfo.langue_mode === 'FR') && (
                          <div style={{ flex: 1, borderRight: coursInfo.langue_mode === 'BILINGUE' ? '1px solid #eee' : 'none' }}>
                            {el.contenu_fr}
                            <button onClick={() => generateAudio(el.id, 'fr')} style={{ fontSize: '10px', marginLeft: '5px' }}>🔊</button>
                          </div>
                        )}
                        {(coursInfo.langue_mode === 'BILINGUE' || coursInfo.langue_mode === 'AR') && (
                          <div style={{ flex: 1, textAlign: 'right', direction: 'rtl' }}>
                            {el.contenu_ar}
                            <button onClick={() => generateAudio(el.id, 'ar')} style={{ fontSize: '10px', marginRight: '5px' }}>🔊</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {el.type === 'LATEX' && <BlockMath math={el.contenu_fr} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BARRE LATERALE DROITE : OUTILS & PROPRIETES */}
        <div style={{ background: '#f8f9fa', padding: '15px' }}>
          <h3 className="section-title" style={{ fontSize: '14px' }}>Outils</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <button className="btn-os-outline" onClick={() => addElement('TEXT')}><Type size={18}/></button>
            <button className="btn-os-outline" onClick={() => addElement('IMAGE')}><ImageIcon size={18}/></button>
            <button className="btn-os-outline" onClick={() => addElement('VIDEO')}><Video size={18}/></button>
            <button className="btn-os-outline" onClick={() => addElement('SOUND')}><Music size={18}/></button>
            <button className="btn-os-outline" onClick={() => addElement('LATEX')}><Sigma size={18}/></button>
          </div>

          <h3 className="section-title" style={{ fontSize: '14px' }}>Propriétés Diapo</h3>
          <label style={{ fontSize: '12px' }}>Fond :</label>
          <input 
            type="color" 
            value={slides[currentSlide].bgColor} 
            onChange={(e) => {
              const updated = [...slides];
              updated[currentSlide].bgColor = e.target.value;
              setSlides(updated);
            }}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          
          <button className="btn-os" style={{ width: '100%', marginTop: 'auto' }}>
            <Save size={18} style={{ marginRight: '8px' }}/> Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
