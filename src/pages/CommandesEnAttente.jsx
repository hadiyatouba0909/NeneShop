import { useState } from "react";
import { Eye, Check, X } from "lucide-react";

const CommandesEnAttente = () => {
  const [commandes, setCommandes] = useState([
    {
      id: 1,
      numeroCommande: "CMD-001",
      client: "John Doe",
      telephone: "77 123 45 67",
      adresse: "Médina",
      total: 29990,
      status: "En attente",
      date: "2024-02-03",
      produits: [{ nom: "T-shirt", quantite: 2, taille: "M", prix: 14995 }],
    },
    {
      id: 2,
      numeroCommande: "CMD-002",
      client: "Jane Smith",
      telephone: "77 234 56 78",
      adresse: "Sacré Cœur",
      total: 49990,
      status: "En attente",
      date: "2024-02-03",
      produits: [{ nom: "Robe", quantite: 1, taille: "L", prix: 49990 }],
    },
  ]);

  // États pour les modales
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);

  const handleAccepter = (id) => {
    setCommandes(commandes.filter((commande) => commande.id !== id));
    setIsAcceptModalOpen(false);
  };

  const handleRefuser = (id) => {
    setCommandes(commandes.filter((commande) => commande.id !== id));
    setIsRefuseModalOpen(false);
  };

  const handleViewDetails = (commande) => {
    setSelectedCommande(commande);
    setIsViewModalOpen(true);
  };

  const openAcceptModal = (commande) => {
    setSelectedCommande(commande);
    setIsAcceptModalOpen(true);
  };

  const openRefuseModal = (commande) => {
    setSelectedCommande(commande);
    setIsRefuseModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Commandes en attente
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
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {commande.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                  <button
                    onClick={() => openAcceptModal(commande)}
                    title="Accepter"
                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openRefuseModal(commande)}
                    title="Refuser"
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
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
                {/* Section informations client */}
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {produit.nom}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {produit.quantite}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {produit.taille}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right">
                              {produit.prix.toLocaleString()} FCFA
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section total */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
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

      {/* Modal de confirmation d'acceptation */}
      {isAcceptModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Confirmer l'acceptation
              </h3>
              <button
                onClick={() => setIsAcceptModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Voulez-vous vraiment accepter cette commande ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAcceptModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  selectedCommande && handleAccepter(selectedCommande.id)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de refus */}
      {isRefuseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Confirmer le refus
              </h3>
              <button
                onClick={() => setIsRefuseModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Voulez-vous vraiment refuser cette commande ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsRefuseModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  selectedCommande && handleRefuser(selectedCommande.id)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Refuser
              </button>
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandesEnAttente;
