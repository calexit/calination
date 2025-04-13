import React from "react"
import WalletConnectIcon from '../assets/walletconnect-seeklogo.png';

function WalletModal({ connectors, handleConnect, isLoading, error, setIsModalOpen }) {
    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[999]">
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
                                        ? WalletConnectIcon
                                        : connector.name === 'Coinbase Wallet'
                                            ? 'https://wallet.coinbase.com/favicon.ico'
                                            : connector.name === 'MetaMask'
                                                ? 'https://metamask.io/favicon.ico'
                                                : connector.icon
                                }
                                alt={connector.name}
                                className="w-6 h-6 mr-3"
                            />
                            <span>{connector.name}</span>
                        </button>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 mt-4 text-center">
                        {error.message.includes('User rejected the request')
                            ? 'You rejected the connection request. Please try again.'
                            : error.message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default WalletModal;