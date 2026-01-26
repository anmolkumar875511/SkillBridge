import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
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
      console.log(selected)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12  rounded-full animate-spin mx-auto mb-4" style={{ borderColor: `${colors.blue} transparent ${colors.blue} ${colors.blue}` }}></div>
          <p className="text-slate-500 font-medium">Loading your personalized path...</p>
        </div>
      </div>
    );
  }

  if (!roadmapData) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Roadmap not found</h2>
        <button onClick={() => navigate(backPath)} className="mt-4 underline" style={{ color: colors.blue }}>
          {backLabel}
        </button>
      </div>
    );
  }

  const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {showHurray && (
          <div className="fixed inset-0 z-200 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-500" style={{ backgroundColor: `${colors.blue}E6` }}>
            <div className="text-center text-white p-8">
              <div className="flex justify-center mb-6">
                <PartyPopper size={80} className="animate-bounce" />
              </div>
              <h1 className="text-5xl font-black mb-4">HURRAY!</h1>
              <p className="text-xl font-medium opacity-90">You have completed your entire roadmap!</p>
              <p className="mt-2 " style={{ color: colors.lightBlue }}>Redirecting to your dashboard...</p>
            </div>
          </div>
        )}

        {/* Dynamic Back Button */}
        <button 
          onClick={() => navigate(backPath)} 
          className="group flex items-center gap-2 text-slate-500  font-bold mb-8 transition-colors"
          style={{ '--hover-color': colors.blue }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.blue}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          {backLabel}
        </button>
        
        <header className="mb-12 bg-white p-8 rounded-4xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                {roadmapData.opportunity?.title || "Skill Roadmap"}
                </h1>
                {isReadonly && <Lock size={20} className="text-slate-300" title="Completed Roadmap" />}
            </div>
            <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-xs">
              {roadmapData.opportunity?.company?.name || "Career Goal"}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black" style={{ color: isReadonly ? '#10b981' : colors.blue }}>
                {roadmapData.progress || 0}%
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                {isReadonly ? 'Certification Ready' : 'Total Completion'}
            </div>
          </div>
        </header>

        <div className="relative border-l-2  ml-4 md:ml-8 space-y-12" style={{ borderColor: colors.lightBlue }}>
          {roadmapData.roadmap.map((item, weekIndex) => (
            <div key={weekIndex} className="relative pl-8 md:pl-12">
              <div className={`absolute -left-2.25 top-0 w-4 h-4 rounded-full border-4 border-white shadow-md`} style={{ backgroundColor: isReadonly ? '#10b981' : colors.blue }}></div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
                <div className={` p-4 flex justify-between items-center text-white`} style={{ backgroundColor: isReadonly ? '#059669' : colors.blue }}>
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Week {item.week}</span>
                  <BookOpen size={18} className="opacity-70" />
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">{item.topic}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2  font-bold text-sm uppercase tracking-wide" style={{ color: colors.blue }}>
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
                            className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group  transition-all border border-transparent "
                            style={{ 
                                transition: '0.3s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = colors.lightBlue;
                                e.currentTarget.style.borderColor = colors.blue + '33';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                          >
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-900 line-clamp-1">
                              {resource.title}
                            </span>
                            
                            <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-900 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-wide">
                        <ClipboardList size={16} />
                        Action Tasks {isReadonly && "(Locked)"}
                      </div>
                      <div className="space-y-2">
                        {item.tasks.map((task, tIndex) => (
                          <div 
                            key={tIndex}
                            onClick={() => toggleTask(weekIndex, task._id)}
                            className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                                isReadonly ? "cursor-default" : "cursor-pointer"
                            } ${
                              task.isCompleted 
                                ? "bg-emerald-50 border-emerald-100" 
                                : "bg-white border-slate-100 hover:border-emerald-200"
                            }`}
                          >
                            <div className="mt-0.5">
                              {task.isCompleted ? (
                                <CheckCircle size={22} className="text-emerald-500 fill-emerald-50" />
                              ) : (
                                <Circle size={22} className="text-slate-200" />
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