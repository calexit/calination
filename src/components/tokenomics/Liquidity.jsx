import React from 'react';
import BuyCNTBtn from '../BuyCNTBtn';
function Liquidity() {
  // Data for the bullet points to enable mapping
  const trustBuildingPoints = [
    "Initial liquidity will be seeded on Uniswap/BaseSwap",
    "Liquidity pool will be locked for community confidence",
    "Ownership of the contract will be renounced",
    "Smart contracts will be verified on BaseScan",
  ];

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[61px]">
          <h2 className="text-[#133e76] text-4xl md:text-[54px] font-bold font-['Poppins',Helvetica] leading-[1.2] md:max-w-[586px]">
            Liquidity, Locks, And Trust-Building
          </h2>

          <div className="flex flex-col gap-4">
            {trustBuildingPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <div className="w-5 h-5 relative flex-shrink-0">
                  <img
                    className="w-[17px] h-[17px] absolute top-0.5 left-0.5"
                    alt="Check mark"
                    src={`https://c.animaapp.com/m9afjkrw6Ux2NE/img/group${index > 0 ? `-${index}` : ""}.png`}
                  />
                </div>
                <p className="text-[#133e76] text-lg font-semibold font-['Poppins',Helvetica] tracking-[0.18px] leading-[32.8px]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <BuyCNTBtn />

      </div>
    </section>
  );
}

export default Liquidity; 