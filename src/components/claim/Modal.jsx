import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem'; // Use viem's utility for Ether conversion

// --- Configuration ---
// TODO: Replace with your actual deployed contract address
const nftContractAddress = '0x41BC5B53Bbed32247C193672f3Cc21A94cEF5725'; // <--- REPLACE THIS

// Minimal ABI for the NFT contract based on NFT.sol
const nftContractAbi = [
    {
        "inputs": [
            { "internalType": "address[]", "name": "mintTo", "type": "address[]" },
            { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }
        ],
        "name": "mintBatch",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    // Add getPrices function if you need to fetch prices dynamically
    // {
    //     "inputs": [],
    //     "name": "prices",
    //     "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ],
    //     "stateMutability": "view",
    //     "type": "function"
    // }
];
// --- End Configuration ---

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

const Modal = ({ isOpen, onClose, selectedCards }) => {
    const { address } = useAccount(); // Get connected user's address
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Wagmi hook for writing to the contract
    const {
        data: writeContractResult, // Contains the transaction hash
        isPending: isWritePending, // Is the transaction waiting for user confirmation?
        isError: isWriteError,
        error: writeError,
        writeContract, // Function to call the contract method
    } = useWriteContract();

    // Wagmi hook to wait for the transaction to be mined
    const {
        data: _receipt, // Prefixed with underscore to satisfy linter
        isLoading: isTxLoading, // Is the transaction mining?
        isSuccess: isTxSuccess, // Did the transaction succeed?
        isError: isTxError,
        error: txError,
    } = useWaitForTransactionReceipt({
        hash: writeContractResult, // Wait for the hash from writeContract
        confirmations: 1, // Optional: wait for 1 confirmation
    });

    // Derived state for overall loading
    const isLoading = isWritePending || isTxLoading;

    useEffect(() => {
        // Show success message only after tx is successful and loading is finished
        if (isTxSuccess) { // Trigger success directly when transaction is confirmed
            setShowSuccessMessage(true);
        }
        // Reset success message if modal re-opens or state changes
        if (!isOpen) {
            setShowSuccessMessage(false);
        }
    }, [isTxSuccess, isOpen]); // Remove isLoading dependency here

    const handleConfirmClaim = () => {
        if (!address || !writeContract) {
            console.error("Wallet not connected or contract hook not ready.");
            alert("Wallet not connected or contract hook not ready.");
            return;
        }
        if (selectedCards.length === 0) return;

        // --- Prepare arguments for mintBatch ---
        const mintToAddresses = [];
        const tokenIds = [];
        let totalValueWei = 0n; // Use BigInt for Ether values

        selectedCards.forEach(card => {
            // Assuming card.title is now "1", "2", "3", etc.
            const id = parseInt(card.title, 10);

            if (isNaN(id) || id <= 0) {
                console.error("Invalid token ID parsed:", card.title);
                // Potentially alert the user or skip this card
                return; // Skip invalid IDs
            }

            mintToAddresses.push(address); // Mint to the connected user
            tokenIds.push(id);

            // Add price if ID is 2 or 3 (assuming price '0' means free)
            // IMPORTANT: Ensure card.price accurately reflects the required ETH amount
            if (id > 1 && card.price && parseFloat(card.price) > 0) {
                try {
                    totalValueWei += parseEther(card.price.toString());
                } catch (e) {
                    console.error("Error parsing price for card:", card, e);
                    alert(`Error processing price for NFT ${card.title}. Please check the configuration.`);
                    // Need to decide how to handle this error - stop the whole batch?
                    throw new Error("Price parsing failed"); // Stop if price is invalid
                }
            }
        });

        if (tokenIds.length === 0) {
            alert("No valid NFTs selected for minting.");
            return;
        }

        console.log("Calling mintBatch with:");
        console.log("  Addresses:", mintToAddresses);
        console.log("  IDs:", tokenIds);
        console.log("  Value:", totalValueWei.toString(), "wei");

        // --- Call the mintBatch function ---
        writeContract({
            address: nftContractAddress,
            abi: nftContractAbi,
            functionName: 'mintBatch',
            args: [mintToAddresses, tokenIds],
            value: totalValueWei, // Send calculated Ether value
        }, {
            onError: (err) => {
                console.error("Contract Call Error:", err);
                // Handle specific errors if needed
            }
        });
    };

    const handleCancel = () => {
        setShowSuccessMessage(false); // Reset success message on cancel
        onClose();
    };

    if (!isOpen) return null;

    // Inside Modal component, before the totalPrice calculation
    console.log("--- Calculating Total Price ---");
    console.log("Received selectedCards prop:", JSON.stringify(selectedCards));
    const totalPrice = selectedCards.reduce((sum, card) => sum + parseFloat(card.price || '0'), 0);
    console.log("Calculated totalPrice:", totalPrice);
    console.log("-----------------------------");

    // Determine error message
    let errorMessage = null;
    if (isWriteError) {
        errorMessage = writeError?.shortMessage || "Transaction failed. Check console.";
    } else if (isTxError) {
        errorMessage = txError?.shortMessage || "Transaction confirmation failed. Check console.";
    }

    // Add this inside the Modal component body, before the return statement:
    console.log('--- Modal Render ---');
    console.log('writeContractResult (hash):', writeContractResult);
    console.log('isWritePending:', isWritePending);
    console.log('isWriteError:', isWriteError);
    console.log('writeError:', writeError);
    console.log('_receipt:', _receipt);
    console.log('isTxLoading:', isTxLoading);
    console.log('isTxSuccess:', isTxSuccess);
    console.log('isTxError:', isTxError);
    console.log('txError:', txError);
    console.log('derived isLoading:', isLoading);
    console.log('showSuccessMessage:', showSuccessMessage);
    console.log('--------------------');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className={`bg-[#2A2A2A] p-8 rounded-[21px] w-full max-md:max-w-[400px] max-md:items-center max-md:flex max-md:flex-col ${selectedCards.length == 1 ? 'max-w-[400px]' : selectedCards.length == 2 ? 'max-w-[600px]' : 'max-w-[800px]'} mx-4 relative`}>
                <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="absolute top-3 right-3 text-white hover:text-gray-300 disabled:opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl text-white font-semibold mb-6 text-center">Confirm Claim</h2>

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

                <div className="flex justify-center items-center mb-8">
                    <p className="text-white text-lg">
                        Total price: <span className="text-[#C68F00] font-bold">{totalPrice.toFixed(4)} ETH</span>
                    </p>
                </div>

                <div className="text-center mb-6 min-h-[24px]">
                    {isLoading && (
                        <p className="text-yellow-400 text-sm">Processing transaction... Please wait.</p>
                    )}
                    {showSuccessMessage && !isLoading && (
                         <p className="text-green-500 text-sm">Congratulations! Claim NFT Successfully.</p>
                    )}
                    {errorMessage && !isLoading && (
                         <p className="text-red-500 text-sm">Error: {errorMessage}</p>
                    )}
                </div>

                {!showSuccessMessage && (
                    <div className="flex max-md:flex-col-reverse justify-center gap-4">
                        <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-12 py-3 bg-white text-black font-medium rounded hover:bg-gray-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmClaim}
                            disabled={isLoading || !address}
                            className="px-12 py-3 bg-[#C68F00] text-white font-medium rounded hover:bg-[#C68F00]/80 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Processing...' : 'Confirm'}
                        </button>
                    </div>
                )}
                 {showSuccessMessage && (
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleCancel}
                            className="px-12 py-3 bg-white text-black font-medium rounded hover:bg-gray-100 transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                 )}

            </div>
        </div>
    );
};

export default Modal; 