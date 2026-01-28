import React from 'react';
import { Github, Linkedin, Instagram, Code2, GraduationCap } from 'lucide-react';
import Anmol from '../assets/Anmol.png';
import tanishq from '../assets/tanishq.jpeg';
import { theme } from '../theme';

const Contributors = () => {
    const contributors = [
        {
            name: 'Anmol Kumar',
            image: Anmol,
            skills: 'Backend Architect & Node.js Specialist',
            description:
                'A logic-driven developer focused on building scalable, high-performance server-side architectures. Expert in Node.js, Express, and Database Design.',
            education: [
                { degree: 'BS in Data Science', institute: 'IIT Madras' },
                { degree: 'B.Tech in Biotechnology', institute: 'NIT Prayagraj' },
            ],
            socials: {
                github: 'https://github.com/anmolkumar875511',
                linkedin: 'https://www.linkedin.com/in/anmolkumar8755/',
                instagram:
                    'https://www.instagram.com/anmol_kumar_shaharwal?igsh=MTYxZTV6bWhqOHJiOA%3D%3D',
            },
            accent: '#2A6FA8', // Your brand blue
        },
        {
            name: 'Tanishq Lalani',
            image: tanishq,
            skills: 'Frontend Engineer & UI/UX Specialist',
            description:
                'Passionate about creating fluid, interactive, and high-quality user interfaces. Specialized in React.js and modern styling frameworks.',
            education: [
                { degree: 'BS in Data Science', institute: 'IIT Madras' },
                { degree: 'BCA', institute: 'Maharaja Ganga Singh University' },
            ],
            socials: {
                github: 'https://github.com/Tanishq-lalani',
                linkedin: 'https://www.linkedin.com/in/tanishq-lalani-60793032a/',
                instagram: 'https://www.instagram.com/tanishqlalani/',
            },
            accent: '#F6A04D', // Your brand orange
        },
    ];

    return (
        <div className="min-h-screen py-16 px-6" style={{ backgroundColor: theme.colors.bgLight }}>
            <div className="max-w-6xl mx-auto">
                {/* Section Header - Clean & Decent */}
                <div className="text-center mb-16">
                    <p
                        className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
                        style={{ color: theme.colors.secondary }}
                    >
                        The Team
                    </p>
                    <h1
                        className="text-3xl md:text-5xl font-bold tracking-tight"
                        style={{ color: theme.colors.textMain }}
                    >
                        Meet the <span style={{ color: theme.colors.primary }}>Contributors</span>
                    </h1>
                    <p
                        className="mt-4 text-sm md:text-lg font-medium"
                        style={{ color: theme.colors.textMuted }}
                    >
                        The minds behind SkillBridge's personalized career paths.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {contributors.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 border transition-all duration-300 shadow-sm hover:shadow-md"
                            style={{ borderColor: theme.colors.border }}
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Image Section - Simplified */}
                                <div className="relative shrink-0 mx-auto md:mx-0">
                                    <div
                                        className="w-28 h-28 rounded-2xl overflow-hidden border-2"
                                        style={{ borderColor: theme.colors.border }}
                                    >
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 w-full">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3
                                            className="text-xl font-bold"
                                            style={{ color: theme.colors.textMain }}
                                        >
                                            {member.name}
                                        </h3>
                                        <div className="flex gap-4">
                                            <a
                                                href={member.socials.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="opacity-40 hover:opacity-100 transition-opacity"
                                                style={{ color: theme.colors.textMain }}
                                            >
                                                <Github size={18} />
                                            </a>
                                            <a
                                                href={member.socials.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="opacity-40 hover:opacity-100 transition-opacity"
                                                style={{ color: theme.colors.primary }}
                                            >
                                                <Linkedin size={18} />
                                            </a>
                                            <a
                                                href={member.socials.instagram}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="opacity-40 hover:opacity-100 transition-opacity"
                                                style={{ color: theme.colors.secondary }}
                                            >
                                                <Instagram size={18} />
                                            </a>
                                        </div>
                                    </div>

                                    <p
                                        className="font-bold text-[11px] uppercase tracking-wider mb-4 flex items-center gap-2"
                                        style={{ color: theme.colors.primary }}
                                    >
                                        <Code2 size={14} /> {member.skills}
                                    </p>

                                    <p
                                        className="text-sm leading-relaxed mb-6"
                                        style={{ color: theme.colors.textMuted }}
                                    >
                                        {member.description}
                                    </p>

                                    {/* Education Section - Uniform with the rest of the UI */}
                                    <div
                                        className="space-y-3 p-5 rounded-2xl border"
                                        style={{
                                            backgroundColor: theme.colors.bgLight,
                                            borderColor: theme.colors.border,
                                        }}
                                    >
                                        <h4
                                            className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 opacity-60"
                                            style={{ color: theme.colors.textMain }}
                                        >
                                            <GraduationCap size={14} /> Academic Background
                                        </h4>
                                        {member.education.map((edu, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                <span
                                                    className="text-xs font-bold"
                                                    style={{ color: theme.colors.textMain }}
                                                >
                                                    {edu.degree}
                                                </span>
                                                <span
                                                    className="text-[10px] font-medium"
                                                    style={{ color: theme.colors.textMuted }}
                                                >
                                                    {edu.institute}
                                                </span>
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
