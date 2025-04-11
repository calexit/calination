import React from "react";
import BuyCNTBtn from "../BuyCNTBtn";
function NFTUtility() {
  const nftUtilities = [
    {
      icon: "🎟️",
      text: "Tickets to live Calexit events",
    },
    {
      icon: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/feature-icons-1.svg",
      text: "Future staking or member-only areas",
    },
    {
      icon: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/feature-icons.svg",
      text: "Voting rights on key initiatives",
    },
    {
      icon: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/feature-icons-3.svg",
      text: "Claimable collectibles tied to Cali culture",
    },
    {
      icon: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/feature-icons-2.svg",
      text: "Access to contests like Ms. CaliNation",
    },
  ];

  return (
    <section className="w-full py-20 px-0 md:px-0 bg-[#fbfaf9]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h2 className="font-['Poppins',Helvetica] font-bold text-[#133e76] text-[36px] sm:text-[44px] md:text-[54px] leading-[1.2] md:leading-[64.8px] mb-4">
              NFT Utility
            </h2>
            <h3 className="font-['Poppins',Helvetica] font-normal text-black text-xl sm:text-2xl leading-[28.8px] mb-8">
              NFTs With Real Utility And Cultural Value
            </h3>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 md:items-start">
            <div className="md:pl-0 flex-1 relative">
              <img
                src="https://c.animaapp.com/m9afjkrw6Ux2NE/img/feature-image.svg"
                alt="NFT Utility"
                className="w-full h-auto max-w-[435px]"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-[#c58e00] opacity-30 rounded-[10.52px] transform rotate-[9.24deg] -z-10"></div>
            </div>
            <div className="flex-1">
              <p className="font-['Poppins',Helvetica] font-normal text-black text-base leading-[22.8px] mb-8">
                CNT unlocks access to exclusive NFT drops that function as more
                than just digital art. Holders may receive:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {nftUtilities.map((utility, index) => (
                  <div
                    key={index}
                    className="bg-[#133e76] rounded-[10.52px] border border-[#ffb8001a] p-4 flex flex-col items-center text-center"
                  >
                    {utility.icon.startsWith("http") ? (
                      <img
                        src={utility.icon}
                        alt=""
                        className="w-11 h-11 mb-4"
                      />
                    ) : (
                      <span className="text-4xl mb-4">{utility.icon}</span>
                    )}
                    <p className="font-['Poppins',Helvetica] font-medium text-white text-xs leading-[17.1px]">
                      {utility.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <BuyCNTBtn />

      </div>
    </section>
  );
}

export default NFTUtility;
