// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-pink to-custom-pink-dark">
      <div className="container mx-auto px-4 py-16">
        {/* Section Hero */}
        <div className="text-center text-white space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bienvenue chez Néné Shop
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Découvrez notre collection exclusive de vêtements et accessoires
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
          <Link
            to="/login"
            className="bg-white text-custom-pink hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Se connecter
          </Link>
          <Link
            to="/shop"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Voir nos produits
          </Link>
        </div>

        {/* Section Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/10 p-8 rounded-xl text-white backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Collection Unique</h3>
            <p className="opacity-90">
              Découvrez nos produits soigneusement sélectionnés pour vous.
            </p>
          </div>
          <div className="bg-white/10 p-8 rounded-xl text-white backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Qualité Premium</h3>
            <p className="opacity-90">
              Des produits de haute qualité pour votre satisfaction.
            </p>
          </div>
          <div className="bg-white/10 p-8 rounded-xl text-white backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Service Client</h3>
            <p className="opacity-90">
              Une équipe à votre écoute pour vous accompagner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;