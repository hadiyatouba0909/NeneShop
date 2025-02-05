// src/pages/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    methodePaiement: 'orangeMoney'
  });
  const [step, setStep] = useState('cart'); // 'cart' ou 'checkout'

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, ajoutez la logique pour envoyer la commande
    console.log('Commande:', { ...formData, articles: cart, total: getCartTotal() });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Votre panier est vide</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {step === 'cart' ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Votre Panier</h2>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-center py-4 border-b last:border-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Couleur: {item.color}, Taille: {item.size}
                    </p>
                    <p className="text-lg font-semibold text-custom-pink">
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                      className="p-1 hover:text-custom-pink"
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                      className="p-1 hover:text-custom-pink"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.color, item.size)}
                      className="p-1 text-red-500 hover:text-red-600 ml-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>{getCartTotal().toLocaleString()} FCFA</span>
                </div>
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full mt-6 bg-custom-pink text-white py-3 rounded-lg font-medium hover:bg-pink-600"
                >
                  Passer la commande
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Informations de livraison</h2>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-custom-pink focus:border-custom-pink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      required
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-custom-pink focus:border-custom-pink"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adresse
                  </label>
                  <textarea
                    name="adresse"
                    required
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-custom-pink focus:border-custom-pink"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    required
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-custom-pink focus:border-custom-pink"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Méthode de paiement
                  </label>
                  <select
                    name="methodePaiement"
                    value={formData.methodePaiement}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-custom-pink focus:border-custom-pink"
                  >
                    <option value="orangeMoney">Orange Money</option>
                    <option value="wave">Wave</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-custom-pink text-white rounded-lg font-medium hover:bg-pink-600"
                >
                  Confirmer la commande
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;