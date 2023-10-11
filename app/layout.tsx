"use client";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { goerli, mainnet } from "viem/chains";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: "demo",

    // Required
    appName: "You Create Web3 Dapp",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
    chains: [goerli, mainnet]
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="light" customTheme={{
          "--ck-font-family": '"Space Mono", monospace',
        }}>
          <body>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Navbar />
              <div style={{ flexGrow: 1 }}>{children}</div>
              <Footer />
            </div>
          </body>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}
