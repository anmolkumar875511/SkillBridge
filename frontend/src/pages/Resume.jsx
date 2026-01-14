import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import axiosInstance from '../axiosInstance.js'
import { useNavigate } from 'react-router-dom'
import ConfirmResume from './ConfirmResume.jsx'
import { toast } from 'sonner'

const Resume = () => {
  const { user } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [isContent, setIsContent] = useState(!!localStorage.getItem("lastResumeId"))
  const [resumeId, setResumeId] = useState(localStorage.getItem("lastResumeId") || "")
  const [loading, setLoading] = useState(false)

  

  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please Upload the pdf file to get roadmap")
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append("resume", file)


    toast.promise(axiosInstance.post("/resume/upload", formData),{
      loading: "Parsing Your Resume...",
      success: (res) => {
         const id = res.data.data.resumeId
         setResumeId(id)
         setIsContent(true)
         localStorage.setItem("lastResumeId", id);
         return "Resume Parsed successfully!"
      },
      error: (err) =>{
        if (err.status === 500){
           return "Please Check Your Resume Format"
        }
        return "Something went wrong Please try again"
      }
    })
  }

  useEffect(()=>{
    
  },[resumeId])

  const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

  return (



    <div className="min-h-screen px-6 py-12 bg-[#fafbfc] animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Welcome Header */}
        <div className="relative pl-6 border-l-4" style={{ borderColor: colors.orange }}>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            Hello, <span style={{ color: colors.blue }}>{user?.name || 'Explorer'}</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">
            Upload your PDF to generate your personalized <span className="text-gray-800 font-bold">Career Roadmap</span>.
          </p>
        </div>

        {/* Upload Portal Card */}
        <div className="group relative bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-10 border border-gray-100 overflow-hidden transition-all hover:shadow-blue-900/10">
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 opacity-[0.03] pointer-events-none" style={{ backgroundColor: colors.blue, borderRadius: '100%' }} />
          
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Animated Icon Container */}
            <div 
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-inner animate-bounce-slow"
              style={{ backgroundColor: colors.lightBlue }}
            >
              <svg className="w-10 h-10" style={{ color: colors.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-gray-800">Drop your resume here</h2>
              <p className="text-sm text-gray-400">Only PDF files are supported for best parsing results</p>
            </div>

            {/* Hidden Input with Custom Label Styling */}
            <div className="w-full max-w-md relative">
              <input
                type="file"
                accept="application/pdf"
                id="file-upload"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <label 
                htmlFor="file-upload"
                className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition-all group"
              >
                <span className={`text-sm font-semibold truncate pr-4 ${file ? 'text-gray-900' : 'text-gray-500 group-hover:text-orange-600'}`}>
                  {file ? file.name : "Select Resume File..."}
                </span>
                <span className="px-3 py-1 text-xs font-bold text-white rounded-lg" style={{ backgroundColor: colors.blue }}>BROWSE</span>
              </label>
            </div>

            {/* Action Button */}
            <button
              onClick={handleUpload}
              className="px-10 py-4 rounded-2xl font-black text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              style={{ background: `linear-gradient(135deg, ${colors.orange}, #ea580c)` }}
            >
              UPLOAD PDF
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>

        {/* Data Display Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black tracking-tight" style={{ color: colors.blue }}>
              Your Parsed Data
            </h1>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="min-h-100 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 border border-gray-50 relative overflow-hidden">
            {isContent ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ConfirmResume key={resumeId} resumeId={resumeId} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4 py-20">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
                   <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Waiting for Upload</p>
                  <p className="text-gray-300 text-sm italic">"Your roadmap starts here..."</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
      `}} />
    </div>
  )
}

export default Resume
