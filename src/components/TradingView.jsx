import React, { useEffect, useRef } from 'react';

const PRICE_CHART_ID = 'price-chart-widget-container';

export const TradingView = () => {

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe id="dextools-widget"
        title="DEXTools Trading Chart"
        width="500" height="400"
        src="https://www.dextools.io/widget-chart/en/base/pe-light/0x086c01cd7891e8aed5fd27c01dcca6081b30318203aec3474c47464c030d9492?theme=light&chartType=2&chartResolution=30&drawingToolbars=false">
          
        </iframe>
    </div>
  );
};

export default TradingView;