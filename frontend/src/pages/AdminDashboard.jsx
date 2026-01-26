import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    LayoutDashboard, 
    FileText, 
    Briefcase, 
    Users, 
    Activity, 
    RefreshCw, 
    Download, 
    AlertCircle, 
    CheckCircle 
} from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ingesting, setIngesting] = useState(false);

    const navigate = useNavigate()


    // Fetch Dashboard Data
    const fetchDashboardData = async () => {
        try {
            const res = await axiosInstance.get('/admin/dashboard');
            setStats(res.data.message);
            console.log(res.data)
        } catch (error) {
            console.error("Failed to load stats", error);
        }
    };



    useEffect(() => {
        setLoading(true);
        fetchDashboardData().finally(() => setLoading(false));
    }, []);

    // Handle Ingestion Trigger
    const handleIngest = async () => {
        setIngesting(true);
        try {
            await axiosInstance.get('/admin/fetch');
            toast.success('Opportunity ingestion triggered successfully!');
            fetchDashboardData(); // Refresh stats
        } catch (error) {
            toast.error('Ingestion failed.');
        } finally {
            setIngesting(false);
        }
    };


    if (loading) return <div className="flex h-screen items-center justify-center text-gray-500">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                

                {/* OVERVIEW CONTENT */}

                    <div className="space-y-6">
                        {/* Action Bar */}
                        <div className="flex justify-end">
                            <button 
                                onClick={handleIngest}
                                disabled={ingesting}
                                className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition ${ingesting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <RefreshCw className={`w-4 h-4 ${ingesting ? 'animate-spin' : ''}`} />
                                {ingesting ? 'Ingesting...' : 'Sync Opportunities'}
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard 
                                icon={<Users className="w-6 h-6 text-purple-600" />}
                                title="Total Students"
                                value={stats?.users?.total || 0}
                                color="bg-purple-50 border-purple-100"
                            />
                            <StatCard 
                                icon={<Briefcase className="w-6 h-6 text-green-600" />}
                                title="Active Opportunities"
                                value={stats?.opportunities?.active || 0}
                                subtext={`of ${stats?.opportunities?.total} total`}
                                color="bg-green-50 border-green-100"
                            />
                            <StatCard 
                                icon={<FileText className="w-6 h-6 text-orange-600" />}
                                title="Resumes Parsed"
                                value={stats?.resumes || 0}
                                color="bg-orange-50 border-orange-100"
                            />
                            <StatCard 
                                icon={<Activity className="w-6 h-6 text-blue-600" />}
                                title="Roadmaps Created"
                                value={stats?.roadmaps || 0}
                                color="bg-blue-50 border-blue-100"
                            />
                        </div>

                        {/* Recent Logs Preview */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">Recent System Activity</h3>
                                <button onClick={() => navigate('/logger')} className="text-sm text-blue-600 hover:underline">View All</button>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {stats?.recentLogs?.map((log) => (
                                    <div key={log._id} className="px-6 py-3 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-3">
                                            <LogLevelBadge level={log.level} />
                                            <span className="text-gray-700 font-medium">{log.meta?.action || 'System Event'}</span>
                                            <span className="text-gray-500 truncate max-w-md hidden md:block">- {log.message}</span>
                                        </div>
                                        <span className="text-gray-400 text-xs">{new Date(log.createdAt).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </main>
        </div>
    );
};

// Sub-components
const StatCard = ({ icon, title, value, subtext, color }) => (
    <div className={`p-6 rounded-xl border ${color} bg-opacity-50 flex items-start justify-between transition-transform hover:-translate-y-1`}>
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        </div>
        <div className="p-2 bg-white rounded-lg shadow-sm">
            {icon}
        </div>
    </div>
);

const LogLevelBadge = ({ level }) => {
    const styles = {
        info: 'bg-blue-100 text-blue-700',
        warn: 'bg-yellow-100 text-yellow-700',
        error: 'bg-red-100 text-red-700',
    };
    const icons = {
        info: <CheckCircle className="w-3 h-3 mr-1" />,
        warn: <AlertCircle className="w-3 h-3 mr-1" />,
        error: <AlertCircle className="w-3 h-3 mr-1" />,
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase ${styles[level] || styles.info}`}>
            {icons[level]} {level}
        </span>
    );
};

export default AdminDashboard;