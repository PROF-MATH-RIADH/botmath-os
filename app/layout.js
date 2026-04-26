"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // On définit si on est sur la page d'accueil (le portail)
  const isHomePage = pathname === "/";

  return (
    <html lang="fr">
      <body style={{ margin: 0, backgroundColor: "#f8f9fa", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          
          {/* On n'affiche la Sidebar QUE si on n'est pas sur la page d'accueil */}
          {!isHomePage && (
            <aside style={{
              width: "260px",
              backgroundColor: "#110f19",
              color: "white",
              borderRight: "3px solid #d4af37",
              display: "flex",
              flexDirection: "column",
              padding: "20px"
            }}>
              <h2 style={{ color: "#d4af37", marginBottom: "30px", textAlign: "center" }}>BOTMATH</h2>
              <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #222" }}>🏠 Tableau de bord</div>
                <div style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #222" }}>📚 Mes Leçons</div>
                <div style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #222" }}>🏆 Classement</div>
              </nav>
            </aside>
          )}

          {/* Zone principale qui contient vos pages */}
          <main style={{ flex: 1, position: "relative" }}>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}