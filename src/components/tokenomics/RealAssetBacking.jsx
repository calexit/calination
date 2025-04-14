import React from 'react';

function RealAssetBacking() {
  return (
    <section className="w-full py-12">
      <div className="w-full bg-[url(https://c.animaapp.com/m9afjkrw6Ux2NE/img/mask-group.png)] bg-cover md:bg-cover bg-center py-16 px-8 rounded-[50px] max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="font-['Poppins',Helvetica] font-bold text-white text-[46px] md:text-[54px] leading-tight">
            Real Asset Backing
          </h2>

          <h3 className="font-['Poppins',Helvetica] text-white text-[16px] md:text-[24px] leading-[28.8px]">
            What Gives CNT Real-World Value?
          </h3>

          <p className="font-['Poppins',Helvetica] font-bold text-white text-base leading-[23px] max-w-[950px]">
            CaliNation Token (CNT) is backed by a powerful portfolio of real-world assets, delivering unmatched trust, stability, and long-term value.
          </p>

          <div className="font-['Poppins',Helvetica] text-base leading-[23px] text-center max-w-[950px]">
            <p>
              <span className="font-bold text-[#c58e00]">
              aCNT is anchored by its
              </span>
              <span className="text-white">
                {" "}ownership in mineral-rich mines in the Congo, with confirmed reserves of lithium, cobalt, and rare earth elements — critical resources driving the tech, EV, and energy sectors.
              </span>
            </p>
            <p className="text-white text-[14px]">
              Beyond mining, <span className="font-bold text-[#e2a216]">CNT is also supported by:</span>
            </p>

            <div className="text-white space-y-0 flex flex-col items-center text-[14px]">
              <p className="flex items-center justify-center">
                • Prime real estate acquisitions and development projects
              </p>
              <p className="flex items-center justify-center">
                • An extensive content and intellectual property (IP) library
              </p>
              <p className="flex items-center justify-center">
                • Gaming, apps, and digital platforms with mass-market potential
              </p>
              <p className="flex items-center justify-center">
                • Live events, competitions, and exclusive talent IP
              </p>
              <p className="flex items-center justify-center">
                • NFT-funded luxury assets including hotels, yachts, and jets
              </p>
              <p className="flex items-center justify-center">
               • Innovative infrastructure projects using 3D concrete printing
              </p>
            </div>

            <p className="mt-2 text-[14px]">
              <span className="text-[#c58e00] font-medium">
                The relaunched Fungy NFT Marketplace
              </span>
              <span className="text-white">
                , now built around real-world utility and digital ownership
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-left md:text-center text-[20px] max-w-5xl mx-auto mt-6 font-bold italic font-['Poppins',Helvetica] px-4">
        This diverse asset foundation transforms CNT from a speculative token into a true digital currency backed by real-world value, innovation, and cultural impact —<br /> built to power the Calexit movement and a decentralized future.
      </p>
    </section>
  );
}

export default RealAssetBacking; 