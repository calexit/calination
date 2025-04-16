import React, { useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import WalletModal from "./WalletModal";

function BuyCNTBtn() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isConnected } = useAccount();
    const { connect, connectors, error, isLoading } = useConnect();

    const uniswapUrl = "https://app.uniswap.org/explore/pools/base/0x086c01cd7891e8aed5fd27c01dcca6081b30318203aec3474c47464c030d9492";

    const handleBuyOrConnect = () => {
        if (isConnected) {
            // Wallet is connected, open Uniswap link
            window.open(uniswapUrl, '_blank', 'noopener,noreferrer');
        } else {
            // Wallet not connected, open connect modal
            setIsModalOpen(true);
        }
    };

    const handleWalletConnect = (connector) => {
        connect({ connector });
    };

    // Close modal automatically upon successful connection
    useEffect(() => {
        if (isConnected && isModalOpen) {
            setIsModalOpen(false);
        }
    }, [isConnected, isModalOpen]);

    return (
        <div className="mt-16 flex justify-center">
            <button
                className="bg-[#C68F00] hover:bg-[#b07e00] text-white font-semibold text-lg px-[80px] py-[20px] rounded-md transition"
                onClick={handleBuyOrConnect}
            >
                Buy CNT
            </button>
            {isModalOpen && (
                <WalletModal
                    connectors={connectors}
                    handleConnect={handleWalletConnect}
                    isLoading={isLoading}
                    error={error}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
}

export default BuyCNTBtn;