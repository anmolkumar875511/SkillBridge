import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
    const {user} = useContext(AuthContext)
  return (
    <div>
       <h1>Hello {user.name}</h1>
    </div>
  )
}

export default Dashboard
