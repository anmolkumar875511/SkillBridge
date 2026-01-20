import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Roadmap from './Roadmap'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { CheckCircle, Circle, BookOpen, Calendar,Trophy,ArrowRight, ExternalLink, ClipboardList, ArrowLeft } from 'lucide-react';


const Dashboard = () => {
 const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllRoadmaps = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/roadmap/");
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

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Learning <span className="text-indigo-600">Journeys</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Continue your path to career excellence.</p>
        </header>

        {roadmaps.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-3xl shadow-sm border">
            <p className="text-slate-400 font-medium">No roadmaps generated yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmaps.map((item) => (
              <div 
                key={item._id}
                className="group bg-white rounded-4xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Progress Badge */}
                <div className="absolute top-6 right-6 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                  {item.progress || 0}% Done
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-indigo-600 w-fit rounded-2xl text-white">
                    <BookOpen size={24} />
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 line-clamp-2 min-h-14">
                      {item.opportunity?.title || "Career Roadmap"}
                    </h2>
                    <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">
                      {item.opportunity?.company?.name || "Target Goal"}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-slate-500 text-sm py-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{item.roadmap?.length || 0} Weeks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy size={14} />
                      <span>Goal-oriented</span>
                    </div>
                  </div>

                  {/* Tiny Progress Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-500" 
                      style={{ width: `${item.progress || 0}%` }}
                    />
                  </div>

                  <button 
                    onClick={() => navigate(`/roadmap/${item._id}`)}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm group-hover:bg-indigo-600 transition-colors"
                  >
                    Open Roadmap <ArrowRight size={16} />
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
