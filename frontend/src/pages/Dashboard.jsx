import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import axiosInstance from '../axiosInstance.js'
import { useNavigate } from 'react-router-dom'
import ConfirmResume from './ConfirmResume.jsx'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [isContent, setIsContent] = useState(!!localStorage.getItem("lastResumeId"))
  const [resumeId, setResumeId] = useState(localStorage.getItem("lastResumeId") || "")

  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) {
      alert("Please Upload the pdf file to get roadmap")
      return
    }

    const formData = new FormData()
    formData.append("resume", file)

    try {
      const res = await axiosInstance.post("/resume/upload", formData)
      alert("Data Parsed Successfully!!")
      const id = res.data.data.resumeId
      setResumeId(id)
      setIsContent(true)

      localStorage.setItem("lastResumeId", id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    
  },[resumeId])

  return (
    <div className="min-h-[calc(100vh-8rem)] px-6 py-8 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Hello {user?.name}
          </h1>
          <h3 className="text-gray-600">
            Upload Pdf to Get Your Roadmap
          </h3>
          <button 
            onClick={() => setIsPromptOpen(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            + Upload New Resume
          </button>
        </div>

        {isPromptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
              
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Upload PDF</h2>
                <button onClick={() => setIsPromptOpen(false)} className="text-gray-400 hover:text-gray-800 text-2xl">&times;</button>
              </div>

              <div className="p-8 space-y-6">
                <div className="border-2 border-dashed border-indigo-100 bg-indigo-50/30 rounded-2xl p-8 text-center hover:border-indigo-300 transition-colors relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                       {/* Icon placeholder */}
                       ↑
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {file ? file.name : "Click to select or drag PDF here"}
                    </p>
                    <p className="text-xs text-gray-400">PDF files only (Max 5MB)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsPromptOpen(false)}
                    className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpload}
                    disabled={isUploading || !file}
                    className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:shadow-none transition-all"
                  >
                    {isUploading ? "Processing..." : "Confirm & Upload"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-indigo-50 file:text-indigo-600
                       hover:file:bg-indigo-100"
          />

          <button
            onClick={handleUpload}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white
                       hover:bg-indigo-700 transition"
          >
            Upload PDF
          </button>
        </div>

        <div className="space-y-4">
          <h1 className="text-lg font-medium text-gray-800">
            Your Parsed Data
          </h1>

          <div className="min-h-75 bg-white rounded-xl shadow-sm p-6">
            {isContent ? (
              <ConfirmResume key={resumeId} resumeId={resumeId} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                NO Content Is Available
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}


export default Dashboard
