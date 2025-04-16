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
        src="https://www.dextools.io/app/en/base/pair-explorer/0x086c01cd7891e8aed5fd27c01dcca6081b30318203aec3474c47464c030d9492?embed=1&theme=light"
        width="100%"
        height="100%"
        title="CNT Trading Chart"
        style={{ 
          border: 'none',
          display: isLoading ? 'none' : 'block' 
        }}
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default TradingView;