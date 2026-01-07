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
        </div>

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
