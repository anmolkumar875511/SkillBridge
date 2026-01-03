import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const fetchUser = async () =>{
        try {
            const res = await axiosInstance.get("/profile",{
                withCredentials: true,
            })
            setUser(res.data)
        } catch (error) {
            setUser(null)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
         fetchUser()
    },[])

    return(
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
