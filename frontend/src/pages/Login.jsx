import React, { useState, useEffect } from 'react'
import axiosInstance from '../axiosInstance'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'sonner'

const Login = () => {
    const [state, setState] = useState("Sign Up"); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    
    // New Loading State
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { fetchUser, user } = useContext(AuthContext);

  useEffect(() => {
    // If the context updates and we have a user, leave this page immediately
    if (user) {
        if(user.role === "student"){
          navigate("/Dashboard", { replace: true });
        }
        else{
          navigate("/AdminDashboard", { replace: true })
        }   
    }
}, [user, navigate]);

    useEffect(() => {
        let interval;
        if (state === "Middle" && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [state, timer]);

    const resendotp = async () => {
        toast.promise(axiosInstance.post("/user/resend-otp", { email }),{
            loading: "OTP Resending....",
            success: (res) =>{
                setTimer(60)
                setCanResend(false)
                return "OTP Resent Successfully"
            },
            error: (err) =>{
                return "Failed to resend OTP"
            }
        })
    };

    const verifyemail = async (e) => {
        e.preventDefault();
        toast.promise(axiosInstance.post("/user/verify-email", { email, otp }),{
            loading: "Verifying Credential...",
            success: (res) =>{
                fetchUser()
                navigate(`/Dashboard`)
                setState("Login")
                return "Verification Successful"
            },
            error: (err) =>{
                 return "Invalid OTP"
            }
        })
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Processing...");
        try {
            if (state === "Sign Up") {
                await axiosInstance.post("/user/register", { name, email, password });
                setState("Middle"); 
                toast.success("OTP Sent To your Email",{id:toastId})
            } else {
                const response = await axiosInstance.post(
                    "/user/login",
                    { email, password },
                    { withCredentials: true }
                );
                const loggedInuser = response.data.data.user
                await fetchUser();
                toast.success("Login Successfully",{id:toastId , duration: 1000})
                
                if(loggedInuser.role === "student"){
                   navigate(`/Dashboard`);
                }
                else{
                  navigate("/AdminDashboard")
                }
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something Went Wrong",{id:toastId});
        } 
    };

     const colors = {
  blue: "#2A6FA8",      // lighter, softer blue
  orange: "#F6A04D",    // lighter orange
  lightBlue: "#e7f0f7"
};

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbfc] px-4 animate-fade-in">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-100 h-100 rounded-full opacity-[0.03]" style={{ backgroundColor: colors.blue }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-75 h-75 rounded-full opacity-[0.05]" style={{ backgroundColor: colors.orange }} />
      </div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 p-10 space-y-8 relative overflow-hidden border border-gray-100 z-10">
        
        {/* Top Brand Accent */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1" style={{ backgroundColor: colors.blue }} />
          <div className="flex-1" style={{ backgroundColor: colors.orange }} />
        </div>

        {state !== "Middle" ? (
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-gray-800">
                {state === "Sign Up" ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
                {state === "Sign Up" ? "Join the bridge to success" : "Login to your roadmap"}
              </p>
            </div>

            <div className="space-y-4">
              {state === "Sign Up" && (
                <div className="group">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                    style={{ color: colors.blue }}
                    required
                  />
                </div>
              )}

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                style={{ color: colors.blue }}
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                style={{ color: colors.blue }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 text-white font-black rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center tracking-wider"
              style={{ backgroundColor: colors.blue, boxShadow: `0 10px 20px -5px ${colors.blue}44` }}
            >
              {state === "Sign Up" ? "GET STARTED" : "LOGIN NOW"}
            </button>

            <div className="space-y-3 pt-2">
              <p className="text-center text-gray-500 text-sm font-medium">
                {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}
                <span
                  onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
                  className="ml-2 font-bold cursor-pointer hover:underline"
                  style={{ color: colors.orange }}
                >
                  {state === "Sign Up" ? "Login" : "Sign Up"}
                </span>
              </p>
              
              {state === "Login" && (
                <div className="text-center">
                  <span 
                    onClick={() => navigate("/forgetpassword")} 
                    className="text-xs font-bold uppercase tracking-tighter cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: colors.blue }}
                  >
                    Forgot Password?
                  </span>
                </div>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={verifyemail} className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.lightBlue }}>
                <svg className="w-8 h-8" style={{ color: colors.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-black text-gray-800 tracking-tight">Verify Email</p>
              <p className="text-sm text-gray-400 font-medium">We sent a 6-digit code to your inbox</p>
            </div>

            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="000000"
              className="w-full px-4 py-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl focus:outline-none focus:border-orange-400 text-center text-4xl font-black tracking-[1rem] transition-all"
              style={{ color: colors.blue }}
              required
            />

            <button
              type="submit"
              className="w-full py-4 text-white font-black rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: colors.orange, boxShadow: `0 10px 20px -5px ${colors.orange}44` }}
            >
              VERIFY & REGISTER
            </button>

            <div className="flex flex-col items-center justify-center space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest">
                  {timer > 0 ? `Resend available in ${timer}s` : "Didn't get the code?"}
                </span>
              </div>
              <button
                type="button"
                onClick={resendotp}
                disabled={!canResend}
                className={`text-sm font-black uppercase tracking-widest transition-all ${!canResend ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`}
                style={{ color: colors.blue }}
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}} />
    </div>
    );
};

export default Login
