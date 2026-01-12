import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'


const Dashboard = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
       <h1 className="text-2xl font-semibold text-gray-800">
            Hello {user.name}       
          </h1>
    </div>
  )
}


export default Dashboard
