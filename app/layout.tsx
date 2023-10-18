"use client";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { goerli, mainnet } from "viem/chains";
import { AlchemyContextWrapper } from "@/context/alchemy.context";
import { SubgraphContextWrapper } from "@/context/subgraph.context";
import { CoingeckoContextWrapper } from "@/context/coingecko.context";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID || "",

    // Required
    appName: "ApeBlendr",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
    chains: [goerli]
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"></link>
      </head>
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="light" customTheme={{
          "--ck-font-family": '"Space Mono", monospace',
          "--ck-connectbutton-color": "#fff",
          "--ck-connectbutton-hover-color": "#fff",
          "--ck-connectbutton-background": "rgb(0, 25, 234)",
          "--ck-connectbutton-active-color": "#fff",
          "--ck-connectbutton-active-background": "rgb(0, 25, 234)",
          "--ck-connectbutton-hover-background": "#0b1db5",
          "--ck-connectbutton-border-radius": "4px"
        }}>
          <AlchemyContextWrapper>
            <SubgraphContextWrapper>
              <CoingeckoContextWrapper>
              <body>
                <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                  <Navbar />
                  <div style={{ flexGrow: 1 }}>{children}</div>
                  <Footer />
                </div>
              </body>
              </CoingeckoContextWrapper>
            </SubgraphContextWrapper>
          </AlchemyContextWrapper>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}
