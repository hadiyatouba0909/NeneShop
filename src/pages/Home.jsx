// src/pages/Home.jsx
const Home = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-custom-pink dark:text-white mb-6">
          Bienvenue dans votre espace administrateur
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-purple-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 dark:text-white mb-4">
              Gestion des utilisateurs
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Gérez facilement vos utilisateurs : ajout, modification, consultation et suppression.
            </p>
          </div>
          <div className="p-6 bg-purple-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-800 dark:text-white mb-4">
              Tableau de bord
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Visualisez les statistiques et l'activité de votre application.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default Home