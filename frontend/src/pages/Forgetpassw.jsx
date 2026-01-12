import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Forgetpassw = () => {
    const [email,setEmail] = useState("")
    const navigate = useNavigate()
    const submithandler = async (e) =>{
        e.preventDefault()
        toast.promise(axiosInstance.post("/user/forgot-password",{email}),{
          loading: "Checking Crendentials...",
          success: (res) =>{
              return "Reset Password Link Sent To Your Email"
          },
          error: (err) =>{
            return "Error Occured"
          }
        })   
    }
 const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-[#fafbfc] px-4 animate-fade-in">
      {/* Decorative Background Blur */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <form 
        onSubmit={submithandler} 
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 space-y-8 relative overflow-hidden border border-gray-100 z-10"
      >
        {/* Branding Stripe */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
          <div className="flex-1" style={{ backgroundColor: colors.blue }} />
          <div className="flex-1" style={{ backgroundColor: colors.orange }} />
        </div>

        {/* Icon & Header */}
        <div className="text-center space-y-3">
          <div 
            className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-inner mb-4"
            style={{ backgroundColor: colors.lightBlue }}
          >
            <svg className="w-8 h-8" style={{ color: colors.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-black tracking-tight text-gray-800">
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-62.5 mx-auto uppercase tracking-tighter">
            Enter your registered email and we’ll send you a <span style={{ color: colors.orange }}>reset link</span>.
          </p>
        </div>

        {/* Input Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-gray-400">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. name@company.com"
            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all text-gray-800"
            style={{ color: colors.blue }}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full py-4 text-white font-black rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] tracking-widest flex items-center justify-center gap-2"
            style={{ 
                backgroundColor: colors.blue, 
                boxShadow: `0 10px 20px -5px ${colors.blue}44` 
            }}
          >
            SEND RESET LINK
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Back to Login link */}
          <div className="text-center">
            <button 
              type="button"
              onClick={() => window.history.back()}
              className="text-xs font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
              style={{ color: colors.orange }}
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { 
            from { opacity: 0; transform: translateY(15px); } 
            to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
      `}} />
    </div>
  );
}

export default Forgetpassw
