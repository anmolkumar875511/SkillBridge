import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import axiosInstance from '../axiosInstance';

const CompletedRoadmap = () => {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const colors = {
    blue: "#2A6FA8",      
    orange: "#F6A04D",    
    lightBlue: "#e7f0f7",
    green: "#22c55e" // For "Completed" status
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/roadmap/completed");
      // Assuming your API returns data in the same structure: res.data.data
      console.log(res.data.data)
      setCompleted(res.data.data || []);
    } catch (error) {
      console.error("Error fetching completed roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="relative pl-6 border-l-4 mb-10" style={{ borderColor: colors.blue }}>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            Mission <span style={{ color: colors.blue }}>Accomplished</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Review your <span className="text-gray-800 font-bold">Completed Career Paths</span> and certifications.
          </p>
        </div>

        {completed.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-3xl shadow-sm border">
            <div className="flex justify-center mb-4">
               <Trophy size={48} className="text-slate-200" />
            </div>
            <p className="text-slate-400 font-medium text-xl">No roadmaps completed yet. Keep pushing!</p>
            <button 
                onClick={() => navigate('/Dashboard')}
                className="mt-4 text-blue-600 font-bold hover:underline"
            >
                Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completed.map((item) => (
              <div 
                key={item._id}
                className="group bg-white rounded-4xl p-6 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Completed Badge */}
                <div className="absolute top-6 right-6 bg-green-50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 text-green-600">
                  <CheckCircle size={12} /> Finished
                </div>

                <div className="space-y-4">
                  {/* Icon with Blue Background */}
                  <div className="p-3 w-fit rounded-2xl text-white" style={{backgroundColor: colors.blue}}>
                    <Trophy size={24} />
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
                      <CheckCircle size={14} className="text-green-500" />
                      <span>100% Progress</span>
                    </div>
                  </div>

                  {/* Static Progress Bar (Always Full) */}
                  <div className="w-full bg-green-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full w-full" 
                      style={{ backgroundColor: colors.blue }}
                    />
                  </div>

                  <button 
                    onClick={() => navigate(`/roadmap/${item._id}`,{ state: { from: 'completed' } })}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm group-hover:bg-(--blue) transition-colors"
                    style={{ "--blue": colors.blue }}
                  >
                    Review Roadmap <ArrowRight size={16} />
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

export default CompletedRoadmap;
