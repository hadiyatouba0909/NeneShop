// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { SidebarProvider } from './context/SidebarContext'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import Home from './pages/Home'
import AddUser from './pages/AddUser'
import UsersList from './pages/UsersList'

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Router>
          <div className="flex h-screen bg-white dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="p-6 bg-gray-100 dark:bg-gray-800 flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/users-list" element={<UsersList />} />
                  <Route path="/add-user" element={<AddUser />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App