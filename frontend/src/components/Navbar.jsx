import React, { useContext, useEffect } from 'react'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../axiosInstance'

function Navbar() {
  const navigate = useNavigate()
  const {user, setUser} = useContext(AuthContext)

   const logout = async () =>{
      const res = await axiosInstance.post("/user/logout",{
        user
      })
      setUser(null)
    }


  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 h-24
      bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* ----- Left: Logo ----- */}
        <div className="flex-1 flex justify-start">
          {user ? <img
            className="h-14 md:h-16 w-auto cursor-pointer object-contain
              hover:scale-105 transition-transform"
            onClick={() => navigate('/Dashboard')}
            src={logo}
            alt="SkillBridge Logo"
          /> : <img
            className="h-14 md:h-16 w-auto cursor-pointer object-contain
              hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
            src={logo}
            alt="SkillBridge Logo"
          />}
          
        </div>

        {/* ----- Middle: Navigation Links ----- */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {user ? <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              `relative font-medium px-2 transition-colors
              text-slate-600 hover:text-[#0B4DB8]
              after:absolute after:left-1/2 after:-bottom-1
              after:h-0.5 after:w-6 after:-translate-x-1/2
              after:origin-center after:transition-transform after:duration-300
              after:bg-[#F59E0B]
              ${isActive ? 'text-[#0B4DB8] after:scale-x-100' : 'after:scale-x-0'}`
            }
          >
            Dashboard
          </NavLink>   : <NavLink
            to="/"
            className={({ isActive }) =>
              `relative font-medium px-2 transition-colors
              text-slate-600 hover:text-[#0B4DB8]
              after:absolute after:left-1/2 after:-bottom-1
              after:h-0.5 after:w-6 after:-translate-x-1/2
              after:origin-center after:transition-transform after:duration-300
              after:bg-[#F59E0B]
              ${isActive ? 'text-[#0B4DB8] after:scale-x-100' : 'after:scale-x-0'}`
            }
          >
            Home
          </NavLink>}
          

          
          {user ? <NavLink
            to="/Resume"
            className={({ isActive }) =>
              `relative font-medium px-2 transition-colors
              text-slate-600 hover:text-[#0B4DB8]
              after:absolute after:left-1/2 after:-bottom-1
              after:h-0.5 after:w-6 after:-translate-x-1/2
              after:origin-center after:transition-transform after:duration-300
              after:bg-[#F59E0B]
              ${isActive ? 'text-[#0B4DB8] after:scale-x-100' : 'after:scale-x-0'}`
            }
          >
            Resume
          </NavLink> :<NavLink
            to="/contributors"
            className={({ isActive }) =>
              `relative font-medium px-2 transition-colors
              text-slate-600 hover:text-[#0B4DB8]
              after:absolute after:left-1/2 after:-bottom-1
              after:h-0.5 after:w-6 after:-translate-x-1/2
              after:origin-center after:transition-transform after:duration-300
              after:bg-[#F59E0B]
              ${isActive ? 'text-[#0B4DB8] after:scale-x-100' : 'after:scale-x-0'}`
            }
          >
            Contributors
          </NavLink>}
          

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative font-medium px-2 transition-colors
              text-slate-600 hover:text-[#0B4DB8]
              after:absolute after:left-1/2 after:-bottom-1
              after:h-0.5 after:w-6 after:-translate-x-1/2
              after:origin-center after:transition-transform after:duration-300
              after:bg-[#F59E0B]
              ${isActive ? 'text-[#0B4DB8] after:scale-x-100' : 'after:scale-x-0'}`
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* ----- Right: Action Button ----- */}
        <div className="flex-1 flex justify-end">
          {user ? <button
            onClick={logout}
            className="bg-[#0B4DB8] text-white px-5 py-2 rounded-full
              font-semibold shadow-md hover:bg-[#093c91]
              hover:shadow-lg transition-all active:scale-95"
          >
            Log Out
          </button> : <button
            onClick={() => navigate('/login')}
            className="bg-[#0B4DB8] text-white px-5 py-2 rounded-full
              font-semibold shadow-md hover:bg-[#093c91]
              hover:shadow-lg transition-all active:scale-95"
          >
            Create Account
          </button>}
          
          
        </div>

      </div>
    </nav>
  )
}

export default Navbar