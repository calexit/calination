import React from "react";
import BuyCNTBtn from "../BuyCNTBtn";
function TokenomicsHero() {
  return (
    <section className="relative min-h-[500px] md:h-[644px] bg-[#133E76] text-white py-12 md:py-16 [background:linear-gradient(180deg,rgba(198,143,0,0.7)_0%,rgba(5,53,99,0.7)_100%),url(https://c.animaapp.com/m9afjkrw6Ux2NE/img/image-placeholder.png)_50%_50%_/_cover]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full gap-8">
          <div className="max-w-full md:max-w-[948px] order-2 md:order-1">
            <h1 className="text-[36px] sm:text-[46px] md:text-[70px] leading-[1.2] md:leading-[82px] font-bold mb-6 md:mb-8">
              The Utility-Powered Token for a Decentralized California
            </h1>
            <p className="text-sm md:text-[20px] mb-6 md:mb-8 opacity-90">
              The CaliNation Token (CNT) is an EVM-based utility token created
              to fund and empower the Calexit movement. Backed by ownership in
              real-world mineral mines and tied to social causes, CNT is more
              than just crypto — it's a tool for sovereignty, empowerment, and
              economic freedom.
            </p>

            <BuyCNTBtn />

          </div>
          <div className="flex justify-center order-1 md:order-2">
            <img
              className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[425px] md:h-[426px] object-contain"
              alt="Calination"
              src="https://c.animaapp.com/m9afjkrw6Ux2NE/img/calination-1--1--2.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TokenomicsHero;
