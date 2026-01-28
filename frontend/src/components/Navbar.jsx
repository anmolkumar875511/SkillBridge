import React, { useContext, useEffect, useState, useRef } from 'react';
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../axiosInstance';
import avatar from '../assets/avatar.svg';
import { getThemeColors } from '../theme';
import { User, LogOut, Phone, CheckCircle, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // FIX: Destructure 'colors' directly from the function return
    // This matches your theme.js: return { colors: { ... } }
    const { colors } = getThemeColors(user?.theme || 'light');

    const toggleTheme = async () => {
        if (!user) return toast.error("Please login to switch themes");
        
        const newTheme = user.theme === 'light' ? 'dark' : 'light';
        try {
            await axiosInstance.patch('/user/theme', { theme: newTheme });
            setUser({ ...user, theme: newTheme });
            toast.success(`Switched to ${newTheme} mode`);
        } catch (error) {
            toast.error("Failed to update theme preference");
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/user/logout');
        } catch (error) {
            console.warn('Logout handled locally:', error);
        } finally {
            setUser(null);
            setIsMenuOpen(false);
            navigate('/');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Ensure colors exist before rendering to prevent the "undefined" crash
    if (!colors) return null;

    return (
        <nav
            className="fixed top-0 left-0 right-0 w-full z-50 h-20 backdrop-blur-md border-b transition-all duration-300"
            style={{ 
                backgroundColor: `${colors.bgLight}E6`, // E6 adds 90% opacity
                borderColor: colors.border 
            }}
        >
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

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
                    {[
                        ...(user?.role === 'admin'
                            ? [
                                  { name: 'ADMIN PANEL', path: '/AdminDashboard' },
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
                                ${isActive ? '' : 'hover:opacity-100 opacity-60'}`
                            }
                            style={({ isActive }) => ({
                                color: isActive ? colors.primary : colors.textMain
                            })}
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    <span
                                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300
                                        ${isActive ? 'w-4' : 'w-0'}`}
                                        style={{ backgroundColor: colors.secondary }}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Theme Toggle & Profile */}
                <div className="flex-1 flex items-center justify-end gap-4">
                    <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-xl transition-all"
                        style={{ 
                            color: colors.textMuted,
                            backgroundColor: `${colors.textMuted}15` // Subtle tinted background
                        }}
                    >
                        {user?.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {user ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden transition-all hover:shadow-md"
                                style={{ borderColor: colors.border }}
                            >
                                <img
                                    src={user.avatar?.url || avatar}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </button>

                            {isMenuOpen && (
                                <div
                                    className="absolute right-0 mt-4 w-60 rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                                    style={{ 
                                        backgroundColor: colors.white,
                                        borderColor: colors.border 
                                    }}
                                >
                                    <div className="px-4 py-3 border-b mb-1" style={{ borderColor: colors.bgLight }}>
                                        <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: colors.textMuted }}>Signed in as</p>
                                        <p className="text-xs font-bold truncate" style={{ color: colors.primary }}>{user.name || user.email}</p>
                                    </div>

                                    <DropdownLink onClick={() => navigate('/Profile')} icon={<User size={14} />} label="My Profile" colors={colors} />
                                    {user.role === 'student' && <DropdownLink onClick={() => navigate('/complete_roadmap')} icon={<CheckCircle size={14} />} label="Completed Paths" colors={colors} />}
                                    <DropdownLink onClick={() => navigate('/contact')} icon={<Phone size={14} />} label="Contact Us" colors={colors} />

                                    <div className="my-1 border-t" style={{ borderColor: colors.bgLight }} />

                                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors uppercase tracking-widest">
                                        <LogOut size={14} /> Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/Login')}
                            className="px-6 py-2.5 rounded-xl font-bold text-[10px] text-white shadow-md active:scale-95"
                            style={{ backgroundColor: colors.primary }}
                        >
                            GET STARTED
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

const DropdownLink = ({ onClick, icon, label, colors }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-opacity-5 rounded-lg transition-colors"
        style={{ 
            color: colors.textMain,
            '--hover-bg': `${colors.primary}1A` 
        }}
    >
        <span className="opacity-40">{icon}</span>
        {label}
    </button>
);

export default Navbar;