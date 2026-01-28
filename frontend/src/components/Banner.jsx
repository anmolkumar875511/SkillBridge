import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThemeColors } from '../theme';
import { AuthContext } from '../context/AuthContext';


const Banner = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    const { colors } = getThemeColors(user?.colors || 'light');
    return (
        <section className="w-full ">
            {/* Reduced padding for a more compact, decent look */}
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
                <div className="flex flex-col items-center text-center">
                    {/* Subtle Tagline - No big background, just clean text */}
                    <p
                        className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
                        style={{ color: colors.secondary }}
                    >
                        Bridge The Gap
                    </p>

                    {/* Headline - Semi-bold/Bold instead of Black, smaller sizing */}
                    <h1
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight max-w-4xl"
                        style={{ color: colors.textMain }}
                    >
                        Upskill Yourself <br className="hidden md:block" />
                        <span style={{ color: colors.primary }}>And Grow Together.</span>
                    </h1>

                    {/* Subtext - Balanced font size */}
                    <p
                        className="text-sm md:text-lg max-w-2xl font-normal leading-relaxed mb-10"
                        style={{ color: colors.textMuted }}
                    >
                        A community-driven platform designed to empower students with the
                        <span className="font-semibold" style={{ color: colors.textMain }}>
                            {' '}
                            practical skills
                        </span>{' '}
                        needed for the modern professional world.
                    </p>

                    {/* Clean Action Buttons - Standard sizing and subtle styling */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/Login')}
                            className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] text-sm shadow-sm"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Get Started
                        </button>

                        <button
                            onClick={() => navigate('/contributors')}
                            className="px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-slate-50 border border-slate-200"
                            style={{ color: colors.textMain }}
                        >
                            View Contributors
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
