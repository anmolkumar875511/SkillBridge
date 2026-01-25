import React, { useContext, useEffect,useState,useRef } from 'react'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../axiosInstance'
import avatar from "../assets/avatar.svg"

function Navbar() {
  const navigate = useNavigate()
  const {user, setUser} = useContext(AuthContext)

const logout = async () => {
  try {
    // 1. Attempt the server-side logout
    await axiosInstance.post("/user/logout", { user });
  } catch (error) {
    // 2. We catch the error but don't let it crash the app.
    // If the error is 401, the user is already logged out on the server.
    console.warn("Server logout failed, but clearing local session anyway.", error);
  } finally {
    // 3. This ALWAYS runs. 
    // It clears your local state and redirects the user, 
    // which effectively "fixes" the UI.
    setUser(null);
    
    // Optional: If you use localStorage, clear it here too
    // localStorage.removeItem("token"); 
  }
};
   
    const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

// ... inside your component
const [isMenuOpen, setIsMenuOpen] = useState(false);
const menuRef = useRef(null);

// Close menu when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const LogoSection = (
    <div className="flex-1 flex justify-start">
      <img
        className="h-12 md:h-14 w-auto cursor-pointer object-contain hover:brightness-110 transition-all active:scale-95"
        onClick={() => navigate(user?.role === 'admin' ? '/AdminDashboard' : user ? '/Dashboard' : '/')}
        src={logo}
        alt="SkillBridge Logo"
      />
    </div>
  );

  // --- ADMIN VIEW ---
  if (user?.role === "admin") {
    return (
      <nav className="fixed top-0 left-0 right-0 w-full z-100 h-24 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          {LogoSection}

          {/* Admin Specific Links - Styled like Student Navbar */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <NavLink
              to="/AdminDashboard"
              className={({ isActive }) =>
                `relative px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 group
                ${isActive 
                  ? 'text-[#115793] bg-[#115793]/5' 
                  : 'text-gray-500 hover:text-[#115793] hover:bg-gray-50'}`
              }
            >
              {({ isActive }) => (
                <>
                  ADMIN PANEL
                  {/* Animated underline / dot matching student style */}
                  <span 
                    className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full transition-all duration-300
                    group-hover:w-4 group-hover:bg-[#F48C31]
                    ${isActive ? 'w-4 bg-[#F48C31]' : 'w-0 bg-transparent'}`}
                  />
                </>
              )}
            </NavLink>
            
          </div>

          {/* Admin Logout Button */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={logout}
              className="relative px-8 py-3 rounded-2xl font-black text-sm text-white transition-all shadow-xl hover:scale-105 active:scale-95 overflow-hidden group tracking-widest"
              style={{ backgroundColor: colors.blue }}
            >
              {/* Hover shine effect from student button */}
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              LOG OUT
            </button>
          </div>
        </div>
        
        {/* Modern thin branding line at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-px flex opacity-20">
          <div className="flex-1" style={{ backgroundColor: colors.blue }} />
          <div className="flex-1" style={{ backgroundColor: colors.orange }} />
        </div>
      </nav>
    );
  }


  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-100 h-24 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">

        {/* ----- Left: Logo ----- */}
         {LogoSection}

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
            <div className="relative" ref={menuRef}>
            {/* AVATAR TRIGGER */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-transparent hover:border-blue-100 transition-all active:scale-95 shadow-md overflow-hidden"
              style={{ backgroundColor: colors.lightBlue }}
            >
              {user.avatar.url ? (
                <img src={user.avatar.url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="font-black text-lg" style={{ color: colors.blue }}>
                  {<img src={avatar} alt="" /> || 'U'}
                </span>
              )}
            </button>
    
            {/* DROPDOWN MENU */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-gray-50 p-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="px-4 py-3 border-b border-gray-50 mb-2">
                  <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Account</p>
                  <p className="text-sm font-black truncate" style={{ color: colors.blue }}>{user.displayName || user.email}</p>
                </div>
    
                <div className="flex flex-col gap-1">
                  {/* Profile Button */}
                  <button
                    onClick={() => { navigate('/Profile'); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm text-gray-700 group"
                  >
                    <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    User Profile
                  </button>
    
                  {/* Roadmaps Button */}
                  <button
                    onClick={() => { navigate('/complete_roadmap'); setIsMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors font-bold text-sm text-gray-700 group"
                  >
                    <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    Completed Roadmaps
                  </button>
    
                  <hr className="my-1 border-gray-50" />
    
                  {/* Logout Button (Styled as requested) */}
                  <button
                    onClick={logout}
                    className="group flex items-center justify-between w-full px-4 py-3 rounded-xl font-black text-sm transition-all hover:bg-rose-50 active:scale-95"
                    style={{ color: colors.blue }}
                  >
                    <span className="group-hover:text-rose-600 transition-colors tracking-widest">LOG OUT</span>
                    <svg className="w-4 h-4 group-hover:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
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