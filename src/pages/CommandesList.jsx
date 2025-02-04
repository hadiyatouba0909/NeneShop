/* /home/ba/my-react-app/src/pages/CommandesList.jsx
 */ import { useState } from "react";
import { Eye, Trash2, X } from "lucide-react";

const CommandesList = () => {
  const [commandes, setCommandes] = useState([
    {
      id: 1,
      numeroCommande: "CMD-001",
      client: "John Doe",
      telephone: "77 123 45 67",
      adresse: "Médina",
      total: 29990,
      status: "En cours",
      date: "2024-02-03",
      produits: [{ nom: "T-shirt", quantite: 2, taille: "M", prix: 14995 }],
    },
  ]);

  // États pour les modales
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);

  const handleDelete = (id) => {
    setCommandes(commandes.filter((commande) => commande.id !== id));
    setIsDeleteModalOpen(false);
  };

  const handleViewDetails = (commande) => {
    setSelectedCommande(commande);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (commande) => {
    setSelectedCommande(commande);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Liste des commandes
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
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      commande.status === "En cours"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {commande.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {commande.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                  <button
                    onClick={() => handleViewDetails(commande)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Voir les détails"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(commande)}
                    className="text-red-600 hover:text-red-900"
                    title="Supprimer"
                  >
                    <Trash2 className="h-5 w-5" />
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-3xl w-full mx-4 shadow-xl transform transition-all"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique sur le contenu
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Commande #{selectedCommande?.numeroCommande}
              </h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {selectedCommande && (
              <div className="space-y-8">
                {/* Section Informations Client */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Informations Client
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Client
                      </h5>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedCommande.client}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Téléphone
                      </h5>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedCommande.telephone}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Adresse
                      </h5>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedCommande.adresse}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date
                      </h5>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {selectedCommande.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Produits */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Détails des Produits
                  </h4>
                  <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                            Produit
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                            Quantité
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                            Taille
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-300">
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
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {produit.nom}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {produit.quantite}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {produit.taille}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white text-right">
                              {produit.prix.toLocaleString()} FCFA
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section Total */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Total
                  </span>
                  <div className="bg-custom-pink text-white px-6 py-3 rounded-xl font-bold text-lg">
                    {selectedCommande.total.toLocaleString()} FCFA
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Confirmer la suppression
              </h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Voulez-vous vraiment supprimer cette commande ? Cette action ne
              peut pas être annulée.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  selectedCommande && handleDelete(selectedCommande.id)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandesList;
