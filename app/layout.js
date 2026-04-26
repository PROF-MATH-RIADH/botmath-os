"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // On définit si on est sur la page d'accueil (le portail)
  const isHomePage = pathname === "/";

  return (
    <html lang="fr">
      <body className="os-container">
        <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
          
          {/* On n'affiche la Sidebar QUE si on n'est pas sur la page d'accueil */}
          {!isHomePage && (
            <aside className="sidebar">
              <div className="logo-section">
                <span style={{ color: "white" }}>BOT</span>
                <span style={{ color: "var(--accent-or)" }}>MATH</span>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '5px', letterSpacing: '1px' }}>OS EDITION</div>
              </div>
              
              <nav className="nav-links">
                <div className="nav-item active">🏠 Tableau de bord</div>
                
                {/* Liens basés sur le rôle (Exemple structurel) */}
                <Link href="/professeur" className="nav-item">📚 Mes Leçons</Link>
                <Link href="/professeur/activite/creer" className="nav-item">✍️ Créer Activité</Link>
                <div className="nav-item">🏆 Classement</div>
                <Link href="/admin/theme" className="nav-item">🎨 Thème OS</Link>
                <div className="nav-item">🤖 Assistant IA</div>
                <div className="nav-item">📊 Mes Rapports</div>

                <div style={{ marginTop: 'auto' }}>
                  <div className="nav-item" style={{ borderTop: '1px solid #222', paddingTop: '15px' }}>
                    ⚙️ Paramètres
                  </div>
                  <div className="nav-item" style={{ color: '#e74c3c' }}>
                    🚪 Déconnexion
                  </div>
                </div>
              </nav>

              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ 
                  width: '35px', 
                  height: '35px', 
                  borderRadius: '50%', 
                  background: 'var(--accent-or)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#110f19'
                }}>TR</div>
                <div style={{ fontSize: '12px' }}>
                  <div style={{ fontWeight: 'bold' }}>Tounsi Riadh</div>
                  <div style={{ color: '#888', fontSize: '10px' }}>Administrateur</div>
                </div>
              </div>
            </aside>
          )}

          {/* Zone principale qui contient vos pages */}
          <main className={!isHomePage ? "content-area" : ""} style={{ flex: 1, position: "relative" }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}