/* /home/ba/my-react-app/src/pages/ProduitList.jsx */
import { useState } from "react";
import { Pencil, Trash2, Eye, X } from "lucide-react";

const ProduitList = () => {
  const [produits, setProduits] = useState([
    {
      id: 1,
      nom: "T-shirt",
      description: "T-shirt en coton",
      prix: 29.99,
      image: "https://www.recette360.com/wp-content/uploads/2021/06/Les-salades-W-Watchers.jpg.webp",
      statut: true,
      categorie: "Vêtements",
      dateCreation: "2024-02-03",
      tailles: [
        { taille: "S", stock: 10 },
        { taille: "M", stock: 15 },
        { taille: "L", stock: 20 },
      ],
    },
    // Ajoutez d'autres produits pour tester
  ]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    statut: true,
    tailles: [],
  });

  // Fonctions de gestion des modals
  const handleDelete = (id) => {
    setProduits(produits.filter((produit) => produit.id !== id));
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (produit) => {
    setSelectedProduit(produit);
    setIsDeleteModalOpen(true);
  };

  const handleViewDetails = (produit) => {
    setSelectedProduit(produit);
    setIsViewModalOpen(true);
  };

  const handleEdit = (produit) => {
    setSelectedProduit(produit);
    setEditFormData({
      nom: produit.nom,
      description: produit.description,
      prix: produit.prix,
      statut: produit.statut,
      tailles: produit.tailles,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProduits(
      produits.map((prod) =>
        prod.id === selectedProduit.id ? { ...prod, ...editFormData } : prod
      )
    );
    setIsEditModalOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTailleChange = (taille, stock) => {
    setEditFormData((prev) => ({
      ...prev,
      tailles: prev.tailles.map((t) =>
        t.taille === taille ? { ...t, stock: parseInt(stock) } : t
      ),
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Liste des produits
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {produits.map((produit) => (
              <tr key={produit.id}>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {produit.nom}
                </td>
                <td className="px-6 py-4 dark:text-white">
                  {produit.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {produit.prix.toFixed(2)} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  <img
                    src={produit.image}
                    alt={produit.nom}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {produit.categorie}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      produit.statut
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {produit.statut ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                  <button
                    onClick={() => handleViewDetails(produit)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Voir les détails"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(produit)}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    title="Modifier"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => openDeleteModal(produit)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Détails du produit
              </h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {selectedProduit && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Nom
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedProduit.nom}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Description
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedProduit.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Prix
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedProduit.prix.toFixed(2)} €
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Image
                  </h4>
                  <img
                    src={selectedProduit.image}
                    alt={selectedProduit.nom}
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Stock par taille
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProduit.tailles.map((item) => (
                      <div
                        key={item.taille}
                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded"
                      >
                        <span className="font-medium">{item.taille}:</span>{" "}
                        {item.stock}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Statut
                  </h4>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedProduit.statut
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedProduit.statut ? "Actif" : "Inactif"}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Date de création
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedProduit.dateCreation}
                  </p>
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
              Voulez-vous vraiment supprimer le produit "{selectedProduit?.nom}"
              ? Cette action ne peut pas être annulée.
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
                  selectedProduit && handleDelete(selectedProduit.id)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour modifier */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Modifier le produit
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={editFormData.nom}
                  onChange={handleEditChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-pink focus:ring-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-pink focus:ring-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prix
                </label>
                <input
                  type="number"
                  name="prix"
                  value={editFormData.prix}
                  onChange={handleEditChange}
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom-pink focus:ring-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stock par taille
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {editFormData.tailles.map((item) => (
                    <div key={item.taille} className="flex flex-col">
                      <label className="text-sm text-gray-600 dark:text-gray-400">
                        {item.taille}
                      </label>
                      <input
                        type="number"
                        value={item.stock}
                        onChange={(e) =>
                          handleTailleChange(item.taille, e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-custom-pink focus:border-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="statut"
                  checked={editFormData.statut}
                  onChange={handleEditChange}
                  className="h-4 w-4 text-custom-pink focus:ring-custom-pink border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Produit actif
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-custom-pink hover:bg-custom-pink-dark rounded-md"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProduitList;
