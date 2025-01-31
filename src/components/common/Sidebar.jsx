// src/components/common/Sidebar.jsx
import { Users, Home, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useSidebar } from '../../context/SidebarContext'

const Sidebar = () => {
  const location = useLocation();
  const { isSidebarOpen } = useSidebar();
  
  const menuItems = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Accueil' },
    { path: '/add-user', icon: <Users className="w-5 h-5" />, label: 'Ajouter un utilisateur' },
    { path: '/users-list', icon: <Users className="w-5 h-5" />, label: 'Liste des utilisateurs' },
    { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Paramètres' }
  ];
  
  return (
    <div 
      className={`${
        isSidebarOpen ? 'w-64' : 'w-16'
      } min-h-screen bg-custom-pink text-white transition-all duration-300`}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6">
        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-200 relative mb-2">
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        {isSidebarOpen && <span className="text-lg font-medium">Néné BA</span>}
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="px-3 space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`
                  flex items-center rounded-lg transition-colors
                  ${isSidebarOpen ? 'px-3 py-2' : 'justify-center p-2'}
                  ${location.pathname === item.path ? 'bg-custom-pink-dark' : 'hover:bg-custom-pink-dark'}
                `}
                title={!isSidebarOpen ? item.label : undefined}
              >
                {item.icon}
                {isSidebarOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar