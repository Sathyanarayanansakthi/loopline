import React from 'react'
import LoginPage from './pages/Loginpage'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signinpage from './pages/Signinpage';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} /> 
  <Route path='signin' element={<Signinpage />} />
  <Route path='/dashboard' element={<Dashboard />} />
</Routes>
</BrowserRouter>
  )
}

export default App
