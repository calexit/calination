import React, { useState, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import WalletConnectIcon from '../assets/walletconnect-seeklogo.png';
import WalletModal from "./WalletModal";

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
                className="bg-[#C68F00] hover:bg-[#b07e00] text-white font-semibold text-lg px-[80px] py-[20px] rounded-md transition"
                onClick={() => {
                    buyCNT();
                }}
            >
                Buy CNT
            </button>
            {isModalOpen && (
                <WalletModal
                    connectors={connectors}
                    handleConnect={handleConnect}
                    isLoading={isLoading}
                    error={error}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
}

export default BuyCNTBtn;