import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import WalletModal from './WalletModal';

function Header({ transparent = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading } = useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Whitepaper URL
  const whitepaperUrl = "https://u.pcloud.link/publink/show?code=XZknKQ5Zy5ElUpY1E6hXy6wAUNYWnYiq7Xvk";

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


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent && !isScrolled
        ? "bg-transparent"
        : transparent && isScrolled ? " "
          : "bg-white"
        } ${isScrolled ? "shadow-md" : transparent ? "" : "shadow-sm"
        }`}
    >
      <div className={`${transparent && isScrolled ? "backdrop-blur " : ""} px-6 py-4 lg:container mx-auto flex justify-between items-center`}>
        <div className="flex items-center">
          <Link to="/" className="flex flex-col">
            <img
              src="/logo.png"
              alt="Calexit Logo"
              className={`h-14 ${transparent ? "brightness-0 invert" : ""}`}
            />
          </Link>
        </div>

        <div className={`hidden md:flex items-center space-x-12 ${isConnected ? "2xl:ml-[250px]" : "ml-10"} `}>
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
          <a
            href={whitepaperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${transparent ? "text-white" : "text-[#000000]"} hover:text-blue-300 text-[16px] font-medium`}
          >
            WHITEPAPER
          </a>
        </div>

        <div>
          {isConnected && (
            <span className={`${transparent ? "text-white" : "text-[#053563]"}  text-[16px] font-medium py-2 hidden md:inline-block lg:mr-10`}>
              {address.slice(0, 8)}...{address.slice(-6)}
            </span>
          )}
          <button
            className={`hidden md:inline-block ${transparent
              ? "bg-white text-[#133E76]"
              : "bg-[#133E76] text-white"
              } px-10 py-4 rounded-md hover:bg-opacity-90 transition font-medium text-lg`}
            onClick={(e) => {
              e.preventDefault();
              if (isConnected) {
                disconnect();
              } else {
                setIsModalOpen(true);
              }
            }}
          >
            {isConnected ? "Disconnect" : "Connect"}
          </button>
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col space-y-1.5">
              <div className={`w-8 h-1 ${transparent ? "bg-white" : "bg-[#133E76]"} rounded-sm`}></div>
              <div className={`w-8 h-1 ${transparent ? "bg-white" : "bg-[#133E76]"} rounded-sm`}></div>
              <div className={`w-8 h-1 ${transparent ? "bg-white" : "bg-[#133E76]"} rounded-sm`}></div>
            </div>
          </button>
        </div>
      </div>

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
              href={whitepaperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#000000] hover:text-blue-800 text-[16px] font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              WHITEPAPER
            </a>
            <button
              className={`
                bg-[#133E76] text-white
                px-6 py-3 rounded-md hover:bg-opacity-90 transition font-medium text-base text-center mt-2`}
              onClick={(e) => {
                e.preventDefault();
                if (isConnected) {
                  disconnect();
                } else {
                  setIsModalOpen(true);
                }
              }}
            >
              {isConnected ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>
      )}
      {/* Mobile menu dropdown */}
      {isModalOpen && (
        <WalletModal connectors={connectors} handleConnect={handleConnect} isLoading={isLoading} error={error} setIsModalOpen={setIsModalOpen} />
      )}
    </header>
  );
}

export default Header;
