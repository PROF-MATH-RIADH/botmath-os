// components/IconLibrary.js
"use client";
import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';

const IconLibrary = ({ onSelect, selectedIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les icônes de manière sécurisée
  const iconNames = useMemo(() => {
    try {
      const keys = Object.keys(Icons);
      console.log(`Nombre total d'exports Lucide trouvés: ${keys.length}`);
      
      const filtered = keys.filter(key => {
        // Ne garder que ce qui ressemble à un composant d'icône (PascalCase)
        // On exclut les fonctions internes comme 'createLucideIcon'
        return /^[A-Z]/.test(key) && 
               key !== 'createLucideIcon' && 
               (typeof Icons[key] === 'function' || typeof Icons[key] === 'object');
      });
      
      console.log(`Nombre d'icônes filtrées: ${filtered.length}`);
      return filtered;
    } catch (e) {
      console.error("Erreur critique lors de la récupération des icônes:", e);
      return [];
    }
  }, []);

  const filteredIcons = useMemo(() => {
    if (iconNames.length === 0) return [];
    
    const search = searchTerm.toLowerCase();
    return iconNames
      .filter(name => name.toLowerCase().includes(search))
      .slice(0, 200); // Augmenté à 200
  }, [searchTerm, iconNames]);

  if (iconNames.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#ff4444', border: '1px solid #ff4444', borderRadius: '8px' }}>
        ⚠️ Aucune icône chargée. Vérifiez l'installation de lucide-react.
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#ffffff', 
      border: '2px solid var(--accent-or)', 
      borderRadius: '12px', 
      padding: '20px',
      boxShadow: 'var(--shadow-soft)',
      marginTop: '10px'
    }}>
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          placeholder="🔍 Rechercher une icône (ex: Home, User, Settings...)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid #ddd',
            outline: 'none',
            fontSize: '14px'
          }}
        />
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))', 
        gap: '8px',
        maxHeight: '350px',
        overflowY: 'auto',
        padding: '10px',
        background: '#f9f9f9',
        borderRadius: '8px'
      }}>
        {filteredIcons.map(name => {
          const IconComponent = Icons[name];
          if (!IconComponent) return null;

          return (
            <div 
              key={name}
              onClick={() => onSelect(name)}
              title={name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedIcon === name ? 'var(--accent-or)' : 'white',
                border: '1px solid #eee',
                transition: 'all 0.2s ease',
                boxShadow: selectedIcon === name ? '0 2px 8px rgba(212,175,55,0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedIcon !== name) e.currentTarget.style.background = '#fff5e6';
              }}
              onMouseLeave={(e) => {
                if (selectedIcon !== name) e.currentTarget.style.background = 'white';
              }}
            >
              <IconComponent 
                size={24} 
                color={selectedIcon === name ? '#110f19' : '#444'} 
                strokeWidth={1.5}
              />
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
        {filteredIcons.length} icônes affichées
      </div>
    </div>
  );
};

export default IconLibrary;
