// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function AppContent() {
  const { isSidebarOpen } = useSidebar();
  
  return (
    <div className="flex">
      <Sidebar />
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        <Navbar />
        <main className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/category-list" element={<CategoryList />} />
            <Route path="/add-produit" element={<AddProduit />} />
            <Route path="/produit-list" element={<ProduitList />} />
            <Route path="/commandes-list" element={<CommandesList />} />
            <Route
              path="/commandes-en-attente"
              element={<CommandesEnAttente />}
            />
            <Route
              path="/historique-commandes"
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
    <ThemeProvider>
      <SidebarProvider>
        <Router>
          <AppContent />
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;