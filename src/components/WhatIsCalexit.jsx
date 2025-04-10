import React from "react";

function WhatIsCalexit() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-6xl mx-auto bg-[#133E76] text-white py-8 px-12 md:py-12 md:px-36 rounded-2xl">
          <h2 className="text-[48px] md:text-[54px] text-[#E2A216] font-medium mb-4 text-center">
            What is Calexit?
          </h2>
          <p className="text-[18px] mb-6 text-center">
            Calexit is a bold initiative to establish California as an
            independent, self-sustaining nation, driven by innovation, equity,
            and environmental leadership. The movement empowers Californians to
            reimagine governance, economy, and identity on their own terms
          </p>
          <div className="text-center">
            <a
              href="#"
              className="bg-white text-[#133E76] py-6 px-12 rounded-md text-[18px] font-semibold hover:bg-gray-100 transition inline-flex items-center"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.5669 3.93306C18.811 4.17714 18.811 4.57286 18.5669 4.81694L11.0669 12.3169C10.8229 12.561 10.4271 12.561 10.1831 12.3169L7.5 9.63388L2.31694 14.8169C2.07286 15.061 1.67714 15.061 1.43306 14.8169C1.18898 14.5729 1.18898 14.1771 1.43306 13.9331L7.05806 8.30806C7.30214 8.06398 7.69786 8.06398 7.94194 8.30806L10.625 10.9911L17.6831 3.93306C17.9271 3.68898 18.3229 3.68898 18.5669 3.93306Z"
                  fill="#133E76"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.5 4.375C12.5 4.02982 12.7798 3.75 13.125 3.75H18.125C18.4702 3.75 18.75 4.02982 18.75 4.375V9.375C18.75 9.72018 18.4702 10 18.125 10C17.7798 10 17.5 9.72018 17.5 9.375V5H13.125C12.7798 5 12.5 4.72018 12.5 4.375Z"
                  fill="#133E76"
                />
              </svg>
              About Calexit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatIsCalexit;
