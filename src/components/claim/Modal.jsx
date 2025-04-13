import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ModalCard = ({ image, title, price }) => {
    return (
        <div className="rounded-lg overflow-hidden">
            <img
                alt=""
                src={image}
                className="w-full max-md:w-[250px] h-48 object-cover rounded-lg"
            />
            <div className="p-4 max-md:hidden">
                <div className="flex justify-between items-center">
                    <span className="text-[#C68F00] font-medium">Coin</span>
                    <span className="text-[#C68F00] font-bold">{title}</span>
                </div>
                <div className="mt-2">
                    <p className="text-[#ffffff] font-medium text-sm">Price</p>
                    <p className="text-[#C68F00] font-medium">{price} ETH</p>
                </div>
            </div>

        </div>
    );
};

const Modal = ({ isOpen, onClose, selectedCards, selectedCoins }) => {

    const [isClicked, setIsClicked] = useState(false);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
                const abi = [
                    // Your contract ABI here (you can generate this from your smart contract)
                    "function mintNFT(uint256 tokenURIIndex) public payable",
                    "function getMintPrice() public view returns (uint256)",
                ]; // Simplified ABI for demonstration

                const contract = new ethers.Contract(contractAddress, abi, signer);
                setProvider(provider);
                setSigner(signer);
                setContract(contract);
            } else {
                alert("Please install MetaMask!");
            }
        };
        init();
    }, []);

    const handleConfirmClaim = async () => {
        // setIsClicked(true);
        if (!contract) return;

        try {
            const mintPrice = await contract.getMintPrice();
            const totalPriceWei = ethers.utils.parseEther(selectedCards.reduce((sum, card) => sum + parseFloat(card.price), 0).toString());

            for (const card of selectedCards) {
                const tx = await contract.mintNFT(tokenURIs.indexOf(card.image), {
                    value: mintPrice, // Ensure this matches the contract's mintPrice
                });
                await tx.wait();
            }

            setIsClicked(true);
            alert("NFTs minted successfully!");
        } catch (error) {
            console.error("Error minting NFT:", error);
            alert("Failed to mint NFT. Check console for details.");
        }
    };

    const handleCancel = () => {
        console.log("Cancel");
        setIsClicked(false);
        onClose();
    };

    if (!isOpen) return null;

    const totalPrice = selectedCards.reduce((sum, card) => sum + parseFloat(card.price), 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className={`bg-[#2A2A2A] p-8 rounded-[21px] w-full max-md:max-w-[400px] max-md:items-center max-md:flex max-md:flex-col ${selectedCards.length == 1 ? 'max-w-[400px]' : selectedCards.length == 2 ? 'max-w-[600px]' : 'max-w-[800px]'} mx-4 relative`}>
                {/* Close button */}
                <button
                    onClick={handleCancel}
                    className="absolute top-3 right-3 text-white hover:text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Cards grid */}
                <div className={`grid ${selectedCards.length == 3 ? 'grid-cols-3' : selectedCards.length == 2 ? 'grid-cols-2' : 'grid-cols-1'} max-md:grid-cols-1 gap-4 mb-8 mt-4`}>
                    {selectedCards.map((card, index) => (
                        <ModalCard
                            key={index}
                            image={card.image}
                            title={card.title}
                            price={card.price}
                        />
                    ))}
                </div>

                <div className="p-2 w-full md:hidden">
                    <div className="flex justify-between items-center">
                        <span className="text-[#C68F00] font-medium">Coin</span>
                        <span className="text-[#C68F00] font-bold">{selectedCoins.join(', ')}</span>
                    </div>
                </div>
                {/* Total price */}
                {(selectedCards.length != 1 && !isClicked) && (
                    <div className="flex justify-center items-center mb-8">
                        <p className="text-white text-lg">
                            Total prices: <span className="text-[#C68F00] font-bold">{totalPrice.toFixed(2)}ETH</span>
                        </p>
                    </div>
                )}

                {
                    isClicked ? (
                        <div className="flex justify-center items-center mb-8">
                            <p className="text-green-500 text-[16px]">
                                Congratulations! Claim NFT Successfully.
                            </p>
                        </div>
                    )
                        :
                        <div className="flex max-md:flex-col-reverse justify-center gap-4">
                            <button
                                onClick={onClose}
                                className="px-12 py-3 bg-white text-black font-medium rounded hover:bg-gray-100 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmClaim}
                                className="px-12 py-3 bg-[#C68F00] text-white font-medium rounded hover:bg-[#C68F00]/80 transition duration-300"
                            >
                                Confirm
                            </button>
                        </div>
                }

            </div>
        </div>
    );
};

export default Modal; 