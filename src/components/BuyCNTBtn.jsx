import React, { useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

function BuyCNTBtn() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isConnected } = useAccount();
    const { connect, connectors, error, isLoading } = useConnect();

    const buyCNT = () => {
        if (isConnected) {
            console.log('Please delacre function here!')
        } else {
            setIsModalOpen(true);
        }
    }

    const handleConnect = (connector) => {
        connect({ connector }); // Simply call connect without chaining
    };

    useEffect(() => {
        if (isConnected && isModalOpen) {
            setIsModalOpen(false); // Close the modal when the wallet is connected
        }
    }, [isConnected, isModalOpen]);

    return (
        <div className="mt-16 flex justify-center">
            <button
                className="bg-[#C68F00] hover:bg-[#b07e00] text-white font-semibold text-lg px-16 py-4 rounded-md transition"
                onClick={() => {
                    buyCNT();
                }}
            >
                Buy CNT
            </button>
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
                                    onClick={() => handleConnect(connector)}
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
        </div>
    );
}

export default BuyCNTBtn;