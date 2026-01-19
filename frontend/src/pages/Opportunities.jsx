import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOp, setSelectedOp] = useState(null);
  const navigate = useNavigate();
  const getOpportunity = async () => {
    const res = await axiosInstance.get("/opportunity/");
    console.log(res.data);
    setOpportunities(res.data.data);
  };

  useEffect(() => {
    getOpportunity();
  }, []);

  const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7",
  slate: "#1e293b"
  };

  return (
    <div className="min-h-screen bg-[#fafbfc]  px-6 animate-fade-in ">
      <div className="max-w-7xl mx-auto space-y-12">
        
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
          {opportunities.map((item, index) => (
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
                  <h2 className="text-xs  font-extrabold uppercase tracking-widest text-gray-400">Company: {item.company.name}</h2>
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
                        className="px-3 py-1 text-[11px] font-bold rounded-lg border transition-colors"
                        style={{ backgroundColor: colors.lightBlue, color: colors.blue, borderColor: colors.lightBlue }}
                      >
                        {skill}
                      </span>
                    ))}
                    {item.requiredSkills.length > 3 && (
                      <span className="text-[11px] font-bold text-gray-400 px-1">+{item.requiredSkills.length - 3} more</span>
                    )}
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
          ))}
        </div>
      </div>

      {/* DESCRIPTION MODAL (POPUP) */}
      {selectedOp && (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" 
            onClick={() => setSelectedOp(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 pb-0 flex justify-between items-start">
               <div>
                 <h2 className="text-2xl font-black tracking-tight" style={{ color: colors.blue }}>{selectedOp.title}</h2>
                 <p className="font-bold text-orange-500 uppercase text-xs tracking-widest mt-1">{selectedOp.company.name}</p>
               </div>
               <button 
                onClick={() => setSelectedOp(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
               >
                 <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                 <h4 className="text-gray-900 font-black uppercase text-xs tracking-widest mb-4">Job Description</h4>
                 <div dangerouslySetInnerHTML={{ __html: selectedOp.description }} />
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-wrap gap-4">
                 <div className="flex-1 min-w-30">
                    <p className="text-[10px] font-black uppercase text-gray-400">Level</p>
                    <p className="font-bold text-gray-800">{selectedOp.experienceLevel}</p>
                 </div>
                 <div className="flex-1 min-w-30">
                    <p className="text-[10px] font-black uppercase text-gray-400">Location</p>
                    <p className="font-bold text-gray-800">{selectedOp.location}</p>
                 </div>
                 <div className="flex-1 min-w-30">
                    <p className="text-[10px] font-black uppercase text-gray-400">Category</p>
                    <p className="font-bold text-gray-800">{selectedOp.category}</p>
                 </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-4 bg-white border-t border-gray-50">
               <button 
                  onClick={() => {
                    navigate(`/analyze/${selectedOp._id}`);
                    setSelectedOp(null);
                  }}
                  className="w-full py-4 rounded-2xl font-black text-white tracking-widest shadow-xl"
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
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #11579322; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default Opportunities;
