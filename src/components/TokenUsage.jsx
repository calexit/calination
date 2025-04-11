import React from 'react'
import stakingIcon from '../assets/staking-icon.png'
import vipEventsIcon from '../assets/vip-events-icon.png'
import mediaFundingIcon from '../assets/media-funding-icon.png'
import merchIcon from '../assets/merch-icon.png'
import governanceIcon from '../assets/governance-icon.png'
import moreIcon from '../assets/more-icon.png'
import BuyCNTBtn from './BuyCNTBtn'
function TokenUsage() {
  const useCases = [
    { 
      id: 1, 
      title: "Stake CNT To Earn Rewards", 
      icon: stakingIcon 
    },
    { 
      id: 2, 
      title: "Access VIP Events, Including The Ms. CaliNation Pageant", 
      icon: vipEventsIcon 
    },
    { 
      id: 3, 
      title: "Fund Calexit Media Like Docuseries & Feature Films", 
      icon: mediaFundingIcon 
    },
    { 
      id: 4, 
      title: "Purchase Calexit-Branded Merch & NFTs", 
      icon: merchIcon 
    },
    { 
      id: 5, 
      title: "Vote On Calexit Governance Proposals", 
      icon: governanceIcon 
    },
    { 
      id: 6, 
      title: "We Can Add Here More", 
      icon: moreIcon 
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[46px] md:text-[54px] font-bold text-[#133E76] text-center mb-16">
          What Can You Do With CNT?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
          {useCases.map(useCase => (
            <div key={useCase.id} className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-b from-[#FFB8001A] to-[#FFB800B2] p-6 rounded-full w-[170px] h-[170px] flex items-center justify-center mb-5 shadow-md">
                <div className="rounded-full w-[95px] h-[95px] flex items-center justify-center">
                  <img src={useCase.icon} alt={useCase.title} className="w-[95px] h-[95px] object-contain" />
                </div>
              </div>
              <h3 className="text-sm md:text-[14px] font-medium text-[#133E76] max-w-[200px]">{useCase.title}</h3>
            </div>
          ))}
        </div>
        <BuyCNTBtn />
      </div>
    </section>
  )
}

export default TokenUsage 