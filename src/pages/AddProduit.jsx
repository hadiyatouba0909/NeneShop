import { useState } from 'react';
import { Upload } from 'lucide-react';

const AddProduit = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    images: [],
    statut: true,
    categorie: '',
    colors: [],
    tailles: [
      { taille: 'S', stock: 0 },
      { taille: 'M', stock: 0 },
      { taille: 'L', stock: 0 }
    ]
  });

  const availableColors = [
    { nom: 'Bordeaux', code: '#800020' },
    { nom: 'Rose', code: '#FFB6C1' },
    { nom: 'Bleu marine', code: '#000080' },
    { nom: 'Vert olive', code: '#808000' },
    { nom: 'Marron', code: '#8B4513' },
    { nom: 'Beige', code: '#F5F5DC' },
    { nom: 'Gris', code: '#808080' },
    { nom: 'Noir', code: '#000000' },
    { nom: 'Blanc', code: '#FFFFFF' }
  ];

  const categories = ['Robes', 'Jupes', 'Pantalons', 'Accessoires'];

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

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleColorToggle = (colorName) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter(c => c !== colorName)
        : [...prev.colors, colorName]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validation des données
      if (!formData.nom || !formData.prix || !formData.categorie) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      if (formData.colors.length === 0) {
        alert('Veuillez sélectionner au moins une couleur');
        return;
      }

      if (formData.images.length === 0) {
        alert('Veuillez ajouter au moins une image');
        return;
      }

      if (formData.images.length > 5) {
        alert('Maximum 5 images autorisées');
        return;
      }

      // Préparer les données pour l'envoi
      const productData = new FormData();
      productData.append('nom', formData.nom);
      productData.append('prix', formData.prix);
      productData.append('categorie', formData.categorie);
      productData.append('colors', JSON.stringify(formData.colors));
      productData.append('tailles', JSON.stringify(formData.tailles));
      productData.append('statut', formData.statut);

      formData.images.forEach((image, index) => {
        productData.append(`image${index}`, image);
      });

      // Ici vous ajouteriez l'appel à votre API
      console.log('Données prêtes à être envoyées:', {
        ...formData,
        images: formData.images.map(img => img.name)
      });

      // Reset du formulaire après succès
      setFormData({
        nom: '',
        prix: '',
        images: [],
        statut: true,
        categorie: '',
        colors: [],
        tailles: [
          { taille: 'S', stock: 0 },
          { taille: 'M', stock: 0 },
          { taille: 'L', stock: 0 }
        ]
      });

      alert('Produit ajouté avec succès!');
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
      alert('Une erreur est survenue lors de l\'ajout du produit');
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Ajouter un produit
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Nom et Prix */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Nom du produit
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-custom-pink focus:ring-2 focus:ring-custom-pink/20 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Prix (FCFA)
              </label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-custom-pink focus:ring-2 focus:ring-custom-pink/20 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Catégorie */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Catégorie
            </label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-custom-pink focus:ring-2 focus:ring-custom-pink/20 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Upload Images */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Images du produit
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Glissez-déposez vos images ici ou
                </p>
                <label className="mt-2 cursor-pointer">
                  <span className="text-custom-pink hover:text-custom-pink-dark font-medium">
                    Parcourir vos fichiers
                  </span>
                  <input
                    type="file"
                    onChange={handleImagesChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                    max="5"
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG jusqu'à 5 images
                </p>
              </div>
            </div>
          </div>

          {/* Couleurs */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Couleurs disponibles
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {availableColors.map((color) => (
                <label
                  key={color.nom}
                  className="flex items-center space-x-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-custom-pink transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.colors.includes(color.nom)}
                    onChange={() => handleColorToggle(color.nom)}
                    className="h-4 w-4 text-custom-pink rounded border-gray-300 focus:ring-custom-pink"
                  />
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.code }}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {color.nom}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Stock par taille */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Stock par taille
            </label>
            <div className="grid grid-cols-3 gap-6">
              {formData.tailles.map((item) => (
                <div key={item.taille} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                    Taille {item.taille}
                  </label>
                  <input
                    type="number"
                    value={item.stock}
                    onChange={(e) => handleTailleChange(item.taille, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-custom-pink focus:ring-2 focus:ring-custom-pink/20 transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Statut */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="statut"
              checked={formData.statut}
              onChange={handleChange}
              className="h-5 w-5 text-custom-pink rounded border-gray-300 focus:ring-custom-pink"
            />
            <label className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-200">
              Produit actif
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-custom-pink hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-custom-pink/20"
          >
            Ajouter le produit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduit;