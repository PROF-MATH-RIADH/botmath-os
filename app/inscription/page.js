"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Inscription() {
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', password: '', role: 'ELEVE'
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // APPEL RÉEL À L'API
    try {
      const response = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Félicitations ! Votre compte est enregistré dans la base MySQL.");
        router.push('/eleve');
      } else {
        alert("Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      alert("Le serveur ne répond pas. Vérifiez XAMPP.");
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .form-container { display: flex; justify-content: center; align-items: center; min-height: 90vh; }
        .form-card { background: white; width: 100%; max-width: 500px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-top: 5px solid #d4af37; overflow: hidden; }
        .form-header { background: #110f19; color: #d4af37; padding: 20px; text-align: center; }
        .form-body { padding: 30px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #110f19; }
        .form-control { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .btn-submit { background: #d4af37; color: white; border: none; padding: 15px; width: 100%; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 16px; }
      `}} />

      <div className="form-container">
        <div className="form-card">
          <div className="form-header"><h2>Inscription BotMath</h2></div>
          <form className="form-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom</label>
              <input type="text" className="form-control" required onChange={(e) => setFormData({...formData, nom: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input type="text" className="form-control" required onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input type="password" className="form-control" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
            <button type="submit" className="btn-submit">Valider l'inscription réelle</button>
          </form>
        </div>
      </div>
    </>
  );
}