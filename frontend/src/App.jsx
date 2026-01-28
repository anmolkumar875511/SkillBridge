import { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import ConfirmResume from './pages/ConfirmResume.jsx';
import { Toaster } from 'sonner';
import Resume from './pages/Resume.jsx';
import Forgetpassw from './pages/Forgetpassw.jsx';
import Resetpassw from './pages/Resetpassw.jsx';
import Contact from './pages/Contact.jsx';
import Opportunities from './pages/Opportunities.jsx';
import Report from './pages/Report.jsx';
import Roadmap from './pages/Roadmap.jsx';
import CompletedRoadmap from './pages/CompletedRoadmap';
import Contributors from './pages/Contributors';
import Profile from './pages/Profile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Logger from './pages/Logger.jsx';
import AllUsers from './pages/AllUsers.jsx';
import AccountSuspended from './pages/AccountSuspended.jsx';
import SetTarget from './pages/SetTarget.jsx';
import { theme } from './theme';

function App() {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: theme.colors.bgLight }}
        >
            <Navbar />
            <Toaster duration={2000} richColors position="top-center" />
            <main className="no-scrollbar overflow-y-auto h-screen pt-30">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/forgetpassword" element={<Forgetpassw />} />
                    <Route path="/reset-password/:token" element={<Resetpassw />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contributors" element={<Contributors />} />
                    <Route path="/account-suspended" element={<AccountSuspended />} />
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/AdminDashboard" element={<AdminDashboard />} />
                        <Route path="/logger" element={<Logger />} />
                        <Route path="/users" element={<AllUsers />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Resume" element={<Resume />} />
                        <Route path="/Opportunities" element={<Opportunities />} />
                        <Route path="/analyze/:opportunityId" element={<Report />} />
                        <Route path="/roadmap/:id" element={<Roadmap />} />
                        <Route path="/set-target" element={<SetTarget />} />
                        <Route path="/complete_roadmap" element={<CompletedRoadmap />} />
                        <Route path="/Profile" element={<Profile />} />
                    </Route>
                </Routes>
                <Footer />
            </main>
        </div>
    );
}

export default App;
