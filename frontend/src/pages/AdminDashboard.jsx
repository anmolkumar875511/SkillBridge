import React, { useState, useEffect, useContext } from 'react';
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
    CheckCircle,
    ChevronRight,
    History,
} from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getThemeColors } from '../theme';


const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ingesting, setIngesting] = useState(false);
    const {user} = useContext(AuthContext)
    const { colors } = getThemeColors(user?.theme || 'light');

    const navigate = useNavigate();

    // Fetch Dashboard Data
    const fetchDashboardData = async () => {
        try {
            const res = await axiosInstance.get('/admin/dashboard');
            setStats(res.data.message);
        } catch (error) {
            console.error('Failed to load stats', error);
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

    if (loading)
        return (
            <div className="flex h-screen items-center justify-center text-gray-500">
                Loading Dashboard...
            </div>
        );

    return (
        <div
            className="min-h-screen py-12 px-4 md:px-8"
            style={{ backgroundColor: colors.bgLight }}
        >
            <main className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div
                        className="relative pl-5 border-l-4"
                        style={{ borderColor: colors.secondary }}
                    >
                        <h1
                            className="text-3xl md:text-4xl font-bold tracking-tight"
                            style={{ color: colors.textMain }}
                        >
                            System <span style={{ color: colors.primary }}>Overview</span>
                        </h1>
                        <p
                            className="mt-2 text-sm md:text-lg font-medium"
                            style={{ color: colors.textMuted }}
                        >
                            Manage platform resources and monitor system health.
                        </p>
                    </div>

                    <button
                        onClick={handleIngest}
                        disabled={ingesting}
                        className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl shadow-md transition-all active:scale-95 text-xs font-bold uppercase tracking-widest ${ingesting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                        style={{ backgroundColor: colors.primary }}
                    >
                        <RefreshCw className={`w-4 h-4 ${ingesting ? 'animate-spin' : ''}`} />
                        {ingesting ? 'Syncing...' : 'Sync Opportunities'}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<Users className="w-5 h-5" />}
                        title="Total Students"
                        value={stats?.users?.total || 0}
                        brandColor={colors.primary}
                    />
                    <StatCard
                        icon={<Briefcase className="w-5 h-5" />}
                        title="Active Jobs"
                        value={stats?.opportunities?.active || 0}
                        subtext={`of ${stats?.opportunities?.total} total`}
                        brandColor={colors.secondary}
                    />
                    <StatCard
                        icon={<FileText className="w-5 h-5" />}
                        title="Resumes Parsed"
                        value={stats?.resumes || 0}
                        brandColor={colors.textMain}
                    />
                    <StatCard
                        icon={<Activity className="w-5 h-5" />}
                        title="Roadmaps Created"
                        value={stats?.roadmaps || 0}
                        brandColor={colors.primary}
                    />
                </div>

                {/* Recent Logs Preview */}
                <div
                    className="rounded-3xl shadow-sm border overflow-hidden"
                    style={{ borderColor: colors.border }}
                >
                    <div
                        className="px-8 py-6 border-b flex justify-between items-center"
                        style={{ borderColor: colors.border }}
                    >
                        <div className="flex items-center gap-2">
                            <History size={18} style={{ color: colors.primary }} />
                            <h3
                                className="font-bold text-lg"
                                style={{ color: colors.textMain }}
                            >
                                System Activity
                            </h3>
                        </div>
                        <button
                            onClick={() => navigate('/logger')}
                            className="text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1"
                            style={{ color: colors.primary }}
                        >
                            View All Logs <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="divide-y" style={{ borderColor: colors.border }}>
                        {stats?.recentLogs?.map((log) => (
                            <div
                               className="px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <LogLevelBadge level={log.level} />
                                    <div className="flex flex-col">
                                        <span
                                            className="text-sm font-bold"
                                            style={{ color: colors.textMain }}
                                        >
                                            {log.meta?.action || 'System Event'}
                                        </span>
                                        <span
                                            className="text-xs font-medium truncate max-w-lg"
                                            style={{ color: colors.textMuted }}
                                        >
                                            {log.message}
                                        </span>
                                    </div>
                                </div>
                                <span
                                    className="text-[10px] font-bold uppercase tracking-wider opacity-40 whitespace-nowrap"
                                    style={{ color: colors.textMain }}
                                >
                                    {new Date(log.createdAt).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

// Sub-components
const StatCard = ({ icon, title, value, subtext, brandColor }) => {
    const {user} = useContext(AuthContext)
    const { colors } = getThemeColors(user?.theme || 'light');
    <div
        className="p-6 rounded-3xl border  flex items-start justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
        style={{ borderColor: colors.border }}
    >
        <div className="space-y-1">
            <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: colors.textMuted }}
            >
                {title}
            </p>
            <h3 className="text-3xl font-bold" style={{ color: colors.textMain }}>
                {value}
            </h3>
            {subtext && (
                <p
                    className="text-[10px] font-medium opacity-60"
                    style={{ color: colors.textMuted }}
                >
                    {subtext}
                </p>
            )}
        </div>
        <div
            className="p-3 rounded-xl shadow-sm text-white"
            style={{ backgroundColor: brandColor }}
        >
            {icon}
        </div>
    </div>
};

const LogLevelBadge = ({ level }) => {
    const {user} = useContext(AuthContext)
    const { colors } = getThemeColors(user?.theme || 'light');
    const config = {
        info: { color: '#3b82f6', icon: <CheckCircle className="w-3 h-3" /> },
        warn: { color: '#f59e0b', icon: <AlertCircle className="w-3 h-3" /> },
        error: { color: '#ef4444', icon: <AlertCircle className="w-3 h-3" /> },
    };

    const current = config[level] || config.info;

    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${current.color}15`, color: current.color }}
        >
            {current.icon} {level}
        </span>
    );
};

export default AdminDashboard;
