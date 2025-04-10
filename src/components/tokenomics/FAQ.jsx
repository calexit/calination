import React, { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const questions = [
    {
      question: "Can I buy the CNT token without owning an NFT?",
      answer:
        "Yes, you can purchase CNT tokens directly from supported exchanges without owning an NFT. The token and NFTs are separate products, though they work within the same ecosystem.",
    },
    {
      question: "Do I need CNT to obtain or mint an NFT?",
      answer:
        "While some NFT collections may require CNT for minting or purchasing, not all will have this requirement. Check specific collection details for requirements.",
    },
    {
      question: "What's the difference between CNT and CaliNation NFTs?",
      answer:
        "CNT is the utility token of the ecosystem with financial uses, while CaliNation NFTs are digital collectibles that provide specific access, benefits, and digital ownership rights.",
    },
    {
      question: "Where can I buy CNT?",
      answer:
        "CNT is available on Uniswap and will soon be listed on additional exchanges. Check our website for the most up-to-date listing information.",
    },
    {
      question: "What do I get with an NFT?",
      answer:
        "CaliNation NFTs provide various benefits including access to events, voting rights in the DAO, exclusive content, and potential airdrops or rewards.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-16 bg-white mb-16 md:my-24">
      <div className="container mx-auto px-4">
        <h2 className="text-[34px] md:text-[54px] font-bold text-[#133E76] text-center">
          FAQ
        </h2>
        <p className="text-center mb-10 text-[20px] md:text-[24px]">
          Frequently Asked Questions
        </p>

        <div className="max-w-4xl mx-auto space-y-4">
          {questions.map((item, index) => (
            <div key={index} className="bg-[#133E76] text-white rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full text-left p-4 md:p-6"
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-semibold text-[14px] md:text-[18px] lg:text-[20px] pr-2">
                  {item.question}
                </span>
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 min-w-[20px] min-h-[20px]"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.5227 2.96689L13.1523 13.3373C12.5159 13.9737 11.4841 13.9737 10.8477 13.3373L0.477287 2.96689C-0.159096 2.33051 -0.159096 1.29873 0.477287 0.662344C1.11367 0.025962 2.14545 0.025962 2.78183 0.662344L12 9.88052L21.2182 0.662345C21.8546 0.0259629 22.8863 0.0259629 23.5227 0.662345C24.1591 1.29873 24.1591 2.33051 23.5227 2.96689Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-[16px] md:text-[18px]">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
