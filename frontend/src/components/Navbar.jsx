import React, { useContext, useEffect, useState, useRef } from 'react';
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../axiosInstance';
import avatar from '../assets/avatar.svg';
import { theme } from '../theme'; // Pulling from your central theme.js
import { User, LogOut, Phone, CheckCircle, LayoutDashboard } from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const colors = {
        blue: '#2A6FA8',
        orange: '#F6A04D',
        lightBlue: '#e7f0f7',
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/user/logout', { user });
        } catch (error) {
            // Intentional warning for server-side logout failures
            console.warn('Logout handled locally:', error);
        } finally {
            setUser(null);
        }
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync menu state with user state
    useEffect(() => {
        setIsMenuOpen(false);
    }, [user]);

    const LogoSection = (
        <div className="flex-1 flex justify-start">
            <img
                className="h-10 md:h-12 w-auto cursor-pointer object-contain transition-all active:scale-95"
                onClick={() =>
                    navigate(user?.role === 'admin' ? '/AdminDashboard' : user ? '/Dashboard' : '/')
                }
                src={logo}
                alt="SkillBridge Logo"
            />
        </div>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 w-full z-50 h-20 bg-white/90 backdrop-blur-md border-b" style={{ borderColor: theme.colors.border }}>
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
                
                {/* Logo Section */}
                <div className="flex-1 flex justify-start">
                    <img
                        className="h-9 md:h-11 w-auto cursor-pointer object-contain transition-transform active:scale-95"
                        onClick={() => navigate(user?.role === 'admin' ? '/AdminDashboard' : user ? '/Dashboard' : '/')}
                        src={logo}
                        alt="SkillBridge"
                    />
                </div>

                {/* Navigation Links - Decent Typography */}
                <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
                    {[
                        ...(user?.role === 'admin'
                            ? [
                                  { name: 'ADMIN PANNEL', path: '/AdminDashboard' },
                                  { name: 'SYSTEM LOGS', path: '/logger' },
                                  { name: 'ALL USERS', path: '/users' },
                              ]
                            : [
                                  { name: user ? 'DASHBOARD' : 'HOME', path: user ? '/Dashboard' : '/' },
                                  { name: user ? 'RESUME' : 'CONTRIBUTORS', path: user ? '/Resume' : '/contributors' },
                                  ...(user ? [{ name: 'OPPORTUNITIES', path: '/Opportunities' }] : []),
                                  ...(!user ? [{ name: 'CONTACT US', path: '/contact' }] : []),
                              ]),
                    ].map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative px-4 py-2 text-[10px] font-bold tracking-[0.2em] transition-all duration-300
                                ${isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    <span
                                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300
                                        ${isActive ? 'w-4' : 'w-0'}`}
                                        style={{ backgroundColor: theme.colors.secondary }}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Action Button / Profile */}
                <div className="flex-1 flex justify-end">
                    {user ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="w-10 h-10 rounded-xl border flex items-center justify-center overflow-hidden transition-all hover:shadow-md"
                                style={{ borderColor: theme.colors.border }}
                            >
                                <img
                                    src={user.avatar?.url || avatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-200" style={{ borderColor: theme.colors.border }}>
                                    <div className="px-4 py-3 border-b mb-1" style={{ borderColor: theme.colors.bgLight }}>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                                        <p className="text-xs font-bold truncate" style={{ color: theme.colors.primary }}>
                                            {user.name || user.email}
                                        </p>
                                    </div>
                                    
                                    <DropdownLink onClick={() => navigate('/Profile')} icon={<User size={14}/>} label="My Profile" />
                                    
                                    {/* BUG FIX: Only show to students, not admins */}
                                    {user.role === 'student' && (
                                        <DropdownLink onClick={() => navigate('/complete_roadmap')} icon={<CheckCircle size={14}/>} label="Completed Roadmaps" />
                                    )}

                                    <DropdownLink onClick={() => navigate('/contact')} icon={<Phone size={14}/>} label="Contact Us" />
                                    
                                    <div className="my-1 border-t" style={{ borderColor: theme.colors.bgLight }} />
                                    
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors uppercase tracking-widest"
                                    >
                                        <LogOut size={14} /> Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/Login')}
                            className="px-6 py-2.5 rounded-xl font-bold text-[10px] text-white transition-all hover:opacity-90 tracking-widest shadow-md active:scale-95"
                            style={{ backgroundColor: theme.colors.primary }}
                        >
                            GET STARTED
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

// Helper Sub-component for clean code
const DropdownLink = ({ onClick, icon, label }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
    >
        <span className="opacity-40">{icon}</span>
        {label}
    </button>
);


export default Navbar;