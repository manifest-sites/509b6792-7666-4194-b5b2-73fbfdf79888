import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()
  
  const handleLogout = async () => {
    try {
      const response = await fetch('https://db.madewithmanifest.com/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      
      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  
  return (
    <nav className="bg-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`py-4 px-6 border-b-2 transition-colors ${
                location.pathname === '/' 
                  ? 'border-white text-white' 
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              🐰 Ferret Facts
            </Link>
            <Link 
              to="/about" 
              className={`py-4 px-6 border-b-2 transition-colors ${
                location.pathname === '/about' 
                  ? 'border-white text-white' 
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              About
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-amber-700 hover:bg-amber-600 text-white rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation