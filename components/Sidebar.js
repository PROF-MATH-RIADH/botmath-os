// components/Sidebar.js

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-section">
        <span className="logo-bot">BOT</span>
        <span className="logo-math">MATH</span>
      </div>
      
      <nav className="nav-links">
        <a href="/" className="nav-item active">🏠 Tableau de bord</a>
        <a href="#" className="nav-item">📚 Mes Leçons</a>
        <a href="#" className="nav-item">🏆 Classement</a>
        <a href="#" className="nav-item">⚙️ Paramètres</a>
      </nav>

      <div className="user-profile">
        <div className="avatar">TR</div>
        <span>T. Riadh</span>
      </div>
    </aside>
  );
}