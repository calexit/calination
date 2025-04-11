import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function Header({ transparent = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading } = useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleConnect = (connector) => {
    connect({ connector }); // Simply call connect without chaining
  };

  // Use useEffect to close the modal when the connection is successful
  useEffect(() => {
    if (isConnected && isModalOpen) {
      setIsModalOpen(false); // Close the modal when the wallet is connected
    }
  }, [isConnected, isModalOpen]);

  // Handle error display (e.g., user rejected the request)
  useEffect(() => {
    if (error) {
      console.error('Connection error:', error);
      if (error.message.includes('User rejected the request')) {
        alert('You rejected the wallet connection request. Please try again and approve the connection.');
      }
    }
  }, [error]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 px-6 py-4 z-50 transition-all duration-300 ${transparent && !isScrolled
        ? "bg-transparent"
        : transparent && isScrolled ? "backdrop-blur-md"
        : "bg-white"
        } ${isScrolled ? "shadow-md" : transparent ? "" : "shadow-sm"
        }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex flex-col">
            <img
              src="/logo.png"
              alt="Calexit Logo"
              className={`h-14 ${transparent  ? "brightness-0 invert" : ""}`}
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-12 ml-10">
          <Link
            to="/tokenomics"
            className={`${transparent ? "text-white" : "text-[#000000]"} hover:text-blue-300 text-[16px] font-medium`}
          >
            TOKENOMICS
          </Link>
          <Link
            to="/claim"
            className={`${transparent ? "text-white" : "text-[#000000]"} hover:text-blue-300 text-[16px] font-medium`}
          >
            CLAIM NFT
          </Link>
        </div>

        <div>
          {isConnected && (
            <span className="text-[#053563] hover:text-blue-800 text-[16px] font-medium py-2 hidden md:inline-block mr-10">
              {address.slice(0, 8)}...{address.slice(-6)}
            </span>
          )}
          <a
            href="#"
            className={`hidden md:inline-block ${transparent 
              ? "bg-white text-[#133E76]"
              : "bg-[#133E76] text-white"
              } px-10 py-4 rounded-md hover:bg-opacity-90 transition font-medium text-lg`}
            onClick={() => {
              if (isConnected) {
                disconnect();
              } else {
                setIsModalOpen(true);
              }
            }}
          >
            {isConnected ? "Disconnect" : "Connect"}
          </a>
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col space-y-1.5">
              <div className={`w-8 h-1 ${transparent && !isScrolled ? "bg-white" : "bg-[#133E76]"} rounded-sm`}></div>
              <div className={`w-8 h-1 ${transparent && !isScrolled ? "bg-white" : "bg-[#133E76]"} rounded-sm`}></div>
              <div className={`w-8 h-1 ${transparent && !isScrolled ? "bg-white" : "bg-[#133E76]"} rounded-sm`}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white z-50 shadow-lg animate-fadeIn">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <Link
              to="/tokenomics"
              className="text-[#000000] hover:text-blue-800 text-[16px] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              TOKENOMICS
            </Link>
            <Link
              to="/claim"
              className="text-[#000000] hover:text-blue-800 text-[16px] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              CLAIM NFT
            </Link>
            <a
              href="#"
              className={`${transparent && !isScrolled
                ? "bg-white text-[#133E76]"
                : "bg-[#133E76] text-white"
                } px-6 py-3 rounded-md hover:bg-opacity-90 transition font-medium text-base text-center mt-2`}
              onClick={() => {
                if (isConnected) {
                  disconnect();
                } else {
                  setIsModalOpen(true);
                }
              }}
            >
              {isConnected ? "Disconnect" : "Connect"}
            </a>
          </div>
        </div>
      )}
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
                        : connector.icon
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
    </header>
  );
}

export default Header;
