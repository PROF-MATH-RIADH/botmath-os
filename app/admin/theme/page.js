// app/admin/theme/page.js
"use client";
import React, { useState } from 'react';
import { DynamicModal, DynamicNav } from '@/components/ThemeBuilder';

export default function ThemeAdmin() {
  const [modalSettings, setModalSettings] = useState({
    width: '500px',
    height: '300px',
    borderRadius: '12px',
    borderSize: '2px',
    borderColor: '#d4af37',
    shadowType: 'intense',
    bgColor: '#ffffff',
    closeColor: '#110f19'
  });

  const [navSettings, setNavSettings] = useState({
    width: '100%',
    height: '80px',
    bgColor: '#110f19',
    shadowType: 'soft',
    borderSize: '3px',
    borderColor: '#d4af37',
    btnMode: 'both', // 'text-only', 'icon-only', 'both'
    btnBg: 'transparent',
    btnHoverBg: '#d4af37',
    btnColor: '#ffffff',
    btnHoverColor: '#110f19',
    btnRadius: '8px',
    btnBorderSize: '1px',
    btnBorderColor: '#d4af37',
    btnFontSize: '14px',
    btnIconSize: '20'
  });

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div style={{ padding: '30px' }}>
      <h1 className="section-title">Atelier de Fabrication - Thème & UI</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* CONFIGURATION POP-UP */}
        <div className="card-os">
          <h2 style={{ color: 'var(--accent-or)', marginBottom: '20px' }}>1. Configuration Pop-up</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>Largeur: <input type="text" value={modalSettings.width} onChange={e => setModalSettings({...modalSettings, width: e.target.value})} /></label>
            <label>Hauteur: <input type="text" value={modalSettings.height} onChange={e => setModalSettings({...modalSettings, height: e.target.value})} /></label>
            <label>Bordure (px): <input type="number" value={modalSettings.borderSize.replace('px','')} onChange={e => setModalSettings({...modalSettings, borderSize: e.target.value+'px'})} /></label>
            <label>Couleur Bordure: <input type="color" value={modalSettings.borderColor} onChange={e => setModalSettings({...modalSettings, borderColor: e.target.value})} /></label>
            <label>Ombre: 
              <select value={modalSettings.shadowType} onChange={e => setModalSettings({...modalSettings, shadowType: e.target.value})}>
                <option value="soft">Doux</option>
                <option value="intense">Intense</option>
              </select>
            </label>
            <button className="btn-os" onClick={() => setShowPreview(true)}>Tester la Pop-up</button>
          </div>
        </div>

        {/* CONFIGURATION NAVIGATION */}
        <div className="card-os">
          <h2 style={{ color: 'var(--accent-or)', marginBottom: '20px' }}>2. Configuration Navigation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>Fond Navigation: <input type="color" value={navSettings.bgColor} onChange={e => setNavSettings({...navSettings, bgColor: e.target.value})} /></label>
            <label>Mode Bouton: 
              <select value={navSettings.btnMode} onChange={e => setNavSettings({...navSettings, btnMode: e.target.value})}>
                <option value="text-only">Texte seul</option>
                <option value="icon-only">Icône seule</option>
                <option value="both">Les deux</option>
              </select>
            </label>
            <label>Taille Icône: <input type="number" value={navSettings.btnIconSize} onChange={e => setNavSettings({...navSettings, btnIconSize: e.target.value})} /></label>
            <label>Bouton Fond: <input type="color" value={navSettings.btnBg} onChange={e => setNavSettings({...navSettings, btnBg: e.target.value})} /></label>
            <label>Bouton Survol: <input type="color" value={navSettings.btnHoverBg} onChange={e => setNavSettings({...navSettings, btnHoverBg: e.target.value})} /></label>
          </div>
        </div>
      </div>

      {/* APERÇU NAVIGATION EN TEMPS RÉEL */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ marginBottom: '15px' }}>Aperçu de la Barre de Navigation</h3>
        <DynamicNav settings={navSettings} onNavigate={(t) => console.log('Nav:', t)} />
      </div>

      {/* APERÇU POP-UP */}
      <DynamicModal settings={modalSettings} isOpen={showPreview} onClose={() => setShowPreview(false)}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2 style={{ color: 'var(--dominante-sombre)' }}>Aperçu de la Pop-up</h2>
          <p>Voici comment vos fenêtres apparaîtront.</p>
          <button className="btn-os" style={{ marginTop: '20px' }} onClick={() => setShowPreview(false)}>Compris !</button>
        </div>
      </DynamicModal>
    </div>
  );
}
