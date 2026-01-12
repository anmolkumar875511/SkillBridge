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
    const { fetchUser } = useContext(AuthContext);

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
                return "Verification Successful"
            },
            error: (err) =>{
                 return "Invalid OTP"
            }
        })
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (state === "Sign Up") {
                await axiosInstance.post("/user/register", { name, email, password });
                setState("Middle"); 
                toast.success("OTP Sent To your Email")
            } else {
                await axiosInstance.post(
                    "/user/login",
                    { email, password },
                    { withCredentials: true }
                );
                await fetchUser();
                toast.success("Login Successfully")
                navigate(`/Dashboard`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something Went Wrong");
        } 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-5 relative overflow-hidden">
                
                {/* Visual Loading Bar at the top of the card */}
                

                {state !== "Middle" ? (
                    <form onSubmit={submitHandler} className="space-y-5">
                        <p className="text-2xl font-bold text-center text-gray-800">
                            {state === "Sign Up" ? "Create Account" : "Login"}
                        </p>

                        {state === "Sign Up" && (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50"
                                required
                                disabled={loading}
                            />
                        )}

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50"
                            required
                            disabled={loading}
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50"
                            required
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-white bg-blue-600 font-semibold rounded-lg transition flex items-center justify-center`}
                        >
                            {state === "Sign Up" ? "Create Account" : "Login"}
                        </button>

                        <p className="text-center text-gray-600 text-sm">
                            {state === "Sign Up" ? "Already Have Account?" : "Don't Have Account?"}
                            <span
                                onClick={() =>  setState(state === "Sign Up" ? "Login" : "Sign Up")}
                                className={`ml-2 font-semibold cursor-pointer hover:underline text-blue-500`}
                            >
                                {state === "Sign Up" ? "Login" : "Sign Up"}
                            </span>
                            {state === "Login"? <span onClick={()=> navigate("/forgetpassword")} className='ml-2 font-semibold cursor-pointer hover:underline text-blue-500'>
                                Forget Password?
                            </span> : <span></span>}    
                        </p>
                    </form>
                ) : (
                    <form onSubmit={verifyemail} className="space-y-5">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">Verify Email</p>
                            <p className="text-sm text-gray-500 mt-2">Enter the 6-digit code sent to your email</p>
                        </div>

                        <input
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="000000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-center text-2xl tracking-widest disabled:bg-gray-50"
                            required
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            className={`w-full py-3 text-white font-semibold rounded-lg transition flex items-center justify-center`}
                        >
                            Verify & Register
                        </button>

                        <div className="flex items-center justify-between text-sm">
                            <p className="text-gray-600">
                                {timer > 0 ? `Resend in ${timer}s` : "Didn't get code?"}
                            </p>
                            <button
                                type="button"
                                onClick={resendotp}
                                disabled={!canResend}
                                className={`font-semibold`}
                            >
                                Resend OTP
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login
