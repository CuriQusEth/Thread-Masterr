import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors';
import { DATA_SUFFIX } from '../erc8021';

export const config = createConfig({
  chains: [base],
  multiInjectedProviderDiscovery: false,
  transports: {
    [base.id]: http(),
  },
  dataSuffix: DATA_SUFFIX,
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Thread Master" }),
    walletConnect({ projectId: "YOUR_WC_PROJECT_ID" }),
  ],
});

