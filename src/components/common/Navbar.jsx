// src/components/common/Navbar.jsx
import { Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useSidebar } from '../../context/SidebarContext'

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-custom-pink text-white px-4 py-2 flex justify-between items-center">
      <button 
        onClick={toggleSidebar}
        className="hover-custom-pink p-2 rounded-lg"
      >
        <Menu size={24} />
      </button>
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
  )
}

export default Navbar