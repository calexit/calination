import React from "react";

export const TradingView = () => {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src="https://www.dextools.io/app/en/base/pair-explorer/0x086c01cd7891e8aed5fd27c01dcca6081b30318203aec3474c47464c030d9492?t=1744649619483"
        width="100%"
        height="100%"
        title="CNT Trading Chart"
      ></iframe>
    </div>
  );
};

export default TradingView;