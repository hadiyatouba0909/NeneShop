// src/pages/AddCategory.jsx
import { useState } from 'react';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    image: null,
    statut: true
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
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
    // Ici, vous ajouteriez la logique pour envoyer les données à votre backend
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Ajouter une catégorie</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Nom de la catégorie
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

        <div className="flex items-center">
          <input
            type="checkbox"
            name="statut"
            checked={formData.statut}
            onChange={handleChange}
            className="h-4 w-4 text-custom-pink focus:ring-custom-pink border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
            Catégorie active
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-custom-pink hover:bg-custom-pink-dark text-white font-bold py-2 px-4 rounded-md transition-colors"
        >
          Ajouter la catégorie
        </button>
      </form>
    </div>
  );
};

export default AddCategory;