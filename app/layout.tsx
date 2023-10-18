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
    alchemyId: process.env.ALCHEMY_API_KEY,
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID || "",
    appName: "ApeBlendr",
    appDescription:
      "Enter the $APE Blendr and win prizes every week. No one loses ever.",
    appUrl: "https://apeblendr.com",
    appIcon: "https://apeblendr.com/logo.png",
    chains: [goerli],
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
        <title>
          ApeBlendr - Enter the $APE Blendr and win prizes every week. No one
          loses ever.
        </title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
        <meta charSet="utf-8"></meta>
        <meta name="robots" content="index,follow"></meta>
        <meta
          name="description"
          content="ApeBlendr is a no-loss savings game inspired by PoolTogether and built on top of the ApeCoin protocol. Currently, ApeCoin provides a staking program with juicy yields, so why not gamify it?"
        ></meta>
        <meta
          property="og:title"
          content="ApeBlendr - Enter the $APE Blendr and win prizes every week. No one loses ever."
        ></meta>
        <meta
          property="og:description"
          content="ApeBlendr is a no-loss savings game inspired by PoolTogether and built on top of the ApeCoin protocol. Currently, ApeCoin provides a staking program with juicy yields, so why not gamify it?"
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:image"
          content="https://apeblendr.com/preview.png"
        ></meta>
        <meta
          property="og:image:alt"
          content="ApeBlendr - Enter the $APE Blendr and win prizes every week. No one loses ever."
        ></meta>
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="627"></meta>
        <meta name="viewport" content="width=device-width"></meta>
      </head>
      <WagmiConfig config={config}>
        <ConnectKitProvider
          mode="light"
          customTheme={{
            "--ck-font-family": '"Space Mono", monospace',
            "--ck-connectbutton-color": "#fff",
            "--ck-connectbutton-hover-color": "#fff",
            "--ck-connectbutton-background": "rgb(0, 25, 234)",
            "--ck-connectbutton-active-color": "#fff",
            "--ck-connectbutton-active-background": "rgb(0, 25, 234)",
            "--ck-connectbutton-hover-background": "#0b1db5",
            "--ck-connectbutton-border-radius": "4px",
          }}
        >
          <AlchemyContextWrapper>
            <SubgraphContextWrapper>
              <CoingeckoContextWrapper>
                <body>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      minHeight: "100vh",
                    }}
                  >
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
