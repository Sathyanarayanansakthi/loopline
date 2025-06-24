import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Loginpage';
import LandingPage from './pages/LandingPage';
import Signinpage from './pages/Signinpage';
import Dashboard from './pages/Dashboard';
import EmployeeData from './pages/EmployeeData';
import AddTeam from './pages/AddTeam';
import Technology from './components/Technology';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tech"element={<Technology/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<Signinpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-data" element={<EmployeeData />} />
        <Route path="/add-team" element={<AddTeam />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
