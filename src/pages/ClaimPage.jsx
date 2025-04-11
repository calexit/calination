import React, { useState, useEffect } from "react";
import Coins from '../assets/Coins.png'
import Blog from '../assets/Blog.png'
import Card from '../components/claim/Card'
import Modal from '../components/claim/Modal'
import ImagePlaceholder from '../assets/Image_Placeholder.png'
import Header from '../components/Header'
import BuyCNTBtn from '../components/BuyCNTBtn'
import { useAccount, useConnect } from "wagmi";

function ClaimNFT() {
    const [isNftClicked, setIsNftClicked] = useState(false);
    const [isConnect, setIsConnect] = useState(false);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [isError, _setIsError] = useState(false);
    const { isConnected } = useAccount();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { connect, connectors, error, isLoading } = useConnect();


    const cards = [
        { image: ImagePlaceholder, title: "#2", price: "1.63" },
        { image: ImagePlaceholder, title: "#3", price: "1.63" },
        { image: ImagePlaceholder, title: "#4", price: "1.63" }
    ];

    const handleCardSelect = (index) => {
        setSelectedCards(prev => {
            const isAlreadySelected = prev.includes(index);
            if (isAlreadySelected) {
                return prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const handleClaim = () => {
        if (selectedCards.length > 0) {
            setIsCardModalOpen(true);
            selectedCards.map(index => cards[index]).map((card) => {
                setSelectedCoins(prev => [...prev, card.title]);
            });
        }
    };

    const handleConnect = () => {
        if (isConnected) {
        } else {
            setIsModalOpen(true);
        }
    }

    const handleWalletConnect = (connector) => {
        connect({ connector }); // Simply call connect without chaining
        setIsConnect(true);
    };

    // Use useEffect to close the modal when the connection is successful
    useEffect(() => {
        if (isConnected && isModalOpen) {
            setIsModalOpen(false); // Close the modal when the wallet is connected
        }
        if (!isConnected) {
            setIsConnect(false);
        }
    }, [isConnected, isModalOpen]);

    return (
        <>
            <Header transparent={true} />
            <div id="claimNFT" className="bg-gradient-to-b from-[#1B2339] via-[#131522] to-[#212437]/90 pt-[88px]">
                <section className="pb-[120px]">
                    <div className={`relative z-20 ${!isConnect ? 'h-[540px]' : isError ? 'h-[440px]' : 'h-[840px] max-md:h-[1350px]'} w-full flex flex-col justify-center items-center text-center px-4`}>
                        <h1 className="text-white text-6xl font-bold mt-[100px] max-lg:text-5xl max-md:text-4xl max-sm:text-[46px]">
                            EXPLORE NFT COLLECTION
                        </h1>
                        <p className="text-white text-[18px] max-w-[800px] max-sm:text-[14px] mt-10 max-md:text-[16px]">
                            AClaim Portal UI Wallet connect prompt, eligibility check, token/NFT preview, "Claim
                            Now" button, transaction success/fail message
                        </p>
                        <img
                            src={Coins}
                            alt="Coin"
                            className="max-md:w-[366px] max-md:h-[366px] z-[-1] mt-[400px] object-cover absolute flex"
                        />
                        {!isConnect ? (
                            <button
                                onClick={handleConnect}
                                className='bg-[#C68F00] mt-20 py-[12px] text-[18px] uppercase text-white px-[80px] hover:bg-[#C68F00]/80 hover:scale-105 transition-all duration-300 rounded-[6px]'
                            >
                                Connect
                            </button>
                        ) : isError ? (
                            <div className="w-full mt-20 flex items-center justify-center p-2">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(239,68,68)" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                    <span className="text-sm ml-2 text-red-500">
                                        Figma ipsum component variant main layer. Align style rotate move
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="mt-20 flex max-md:relative max-md:flex-col gap-4">
                                    {cards.map((card, index) => (
                                        <Card
                                            key={index}
                                            {...card}
                                            isSelected={selectedCards.includes(index)}
                                            onSelect={() => handleCardSelect(index)}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handleClaim}
                                    disabled={selectedCards.length === 0}
                                    className={`mt-20 py-[12px] text-[18px] uppercase text-white px-[80px] hover:scale-105 transition-all duration-300 rounded-[6px] ${selectedCards.length === 0
                                        ? 'bg-[#C68F00]/60 cursor-not-allowed'
                                        : 'bg-[#C68F00] hover:bg-[#C68F00]/80'
                                        }`}
                                >
                                    Claim
                                </button>
                            </div>
                        )}
                    </div>
                </section>
                <section className="bg-[#010613] relative bg-opacity-90 border-[1px] rounded-[10px] border-[#FFB800] border-opacity-10">
                    <div className={` z-20 h-[900px] max-lg:h-full w-full max-lg:mt-10 ${isNftClicked ? 'lg:mt-10' : 'lg:mt-0'} 2xl:mt-10 flex flex-col justify-center items-center text-center px-[10px] md:px-[100px] 2xl:px-[300px]`}>
                        {/* Header Section */}
                        <div className="text-center w-full max-md:flex-col-reverse  flex justify-between items-start mb-3 gap-10 text-[#C68F00]">
                            {isNftClicked ? (
                                <h1 className="text-4xl font-bold text-left">NFTs - Identity, Access,<br />Ownership</h1>
                            ) : (
                                <h1 className="text-4xl font-bold text-left">ALL NFTs Are CNT<br />-Powered</h1>
                            )}
                            <div className="flex space-x-4">
                                <button onClick={() => setIsNftClicked(true)} className={`px-[23px] py-[10px] text-[14px] text-white rounded  border-[1px] border-[#C68F00] ${isNftClicked ? 'bg-[#C68F00]  font-semibold' : 'bg-[#010613]'}`}>
                                    NFTs
                                </button>
                                <button onClick={() => setIsNftClicked(false)} className={`px-[10px] py-[10px]  text-[14px] text-white rounded border-[1px] border-[#C68F00] ${isNftClicked ? 'bg-[#010613]' : 'bg-[#C68F00] font-semibold '}`}>
                                    ALL NFTs Are CNT-Powered
                                </button>
                            </div>
                        </div>
                        <div className="text-center w-full flex justify-between items-start mb-2">
                            {!isNftClicked ? (
                                <div className="w-full grid gap-2 grid-cols-2 max-md:mt-10">
                                    <span className="text-[24px] w-full text-[#C68F00]  max-md:hidden  font-bold text-start"></span>
                                    <span className="text-[24px] w-full text-[#C68F00] font-bold text-start">NFT Use Cases:</span>
                                </div>
                            ) : (
                                <div className="w-full flex-col gap-2 flex md:grid md:grid-cols-2">
                                    <span className="text-[14px] w-full text-white max-md:mt-[30px] text-start">Our NFTs go far beyond digital art — they're keys to the culture, community, and cause behind CaliNation. Every NFT connects users to real-world experiences, rewards, and governance.</span>
                                    <span className="text-[24px] max-md:text-[20px] max-md:mt-[30px] w-full text-[#C68F00] font-bold text-start">NFT Use Cases:</span>
                                </div>
                            )}
                        </div>
                        {/* Main Content Section */}
                        <div className="flex flex-col md:flex-row items-center justify-center w-full ">
                            {/* Coin Image Section */}
                            <section className="overflow-hidden bg-gray-50 lg:grid lg:grid-cols-2">
                                <img
                                    alt=""
                                    src={Blog}
                                    className="h-[400px] w-full object-cover lg:h-full"
                                />
                                <div className="px-10 py-10 max-md:px-2 max-md:py-2 text-[18px]">
                                    <div className="mx-auto max-w-xl text-start ltr:sm:text-left rtl:sm:text-right">
                                        {!isNftClicked ? (
                                            <ul className="list-disc pl-5 space-y-2 text-[#133276]">
                                                <li>
                                                    <span className="font-bold">CNT Required to Mint</span> - No freebies here. CNT fuels every drop.
                                                </li>
                                                <li>
                                                    <span className="font-bold">Earn CNT by Holding</span> - Stake certain NFTs to passively earn CNT or unlock surprise airdrops.
                                                </li>
                                                <li>
                                                    <span className="font-bold">Tradable Utility</span> - Buy, sell, or trade NFTs for access, influence, or rewards within the Calination ecosystem.
                                                </li>
                                            </ul>
                                        ) : (
                                            <ul className="list-disc pl-5 space-y-2 text-[#133276]">
                                                <li>
                                                    <span className="font-bold">Ms.CaliNation NFTs</span> - Unlock access to the pageant ecosystem, ambassador programs, and exclusive content.
                                                </li>
                                                <li>
                                                    <span className="font-bold">Water Rights NFTs</span> - Symbolize support or participation in spring water access and bottling projects.
                                                </li>
                                                <li>
                                                    <span className="font-bold">VIP Event NFTs</span> - Serve as exclusive tickets to high-level Calexit experiences, IRL meetups, and celebrity appearances.
                                                </li>
                                                <li>
                                                    <span className="font-bold">Governance NFTs</span> - Act as a second-layer DAO voting mechanism (1 NFT = 1 vote), increasing community influence.
                                                </li>
                                                <li>
                                                    <span className="font-bold">Art & Music NFTs</span> - Tie-ins with original Belle Aire artwork, music tracks, and clips from Calexit docuseries.
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                        <BuyCNTBtn />

                    </div>
                </section>

                <Modal
                    isOpen={isCardModalOpen}
                    onClose={() => setIsCardModalOpen(false)}
                    selectedCards={selectedCards.map(index => cards[index])}
                    selectedCoins={selectedCoins}
                />
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 text-white rounded-lg p-6 w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Connect Wallet</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Wallet Options */}
                        <div className="space-y-3">
                            {connectors.map((connector) => (
                                <button
                                    key={connector.id}
                                    onClick={() => handleWalletConnect(connector)}
                                    disabled={isLoading}
                                    className={`flex items-center w-full px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {/* Wallet Icon */}
                                    <img
                                        src={
                                            connector.name === 'WalletConnect'
                                                ? 'https://walletconnect.com/favicon.ico'
                                                : connector.name === 'MetaMask'
                                                    ? 'https://metamask.io/favicon.ico'
                                                    : 'https://metamask.io/favicon.ico' // Fallback for other wallets
                                        }
                                        alt={connector.name}
                                        className="w-6 h-6 mr-3"
                                    />
                                    <span>{connector.name}</span>
                                    {connector.name === 'MetaMask' && (
                                        <span className="ml-auto text-green-500 text-xs">
                                            {typeof window !== 'undefined' && window.ethereum?.isMetaMask ? 'INSTALLED' : 'NOT INSTALLED'}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 mt-4">
                                {error.message.includes('User rejected the request')
                                    ? 'You rejected the connection request. Please try again.'
                                    : error.message}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ClaimNFT 