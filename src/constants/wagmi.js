import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "4e51e1c178ab6aec8290797c80d8dc57",
  chains: [mainnet, polygon, optimism, arbitrum, base],
});
