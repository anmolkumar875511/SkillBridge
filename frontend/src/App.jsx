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
import {Toaster} from 'sonner'
import Resume from './pages/Resume.jsx'
import Forgetpassw from './pages/Forgetpassw.jsx'
import Resetpassw from './pages/Resetpassw.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <div>
      <Navbar />
      <Toaster richColors position="top-center" />
      <main className="no-scrollbar overflow-y-auto h-screen pt-30">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgetpassword" element={<Forgetpassw/>}/>
          <Route path='/reset-password/:token' element={<Resetpassw/>} />
          <Route path='/contact' element={<Contact/>} />
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
