import React from "react";
import digitalAssets from "../assets/digital-assets.png";

function TokenIntro() {
  return (
    <section className="pt-10 pb-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-left md:text-center mb-8">
          <h2 className="text-[34px] md:text-[54px] font-bold text-[#133E76] mb-3">
            CNT Token Intro
          </h2>
          <p className="block md:hidden text-[20px] font-medium text-[#C68F00]">
            Fueling Social Change, One Token at a Time
          </p>
          <p className="hidden md:block text-[24px] font-medium text-[#C68F00]">
            The CaliNation Token (CNT) Isn't Just Crypto — It's A Purpose-Driven
            Digital Asset
          </p>
        </div>

        <div className="max-w-7xl mx-auto bg-[#FBFAF9] border-b drop-shadow-sm border-b-gray-200 rounded-lg overflow-hidden">
          <div className="flex">
            <div className="flex flex-col justify-end md:w-2/3 md:p-10">
              <h3 className="text-[20px] md:text-2xl font-medium md:font-semibold text-[#00194B] mb-5">
                Token Introduction
              </h3>
              <p className="block md:hidden text-[#00194B] font-medium mb-5 text-[16px] leading-relaxed">
                CaliNation blends blockchain innovation with tangible value,
                giving holders real-world utility, ownership opportunities, and
                long-term growth potential.
              </p>
              <p className="hidden md:block text-[#00194B] font-medium mb-5 text-[16px] leading-relaxed">
                CaliNation blends blockchain innovation with tangible value,
                giving holders real-world utility, ownership opportunities, and
                long-term growth potential.
              </p>
              <p className="block md:hidden text-[#00194B] text-[16px] leading-relaxed">
                Fueling Social Change, One Token at a Timehe CaliNation Token
                (CNT) isn’t just crypto — it’s a purpose-driven digital
                asset.<br />Backed by real-world resources, including 3 mines in the
                Congo, and tied to social reform, CNT fuels the Calexit
                initiative, grassroots empowerment, and a next-gen digital
                economy rooted in California values.
              </p>
              <p className="hidden md:block text-[#00194B] text-[16px] leading-relaxed">
                The CNT is a real-world asset-backed digital currency designed
                to fuel a new decentralized economy. CNT is supported by a
                powerful and diverse portfolio that includes:
              </p>
            </div>
            <div className="hidden md:w-1/3 md:flex items-center justify-center">
              <img
                src={digitalAssets}
                alt="Digital Economy"
                className="max-h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TokenIntro;
