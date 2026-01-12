import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7",
  slate: "#1e293b"
};

  return (
   <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 mt-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(17,87,147,0.08)]">
        
        {/* Subtle Brand Accents in corners */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full" style={{ backgroundColor: colors.orange }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5 rounded-tr-full" style={{ backgroundColor: colors.blue }} />

        <div className="flex flex-col items-center text-center px-8 py-20 md:py-28 space-y-8">
          
          {/* Tagline */}
          <p className="text-sm font-black uppercase tracking-[0.3em]" style={{ color: colors.orange }}>
            Bridge The Gap
          </p>

          {/* Main Headline - Clean & Bold */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight max-w-4xl" style={{ color: colors.slate }}>
            Upskill Yourself <br className="hidden md:block" />
            <span style={{ color: colors.blue }}>And Grow Together.</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
            A community-driven platform designed to empower students with the <span className="font-semibold text-gray-800">practical skills</span> needed for the modern professional world.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <button
              onClick={() => navigate("/Login")}
              className="px-12 py-5 rounded-2xl font-black text-white shadow-xl transition-all duration-300 hover:brightness-110 active:scale-[0.98] tracking-widest text-sm"
              style={{ 
                backgroundColor: colors.blue,
                boxShadow: `0 15px 30px -10px ${colors.blue}66`
              }}
            >
              GET STARTED
            </button>

            <button 
              onClick={() => navigate("/contributors")}
              className="group flex items-center gap-2 font-bold text-sm tracking-widest transition-all"
              style={{ color: colors.slate }}
            >
              VIEW CONTRIBUTORS
              <span className="w-8 h-0.5 transition-all group-hover:w-12" style={{ backgroundColor: colors.orange }} />
            </button>
          </div>
        </div>

        {/* Bottom Branding Stripe */}
        <div className="w-full h-2 flex">
          <div className="flex-1" style={{ backgroundColor: colors.blue }} />
          <div className="flex-1" style={{ backgroundColor: colors.orange }} />
        </div>
      </div>
    </div>
  )
}

export default Banner