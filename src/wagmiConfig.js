import { createConfig, http } from 'wagmi';
import { bscTestnet, mainnet, baseSepolia } from 'wagmi/chains';
import { walletConnect, metaMask, coinbaseWallet } from '@wagmi/connectors';

const projectId = '26dec469283ee31ae98465e63aeb64f8'; // Get this from WalletConnect Cloud (https://cloud.walletconnect.com)

export const config = createConfig({
  chains: [mainnet, bscTestnet, baseSepolia], // Add the chains you want to support
  transports: {
    [mainnet.id]: http(),
    [bscTestnet.id]: http(),
    [baseSepolia.id]: http(),
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