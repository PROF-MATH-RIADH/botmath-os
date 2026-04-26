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
    { id: 1, elements: [], bgColor: '#ffffff', bgImage: null }
  ]);
  const [activityInfo, setActivityInfo] = useState({
    matiere: '', niveau: '', classe: '', periode: '', chapitre: '', theme: ''
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

  const addSlide = () => {
    setSlides([...slides, { id: Date.now(), elements: [], bgColor: '#ffffff', bgImage: null }]);
    setCurrentSlide(slides.length);
  };

  const addElement = (type) => {
    const newElement = {
      id: Date.now(),
      type: type,
      contenu: type === 'LATEX' ? 'E = mc^2' : 'Nouvel élément ' + type,
      style: {
        fontSize: '16px',
        color: '#110f19',
        textAlign: 'left',
        padding: '10px'
      }
    };
    const updatedSlides = [...slides];
    updatedSlides[currentSlide].elements.push(newElement);
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <input type="text" placeholder="Matière" className="input-os" />
            <input type="text" placeholder="Niveau" className="input-os" />
            <input type="text" placeholder="Classe" className="input-os" />
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
          background: slides[currentSlide].bgColor, 
          backgroundImage: slides[currentSlide].bgImage ? `url(${slides[currentSlide].bgImage})` : 'none',
          backgroundSize: 'cover',
          position: 'relative',
          padding: '40px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            border: '1px dashed #ccc',
            position: 'relative'
          }}>
            {slides[currentSlide].elements.map(el => (
              <div key={el.id} style={{ ...el.style, border: '1px solid transparent', cursor: 'move' }}>
                {el.type === 'TEXT' && <p>{el.contenu}</p>}
                {el.type === 'LATEX' && <BlockMath math={el.contenu} />}
                {el.type === 'IMAGE' && <div style={{ background: '#eee', padding: '20px' }}>🖼️ Image Placeholder</div>}
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
