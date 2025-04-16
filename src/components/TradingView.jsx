import React, { useState, useEffect } from "react";

export const TradingView = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to check if loading takes too long
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log("DEXTools chart loading is taking longer than expected");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="w-full h-[500px]">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full bg-gray-100">
          <p>Loading DEXTools chart...</p>
        </div>
      )}
      <iframe
        id="dextools-widget"
        title="DEXTools Trading Chart"
        width="500"
        height="400"
        style={{ border: "none" }}
        onLoad={() => setIsLoading(false)}
        src="https://www.dextools.io/widget-chart/en/solana/pe-light/CvMmJj7Cbx73yGPtuDCq9DKNAE4sFuuR5q26w9562x8Y?theme=light&chartType=2&chartResolution=30&drawingToolbars=false"
      ></iframe>
    </div>
  );
};

export default TradingView;
