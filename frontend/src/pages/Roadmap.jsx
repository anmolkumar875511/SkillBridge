import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { 
  CheckCircle, 
  Circle, 
  BookOpen, 
  ExternalLink, 
  ClipboardList, 
  ArrowLeft 
} from 'lucide-react';

const Roadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSingleRoadmap = async () => {
    try {
      setLoading(true);
      // We fetch all and find the specific one to ensure we have the full object 
      // including opportunity title and company details
      const res = await axiosInstance.get(`/roadmap/`);
      const selected = res.data.data.find(r => r._id === id);
      setRoadmapData(selected);
    } catch (error) {
      console.error("Error fetching roadmap details:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (weekIndex, taskId) => {
    // 1. Optimistic UI Update
    const updatedData = { ...roadmapData };
    const week = updatedData.roadmap[weekIndex];
    const task = week.tasks.find(t => t._id === taskId);
    
    if (task) {
      task.isCompleted = !task.isCompleted;
      setRoadmapData(updatedData);
    }

    try {
      // 2. Persist to Backend using the roadmap document ID (id) and specific task ID
      await axiosInstance.put(`/roadmap/toggle/${id}/${taskId}`);
    } catch (error) {
      console.error("Sync failed:", error);
      // Re-fetch to sync with server state if the update fails
      fetchSingleRoadmap();
    }
  };

  useEffect(() => {
    if (id) fetchSingleRoadmap();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading your personalized path...</p>
        </div>
      </div>
    );
  }

  if (!roadmapData) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Roadmap not found</h2>
        <button onClick={() => navigate('/roadmap')} className="mt-4 text-indigo-600 underline">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>
        
        {/* Header Section */}
        <header className="mb-12 bg-white p-8 rounded-4xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">
              {roadmapData.opportunity?.title || "Skill Roadmap"}
            </h1>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-xs">
              {roadmapData.opportunity?.company?.name || "Career Goal"}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-indigo-600">{roadmapData.progress || 0}%</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Total Completion</div>
          </div>
        </header>

        {/* Timeline Section */}
        <div className="relative border-l-2 border-indigo-100 ml-4 md:ml-8 space-y-12">
          {roadmapData.roadmap.map((item, weekIndex) => (
            <div key={weekIndex} className="relative pl-8 md:pl-12">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-md"></div>

              {/* Weekly Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
                <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Week {item.week}</span>
                  <BookOpen size={18} className="opacity-70" />
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">{item.topic}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Left Column: Resources */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wide">
                        <ExternalLink size={16} /> 
                        Learning Resources
                      </div>
                      <div className="space-y-2">
                        {item.resources.map((resource, rIndex) => (
                          <a 
                            key={rIndex}
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
                          >
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 line-clamp-1">
                              {resource.title}
                            </span>
                            <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-400 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Weekly Tasks */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-wide">
                        <ClipboardList size={16} />
                        Action Tasks
                      </div>
                      <div className="space-y-2">
                        {item.tasks.map((task, tIndex) => (
                          <div 
                            key={tIndex}
                            onClick={() => toggleTask(weekIndex, task._id)}
                            className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer border transition-all duration-300 ${
                              task.isCompleted 
                                ? "bg-emerald-50 border-emerald-100" 
                                : "bg-white border-slate-100 hover:border-emerald-200"
                            }`}
                          >
                            <div className="mt-0.5">
                              {task.isCompleted ? (
                                <CheckCircle size={22} className="text-emerald-500 fill-emerald-50" />
                              ) : (
                                <Circle size={22} className="text-slate-200 hover:text-emerald-300" />
                              )}
                            </div>
                            <span className={`text-sm font-medium leading-relaxed ${
                              task.isCompleted ? "line-through text-slate-400" : "text-slate-700"
                            }`}>
                              {task.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;