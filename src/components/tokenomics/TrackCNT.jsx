import React from 'react';

function TrackCNT() {
  const cardItems = [
    {
      id: 1,
      title: "Insert Link To CNT Token",
      imageSrc: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/image.png",
      imageAlt: "Image",
    },
    {
      id: 2,
      title: "Pending",
      imageSrc: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/ellipse-3.png",
      imageAlt: "Ellipse",
    },
    {
      id: 3,
      title: "Link To CNT Trading Pair",
      imageSrc: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/uniswapbadge.svg",
      imageAlt: "Uniswap badge",
    },
    {
      id: 4,
      title: "Verified Token Contract",
      imageSrc: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/image-1.png",
      imageAlt: "Image",
    },
    {
      id: 5,
      title: "NFT Links",
      imageSrc: "https://c.animaapp.com/m9afjkrw6Ux2NE/img/image-2.png",
      imageAlt: "Image",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-[50px] w-full py-16 bg-white">
      <div className="flex flex-col items-center gap-[37.69px] max-w-[1280px] mx-auto px-4">
        <h2 className="font-['Poppins',Helvetica] font-bold text-[#133e76] text-[36px] sm:text-[44px] md:text-[54px] text-center tracking-[0] leading-[1.2] md:leading-[64.8px]">
          Track CNT, View NFTs, And Dive In
        </h2>
      </div>

      <div className="grid grid-cols-2 items-center md:flex md:flex-wrap justify-center gap-6 sm:gap-[40px] max-w-[1440px] mx-auto px-4">
        {cardItems.map((item) => (
          <div
            key={item.id}
            className="w-[170px] sm:w-[227.8px] h-[220px] sm:h-[278.05px] rounded-[12.56px] bg-[#f9e2a2] relative overflow-hidden"
          >
            <div className="w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] mt-[29px] mx-auto rounded-full bg-[#f0c445] flex items-center justify-center">
              <img
                className="w-[65px] h-[65px] sm:w-[95px] sm:h-[95px] object-contain"
                alt={item.imageAlt}
                src={item.imageSrc}
              />
            </div>
            <div className="absolute bottom-[29px] left-0 right-0 text-center font-['Poppins',Helvetica] font-semibold text-[#133e76] text-xs sm:text-sm">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrackCNT; 