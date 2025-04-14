import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect, metaMask, coinbaseWallet } from '@wagmi/connectors';

const projectId = '26dec469283ee31ae98465e63aeb64f8'; // Get this from WalletConnect Cloud (https://cloud.walletconnect.com)

// Public RPC for Sepolia (using Alchemy's public endpoint as an example)
const sepoliaPublicRpc = 'https://sepolia.infura.io'
// You might want to get your own free key from Alchemy/Infura for better reliability

export const config = createConfig({
  chains: [mainnet, sepolia], // Include mainnet and sepolia
  transports: {
    [mainnet.id]: http(),
    // Use a specific public RPC for Sepolia
    [sepolia.id]: http(sepoliaPublicRpc),
  },
  connectors: [
    walletConnect({
      projectId,
      showQrModal: true,
    }),
    metaMask(),
    coinbaseWallet(),
  ],
});