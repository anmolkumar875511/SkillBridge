import React from 'react'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        
        {/* ----- Left: Logo ----- */}
        <div className="flex-1 flex justify-start">
          <img 
            className="h-14 rounded-full md:h-16 w-auto cursor-pointer object-contain hover:opacity-90 transition" 
            onClick={() => navigate('/')} 
            src={logo} 
            alt="SkillBridge Logo" 
          />
        </div>

        {/* ----- Middle: Navigation Links ----- */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <NavLink 
            className={({ isActive }) => 
              `font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
            } 
            to='/'
          >
            Home
          </NavLink>
          <NavLink 
            className="text-gray-600 font-medium hover:text-blue-500 transition-colors" 
            to='/contributors'
          >
            Contributors
          </NavLink>
          <NavLink 
            className="text-gray-600 font-medium hover:text-blue-500 transition-colors" 
            to='/contact'
          >
            Contact
          </NavLink>
        </div>

        {/* ----- Right: Action Button ----- */}
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
          >
            Create Account
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
