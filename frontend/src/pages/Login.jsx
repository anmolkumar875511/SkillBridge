import React, { useState } from 'react'
import axiosInstance from '../axiosInstance'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [state,setState] = useState("Sign Up")
    const [name, setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
          if(state === "Sign Up"){
            await axiosInstance.post("/register",{
              name,
              email,
              password,
            })
            setState("Login")
            navigate(`/Login`)
          }
          else{
            await axiosInstance.post("/login",{
              email,
              password
            })
            navigate(`/Dashboard/${name}`)
          }
        } catch (error) {
          console.log(error)
          alert(error.response.data.message || "Something Went Wrong")
        }
    }
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-5"
      >
        {/* Heading */}
        <p className="text-2xl font-bold text-center text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>

        {/* Name */}
        {state === "Sign Up" && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}

        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 from-blue-400 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Switch */}
        <p className="text-center text-gray-600 text-sm">
          {state === "Sign Up" ? "Already Have Account?" : "Don't Have Account?"}
          <span
            onClick={() =>
              setState(state === "Sign Up" ? "Login" : "Sign Up")
            }
            className="ml-2 text-blue-500 font-semibold cursor-pointer hover:underline"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>

    </div>
  )
}

export default Login
