import React from "react";

export const TradingView = () => {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src="https://www.dextools.io/widget-chart/en/base/pe-light/0x086c01cd7891e8aed5fd27c01dcca6081b30318203aec3474c47464c030d9492?theme=light&chartType=2&chartResolution=30&drawingToolbars=false"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        title="CNT Trading Chart"
      ></iframe>
    </div>
  );
};

export default TradingView;