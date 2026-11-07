import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors';
import { DATA_SUFFIX } from '../erc8021';

// Base Mainnet (chainId 8453) configured for Denim 200ms canonical blocks
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
  },
  pollingInterval: 500, // Tuned for Base Mainnet Denim 200ms native block confirmation
  dataSuffix: DATA_SUFFIX,
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Thread Master" }),
    walletConnect({ projectId: "YOUR_WC_PROJECT_ID" }),
  ],
});

