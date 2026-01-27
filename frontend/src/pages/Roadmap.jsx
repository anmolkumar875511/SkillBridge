import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { theme } from '../theme';
import { 
  CheckCircle, 
  Circle, 
  BookOpen, 
  ExternalLink, 
  ClipboardList, 
  ArrowLeft ,
  PartyPopper,
  Lock
} from 'lucide-react';

const Roadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Used to check where the user came from
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showHurray, setShowHurray] = useState(false);

  // Check if the current roadmap is 100% complete
  const isReadonly = roadmapData?.progress === 100;

  const fetchSingleRoadmap = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/roadmap`);
      const selected = res.data.data.find(r => r._id === id);
      setRoadmapData(selected);
    } catch (error) {
      console.error("Error fetching roadmap details:", error);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    // Only trigger celebration if we aren't already viewing a long-completed roadmap
    if (roadmapData && roadmapData.roadmap && !isReadonly) {
      const allTasks = roadmapData.roadmap.flatMap(week => week.tasks);
      const isEverythingFinished = allTasks.every(task => task.isCompleted === true);

      if (isEverythingFinished && allTasks.length > 0) {
        handleCompletion();
      }
    }
  }, [roadmapData]);

  const calculateProgress = (roadmap) => {
  const allTasks = roadmap.flatMap(week => week.tasks);
  if (allTasks.length === 0) return 0;
  const completedTasks = allTasks.filter(task => task.isCompleted).length;
  return Math.round((completedTasks / allTasks.length) * 100);
};

  const handleCompletion = () => {
    setShowHurray(true);
    setTimeout(() => {
      navigate('/Dashboard');
    }, 3500);
  };

  const toggleTask = async (weekIndex, taskId) => {
    // Disable toggling if roadmap is already completed
    if (isReadonly) return;

    const updatedData = { ...roadmapData };
    const week = updatedData.roadmap[weekIndex];
    const task = week.tasks.find(t => t._id === taskId);
    
    if (task) {
      task.isCompleted = !task.isCompleted;
      updatedData.progress = calculateProgress(updatedData.roadmap);
      setRoadmapData(updatedData);
    }

    try {
      await axiosInstance.put(`/roadmap/toggle/${id}/${taskId}`);
    } catch (error) {
      console.error("Sync failed:", error);
      fetchSingleRoadmap();
    }
  };

  useEffect(() => {
    if (id) fetchSingleRoadmap();
  }, [id]);

  // Logic to determine back button text and path
  const isFromCompleted = location.state?.from === 'completed' || roadmapData?.progress === 100;
  const backLabel = isFromCompleted ? "Back to Completed Roadmaps" : "Back to Dashboard";
  const backPath = isFromCompleted ? "/complete_roadmap" : "/Dashboard";

 if (loading) return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: theme.colors.bgLight }}>
      <div className="text-center">
        <div className="w-10 h-10 rounded-full animate-spin mx-auto mb-4 border-t-2" style={{ borderColor: theme.colors.primary }}></div>
        <p className="text-sm font-medium" style={{ color: theme.colors.textMuted }}>Curating your path...</p>
      </div>
    </div>
  );

  if (!roadmapData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: theme.colors.bgLight }}>
        <div className="p-6 rounded-full bg-white shadow-sm mb-6">
          <SearchX size={48} className="opacity-20" style={{ color: theme.colors.textMain }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.textMain }}>Roadmap Not Found</h2>
        <p className="text-sm font-medium mb-8 max-w-xs mx-auto" style={{ color: theme.colors.textMuted }}>
          The roadmap you're looking for doesn't exist or has been moved.
        </p>
        <button 
          onClick={() => navigate("/Dashboard")} 
          className="px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-95 shadow-md"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: theme.colors.bgLight }}>
      <div className="max-w-4xl mx-auto">
        
        {showHurray && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-500" style={{ backgroundColor: `${theme.colors.primary}F2` }}>
            <div className="text-center text-white p-8">
              <PartyPopper size={64} className="mx-auto mb-6 animate-bounce" />
              <h1 className="text-4xl font-bold mb-2">Congratulations!</h1>
              <p className="text-lg opacity-90">You've mastered this roadmap.</p>
            </div>
          </div>
        )}

        <button 
          onClick={() => navigate(backPath)} 
          className="group flex items-center gap-2 font-bold mb-8 transition-all text-xs uppercase tracking-widest"
          style={{ color: theme.colors.textMuted }}
          onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.primary}
          onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textMuted}
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          {backLabel}
        </button>
        
        <header className="mb-10 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: theme.colors.textMain }}>
                  {roadmapData.opportunity?.title || "Skill Roadmap"}
                </h1>
                {isReadonly && <Lock size={18} className="opacity-30" />}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.colors.secondary }}>
              {roadmapData.opportunity?.company?.name || "Target Goal"}
            </p>
          </div>
          <div className="md:text-right">
            <div className="text-4xl font-bold" style={{ color: isReadonly ? '#10b981' : theme.colors.primary }}>
                {roadmapData.progress || 0}%
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {isReadonly ? 'Roadmap Mastered' : 'Current Progress'}
            </p>
          </div>
        </header>

        <div className="relative border-l-2 ml-4 md:ml-6 space-y-10" style={{ borderColor: theme.colors.border }}>
          {roadmapData.roadmap.map((item, weekIndex) => (
            <div key={weekIndex} className="relative pl-8 md:pl-10">
              {/* Timeline Dot */}
              <div 
                className="absolute -left-2.25 top-0 w-4 h-4 rounded-full border-4 border-white shadow-sm" 
                style={{ backgroundColor: isReadonly ? '#10b981' : theme.colors.primary }}
              ></div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-3 flex justify-between items-center text-white" style={{ backgroundColor: isReadonly ? '#059669' : theme.colors.textMain }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Week {item.week}</span>
                  <BookOpen size={14} className="opacity-50" />
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-8" style={{ color: theme.colors.textMain }}>{item.topic}</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Resources */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest" style={{ color: theme.colors.primary }}>
                        <ExternalLink size={14} /> Learning Material
                      </div>
                      <div className="space-y-2">
                        {item.resources.map((resource, rIndex) => (
                          <a 
                            key={rIndex}
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 hover:bg-white transition-all group"
                          >
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 line-clamp-1">
                              {resource.title}
                            </span>
                            <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-700 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest" style={{ color: '#059669' }}>
                        <ClipboardList size={14} /> Action Plan
                      </div>
                      <div className="space-y-2">
                        {item.tasks.map((task, tIndex) => (
                          <div 
                            key={tIndex}
                            onClick={() => toggleTask(weekIndex, task._id)}
                            className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                              isReadonly ? "cursor-default" : "cursor-pointer"
                            } ${
                              task.isCompleted 
                                ? "bg-emerald-50/50 border-emerald-100" 
                                : "bg-white border-slate-100 hover:border-emerald-200"
                            }`}
                          >
                            <div className="mt-0.5">
                              {task.isCompleted ? (
                                <CheckCircle size={20} className="text-emerald-500" />
                              ) : (
                                <Circle size={20} className="text-slate-200" />
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