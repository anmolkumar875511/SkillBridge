import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'

const Forgetpassw = () => {
    const [email,setEmail] = useState("")
    const navigate = useNavigate()
    const submithandler = async (e) =>{
        e.preventDefault()
        try {
         await axiosInstance.post("/user/forgot-password",{email})
         alert("Reset Password Link sent to Your email")
         navigate("/")
        } catch (error) {
            alert("Error Occured")
        }
         
    }
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 px-4">
  <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
    
    <p className="text-3xl font-semibold text-center text-gray-800">
      Forgot Password
    </p>

    <p className="text-sm text-center text-gray-500">
      Enter your registered email address and we’ll send you a reset link.
    </p>

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      required
    />

    <button
      type="submit"
      className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.98] transition"
    >
      Send Reset Link
    </button>

  </form>
</div>

  )
}

export default Forgetpassw
