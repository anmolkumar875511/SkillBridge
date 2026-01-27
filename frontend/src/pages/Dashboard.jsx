import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Roadmap from './Roadmap'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { CheckCircle, Circle, BookOpen, Calendar,Trophy,ArrowRight, ExternalLink, ClipboardList, ArrowLeft } from 'lucide-react';
import { theme } from '../theme';


const Dashboard = () => {
 const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  const activeRoadmaps = roadmaps.filter(item => (item.progress || 0) < 100);

  const fetchAllRoadmaps = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/roadmap/");
      console.log(res.data.data)
      setRoadmaps(res.data.data || []);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRoadmaps();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

   const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

  return (
 <div className="min-h-screen py-12 px-6" style={{ backgroundColor: theme.colors.bgLight }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section - Clean & Professional */}
        <div className="relative pl-5 border-l-4 mb-12" style={{ borderColor: theme.colors.secondary }}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: theme.colors.textMain }}>
            Hello, <span style={{ color: theme.colors.primary }}>{user?.name || 'Explorer'}</span>
          </h1>
          <p className="mt-2 text-sm md:text-lg font-medium" style={{ color: theme.colors.textMuted }}>
            Continue your path to <span style={{ color: theme.colors.textMain }}>Career Excellence</span>.
          </p>
        </div>

        {activeRoadmaps.length === 0 ? (
          <div className="text-center bg-white p-16 rounded-3xl shadow-sm border" style={{ borderColor: theme.colors.border }}>
            <p className="font-medium opacity-60" style={{ color: theme.colors.textMuted }}>No roadmaps generated yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRoadmaps.map((item) => (
              <div 
                key={item._id}
                className="group bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative overflow-hidden"
                style={{ borderColor: theme.colors.border }}
              >
                {/* Progress Badge - Decent Styling */}
                <div 
                  className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" 
                  style={{ backgroundColor: `${theme.colors.primary}10`, color: theme.colors.primary }}
                >
                  {item.progress || 0}% Complete
                </div>

                <div className="space-y-5">
                  {/* Icon Container */}
                  <div className="p-3 w-fit rounded-xl text-white shadow-sm" style={{ backgroundColor: theme.colors.primary }}>
                    <BookOpen size={20} />
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-bold line-clamp-2 min-h-14 leading-snug" style={{ color: theme.colors.textMain }}>
                      {item.opportunity?.title || "Career Roadmap"}
                    </h2>
                    <p className="text-[11px] font-bold uppercase tracking-widest mt-1 opacity-60" style={{ color: theme.colors.textMuted }}>
                      {item.opportunity?.company?.name || "Target Goal"}
                    </p>
                  </div>

                  {/* Metadata - Compact & Decent */}
                  <div className="flex items-center gap-4 text-xs font-medium" style={{ color: theme.colors.textMuted }}>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="opacity-70" />
                      <span>{item.roadmap?.length || 0} Weeks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy size={14} className="opacity-70" />
                      <span>Goal-oriented</span>
                    </div>
                  </div>

                  {/* Progress Bar - Simplified */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-700 ease-in-out" 
                      style={{ width: `${item.progress || 0}%`, backgroundColor: theme.colors.primary }}
                    />
                  </div>

                  {/* Action Button - Uniform with Banner/Login */}
                  <button 
                    onClick={() => navigate(`/roadmap/${item._id}`)}
                    className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-200 text-white shadow-sm hover:opacity-90 active:scale-[0.98]"
                    style={{ backgroundColor: theme.colors.textMain }}
                  >
                    Open Roadmap <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default Dashboard
