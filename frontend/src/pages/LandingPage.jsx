import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import Technology from '../components/Technology'

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <Technology />
      <Footer />
    </div>
  )
}

export default LandingPage
