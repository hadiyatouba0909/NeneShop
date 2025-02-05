// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import CategoryList from "./pages/CategoryList";
import AddProduit from "./pages/AddProduit";
import ProduitList from "./pages/ProduitList";
import CommandesList from "./pages/CommandesList";
import CommandesEnAttente from "./pages/CommandesEnAttente";
import HistoriqueCommandes from "./pages/HistoriqueCommandes";
import Boutique from "./pages/LandingPage";
import Login from "./pages/Login";
import ShopPage from "./pages/Shop";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";

// Layout pour les pages d'administration
function AdminLayout() {
  const { isSidebarOpen } = useSidebar();
  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        <Navbar />
        <main className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="add-produit" element={<AddProduit />} />
            <Route path="produit-list" element={<ProduitList />} />
            <Route path="commandes-list" element={<CommandesList />} />
            <Route
              path="commandes-en-attente"
              element={<CommandesEnAttente />}
            />
            <Route
              path="historique-commandes"
              element={<HistoriqueCommandes />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Boutique />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<Cart />} />

            <Route
              path="/*"
              element={
                <SidebarProvider>
                  <AdminLayout />
                </SidebarProvider>
              }
            />
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
