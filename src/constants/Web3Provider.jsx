import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
// const projectId = "1c555d0869221d338c8431bde08d195b"; //initial
const projectId = "e2db61f618cb86b89e2c60d0ead2dc44";

// 2. Create a metadata object - optional
const metadata = {
  name: "Egomart Exchange",
  description: "Decentralized Trading Reimagined",
  url: "https://app.egomart.org", // origin must match your domain & subdomain
  icons: ["https://app.egomart.org/egomart_logo.png"],
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
// 3. Set the networks
const networks = [mainnet, arbitrum];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
