"use client"; // Obligatoire pour utiliser le bouton et la navigation

import { useRouter } from 'next/navigation';

export default function Accueil() {
  const router = useRouter();

  const naviguerVers = (espace) => {
    // On redirige vers l'espace choisi
    router.push(`/${espace}`);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --bg-color: #f8f9fa;
          --dark-color: #110f19;
          --gold-color: #d4af37;
        }
        body {
          background-color: var(--bg-color);
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: var(--bg-color);
        }
        .login-box {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          overflow: hidden;
          width: 100%;
          max-width: 450px;
          border: 1px solid #eee;
          z-index: 10;
        }
        .login-header {
          background-color: var(--dark-color);
          padding: 30px 20px;
          text-align: center;
          border-bottom: 4px solid var(--gold-color);
        }
        .login-title {
          margin: 0;
          color: var(--gold-color);
          font-size: 28px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .login-subtitle {
          margin: 10px 0 0 0;
          font-size: 14px;
          color: #a0a0a0;
        }
        .login-body {
          padding: 40px 35px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .login-instruction {
          text-align: center;
          color: var(--dark-color);
          margin: 0 0 10px 0;
          font-weight: 600;
          font-size: 16px;
        }
        .btn-new {
          background-color: transparent;
          border: 2px solid var(--gold-color);
          color: var(--dark-color);
          padding: 15px 20px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .btn-new:hover {
          background-color: var(--gold-color);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }
        .btn-admin {
          background-color: var(--dark-color);
          color: var(--gold-color);
          border-color: var(--dark-color);
          margin-top: 10px;
          text-align: center;
          justify-content: center;
        }
        .btn-admin:hover {
          background-color: #1a1826;
          color: var(--gold-color);
          border-color: var(--gold-color);
        }
      `}} />

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1 className="login-title">BotMath OS</h1>
            <p className="login-subtitle">Programme Officiel Tunisien</p>
          </div>
          
          <div className="login-body">
            <p className="login-instruction">Identifiez-vous pour continuer</p>
            
            <button className="btn-new" onClick={() => naviguerVers('eleve')}>
              <span style={{fontSize: '22px'}}>🎓</span> Espace Élève
            </button>
            
            <button className="btn-new" onClick={() => naviguerVers('professeur')}>
              <span style={{fontSize: '22px'}}>👨‍🏫</span> Espace Professeur
            </button>
            
            <button className="btn-new" onClick={() => naviguerVers('parent')}>
              <span style={{fontSize: '22px'}}>👨‍👩‍👧</span> Espace Parent
            </button>
            
            <button className="btn-new btn-admin" onClick={() => naviguerVers('admin')}>
              👑 Administration
            </button>
          </div>
        </div>
      </div>
    </>
  );
}