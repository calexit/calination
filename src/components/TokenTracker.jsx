import React from 'react'
import tokenChartImage from '../assets/token-tracker.png'

function TokenTracker() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[46px] md:text-[54px] font-bold text-[#133E76] text-center mb-8">
          Live Token Tracker
        </h2>
        
        <div className="flex justify-center mb-10">
          <div className="flex space-x-10 border-b border-gray-200 pb-2">
            <a href="#" className="text-[#FFB800] font-medium text-lg border-b-2 border-[#FFB800] pb-2">
              Uniswap
            </a>
            <a href="#" className="text-[#133E76] font-medium text-lg hover:text-[#FFB800]">
              Baseswap
            </a>
            <a href="#" className="text-[#133E76] font-medium text-lg hover:text-[#FFB800]">
              Whitepaper
            </a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg mb-8 border border-gray-200">
          <div className="relative">
            <img 
              src={tokenChartImage} 
              alt="CNT Token Price Chart" 
              className="w-full h-auto"
            />
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 z-10">
              <div className="bg-[#C68F00] text-white px-6 py-3 rounded-md font-medium text-center">
                CNT PRICE
              </div>
            </div>
            
            <div className="absolute left-1/2 bottom-8 -translate-x-1/2 z-10">
              <div className="bg-[#133E76] text-white px-8 py-4 rounded-md font-medium text-center">
                Market cap
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="text-[#133E76] font-semibold">Current Price</div>
            <div className="text-green-600 font-bold text-xl">$222.13 <span className="text-sm">+4.23%</span></div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="text-[#133E76] font-semibold">24h Volume</div>
            <div className="font-bold text-xl">$1.47M</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="text-[#133E76] font-semibold">Market Cap</div>
            <div className="font-bold text-xl">$32.5M</div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default TokenTracker 