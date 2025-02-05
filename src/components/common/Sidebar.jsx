// src/components/common/Sidebar.jsx
import {
  Users,
  Home,
  Settings,
  ShoppingBag,
  Clock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const { isSidebarOpen } = useSidebar();
  const [openMenus, setOpenMenus] = useState({
    categories: false,
    produits: false,
    commandes: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    { path: "/home", icon: <Home className="w-5 h-5" />, label: "Accueil" },
    {
      id: "categories",
      icon: <Users className="w-5 h-5" />,
      label: "Catégories",
      subItems: [
        { path: "/add-category", label: "Créer une catégorie" },
        { path: "/category-list", label: "Liste des catégories" },
      ],
    },
    {
      id: "produits",
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Produits",
      subItems: [
        { path: "/add-produit", label: "Ajouter des produits" },
        { path: "/produit-list", label: "Liste des produits" },
      ],
    },
    {
      id: "commandes",
      icon: <Clock className="w-5 h-5" />,
      label: "Commandes",
      subItems: [
        { path: "/commandes-list", label: "Liste des commandes" },
        { path: "/commandes-en-attente", label: "Commandes en attente" },
        { path: "/historique-commandes", label: "Historique des commandes" },
      ],
    },
    {
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Paramètres",
    },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } fixed top-0 left-0 h-screen bg-custom-pink text-white transition-all duration-300 overflow-y-auto`}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQG7nMvpDdTbSw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714649838246?e=1744243200&v=beta&t=221NJaJmhNAnjvkGP8h8R3-lLCuk1GgzMWce6B0WKsk"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover mb-2"
        />
        {isSidebarOpen && <span className="text-lg font-medium">Néné BA</span>}
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="px-3 space-y-2">
          {menuItems.map((item) => (
            <li key={item.id || item.path}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`w-full flex items-center justify-between rounded-lg transition-colors px-3 py-2 hover:bg-custom-pink-dark`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {isSidebarOpen && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </div>
                    {isSidebarOpen &&
                      (openMenus[item.id] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </button>
                  {isSidebarOpen && openMenus[item.id] && (
                    <ul className="pl-10 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={`block py-1 px-2 rounded-md text-sm transition-colors ${
                              location.pathname === subItem.path
                                ? "bg-custom-pink-dark"
                                : "hover:bg-custom-pink-dark"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`
                    flex items-center rounded-lg transition-colors
                    ${isSidebarOpen ? "px-3 py-2" : "justify-center p-2"}
                    ${
                      location.pathname === item.path
                        ? "bg-custom-pink-dark"
                        : "hover:bg-custom-pink-dark"
                    }
                  `}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  {item.icon}
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
