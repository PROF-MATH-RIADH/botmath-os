// components/IconLibrary.js
"use client";
import React from 'react';
import * as Icons from 'lucide-react';

const IconLibrary = ({ onSelect, selectedIcon }) => {
  const iconNames = Object.keys(Icons).filter(key => typeof Icons[key] === 'function');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredIcons = iconNames.filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 100); // Limiter à 100 pour la performance

  return (
    <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
      <input 
        type="text" 
        placeholder="Rechercher une icône..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', 
        gap: '10px',
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '5px'
      }}>
        {filteredIcons.map(name => {
          const Icon = Icons[name];
          return (
            <div 
              key={name}
              onClick={() => onSelect(name)}
              title={name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '4px',
                cursor: 'pointer',
                background: selectedIcon === name ? 'var(--accent-or)' : 'transparent',
                border: '1px solid #eee'
              }}
            >
              <Icon size={20} color={selectedIcon === name ? '#110f19' : '#110f19'} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconLibrary;
