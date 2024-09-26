import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const projectId = "1c555d0869221d338c8431bde08d195b";
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
  iconUrls: ["https://app.egomart.org/img/egax_logo.png"], // Replace with actual icon URL
};
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, egochain],
    transports: {
      // RPC URL for each chain
      //   [mainnet.id]: http(
      //     `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      //   ),
      [egochain.id]: http("https://mainnet.egochain.org"),
    },

    // Required API Keys
    walletConnectProjectId: projectId,

    // Required App Info
    appName: "Egomart Exchange",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
