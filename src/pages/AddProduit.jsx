// src/pages/AddProduit.jsx
import { useState } from 'react';

const AddProduit = () => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    image: null,
    statut: true,
    categorieId: '',
    tailles: [
      { taille: 'XS', stock: 0 },
      { taille: 'S', stock: 0 },
      { taille: 'M', stock: 0 },
      { taille: 'L', stock: 0 },
      { taille: 'XL', stock: 0 },
      { taille: 'XXL', stock: 0 }
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTailleChange = (taille, stock) => {
    setFormData(prev => ({
      ...prev,
      tailles: prev.tailles.map(t => 
        t.taille === taille ? { ...t, stock: parseInt(stock) } : t
      )
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du formulaire:', formData);
    // Logique pour envoyer les données au backend
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Ajouter un produit</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Nom du produit
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-custom-pink focus:border-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-custom-pink focus:border-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Prix
          </label>
          <input
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-custom-pink focus:border-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Catégorie
          </label>
          <select
            name="categorieId"
            value={formData.categorieId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-custom-pink focus:border-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="1">Vêtements</option>
            <option value="2">Chaussures</option>
            <option value="3">Accessoires</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-custom-pink focus:border-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Stock par taille
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.tailles.map((item) => (
              <div key={item.taille} className="flex flex-col">
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  {item.taille}
                </label>
                <input
                  type="number"
                  value={item.stock}
                  onChange={(e) => handleTailleChange(item.taille, e.target.value)}
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
            checked={formData.statut}
            onChange={handleChange}
            className="h-4 w-4 text-custom-pink focus:ring-custom-pink border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
            Produit actif
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-custom-pink hover:bg-custom-pink-dark text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

export default AddProduit;