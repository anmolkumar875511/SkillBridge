import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  return (
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-40">
      {/* Container with a soft gradient that matches the logo colors */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#dcfce7] flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 md:py-20 shadow-sm border border-white/50">
        
        {/* ----- Left Side: Text Content ----- */}
        <div className="md:w-3/5 flex flex-col items-start gap-6 z-10 text-left">
          <div className="space-y-2">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
              Welcome to SkillBridge
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-800">
              Upskill Yourself <br /> 
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-teal-500">
                And Grow Together.
              </span>
            </h1>
          </div>

          <p className="text-slate-600 text-lg max-w-md leading-relaxed">
            Join the community of students bridgeing the gap between learning and real-world skills.
          </p>

          <button
            onClick={() => navigate("/Login")}
            className="group relative flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:bg-slate-800 hover:shadow-2xl transition-all duration-300 active:scale-95"
          >
            Getting Started
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>


        {/* Decorative Shapes for Modular Feel */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default Banner
