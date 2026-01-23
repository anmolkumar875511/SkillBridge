import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { ResumeContext } from "../context/ResumeContext";

const ConfirmResume = ({ resumeId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);

  const {resume,fetchResume} = useContext(ResumeContext)

  // const fetchData = async () => {
  //   // const res = await axiosInstance.get(`/resume/${resumeId}`);
  //   // console.log(res.data);
  //   console.log(Resume)
  //   setSkills(Resume.skills);
  //   setEducation(Resume.education);
  //   setExperience(Resume.experience);
  //   setProjects(Resume.projects);
  //   console.log("Data Fetched Succesfully");
  // };

  useEffect(() => {
    if(resumeId){
    fetchResume(resumeId)
    }

  }, [resumeId]);

  useEffect(() => {
    if (resume && Object.keys(resume).length > 0) {
      setSkills(resume.skills || []);
      setEducation(resume.education || []);
      setExperience(resume.experience || []);
      setProjects(resume.projects || []);
      console.log("Data loaded into local state:", resume);
    }
  }, [resume]);

  const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-10 animate-fade-in">
      
      {/* SKILLS SECTION */}
      <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5">
        <h3 className="text-2xl font-black mb-6" style={{ color: colors.blue }}>Technical Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
          {skills.map((item, index) => (
            <div key={index} className={`p-4 rounded-2xl border transition-all ${isEdit ? 'bg-gray-50 border-orange-200' : 'bg-white border-gray-100'}`}>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    className="w-full bg-white border rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                    value={item.name}
                    onChange={(e) => setSkills(prev => prev.map((s, i) => i === index ? { ...s, name: e.target.value } : s))}
                  />
                  <input
                    className="w-full bg-white border rounded-lg px-2 py-1 text-xs outline-none"
                    value={item.level}
                    onChange={(e) => setSkills(prev => prev.map((s, i) => i === index ? { ...s, level: e.target.value } : s))}
                  />
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-black uppercase text-orange-500">{item.level}</p>
                  <p className="font-bold text-gray-800">{item.name}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PROJECTS SECTION - FIXED EDITING */}
        <div className="rounded-[2.5rem] p-8 text-white shadow-2xl" style={{ backgroundColor: colors.blue }}>
          <h3 className="text-xl font-bold mb-8">Top Projects</h3>
          <div className="space-y-4">
            {projects.map((item, index) => (
              <div key={index} className="p-6 bg-white/10 rounded-3xl border border-white/10">
                {isEdit ? (
                  <div className="space-y-3">
                    <input 
                      className="w-full bg-white/20 rounded-lg p-2 outline-none border border-white/30 text-white placeholder-blue-200"
                      value={item.title}
                      onChange={(e) => setProjects(prev => prev.map((p, i) => i === index ? { ...p, title: e.target.value } : p))}
                    />
                    <textarea 
                      className="w-full bg-white/20 rounded-lg p-2 outline-none border border-white/30 text-white text-sm h-24"
                      value={item.description}
                      onChange={(e) => setProjects(prev => prev.map((p, i) => i === index ? { ...p, description: e.target.value } : p))}
                    />
                  </div>
                ) : (
                  <>
                    <h4 className="text-lg font-bold" style={{ color: colors.orange }}>{item.title}</h4>
                    <p className="text-blue-50 text-sm mt-2 opacity-80">{item.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* EXPERIENCE SECTION - FIXED EDITING */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl">
            <h3 className="text-xl font-bold mb-8" style={{ color: colors.blue }}>Experience</h3>
            <div className="space-y-6">
              {experience.map((item, index) => (
                <div key={index} className="pl-4 border-l-4 border-orange-400">
                  {isEdit ? (
                    <div className="space-y-2">
                      <input 
                        className="w-full border rounded-lg p-2 text-sm"
                        value={item.role}
                        onChange={(e) => setExperience(prev => prev.map((ex, i) => i === index ? { ...ex, role: e.target.value } : ex))}
                      />
                      <input 
                        className="w-full border rounded-lg p-2 text-sm font-bold text-blue-800"
                        value={item.company}
                        onChange={(e) => setExperience(prev => prev.map((ex, i) => i === index ? { ...ex, company: e.target.value } : ex))}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-black text-gray-800 uppercase tracking-tight">{item.role}</p>
                      <p className="font-bold text-blue-700">{item.company}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION SECTION - FIXED EDITING */}
          <div className="rounded-[2.5rem] p-8 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.orange}, #ea580c)` }}>
            <h3 className="text-xl font-bold mb-6">Education</h3>
            {education.map((item, index) => (
              <div key={index}>
                {isEdit ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      className="bg-white/20 border border-white/40 rounded-lg p-2 text-white"
                      value={item.degree}
                      onChange={(e) => setEducation(prev => prev.map((ed, i) => i === index ? { ...ed, degree: e.target.value } : ed))}
                    />
                    <input 
                      className="bg-white/20 border border-white/40 rounded-lg p-2 text-white"
                      value={item.institute}
                      onChange={(e) => setEducation(prev => prev.map((ed, i) => i === index ? { ...ed, institute: e.target.value } : ed))}
                    />
                    <input 
                      className="bg-white/20 border border-white/40 rounded-lg p-2 text-white"
                      value={item.year}
                      onChange={(e) => setEducation(prev => prev.map((ed, i) => i === index ? { ...ed, year: e.target.value } : ed))}
                    />
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
  <div className="flex flex-col">
    <p className="text-lg font-bold">{item.degree}</p>
    <p className="text-sm text-gray-300">{item.institute}</p>
  </div>

  <span className="bg-white/20 px-3 py-1 rounded-lg text-xs font-black">
    {item.year}
  </span>
</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
          style={{ backgroundColor: isEdit ? '#10b981' : colors.blue }}
        >
          <span>{isEdit ? "SAVE CHANGES" : "EDIT PROFILE"}</span>
          <span className="text-xl">{isEdit ? '✓' : '✎'}</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #11579322; border-radius: 10px; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
      `}} />
    </div>
  );
};


export default ConfirmResume;
