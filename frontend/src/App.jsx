import { useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

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
          <Route >
          <Route path='/Dashboard/:username' element={<Dashboard/>}/>
          </Route>


        </Routes>
        <Footer />
      </main>
    </div>
  )
}

export default App
