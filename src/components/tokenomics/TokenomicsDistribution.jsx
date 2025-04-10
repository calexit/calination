import React from 'react';

function TokenomicsDistribution() {
  // Token allocation data with colors matching the image
  const tokenData = [
    {
      name: "Community Allocation / Airdrops",
      percentage: "40%",
      color: "#C58E00", // Gold color
      value: 40,
    },
    {
      name: "Development + Operations",
      percentage: "20%",
      color: "#003366", // Dark blue color
      value: 20,
    },
    {
      name: "Treasury / DAO Reserves",
      percentage: "15%",
      color: "#B8CBEB", // Light blue color
      value: 15,
    },
    {
      name: "Liquidity + Exchange Listings",
      percentage: "15%",
      color: "#FF5A5A", // Red/pink color
      value: 15,
    },
    {
      name: "Founders + Strategic Partners",
      percentage: "10%",
      color: "#1DB380", // Green color
      value: 10,
    },
  ];

  // Chart labels with positions - responsive
  const chartLabels = [
    {
      percentage: "20%",
      image: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/image-3.png",
      position: "top-[260px] sm:top-[300px] md:top-[330px] lg:top-[370px] left-[130px] sm:left-[150px] md:left-[170px] lg:left-[180px]",
    },
    {
      percentage: "40%",
      image: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/image-5.png",
      position: "top-[120px] sm:top-[140px] md:top-[150px] lg:top-[170px] left-[240px] sm:left-[280px] md:left-[320px] lg:left-[360px]",
    },
    {
      percentage: "15%",
      image: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/mask-group-2.png",
      position: "top-[190px] sm:top-[220px] md:top-[250px] lg:top-[280px] left-[15px] sm:left-[18px] md:left-[20px] lg:left-[20px]",
      height: "[15px]",
    },
    {
      percentage: "15%",
      image: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/image-4.png",
      position: "top-[70px] sm:top-[80px] md:top-[90px] lg:top-[100px] left-[10px] lg:left-[10px]",
    },
    {
      percentage: "10%",
      specialIcon: true,
      position: "top-[10px] lg:top-[10px] left-[80px] sm:left-[110px] md:left-[120px] lg:left-[120px]",
      gap: "gap-0.5",
    },
  ];

  // Donut chart dimensions
  const radius = 190;
  const innerRadius = 115;
  const center = radius + 20;

  // Create SVG donut chart segments
  const createDonutChart = () => {
    const total = tokenData.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;
    
    return tokenData.map((item, index) => {
      // Calculate the start and end angles for each segment
      const startPercent = cumulativePercent;
      cumulativePercent += item.value;
      const endPercent = cumulativePercent;
      
      const startAngle = startPercent / total * Math.PI * 2;
      const endAngle = endPercent / total * Math.PI * 2;
      
      // Calculate path coordinates
      const startX = center + radius * Math.sin(startAngle);
      const startY = center - radius * Math.cos(startAngle);
      const endX = center + radius * Math.sin(endAngle);
      const endY = center - radius * Math.cos(endAngle);
      
      // Calculate inner arc coordinates
      const innerStartX = center + innerRadius * Math.sin(startAngle);
      const innerStartY = center - innerRadius * Math.cos(startAngle);
      const innerEndX = center + innerRadius * Math.sin(endAngle);
      const innerEndY = center - innerRadius * Math.cos(endAngle);
      
      // Create the path for the segment
      const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;
      
      const pathData = [
        `M ${startX} ${startY}`, // Move to start point
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Outer arc
        `L ${innerEndX} ${innerEndY}`, // Line to inner arc end
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`, // Inner arc
        'Z' // Close path
      ].join(' ');
      
      return <path key={index} d={pathData} fill={item.color} />;
    });
  };

  return (
    <section className="py-8 md:py-16 bg-[#f9f9fa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-[28px] sm:text-[34px] md:text-[54px] font-bold text-[#133E76] mb-2">
            CNT Tokenomics
          </h2>
          <p className="text-[16px] sm:text-[18px] md:text-[24px] text-[#000000] font-medium">
            Transparent, Purpose-Driven Tokenomics Suggested Breakdown
          </p>
        </div>

        <div className="max-w-full mx-auto bg-[#f9f9fa] rounded-2xl shadow-[1px_1px_1px_#0000001a,-1px_-1px_1px_#0000001a] p-4 sm:p-8 md:p-12 lg:p-16">
          <h3 className="text-[36px] sm:text-[42px] md:text-[54px] font-semibold text-[#133E76] mb-6 md:mb-8">
            Tokenomics
          </h3>

          <div className="flex flex-col lg:flex-row mt-6 md:mt-12 justify-between items-center lg:items-start">
            {/* Chart section - scaled down for mobile */}
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] h-[320px] sm:h-[400px] md:h-[450px] lg:h-[520px]">
              <div className="relative w-full h-full mx-auto drop-shadow-lg">
                <svg width="100%" height="100%" viewBox="0 0 480 480" preserveAspectRatio="xMidYMid meet" className="filter drop-shadow-xl">
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="5" floodOpacity="0.2" />
                    </filter>
                  </defs>
                  <g filter="url(#shadow)">
                    {createDonutChart()}
                  </g>
                  {/* White inner circle for a cleaner look */}
                  <circle cx={center} cy={center} r={innerRadius - 2} fill="#f9f9fa" />
                </svg>
              </div>

              {/* Chart labels - hidden on very small screens */}
              {chartLabels.map((label, index) => (
                <div
                  key={index}
                  className={`inline-flex items-center justify-center ${label.gap || "gap-2.5"} p-1.5 sm:p-2 md:p-2.5 absolute ${label.position} bg-white rounded-[10px] shadow-md z-10`}
                >
                  {label.specialIcon ? (
                    <>
                      <img
                        className="relative w-[8px] sm:w-[10px] md:w-[13px] h-[16px] sm:h-[20px] md:h-[26px]"
                        alt="Fa solid female"
                        src="https://c.animaapp.com/m9afjkrw6Ux2NE/img/fa-solid-female.svg"
                      />
                      <img
                        className="relative w-[8px] sm:w-[10px] md:w-[13px] h-[16px] sm:h-[20px] md:h-[26px]"
                        alt="Fa solid female"
                        src="https://c.animaapp.com/m9afjkrw6Ux2NE/img/fa-solid-female.svg"
                      />
                    </>
                  ) : (
                    <img
                      className={`relative w-3 sm:w-4 md:w-5 h-${label.height || "3 sm:h-4 md:h-5"} ${!label.height ? "object-cover" : ""}`}
                      alt="Label icon"
                      src={label.image}
                    />
                  )}
                  <div className="w-fit mt-[-1.00px] text-xs sm:text-sm md:text-base tracking-[0.16px] leading-[normal] font-['Poppins',Helvetica] font-bold text-[#000000]">
                    {label.percentage}
                  </div>
                </div>
              ))}
            </div>

            {/* Token allocation details */}
            <div className="flex flex-col w-full items-start gap-4 md:gap-6 lg:gap-8 ml-0 lg:ml-[20px] mt-6 lg:mt-4">
              {/* Total Supply row */}
              <div className="flex items-center justify-between w-full border-b border-gray-200 pb-4">
                <div className="font-['Poppins',Helvetica] font-bold text-[#000000] text-lg sm:text-xl md:text-2xl tracking-[0]">
                  Total Supply
                </div>
                <div className="font-['Poppins',Helvetica] font-bold text-[#000000] text-lg sm:text-xl md:text-2xl text-right tracking-[0]">
                  1,000,000,000CNT
                </div>
              </div>

              {/* Token allocation rows */}
              {tokenData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] rounded-full mr-2 sm:mr-3 md:mr-5 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="font-['Poppins',Helvetica] font-medium text-[#000000] text-sm sm:text-base md:text-xl">
                      {item.name}
                    </div>
                  </div>
                  <div className="font-['Poppins',Helvetica] font-bold text-[#000000] text-sm sm:text-base md:text-xl text-right">
                    {item.percentage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TokenomicsDistribution; 