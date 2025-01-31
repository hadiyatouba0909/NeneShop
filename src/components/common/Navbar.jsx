// src/components/common/Navbar.jsx
import { Menu, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useSidebar } from "../../context/SidebarContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-custom-pink text-white px-4 py-4 flex items-center">
      {/* Bouton menu à gauche */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-custom-pink-dark"
      >
        <Menu size={24} />
      </button>

      {/* Barre de recherche centrée */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-4 py-2 pl-10 bg-white/10 border rounded-full border-white/20 focus:outline-none focus:border-white/40 placeholder-white/60 transition-colors"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-custom-pink-dark transition-colors"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
