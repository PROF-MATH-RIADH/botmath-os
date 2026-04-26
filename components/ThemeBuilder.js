// components/ThemeBuilder.js
"use client";
import React from 'react';
import { X, ChevronLeft, ChevronRight, Home } from 'lucide-react';

export const DynamicModal = ({ settings, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const modalStyle = {
    width: settings.width || '500px',
    height: settings.height || 'auto',
    borderRadius: settings.borderRadius || '8px',
    border: `${settings.borderSize || '1px'} solid ${settings.borderColor || '#ddd'}`,
    boxShadow: settings.shadowType === 'intense' ? 'var(--shadow-intense)' : 'var(--shadow-soft)',
    padding: settings.padding || '20px',
    backgroundColor: settings.bgColor || '#ffffff'
  };

  return (
    <div className="os-modal-overlay" onClick={onClose}>
      <div className="os-modal-container" style={modalStyle} onClick={e => e.stopPropagation()}>
        <button className="os-modal-close" onClick={onClose}>
          <X size={24} color={settings.closeColor || '#110f19'} />
        </button>
        {children}
      </div>
    </div>
  );
};

export const DynamicNav = ({ settings, onNavigate }) => {
  const navStyle = {
    width: settings.width || '100%',
    height: settings.height || '70px',
    backgroundColor: settings.bgColor || '#110f19',
    boxShadow: settings.shadowType === 'intense' ? 'var(--shadow-intense)' : 'var(--shadow-soft)',
    borderBottom: `${settings.borderSize || '2px'} solid ${settings.borderColor || '#d4af37'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const btnStyle = (isHovered) => ({
    padding: settings.btnPadding || '10px 20px',
    backgroundColor: isHovered ? (settings.btnHoverBg || '#d4af37') : (settings.btnBg || 'transparent'),
    color: isHovered ? (settings.btnHoverColor || '#110f19') : (settings.btnColor || '#ffffff'),
    borderRadius: settings.btnRadius || '4px',
    border: `${settings.btnBorderSize || '1px'} solid ${isHovered ? (settings.btnHoverBorder || settings.btnBorderColor) : (settings.btnBorderColor || '#d4af37')}`,
    fontSize: settings.btnFontSize || '14px',
    fontWeight: '600',
    boxShadow: isHovered ? (settings.btnHoverShadow || 'none') : (settings.btnShadow || 'none'),
    textShadow: settings.textShadow || 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  });

  const renderIcon = (type) => {
    const size = parseInt(settings.btnIconSize) || 20;
    switch(type) {
      case 'home': return <Home size={size} />;
      case 'prev': return <ChevronLeft size={size} />;
      case 'next': return <ChevronRight size={size} />;
      case 'close': return <X size={size} />;
      default: return null;
    }
  };

  const NavButton = ({ type, label }) => {
    const [hover, setHover] = React.useState(false);
    const showIcon = settings.btnMode !== 'text-only';
    const showText = settings.btnMode !== 'icon-only';

    return (
      <button 
        style={btnStyle(hover)} 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onNavigate(type)}
        className="os-nav-btn"
      >
        {showIcon && renderIcon(type)}
        {showText && <span>{label}</span>}
      </button>
    );
  };

  return (
    <div className="os-nav-bar" style={navStyle}>
      <div style={{ display: 'flex', gap: '15px' }}>
        <NavButton type="home" label="Accueil" />
        <NavButton type="prev" label="Précédent" />
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <NavButton type="next" label="Suivant" />
        <NavButton type="close" label="Fermer" />
      </div>
    </div>
  );
};
