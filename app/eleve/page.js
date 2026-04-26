"use client";
import { useEffect, useState } from 'react';

export default function PageEleve() {
  const [data, setData] = useState({ prenom: '...', leconsTerminees: 0, totalLecons: 0, moyenne: '--' });

  useEffect(() => {
    fetch('/api/user-info')
      .then(res => res.json())
      .then(resData => setData(resData));
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ borderLeft: '5px solid #d4af37', paddingLeft: '20px', marginBottom: '30px' }}>
        <h2 style={{ margin: 0 }}>Bonjour, {data.prenom} ! 👋</h2>
        <p>Prêt pour tes défis mathématiques ?</p>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* CARTE DYNAMIQUE 1 */}
        <div style={{ background: 'white', padding: '20px', flex: 1, borderRadius: '8px', borderBottom: '3px solid #d4af37', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: 0, color: '#666', fontSize: '12px' }}>LEÇONS TERMINÉES</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
            {data.leconsTerminees} / {data.totalLecons}
          </p>
        </div>

        {/* CARTE DYNAMIQUE 2 */}
        <div style={{ background: 'white', padding: '20px', flex: 1, borderRadius: '8px', borderBottom: '3px solid #d4af37', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: 0, color: '#666', fontSize: '12px' }}>MOYENNE</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
            {data.moyenne} / 20
          </p>
        </div>
      </div>
    </div>
  );
}