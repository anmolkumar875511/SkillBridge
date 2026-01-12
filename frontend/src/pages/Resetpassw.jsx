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

     const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-[#fafbfc] px-4 animate-fade-in">
      {/* Decorative Brand Blurs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ backgroundColor: colors.blue }} />
        <div className="absolute bottom-[10%] left-[-10%] w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: colors.orange }} />
      </div>

      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 relative overflow-hidden border border-gray-100">
        
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
          <div className="flex-1" style={{ backgroundColor: colors.blue }} />
          <div className="flex-1" style={{ backgroundColor: colors.orange }} />
        </div>

        <form className="space-y-8" onSubmit={submithandler}>
          
          {/* Header Section */}
          <div className="text-center space-y-3">
            <div 
              className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-inner mb-2"
              style={{ backgroundColor: colors.lightBlue }}
            >
              <svg className="w-8 h-8" style={{ color: colors.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight text-gray-800">
              Reset Password
            </h2>
            <p className="text-sm text-gray-400 font-medium leading-relaxed uppercase tracking-tighter">
              Secure your account with a <span style={{ color: colors.orange }}>new password</span>.
            </p>
          </div>

          {/* Input Group */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-gray-400">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                style={{ color: colors.blue }}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-gray-400">Confirm Password</label>
              <input
                type="password"
                value={confpassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                style={{ color: colors.blue }}
                required
              />
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-4 text-white font-black rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] tracking-widest flex items-center justify-center group"
            style={{ 
              backgroundColor: colors.blue,
              boxShadow: `0 10px 25px -5px ${colors.blue}44`
            }}
          >
            UPDATE PASSWORD
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>

        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}} />
    </div>

  )
}

export default Resetpassw
