import React from 'react';
import { Github, Linkedin, Instagram, Code2} from 'lucide-react';
import Anmol from '../assets/Anmol.png';
import tanishq from "../assets/tanishq.jpeg";

const Contributors = () => {
  const contributors = [
    {
      name: "Anmol Kumar",
      image: Anmol,
      skills: "Backend Architect & Node.js Specialist",
      description: "A logic-driven developer focused on building scalable, high-performance server-side architectures. Expert in Node.js, Express, and Database Design.",
      education: [
        { degree: "BS in Data Science", institute: "IIT Madras" },
        { degree: "B.Tech in Biotechnology", institute: "NIT Prayagraj" }
      ],
      socials: { github: "https://github.com/anmolkumar875511", linkedin: "https://www.linkedin.com/in/anmolkumar8755/", instagram: "https://www.instagram.com/anmol_kumar_shaharwal?igsh=MTYxZTV6bWhqOHJiOA%3D%3D" },
      accent: "#2A6FA8" // Your brand blue
    },
    {
      name: "Tanishq Lalani",
      image: tanishq,
      skills: "Frontend Engineer & UI/UX Specialist",
      description: "Passionate about creating fluid, interactive, and high-quality user interfaces. Specialized in React.js and modern styling frameworks.",
      education: [
        { degree: "BS in Data Science", institute: "IIT Madras" },
        { degree: "BCA", institute: "Maharaja Ganga Singh University" }
      ],
      socials: { github: "https://github.com/Tanishq-lalani", linkedin: "https://www.linkedin.com/in/tanishq-lalani-60793032a/", instagram: "https://www.instagram.com/tanishqlalani/" },
      accent: "#F6A04D" // Your brand orange
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-black tracking-[0.3em] text-blue-600 uppercase mb-3">The Team</h2>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Meet the <span className="text-blue-600">Contributors</span></h1>
          <p className="text-slate-500 mt-4 text-lg font-medium">The minds behind SkillBridge's personalized career paths.</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {contributors.map((member, index) => (
            <div key={index} className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
              
              {/* Background Accent Blob */}
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: member.accent }} />

              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                {/* Image Section */}
                <div className="relative shrink-0 mx-auto md:mx-0">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden ring-4 transition-all group-hover:ring-offset-4" style={{ ringColor: member.accent }}>
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-slate-900">{member.name}</h3>
                    <div className="flex gap-3">
                      <a href={member.socials.github} className="text-slate-400 hover:text-slate-900 transition-colors"><Github size={20} /></a>
                      <a href={member.socials.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>
                      <a href={member.socials.instagram} className="text-slate-400 hover:text-rose-500 transition-colors"><Instagram size={20} /></a>
                    </div>
                  </div>

                  <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Code2 size={16} /> {member.skills}
                  </p>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {member.description}
                  </p>

                  {/* Education Section */}
                  <div className="space-y-3 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       Academic Background
                    </h4>
                    {member.education.map((edu, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{edu.degree}</span>
                        <span className="text-xs font-medium text-slate-400">{edu.institute}</span>
                      </div>
                    ))}
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

export default Contributors;
