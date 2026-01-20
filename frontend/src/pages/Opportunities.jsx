import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOp, setSelectedOp] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 1. Add loading state
  const navigate = useNavigate();

  const getOpportunity = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get("/opportunity/");
      setOpportunities(res.data.data || []);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    } finally {
      setIsLoading(false); // 2. Turn off loader
    }
  };

  useEffect(() => {
    getOpportunity();
  }, []);

  const colors = {
    blue: "#2A6FA8",
    orange: "#F6A04D",
    lightBlue: "#e7f0f7",
    slate: "#1e293b"
  };

  // 3. Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 flex flex-col justify-between animate-pulse">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-8 w-full bg-gray-200 rounded-lg"></div>
        <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
        <div className="flex gap-2 pt-4">
          <div className="h-6 w-16 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      <div className="mt-8 space-y-3">
        <div className="h-12 w-full bg-gray-100 rounded-2xl"></div>
        <div className="h-12 w-full bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafbfc] px-6 animate-fade-in ">
      <div className="max-w-7xl mx-auto space-y-12 py-10">
        
        {/* Header Section */}
        <div className="relative pl-6 border-l-4" style={{ borderColor: colors.orange }}>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase">
            Career <span style={{ color: colors.blue }}>Opportunities</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Find the <span className="text-gray-800 font-bold text-lg">Best Match</span> opportunities curated for your skill set.
          </p>
        </div>

        {/* Opportunity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // 4. Show 6 skeletons while loading
            Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            opportunities.map((item, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 p-8 flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-blue-900/10 relative overflow-hidden"
              >
                {/* Type Badge */}
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white uppercase" style={{ backgroundColor: colors.orange }}>
                  {item.opportunityType}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">Company: {item.company.name}</h2>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-[#115793] transition-colors" style={{ color: colors.slate }}>
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold italic text-blue-500">{item.category}</p>
                  </div>

                  {/* Skills Preview */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-gray-400">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {item.requiredSkills.slice(0, 3).map((skill, sIndex) => (
                        <span
                          key={sIndex}
                          className="px-3 py-1 text-[11px] font-bold rounded-lg border"
                          style={{ backgroundColor: colors.lightBlue, color: colors.blue, borderColor: colors.lightBlue }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400">Experience</p>
                      <p className="text-sm font-bold text-gray-700">{item.experienceLevel}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400">Location</p>
                      <p className="text-sm font-bold text-gray-700">{item.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button 
                      onClick={() => setSelectedOp(item)}
                      className="w-full py-3 rounded-2xl font-black text-xs tracking-widest border-2 transition-all hover:bg-gray-50"
                      style={{ color: colors.blue, borderColor: colors.blue }}
                  >
                    VIEW DETAILS
                  </button>
                  <button 
                    onClick={() => navigate(`/analyze/${item._id}`)}
                    className="w-full py-3 rounded-2xl font-black text-xs text-white tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all"
                    style={{ backgroundColor: colors.blue }}
                  >
                    GENERATE SKILLGAP
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL CODE REMAINS THE SAME... */}
      {selectedOp && (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setSelectedOp(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
             {/* ... Modal Content as provided in your snippet ... */}
             <div className="p-8 pb-0 flex justify-between items-start">
               <div>
                 <h2 className="text-2xl font-black tracking-tight" style={{ color: colors.blue }}>{selectedOp.title}</h2>
                 <p className="font-bold text-orange-500 uppercase text-xs tracking-widest mt-1">{selectedOp.company.name}</p>
               </div>
               <button onClick={() => setSelectedOp(null)} className="p-2 hover:bg-gray-100 rounded-full">
                 <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>
             <div className="p-8 max-h-[60vh] overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: selectedOp.description }} className="prose prose-sm text-gray-600" />
             </div>
             <div className="p-8 pt-4 bg-white border-t border-gray-50">
               <button 
                 onClick={() => navigate(`/analyze/${selectedOp._id}`)}
                 className="w-full py-4 rounded-2xl font-black text-white tracking-widest"
                 style={{ backgroundColor: colors.blue }}
               >
                 ANALYZE SKILL GAP NOW
               </button>
             </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}} />
    </div>
  );
};

export default Opportunities;