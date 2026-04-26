export default function ParentPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4" style={{ color: '#d4af37' }}>
        Espace Parent
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <p className="text-gray-700 text-lg">
          Bienvenue dans l'espace de suivi. Bientôt, vous pourrez consulter ici l'évolution et les résultats de vos enfants.
        </p>
      </div>
    </div>
  );
}