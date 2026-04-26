// app/page.js
export default function Accueil() {
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
        }

        .login-box {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          overflow: hidden;
          width: 100%;
          max-width: 450px;
        }

        .login-header {
          background-color: var(--dark-color);
          padding: 25px 20px;
          text-align: center;
          border-bottom: 3px solid var(--gold-color);
        }

        .login-title {
          margin: 0;
          color: var(--gold-color);
          font-size: 26px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .login-subtitle {
          margin: 8px 0 0 0;
          font-size: 13px;
          color: #a0a0a0;
        }

        .login-body {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .login-instruction {
          text-align: center;
          color: var(--dark-color);
          margin: 0 0 15px 0;
          font-weight: bold;
          font-size: 16px;
        }

        /* Le fameux bouton transparent avec bordure et hover Or */
        .btn-new {
          background-color: transparent;
          border: 2px solid var(--gold-color);
          color: var(--dark-color);
          padding: 14px 20px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          width: 100%;
        }

        .btn-new:hover {
          background-color: var(--gold-color);
          color: white;
        }

        /* Variante pour l'administrateur */
        .btn-admin {
          background-color: var(--dark-color);
          color: var(--gold-color);
          border-color: var(--dark-color);
          margin-top: 10px;
        }

        .btn-admin:hover {
          background-color: var(--gold-color);
          color: var(--dark-color);
        }
      `}} />

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1 className="login-title">BotMath OS</h1>
            <p className="login-subtitle">Plateforme Éducative Interactive</p>
          </div>
          
          <div className="login-body">
            <p className="login-instruction">
              Sélectionnez votre profil d'accès
            </p>
            <button className="btn-new">🎓 Espace Élève</button>
            <button className="btn-new">👨‍🏫 Espace Professeur</button>
            <button className="btn-new">👨‍👩‍👧 Espace Parent</button>
            <button className="btn-new btn-admin">👑 Administration</button>
          </div>
        </div>
      </div>
    </>
  );
}