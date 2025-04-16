import React from 'react'
import parachuteIcon from '../assets/parachute-icon.svg'
import handshakeIcon from '../assets/handshake-icon.png' 
import capIcon from '../assets/cap-icon.png'
import networkIcon from '../assets/network-icon.png'
import rocketIcon from '../assets/rocket-icon.png'

// Import the same URL used in the BuyCNTBtn component
const uniswapUrl = "https://app.uniswap.org/explore/pools/base/0x086c01cd7891e8aed5fd27c01dcca6081b30318203aec3474c47464c030d9492";

function Benefits() {
  const benefitsList = [
    {
      id: 1, 
      title: "Backed by Real Assets", 
      description: "Linked to mineral-rich mines (lithium, cobalt, gold)",
      icon: parachuteIcon
    },
    {
      id: 2, 
      title: "Supports Real Causes", 
      description: "Veterans, housing, fire victims, education, and more",
      icon: handshakeIcon
    },
    {
      id: 3, 
      title: "Unlocks Access", 
      description: "Claim NFTs, vote on initiatives, attend IRL + digital events",
      icon: capIcon
    },
    {
      id: 4, 
      title: "Invested in the People", 
      description: "Every token supports change, community, and equity",
      icon: networkIcon
    }
  ]

  // Function to handle opening the Uniswap URL in a new tab
  const handleOpenUniswap = () => {
    window.open(uniswapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-gray-50 rounded-2xl">
      <div className="container mx-auto px-4">
        <h2 className="text-[46px] md:text-[54px] font-semibold text-[#133E76] text-center mb-16">
          Benefits Of CNT
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefitsList.map(benefit => (
            <div 
              key={benefit.id} 
              className="bg-[#133E76] text-white p-8 rounded-xl flex flex-col items-center text-center h-[270px]"
            >
              <img 
                src={benefit.icon} 
                alt={benefit.title} 
                className="w-16 h-16 mb-6 object-contain"
              />
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button 
            onClick={handleOpenUniswap}
            className="bg-[#133E76] text-white px-12 py-4 rounded-lg font-medium inline-flex items-center hover:bg-[#2b4d8a] transition"
          >
            <img src={rocketIcon} alt="Rocket" className="w-5 h-5 mr-2" style={{ filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" }} />
            Claim your CNT
          </button>
        </div>
      </div>
    </section>
  )
}

export default Benefits 