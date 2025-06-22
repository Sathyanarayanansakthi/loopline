import React from 'react'
import LoginPage from './pages/Loginpage'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
<BrowserRouter>
<Routes>
   <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} /> 
</Routes>
</BrowserRouter>
  )
}

export default App
