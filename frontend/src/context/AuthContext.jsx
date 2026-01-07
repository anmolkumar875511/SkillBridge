import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const fetchUser = async () =>{
        try {
            const res = await axiosInstance.get("/user/profile",{
                withCredentials: true,
            })
            console.log("Fetched User:", res.data.data.user);
            setUser(res.data.data.user)
        } catch (error) {
            setUser(null)
        } finally{
            setLoading(false)
        }
    }

   

    useEffect(()=>{
         fetchUser()
    },[])

    return (
    <AuthContext.Provider value={{ user, loading, fetchUser, setUser }}>
        {children}
    </AuthContext.Provider>
    )
}
