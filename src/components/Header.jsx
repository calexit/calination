import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ transparent = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 px-6 py-4 z-50 transition-all duration-300 ${
        transparent && !isScrolled 
          ? "bg-transparent" 
          : "bg-white"
      } ${
        isScrolled ? "shadow-md" : transparent ? "" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex flex-col">
            <img 
              src="/logo.png" 
              alt="Calexit Logo" 
              className={`h-14 ${transparent && !isScrolled ? "brightness-0 invert" : ""}`} 
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-12">
          <Link
            to="/tokenomics"
            className={`${transparent && !isScrolled ? "text-white" : "text-[#000000]"} hover:text-blue-300 text-[16px] font-medium`}
          >
            TOKENOMICS
          </Link>
          <Link
            to="/claim"
            className={`${transparent && !isScrolled ? "text-white" : "text-[#000000]"} hover:text-blue-300 text-[16px] font-medium`}
          >
            CLAIM NFT
          </Link>
        </div>

        <div>
          <a
            href="#"
            className={`hidden md:inline-block ${
              transparent && !isScrolled 
                ? "bg-white text-[#133E76]" 
                : "bg-[#133E76] text-white"
            } px-10 py-4 rounded-md hover:bg-opacity-90 transition font-medium text-lg`}
          >
            Connect
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
              className={`${
                transparent && !isScrolled 
                  ? "bg-white text-[#133E76]" 
                  : "bg-[#133E76] text-white"
              } px-6 py-3 rounded-md hover:bg-opacity-90 transition font-medium text-base text-center mt-2`}
            >
              Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
