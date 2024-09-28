import React from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet, evmos } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "26b519d3d86aff8b0e36552c4c170ce8";

// 2. Create wagmiConfig
const metadata = {
  name: "EgochainFarming",
  description: "EgochainFarming",
  url: "https://egochain.org", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const egochain = {
  id: 5439,
  name: "Egochain",
  network: "egochain",
  nativeCurrency: {
    name: "Egochain",
    symbol: "EGAX",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.egochain.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "EgoScan",
      url: "https://egoscan.io/",
    },
  },
  iconUrls: ["https://www.egochain.org/img/egax_logo.png"], // Replace with actual icon URL
};

const chains = [mainnet, arbitrum, evmos, egochain];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // Optional - Override createConfig parameters
  // ...wagmiOptions,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default Web3ModalProvider;
