import React, { useState } from "react";

export const TradingView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dextoolsUrl = "https://www.dextools.io/app/en/base/pair-explorer/0x086c01cd7891e8aed5fd27c01dcca6081b30318203aec3474c47464c030d9492";

  return (
    <div className="w-full h-[500px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#133E76] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-2 text-[#133E76]">Loading chart data...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
          <div className="text-center p-8">
            <p className="text-lg mb-4">Unable to load the chart</p>
            <a 
              href={dextoolsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#133E76] text-white px-6 py-2 rounded hover:bg-opacity-90 inline-block"
            >
              View on DEXTools
            </a>
          </div>
        </div>
      )}

      <iframe
        src="https://www.dextools.io/widget-chart/en/base/pe-light/0x086c01cd7891e8aed5fd27c01dcca6081b30318203aec3474c47464c030d9492?theme=light&chartType=2&chartResolution=30&drawingToolbars=false"
        width="100%"
        height="100%"
        frameBorder="0"
        loading="eager"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="CNT Trading Chart"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      ></iframe>
    </div>
  );
};

export default TradingView;