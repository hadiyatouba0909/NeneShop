// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Réinitialiser l'erreur lors de la saisie
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Exemple de validation basique
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    // Ici, vous ajouterez votre logique d'authentification
    // Pour l'exemple, on redirige directement vers le dashboard
    if (formData.email === 'admin@gmail.com' && formData.password === 'admin123') {
      navigate('/home');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-pink to-custom-pink-dark flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Connexion Administrateur
        </h2>
        
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-custom-pink focus:border-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-custom-pink focus:border-custom-pink dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-custom-pink focus:ring-custom-pink border-gray-300 rounded"
                />
                <label 
                  htmlFor="remember_me" 
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Se souvenir de moi
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-custom-pink hover:bg-custom-pink-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-pink transition-colors duration-200"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;