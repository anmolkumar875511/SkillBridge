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
   
    const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-100 h-24 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">

        {/* ----- Left: Logo ----- */}
        <div className="flex-1 flex justify-start">
          <img
            className="h-12 md:h-14 w-auto cursor-pointer object-contain hover:brightness-110 transition-all active:scale-95"
            onClick={() => navigate(user ? '/Dashboard' : '/')}
            src={logo}
            alt="SkillBridge Logo"
          />
        </div>

        {/* ----- Middle: Navigation Links ----- */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {[
            { name: user ? 'Dashboard' : 'Home', path: user ? '/Dashboard' : '/' },
            { name: user ? 'Resume' : 'Contributors', path: user ? '/Resume' : '/contributors' },
            ...(user ? [{ name: 'Opportunities', path: '/Opportunities' }] : []),
            { name: 'Contact Us', path: '/contact' }
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 group
                ${isActive 
                  ? 'text-[#115793] bg-[#115793]/5' 
                  : 'text-gray-500 hover:text-[#115793] hover:bg-gray-50'}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {/* Animated underline / dot for active/hover states */}
                  <span 
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full transition-all duration-300
                    group-hover:w-4 group-hover:bg-[#F48C31]
                    ${isActive ? 'w-4 bg-[#F48C31]' : 'w-0 bg-transparent'}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* ----- Right: Action Button ----- */}
        <div className="flex-1 flex justify-end">
          {user ? (
            <button
              onClick={logout}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black text-sm transition-all shadow-lg hover:shadow-rose-100 active:scale-95 border-2 border-transparent hover:border-rose-100"
              style={{ backgroundColor: colors.lightBlue, color: colors.blue }}
            >
              <span className="group-hover:text-rose-600 transition-colors tracking-widest">LOG OUT</span>
              <svg className="w-4 h-4 group-hover:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => navigate('/Login')}
              className="relative px-8 py-3 rounded-2xl font-black text-sm text-white transition-all shadow-xl hover:scale-105 active:scale-95 overflow-hidden group tracking-widest"
              style={{ backgroundColor: colors.blue }}
            >
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              CREATE ACCOUNT
            </button>
          )}
        </div>

      </div>

      {/* Modern thin branding line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-px flex opacity-20">
        <div className="flex-1" style={{ backgroundColor: colors.blue }} />
        <div className="flex-1" style={{ backgroundColor: colors.orange }} />
      </div>
    </nav>
  )
}

export default Navbar