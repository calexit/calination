import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import TokenIntro from './components/TokenIntro'
import UseCases from './components/UseCases'
import WhatIsCalexit from './components/WhatIsCalexit'
import VitalCauses from './components/VitalCauses'
import TokenUsage from './components/TokenUsage'
import Benefits from './components/Benefits'
import TokenTracker from './components/TokenTracker'
import Footer from './components/Footer'
import Tokenomics from './pages/Tokenomics'
import ClaimNFT from './pages/ClaimPage'

function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-[88px]">
        <Hero />
        <TokenIntro />
        <UseCases />
        <WhatIsCalexit />
        <VitalCauses />
        <TokenUsage />
        <Benefits />
        <TokenTracker />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="font-[Poppins]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path='/claim' element={<ClaimNFT />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
