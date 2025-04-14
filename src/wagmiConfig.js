import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect, metaMask, coinbaseWallet } from '@wagmi/connectors';

const projectId = '26dec469283ee31ae98465e63aeb64f8'; // Get this from WalletConnect Cloud (https://cloud.walletconnect.com)

export const config = createConfig({
  chains: [mainnet, sepolia], // Add the chains you want to support
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId,
      showQrModal: true, // This will show the QR code modal like in your screenshot
    }),
    metaMask(),
    coinbaseWallet(),
  ],
});