// src/pages/CategoryList.jsx
import { useState } from "react";
import { Pencil, Trash2, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    {
      id: 1,
      nom: "Vêtements",
      description: "Tous types de vêtements",
      image:
        "https://www.recette360.com/wp-content/uploads/2021/06/Les-salades-W-Watchers.jpg.webp",
      statut: true,
      dateCreation: "2024-02-03",
    },
    {
      id: 2,
      nom: "Chaussures",
      description: "Tous types de chaussures",
      image:
        "https://www.recette360.com/wp-content/uploads/2021/06/Les-salades-W-Watchers.jpg.webp",
      statut: true,
      dateCreation: "2024-02-03",
    },
    {
      id: 3,
      nom: "Accessoires",
      description: "Tous types d'accessoires",
      image:
        "https://www.recette360.com/wp-content/uploads/2021/06/Les-salades-W-Watchers.jpg.webp",
      statut: false,
      dateCreation: "2024-02-03",
    },
  ]);

  // États pour les modales
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nom: "",
    description: "",
    statut: true,
  });

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditFormData({
      nom: category.nom,
      description: category.description,
      statut: category.statut,
    });
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory.id ? { ...cat, ...editFormData } : cat
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Liste des catégories
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
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date de création
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {category.nom}
                </td>
                <td className="px-6 py-4 dark:text-white">
                  {category.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  <img
                    src={category.image}
                    alt={category.nom}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      category.statut
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {category.statut ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {category.dateCreation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                  <button
                    onClick={() => handleViewDetails(category)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Voir les détails"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    title="Modifier"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
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
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsViewModalOpen(false)} // Ferme le modal quand on clique sur l'overlay
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique sur le contenu
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Détails de la catégorie
              </h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {selectedCategory && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Nom
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCategory.nom}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Description
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCategory.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Image
                  </h4>
                  <img
                    src={selectedCategory.image}
                    alt={selectedCategory.nom}
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Statut
                  </h4>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedCategory.statut
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedCategory.statut ? "Actif" : "Inactif"}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Date de création
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCategory.dateCreation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal pour modifier */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Modifier la catégorie
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="statut"
                  checked={editFormData.statut}
                  onChange={handleEditChange}
                  className="h-4 w-4 text-custom-pink focus:ring-custom-pink border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Catégorie active
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

export default CategoryList;
