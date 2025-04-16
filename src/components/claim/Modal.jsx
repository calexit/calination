import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import nftAbi from '../../contracts/nftAbi.json';

// NFT Contract information from environment variables
const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
const contractAbi = nftAbi;

const ModalCard = ({ image, title, price }) => {
    return (
        <div className="rounded-lg overflow-hidden">
            <img
                alt={`NFT ${title}`}
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
    const [isMinting, setIsMinting] = useState(false);
    const [mintSuccess, setMintSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const { address } = useAccount();

    // Function to convert card title to NFT ID
    const getNftId = (title) => {
        // Extract the number from title strings like "#1", "#2", "#3"
        const idMatch = title.match(/#(\d+)/);
        // UI shows "#1", "#2", "#3" but contract expects IDs 1, 2, 3
        // We don't subtract 1 since contract expects 1-based IDs
        const displayId = idMatch ? parseInt(idMatch[1]) : 0;
        const contractId = displayId; // No subtraction needed
        
        // Log ID extraction and validate
        console.log(`Title: ${title}, Display ID: ${displayId}, Contract ID: ${contractId}`);
        
        // Contract only accepts IDs 1-3 (NOT 0-2)
        if (contractId < 1 || contractId > 3) {
            console.warn(`Invalid ID ${contractId} for contract (from display ID ${displayId})`);
        }
        
        return contractId;
    };

    // Calculate total price based on selected cards
    const calculateTotalValue = () => {
        const total = selectedCards.reduce((total, card) => {
            const nftId = getNftId(card.title);
            // According to contract, if nftId is 1, it's free; otherwise use the price from the card
            const cardPrice = nftId === 1 ? 0 : parseFloat(card.price || "0");
            console.log(`NFT Contract ID: ${nftId}, Price: ${cardPrice} ETH`);
            return total + cardPrice;
        }, 0);
        
        console.log(`Total calculated value: ${total} ETH`);
        return total;
    };

    // Get balance data for each selected NFT
    const nftIds = selectedCards.map(card => getNftId(card.title));
    
    // Use a single hook for all balances instead of a map with hooks inside
    const { data: balanceData } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'balanceOfBatch',
        args: [
            nftIds.map(() => address || '0x0000000000000000000000000000000000000000'),
            nftIds
        ],
        enabled: Boolean(address) && isOpen && nftIds.length > 0 && nftIds.some(id => id > 0),
    });

    // Prepare write contract function for minting
    const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

    const handleConfirmClaim = async () => {
        if (!address) {
            setErrorMessage("Wallet not connected");
            return;
        }

        setIsMinting(true);
        setErrorMessage("");

        try {
            // Check if user already owns any of the selected NFTs
            const alreadyOwned = balanceData && balanceData.some(balance => Number(balance) > 0);

            if (alreadyOwned) {
                setErrorMessage("You already own one of the selected NFTs");
                setIsMinting(false);
                return;
            }

            // If multiple NFTs selected, use mintBatch
            if (selectedCards.length > 1) {
                const addresses = selectedCards.map(() => address);
                const ids = selectedCards.map(card => getNftId(card.title));
                
                // Check for invalid IDs
                if (ids.some(id => id < 1 || id > 3)) {
                    setErrorMessage("Invalid NFT ID selected. IDs must be between 1-3.");
                    setIsMinting(false);
                    return;
                }
                
                const totalPrice = calculateTotalValue();
                console.log(`Sending mintBatch transaction with value: ${totalPrice} ETH`);
                
                writeContract({
                    address: contractAddress,
                    abi: contractAbi,
                    functionName: 'mintBatch',
                    args: [addresses, ids],
                    value: parseEther(totalPrice.toString()),
                });
            } 
            // If single NFT selected, use mint
            else if (selectedCards.length === 1) {
                const nftId = getNftId(selectedCards[0].title);
                
                // Check for invalid ID
                if (nftId < 1 || nftId > 3) {
                    setErrorMessage("Invalid NFT ID selected. ID must be between 1-3.");
                    setIsMinting(false);
                    return;
                }
                
                // Determine correct price based on ID
                let price = "0";
                if (nftId > 1) {
                    price = selectedCards[0].price || "0";
                }
                
                console.log(`Sending mint transaction for ID ${nftId} with value: ${price} ETH`);
                
                writeContract({
                    address: contractAddress,
                    abi: contractAbi,
                    functionName: 'mint',
                    args: [address, nftId],
                    value: parseEther(price),
                });
            }
        } catch (error) {
            console.error("Error minting NFT:", error);
            setErrorMessage(error.message || "Failed to mint NFT");
        }
    };

    // Update state based on transaction status
    useEffect(() => {
        if (isSuccess) {
            setMintSuccess(true);
            setIsMinting(false);
        }
        if (isError) {
            setIsMinting(false);
            
            // Enhanced error logging
            console.error("Transaction Error:", error);
            console.error("Error Details:", {
                selectedCards,
                nftIds: selectedCards.map(card => getNftId(card.title)),
                calculatedValue: calculateTotalValue(),
                errorObject: error
            });
            
            // Handle MetaMask transaction rejection more specifically
            const errorMsg = error?.message || "";
            if (
                errorMsg.includes("User rejected") || 
                errorMsg.includes("user rejected") || 
                errorMsg.includes("cancelled") ||
                errorMsg.includes("canceled") ||
                errorMsg.includes("denied")
            ) {
                setErrorMessage("Transaction was cancelled by user");
            } else if (errorMsg.includes("AlreadyMinted")) {
                setErrorMessage("You've already minted this NFT");
            } else if (errorMsg.includes("InvalidId")) {
                setErrorMessage("Invalid NFT ID selected");
            } else if (errorMsg.includes("insufficient funds") || errorMsg.includes("InsufficientBalance")) {
                setErrorMessage("Insufficient funds in your wallet");
            } else {
                setErrorMessage("Transaction failed: " + errorMsg.slice(0, 100));
            }
        }
    }, [isSuccess, isError, error]);

    const handleCancel = () => {
        setMintSuccess(false);
        setErrorMessage("");
        onClose();
    };

    if (!isOpen) return null;

    const totalPrice = calculateTotalValue();

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
                {(selectedCards.length != 1 && !mintSuccess) && (
                    <div className="flex justify-center items-center mb-8">
                        <p className="text-white text-lg">
                            Total prices: <span className="text-[#C68F00] font-bold">{totalPrice.toFixed(3)}ETH</span>
                        </p>
                    </div>
                )}

                {/* Error message - updated styling */}
                {errorMessage && (
                    <div className="flex justify-center items-center mb-8 px-4 py-3 bg-red-500/10 rounded-md border border-red-300">
                        <p className="text-red-500 text-[16px] text-center">
                            {errorMessage}
                        </p>
                    </div>
                )}

                {
                    mintSuccess ? (
                        <div className="flex justify-center items-center mb-8 px-4 py-3 bg-green-500/10 rounded-md border border-green-300">
                            <p className="text-green-500 text-[16px]">
                                Congratulations! Claim NFT Successfully.
                            </p>
                        </div>
                    )
                    : isMinting ? (
                        <div className="flex justify-center items-center mb-8">
                            <p className="text-white text-[16px]">
                                Minting in progress...
                            </p>
                        </div>
                    )
                    : (
                        <div className="flex max-md:flex-col-reverse justify-center gap-4">
                            <button
                                onClick={handleCancel}
                                className="px-12 py-3 bg-white text-black font-medium rounded hover:bg-gray-100 transition duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmClaim}
                                disabled={isPending || selectedCards.length === 0}
                                className={`px-12 py-3 font-medium rounded transition duration-300 ${
                                    isPending || selectedCards.length === 0
                                        ? 'bg-[#C68F00]/60 text-white/70 cursor-not-allowed'
                                        : 'bg-[#C68F00] text-white hover:bg-[#C68F00]/80'
                                }`}
                            >
                                {isPending ? "Processing..." : "Confirm"}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Modal; 