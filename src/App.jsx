import { useState } from 'react'
import './App.css'
import './index.css'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { Route, Routes } from 'react-router-dom'
import SeekerLayout from './layouts/SeekerLayout'
import SeekerDashboard from './pages/Seeker/Dashboard'
import ProviderDashboard from './pages/Provider/Dashboard'
import ProviderLayout from './layouts/ProviderLayout'
import LandingPage from './pages/Landing/LandingPage'
import Opportunities from './pages/Provider/Opportunities'
import CreateOpportunity from './pages/Provider/CreateOpportunity'
import Profile from './pages/Provider/Profile'
import SeekerOpportunities from './pages/Seeker/Opportunities'
import Applications from './pages/Seeker/Applications'
import SeekerProfile from './pages/Seeker/Profile'
import TestChat from './pages/Testchat'
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <>
      <div className="">
        <Routes>
           {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        

        {/* Provider Routes */}
      <Route element={<ProviderLayout />}>
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/opportunities" element={<Opportunities />} />
        <Route path="/provider/create-opportunity" element={<CreateOpportunity />} />
        <Route path="/provider/profile" element={<Profile />} />
      </Route>

      {/* Seeker Routes */}
      <Route element={<SeekerLayout />}>
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} /> 
        <Route path="/seeker/opportunities" element={<SeekerOpportunities />} />
        <Route path="/seeker/applications" element={<Applications />} />
        <Route path="/seeker/profile" element={<SeekerProfile/>} />
      </Route>


         <Route path="/chat" element={<TestChat />} />
         
         <Route path="*" element={<PageNotFound />} /> 

      </Routes>
      </div>
    </>
  )
}

export default App
