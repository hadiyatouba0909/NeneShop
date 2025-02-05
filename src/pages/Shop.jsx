// src/pages/Shop.jsx
import React, { useState } from "react";
import { Search, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize);
  };

  const colorMap = {
    Rouge: "bg-red-500",
    Noir: "bg-gray-900",
    Blanc: "bg-gray-100",
    Beige: "bg-amber-200",
    Bleu: "bg-blue-500",
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden aspect-square">
        <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-5 h-5" />
        </button>

        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === index
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-pink-500 dark:text-pink-400">
          {(product.price / 100).toLocaleString()} FCFA
        </p>

        <div className="mt-2 space-y-2">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
              Couleurs
            </p>
            <div className="flex flex-wrap gap-1">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full ${colorMap[color]} transition-all duration-300 
                    ${selectedColor === color ? "ring-2 ring-offset-2 ring-purple-600" : "hover:ring-2 hover:ring-offset-2 hover:ring-purple-400"}`}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
              Tailles
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-all duration-300 
                    ${selectedSize === size
                      ? "bg-pink-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-6 bg-custom-pink hover:bg-pink-600 text-white py-3 rounded-xl text-sm font-medium
          transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden
          before:absolute before:inset-0 before:w-full before:h-full before:bg-white/20 
          before:transform before:-translate-x-full hover:before:translate-x-full before:transition-transform
          before:duration-700"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};
const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["Tous", "Robes", "Jupes", "Pantalons", "Accessoires"];
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Robe d'été fleurie",
      price: 29900,
      images: [
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://m.media-amazon.com/images/I/71GKAdfpMxL._AC_UY580_.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
      ],
      sizes: ["S", "M", "L"],
      colors: ["Rouge", "Noir", "Blanc", "Beige", "Bleu"],
    },
    {
      id: 2,
      name: "Robe cocktail bordeaux",
      price: 39900,
      images: [
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
      ],
      sizes: ["S", "M", "L"],
      colors: ["Rouge", "Noir", "Blanc", "Beige", "Bleu"],
    },
    {
      id: 3,
      name: "Jupe plissée satin",
      price: 19900,
      images: [
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
      ],
      sizes: ["S", "M", "L"],
      colors: ["Rouge", "Noir", "Blanc", "Beige", "Bleu"],
    },
    {
      id: 4,
      name: "Pantalon palazzo",
      price: 24900,
      images: [
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
      ],
      sizes: ["S", "M", "L"],
      colors: ["Rouge", "Noir", "Blanc", "Beige", "Bleu"],
    },
    {
      id: 5,
      name: "Robe longue mousseline",
      price: 34900,
      images: [
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
        "https://media2.jennah-boutique.com/29048-large_default/longue-jupe-evasee-satin-chocolat.jpg",
      ],
      sizes: ["S", "M", "L"],
      colors: ["Rouge", "Noir", "Blanc", "Beige", "Bleu"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-custom-pink shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20 gap-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Boutique Néné
            </h1>
            <div className="flex-1 max-w-2xl relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full px-6 py-3 pl-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 
                focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="p-3 rounded-full hover:bg-white/10 transition-all duration-300 relative group"
            >
              <ShoppingCart className="h-6 w-6 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {getCartCount()}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105
                ${activeCategory === category
                  ? "bg-pink-600 text-white shadow-lg scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products
            .filter(product => {
              const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
              const categoryMatch = activeCategory === "Tous" || product.name.toLowerCase().includes(activeCategory.toLowerCase());
              return searchMatch && categoryMatch;
            })
            .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
