export default function ProfesseurPage() {
  return (
    <div>
      <h2 className="section-title">Espace Enseignant - Atelier de Construction</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        {/* COLONNE GAUCHE : STATS / ACTIONS RAPIDES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card-os">
            <h3 style={{ marginBottom: '15px' }}>Résumé</h3>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <p>📚 Leçons créées : <strong>12</strong></p>
              <p>👥 Élèves suivis : <strong>45</strong></p>
              <p>📅 Dernière activité : <strong>Aujourd'hui</strong></p>
            </div>
          </div>
          
          <button className="btn-os">
            ➕ Créer une nouvelle leçon
          </button>
          
          <button className="btn-os-outline">
            🤖 Assistant IA Pédagogique
          </button>
        </div>

        {/* COLONNE DROITE : LISTE DES LEÇONS */}
        <div className="card-os">
          <h3 style={{ marginBottom: '20px' }}>Mes Leçons Récentes</h3>
          <table className="table-custom">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Matière</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Les fractions complexes</td>
                <td>Mathématiques</td>
                <td>26/04/2026</td>
                <td><span style={{ color: '#27ae60' }}>Publié</span></td>
              </tr>
              <tr>
                <td>Géométrie dans l'espace</td>
                <td>Mathématiques</td>
                <td>25/04/2026</td>
                <td><span style={{ color: '#f39c12' }}>Brouillon</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}