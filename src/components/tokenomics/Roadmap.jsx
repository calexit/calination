import React from 'react';
import roadmapLine from "../../assets/roadmap-line.png";
function Roadmap() {
  // Define roadmap data for easier mapping
  const roadmapStages = [
    {
      status: "Completed",
      statusType: "completed",
      items: [
        "Token + NFT Contract Deployment",
        "Launch Figma Site + Mint Portal",
      ],
    },
    {
      status: "Coming Soon",
      statusType: "coming-soon-1",
      items: ["Claim Portal Goes Live", "CNT Listed on DEX + CoinGecko"],
    },
    {
      status: "Coming Soon",
      statusType: "coming-soon-2",
      items: [
        "First NFT Utility Drop (CaliDAO Citizen)",
        "Ms. CaliNation Pageant Launch",
      ],
    },
    {
      status: "Coming Soon",
      statusType: "coming-soon-3",
      items: [
        "IRL Events + DAO Voting System",
        "Future drops tied to mining, film, and Calexit governance",
      ],
    },
  ];

  return (
    <section className="w-full py-14 bg-white">
      <div className="container mx-auto max-w-[1295px] px-4">
        <h2 className="text-[36px] sm:text-[44px] md:text-[54px] text-[#133e76] font-bold text-center mb-10 md:mb-16 tracking-[1.40px] font-['Poppins',Helvetica] leading-[1.2] md:leading-[98px]">
          Roadmap
        </h2>

        <div className="relative mt-10">
          {/* Timeline line - hidden on mobile, visible on larger screens */}
          <div className="relative hidden md:block">
            <div className="absolute w-full top-[65px]">
              <img src={roadmapLine} alt="Line" />
            </div>

            <div className="flex justify-between relative">
              {roadmapStages.map((stage, index) => (
                <div key={index} className="flex flex-col items-start w-64">
                  {/* Status indicator */}
                  <div className="flex items-center mb-6">
                    {stage.statusType === "completed" ? (
                      <div className="w-[15px] h-[15px] bg-[#15e8884c] rounded-[7.62px] flex items-center justify-center mr-2.5">
                        <div className="w-2 h-2 bg-[#15e888cc] rounded-[3.81px]" />
                      </div>
                    ) : (
                      ""
                    )}
                    <span
                      className={`text-[18.2px] tracking-[1.40px] font-['Poppins',Helvetica] leading-normal ${stage.statusType === "completed" ? "font-bold" : "font-semibold"}`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  {/* Timeline marker */}
                  <div className="h-[35px] relative">
                    <div className="w-[35px] h-[35px] relative rounded-[17.5px]">
                      <div className="absolute w-[35px] h-[35px] top-0 left-0 bg-[#f0c445] rounded-[17.5px] opacity-20" />
                      <div className="absolute w-[22px] h-[22px] top-1.5 left-1.5 bg-[#f0c445] rounded-[11.2px] opacity-30" />
                      <div className="absolute w-[11px] h-[11px] top-3 left-3 bg-[#f0c445] rounded-[5.6px] opacity-40" />
                    </div>
                  </div>

                  {/* Content items */}
                  <div className="mt-12">
                    {stage.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="font-['Poppins',Helvetica] font-semibold text-[#133e76] text-sm tracking-[0.14px] leading-[25.5px] mb-4 max-w-[250px]"
                      >
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile version - stacked layout */}
          <div className="md:hidden space-y-10">
            {roadmapStages.map((stage, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center mb-4">
                  {stage.statusType === "completed" ? (
                    <div className="w-[15px] h-[15px] bg-[#15e8884c] rounded-[7.62px] flex items-center justify-center mr-2.5">
                      <div className="w-2 h-2 bg-[#15e888cc] rounded-[3.81px]" />
                    </div>
                  ) : (
                    <div className="w-[22px] h-[22px] relative rounded-[11.2px] mr-2">
                      <div className="absolute w-[22px] h-[22px] top-0 left-0 bg-[#f0c445] rounded-[11.2px] opacity-30" />
                      <div className="absolute w-[11px] h-[11px] top-1.5 left-1.5 bg-[#f0c445] rounded-[5.6px] opacity-40" />
                    </div>
                  )}
                  <span
                    className={`text-[18.2px] tracking-[1.40px] font-['Poppins',Helvetica] leading-normal ${stage.statusType === "completed" ? "font-bold" : "font-semibold"}`}
                  >
                    {stage.status}
                  </span>
                </div>
                
                <div className="pl-8">
                  {stage.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="font-['Poppins',Helvetica] font-semibold text-[#133e76] text-sm tracking-[0.14px] leading-[25.5px] mb-3"
                    >
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Roadmap; 