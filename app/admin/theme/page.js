// app/admin/theme/page.js
"use client";
import React, { useState } from 'react';
import { DynamicModal, DynamicNav } from '@/components/ThemeBuilder';

import IconLibrary from '@/components/IconLibrary';

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
    nom: 'Mon Thème Personnalisé',
    width: '100%',
    height: '80px',
    bgColor: '#110f19',
    shadowType: 'soft',
    borderSize: '3px',
    borderColor: '#d4af37',
    btnMode: 'both',
    btnBg: '#110f19',
    btnColor: '#ffffff',
    btnBorderColor: '#d4af37',
    btnBorderSize: '1px',
    btnRadius: '8px',
    btnShadow: '0 2px 4px rgba(0,0,0,0.2)',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    btnHoverBg: '#d4af37',
    btnHoverColor: '#110f19',
    btnHoverBorder: '#d4af37',
    btnHoverShadow: '0 4px 8px rgba(212,175,55,0.4)',
    btnFontSize: '14px',
    btnIconSize: '20'
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showIconLib, setShowIconLib] = useState(false);

  const saveTheme = async () => {
    try {
      const response = await fetch('/api/themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(navSettings)
      });
      const data = await response.json();
      if (data.id) alert(`Thème enregistré avec l'ID: ${data.id}`);
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    }
  };

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
          <h2 style={{ color: 'var(--accent-or)', marginBottom: '20px' }}>2. Configuration Boutons & Navigation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
            <label>Nom du Thème: <input type="text" value={navSettings.nom} onChange={e => setNavSettings({...navSettings, nom: e.target.value})} /></label>
            
            <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>État Normal</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <label>Fond: <input type="color" value={navSettings.btnBg} onChange={e => setNavSettings({...navSettings, btnBg: e.target.value})} /></label>
              <label>Texte: <input type="color" value={navSettings.btnColor} onChange={e => setNavSettings({...navSettings, btnColor: e.target.value})} /></label>
              <label>Bordure: <input type="color" value={navSettings.btnBorderColor} onChange={e => setNavSettings({...navSettings, btnBorderColor: e.target.value})} /></label>
              <label>Arrondi: <input type="text" value={navSettings.btnRadius} onChange={e => setNavSettings({...navSettings, btnRadius: e.target.value})} /></label>
            </div>
            <label>Ombre Bouton: <input type="text" value={navSettings.btnShadow} onChange={e => setNavSettings({...navSettings, btnShadow: e.target.value})} /></label>
            <label>Ombre Texte: <input type="text" value={navSettings.textShadow} onChange={e => setNavSettings({...navSettings, textShadow: e.target.value})} /></label>

            <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>État Survol (Hover)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <label>Fond: <input type="color" value={navSettings.btnHoverBg} onChange={e => setNavSettings({...navSettings, btnHoverBg: e.target.value})} /></label>
              <label>Texte: <input type="color" value={navSettings.btnHoverColor} onChange={e => setNavSettings({...navSettings, btnHoverColor: e.target.value})} /></label>
            </div>
            <label>Ombre Survol: <input type="text" value={navSettings.btnHoverShadow} onChange={e => setNavSettings({...navSettings, btnHoverShadow: e.target.value})} /></label>

            <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Icônes</h4>
            <button className="btn-os-outline" onClick={() => setShowIconLib(!showIconLib)}>
              {showIconLib ? "Fermer la bibliothèque" : "Ouvrir la bibliothèque d'icônes"}
            </button>
            {showIconLib && <IconLibrary onSelect={(name) => alert('Icône sélectionnée: ' + name)} />}

            <button className="btn-os" onClick={saveTheme} style={{ marginTop: '20px' }}>💾 Enregistrer le Thème (ID)</button>
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
