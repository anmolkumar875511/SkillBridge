import { useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import ConfirmResume from './pages/ConfirmResume.jsx'
import Resume from './pages/Resume.jsx'

function App() {
  return (
    <div>
      <Navbar />
      <main className="no-scrollbar overflow-y-auto h-screen pt-30">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute/>}>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/Resume' element={<Resume/>}/>
          </Route>


        </Routes>
        <Footer />
      </main>
    </div>
  )
}

export default App
