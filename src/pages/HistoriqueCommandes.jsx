import { useState } from "react";
import { Eye, X } from "lucide-react";

const HistoriqueCommandes = () => {
  const [commandes, setCommandes] = useState([
    {
      id: 1,
      numeroCommande: "CMD-001",
      client: "John Doe",
      telephone: "77 123 45 67",
      adresse: "Médina",
      total: 29990,
      status: "Terminée",
      date: "2024-01-15",
      produits: [{ nom: "T-shirt", quantite: 2, taille: "M", prix: 14995 }],
    },
    {
      id: 2,
      numeroCommande: "CMD-002",
      client: "Jane Smith",
      telephone: "77 234 56 78",
      adresse: "Sacré Cœur",
      total: 49990,
      status: "Annulée",
      date: "2024-01-20",
      produits: [{ nom: "Robe", quantite: 1, taille: "L", prix: 49990 }],
    },
  ]);

  // États pour le modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Terminée":
        return "bg-green-100 text-green-800";
      case "Annulée":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (commande) => {
    setSelectedCommande(commande);
    setIsViewModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Historique des commandes
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                N° Commande
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Adresse
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {commandes.map((commande) => (
              <tr key={commande.id}>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {commande.numeroCommande}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {commande.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {commande.telephone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {commande.adresse}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {commande.total.toLocaleString()} FCFA
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      commande.status
                    )}`}
                  >
                    {commande.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {commande.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(commande)}
                    title="Voir les détails"
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour voir les détails */}
      {isViewModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique sur le contenu
          >
            {/* En-tête du modal */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Détails de la commande #{selectedCommande?.numeroCommande}
                </h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {selectedCommande && (
              <div className="p-6 space-y-8">
                {/* Section informations client et statut */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Client
                      </h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedCommande.client}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Téléphone
                      </h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedCommande.telephone}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Adresse
                      </h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedCommande.adresse}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date
                      </h4>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedCommande.date}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Statut
                      </h4>
                      <span
                        className={`px-3 py-1 inline-flex text-sm font-medium rounded-full ${getStatusColor(
                          selectedCommande.status
                        )}`}
                      >
                        {selectedCommande.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section produits */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Produits
                  </h4>
                  <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Produit
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Quantité
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Taille
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Prix
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {selectedCommande.produits.map((produit, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {produit.nom}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {produit.quantite}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                              {produit.taille}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-right">
                              {produit.prix.toLocaleString()} FCFA
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section total */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Total
                    </span>
                    <div className="bg-custom-pink text-white px-6 py-3 rounded-xl font-bold text-lg">
                      {selectedCommande.total.toLocaleString()} FCFA
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoriqueCommandes;
