import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import axiosInstance from '../axiosInstance.js'
import { useNavigate } from 'react-router-dom'
import ConfirmResume from './ConfirmResume.jsx'

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const [isContent,setIsContent] = useState(false)
    const navigate = useNavigate()
    const handleUpload = async () =>{
      if(!file){
        alert("Please Upload the pdf file to get roadmap")
        return
      }
      const formData = new FormData()
      formData.append("resume",file)
      
      try {
        const res = await axiosInstance.post("/resume/upload", formData);
        alert('Data Parsed Successfully!!')
        setIsContent(true)
      } catch (error) {
        console.log(error)
      }

    }

  return (
    <div>
       <h1>Hello {user?.name}</h1>
       <h3>Upload Pdf to Get Your Roadmap</h3>
       <input type="file" accept="application/pdf" onChange={(e)=>{setFile(e.target.files[0])}} />
       <button onClick={handleUpload}>Upload PDF</button>
       <h3>Your Parsed Data</h3>
       {isContent ? <ConfirmResume/> : <div> NO Content Is Available</div>}
    </div>
  )
}

export default Dashboard
