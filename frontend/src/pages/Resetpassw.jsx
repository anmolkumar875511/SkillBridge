import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const Resetpassw = () => {
    const [newPassword, setPassword] = useState("")
    const [confpassword, setConfPassword] = useState("")
    const {token} = useParams()
    const navigate = useNavigate()

    const submithandler = async (e) =>{
        e.preventDefault()
        if(newPassword === confpassword){
            toast.promise(axiosInstance.post(`/user/reset-password/${token}`,{newPassword}),{
              loading: "Processing....",
              success: (res) =>{
                return "Your Password Has been changed Successfully"
              },
              error: (err) =>{
                console.log(err)
                return err.message
              }
            })   
        }
    }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    
    <form className="space-y-6" onSubmit={submithandler}>
      
      <p className="text-3xl font-semibold text-center text-gray-800">
        Reset Password
      </p>

      <p className="text-sm text-center text-gray-500">
        Enter your new password below to reset your account password.
      </p>

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your new password"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        required
      />

      <input
        type="password"
        value={confpassword}
        onChange={(e) => setConfPassword(e.target.value)}
        placeholder="Confirm your new password"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        required
      />

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition flex items-center justify-center"
      >
        Reset Password
      </button>

    </form>
  </div>
</div>

  )
}

export default Resetpassw
