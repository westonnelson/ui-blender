/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false };
    return config;
  },
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
    ALCHEMY_NETWORK: process.env.ALCHEMY_NETWORK,
    NEXT_PUBLIC_ALCHEMY_NETWORK: process.env.NEXT_PUBLIC_ALCHEMY_NETWORK,
    NEXT_PUBLIC_DEFAULT_CHAIN: process.env.NEXT_PUBLIC_DEFAULT_CHAIN,
    APE_COIN_CONTRACT: process.env.APE_COIN_CONTRACT,
    APE_BLENDR_CONTRACT: process.env.APE_BLENDR_CONTRACT,
    APE_BLENDR_SUBGRAPH: process.env.APE_BLENDR_SUBGRAPH,
  },
};
