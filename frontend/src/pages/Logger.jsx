import React, { useState, useEffect } from 'react';
import { Download, AlertCircle, CheckCircle, ScrollText } from 'lucide-react';
import axiosInstance from '../axiosInstance';

const LogLevelBadge = ({ level }) => {
    const styles = {
        info: 'bg-blue-50 text-blue-600 border-blue-100',
        warn: 'bg-amber-50 text-amber-600 border-amber-100',
        error: 'bg-rose-50 text-rose-600 border-rose-100',
    };
    const icons = {
        info: <CheckCircle className="w-3 h-3 mr-1.5" />,
        warn: <AlertCircle className="w-3 h-3 mr-1.5" />,
        error: <AlertCircle className="w-3 h-3 mr-1.5" />,
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${styles[level] || styles.info}`}>
            {icons[level]} {level}
        </span>
    );
};

const Logger = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/admin/logs?limit=20');
            setLogs(res.data.data.logs);
        } catch (error) {
            console.error("Failed to load logs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleExportLogs = () => {
        window.open('http://localhost:5000/api/v1/admin/logs/export', '_blank');
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium animate-pulse">Retrieving system logs...</p>
        </div>
    );

    return (
        /* The max-w-5xl and mx-auto keeps the UI in the center of the screen */
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-2xl">
                        <ScrollText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-800">System Activity</h2>
                        <p className="text-sm text-gray-400 font-medium">Real-time audit trail of all platform events</p>
                    </div>
                </div>
                
                <button 
                    onClick={handleExportLogs}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
                >
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /> 
                    EXPORT AUDIT LOG
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-4xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widset">Timestamp</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widset">Severity</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widset">Action Type</th>
                                <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widset">Actor</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widset">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {logs.length > 0 ? logs.map((log) => (
                                <tr key={log._id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-8 py-4 text-xs font-bold text-gray-500 whitespace-nowrap">
                                        {new Date(log.createdAt).toLocaleDateString()}
                                        <span className="block text-[10px] text-gray-300 font-medium">
                                            {new Date(log.createdAt).toLocaleTimeString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <LogLevelBadge level={log.level} />
                                    </td>
                                    <td className="px-6 py-4 font-black text-gray-700 text-xs">
                                        {log.meta?.action || 'SYSTEM_EVENT'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200">
                                                {log.user?.email ? log.user.email[0].toUpperCase() : 'S'}
                                            </div>
                                            <span className="text-xs font-bold text-gray-600">
                                                {log.user?.email || 'System Auth'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-xs font-medium text-gray-500 max-w-xs xl:max-w-md truncate group-hover:text-clip group-hover:whitespace-normal transition-all" title={log.message}>
                                        {log.message}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center opacity-20">
                                            <ScrollText className="w-12 h-12 mb-2" />
                                            <p className="font-black">NO ACTIVITY FOUND</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}} />
        </div>
    );
};

export default Logger;