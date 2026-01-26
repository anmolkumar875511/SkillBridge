import React, { useEffect, useState } from 'react';
import { Users, ShieldCheck, ShieldAlert, Mail, Search, UserCheck } from 'lucide-react';
import axiosInstance from '../axiosInstance';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const colors = {
        blue: "#2A6FA8",
        orange: "#F6A04D",
        lightBlue: "#e7f0f7",
        slate: "#1e293b"
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("/admin/users");
            // Assuming res.data.data is the array of users
            setUsers(res.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleBlacklist = async (userId) => {
        try {
            await axiosInstance.patch(`/admin/blacklist/${userId}`);
            // Re-fetch to sync UI with database
            await fetchData();
        } catch (error) {
            console.error("Toggle failed:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter users based on search
    const filteredUsers = users.filter(u => 
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${colors.blue} transparent ${colors.blue} ${colors.blue}` }}></div>
                <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Loading User Directory...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* HEADER & SEARCH SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl" style={{ backgroundColor: colors.lightBlue }}>
                        <Users size={32} style={{ color: colors.blue }} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight" style={{ color: colors.slate }}>User Management</h1>
                        <p className="text-gray-400 font-medium">Control access and review platform members</p>
                    </div>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                        type="text"
                        placeholder="Search name or email..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:ring-2 outline-none transition-all font-medium text-sm"
                        style={{ focusRingColor: colors.blue }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* USERS TABLE */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">User Details</th>
                                <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Access Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className="group hover:bg-slate-50/50 transition-colors">
                                    {/* USER INFO */}
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white shadow-inner" 
                                                 style={{ backgroundColor: u.isBlacklisted ? '#94a3b8' : colors.blue }}>
                                                {u.name ? u.name[0].toUpperCase() : <UserCheck size={20}/>}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-800 text-sm uppercase tracking-tight">{u.name || "Anonymous User"}</p>
                                                <div className="flex items-center gap-1.5 text-gray-400">
                                                    <Mail size={12} />
                                                    <span className="text-xs font-bold">{u.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* STATUS BADGE */}
                                    <td className="px-8 py-5 text-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            u.isBlacklisted 
                                            ? 'bg-rose-50 text-rose-600 border-rose-100' 
                                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        }`}>
                                            {u.isBlacklisted ? 'Blacklisted' : 'Active Member'}
                                        </span>
                                    </td>

                                    {/* ACTION BUTTON */}
                                    <td className="px-8 py-5 text-right">
                                        <button 
                                            onClick={() => toggleBlacklist(u._id)}
                                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all active:scale-95 shadow-lg ${
                                                u.isBlacklisted 
                                                ? 'bg-emerald-500 text-white shadow-emerald-200 hover:bg-emerald-600' 
                                                : 'bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600'
                                            }`}
                                        >
                                            {u.isBlacklisted ? (
                                                <><ShieldCheck size={14} /> Whitelist</>
                                            ) : (
                                                <><ShieldAlert size={14} /> Blacklist</>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center">
                        <Users size={48} className="text-gray-100 mb-4" />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No Users Found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
