import React from "react";
import BuyCNTBtn from "./BuyCNTBtn";
function UseCases() {
  const usesCases = [
    {
      id: 1,
      title: "Mining & Natural Resource Assets"
    },
    {
      id: 2,
      title: "Intellectual Property (IP) & An Extensive Content Library"
    },
    {
      id: 3,
      title: "Real Estate Acquisitions"
    },
    {
      id: 4, 
      title: "Gaming, Mobile Apps, & Digital Platforms"
    },
    {
      id: 5,
      title: "Events, Competitions, And Exclusive Talent IP"
    },
    {
      id: 6,
      title: "3D Concrete Printing And Infrastructure Projects"
    }
  ];

  const bottomRowItems = [
    {
      id: 7,
      title: "NFT-Funded Luxury Assets Including Hotels, Jets, And Yachts"
    },
    {
      id: 8,
      title: "NFT Marketplace With Utility-Backed NFTs"
    }
  ];

  return (
    <section className="py-8 md:pb-10 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* First 6 cards in 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
          {usesCases.map((useCase) => (
            <div 
              key={useCase.id} 
              className="bg-[#FBFAF9] border border-gray-200 rounded-lg py-8 px-6 flex items-center justify-center shadow-sm"
              style={{ minHeight: "120px" }}
            >
              <h3 className="text-base md:text-xl font-bold text-center">
                {useCase.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom row with 2 wide cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {bottomRowItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#FBFAF9] border border-gray-200 rounded-lg py-8 px-6 flex items-center justify-center shadow-sm"
              style={{ minHeight: "120px" }}
            >
              <h3 className="text-base md:text-xl font-bold text-center">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        <BuyCNTBtn />

      </div>
    </section>
  );
}

export default UseCases; 