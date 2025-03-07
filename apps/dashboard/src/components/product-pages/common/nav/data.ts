import type { SectionItemProps, SectionProps } from "./types";

export const PRODUCT_SECTIONS: SectionProps[] = [
  {
    name: "Connect",
    label: "connect",
    description: "Onboard, authenticate and manage users",
    link: "/connect",
    icon: require("../../../../../public/assets/landingpage/connect-icon.png"),
    section: "connect-v2",
  },
  {
    name: "Contracts",
    label: "contracts",
    description: "Create, deploy, and interact with smart contracts",
    link: "/contracts",
    icon: require("../../../../../public/assets/landingpage/contracts-icon.png"),
    section: "contracts-v2",
  },
  {
    name: "Engine",
    label: "engine",
    description: "Connect your application to decentralized networks",
    link: "/engine",
    icon: require("../../../../../public/assets/landingpage/engine-icon.png"),
    section: "engine-v2",
  },
];

export const MOBILE_PRODUCTS_SECTIONS: SectionItemProps[] = [
  {
    name: "Connect",
    label: "connect",
    description: "Onboard, authenticate and manage users",
    link: "/connect",
    dashboardLink: "/connect",
    icon: require("../../../../../public/assets/landingpage/connect-icon.png"),
    section: "connect",
    inLandingPage: true,
  },
  {
    name: "Contracts",
    label: "contracts",
    description: "Create, deploy, and interact with smart contracts",
    link: "/contracts",
    icon: require("../../../../../public/assets/landingpage/contracts-icon.png"),
    section: "contracts",
  },
  {
    name: "Engine",
    label: "engine",
    description: "Connect your application to decentralized networks",
    link: "/engine",
    dashboardLink: "/engine",
    icon: require("../../../../../public/assets/product-icons/engine.png"),
    section: "infrastructure",
  },
];

export const PRODUCTS: SectionItemProps[] = [
  {
    name: "Deploy",
    label: "deploy",
    description: "Contract deployment built for any use-case",
    link: "/deploy",
    dashboardLink: "/dashboard/contracts/deploy",
    icon: require("../../../../../public/assets/product-icons/deploy.png"),
    section: "contracts",
    inLandingPage: true,
  },
  {
    name: "Build",
    label: "contractkit",
    description: "Write your own smart contracts",
    link: "/build",
    dashboardLink: "/dashboard/contracts/build",
    icon: require("../../../../../public/assets/product-icons/extensions.png"),
    section: "contracts",
    inLandingPage: true,
  },
  {
    name: "Interact",
    label: "interact",
    description: "Integrate smart contract interactions directly into your app",
    link: "/interact",
    dashboardLink: "https://portal.thirdweb.com/contracts/interact/overview",
    icon: require("../../../../../public/assets/product-icons/interact.png"),
    section: "contracts",
    inLandingPage: true,
  },
  {
    name: "Explore",
    label: "explore",
    description: "Ready-to-deploy contracts",
    link: "/smart-contracts",
    icon: require("../../../../../public/assets/product-icons/contracts.png"),
    section: "contracts",
    inLandingPage: true,
  },
  {
    name: "Publish",
    label: "publish",
    description: "Publish your contracts on-chain",
    link: "/publish",
    icon: require("../../../../../public/assets/product-icons/publish.png"),
    section: "contracts",
  },
  {
    name: "Sign in",
    label: "sign-in",
    description:
      "Flexible user sign-up flow with wallet and social sign-in methods",
    link: "/connect",
    dashboardLink: "/dashboard/connect/playground",
    icon: require("../../../../../public/assets/product-icons/wallet-sdk.png"),
    section: "connect",
    inLandingPage: true,
  },
  {
    name: "Account Abstraction",
    label: "smart-wallet",
    description: "Complete toolkit for Account Abstraction",
    link: "/account-abstraction",
    dashboardLink: "/dashboard/connect/account-abstraction",
    icon: require("../../../../../public/assets/product-icons/smart-wallet.png"),
    section: "connect",
    inLandingPage: true,
  },
  {
    name: "In-App Wallets",
    label: "embedded-wallets",
    description: "Email & social login wallets for your customers",
    link: "/embedded-wallets",
    dashboardLink: "/dashboard/connect/in-app-wallets",
    icon: require("../../../../../public/assets/product-icons/embedded-wallet.png"),
    section: "connect",
    inLandingPage: true,
  },
  {
    name: "Pay",
    label: "pay",
    description:
      "Easily integrate fiat onramps and cross-chain crypto purchases",
    link: "/pay",
    dashboardLink: "/dashboard/connect/pay",
    icon: require("../../../../../public/assets/product-icons/pay.svg"),
    section: "connect",
    inLandingPage: true,
  },
  {
    name: "Auth",
    label: "auth",
    description: "Authenticate users with their wallets",
    link: "/auth",
    icon: require("../../../../../public/assets/product-icons/auth.png"),
    section: "connect",
  },
  {
    name: "Storage",
    label: "storage",
    description: "Secure, fast, decentralized storage",
    link: "/storage",
    icon: require("../../../../../public/assets/product-icons/storage.png"),
    section: "infrastructure",
  },
  {
    name: "RPC Edge",
    label: "rpc-edge",
    description: "Enterprise-grade RPCs, for free",
    link: "/rpc-edge",
    icon: require("../../../../../public/assets/product-icons/rpc-edge.png"),
    section: "infrastructure",
  },
  {
    name: "Sponsored Transactions",
    label: "sponsored-transactions",
    description: "Remove all user friction with invisible transactions",
    link: "/sponsored-transactions",
    icon: require("../../../../../public/assets/product-icons/sponsored-transactions.png"),
    section: "payments",
  },
  {
    name: "Engine",
    label: "engine",
    description: "HTTP server with contract APIs and backend wallets",
    link: "/engine",
    dashboardLink: "/dashboard/engine",
    icon: require("../../../../../public/assets/product-icons/engine.png"),
    section: "infrastructure",
    inLandingPage: true,
  },
];

const PRODUCT_LABELS = PRODUCTS.map((product) => product.label);
export type ProductLabel = (typeof PRODUCT_LABELS)[number];

export const SOLUTIONS: SectionItemProps[] = [
  {
    name: "Gaming",
    label: "gaming",
    description: "Integrate web3 into games",
    link: "/solutions/gaming",
    icon: require("../../../../../public/assets/solutions-icons/gaming.svg"),
    section: "solutions",
  },
  {
    name: "Chains",
    label: "chains",
    description: "All-in-one dev tools for your chain",
    link: "/solutions/chains",
    icon: require("../../../../../public/assets/solutions-icons/chains.svg"),
    section: "solutions",
  },
  {
    name: "Minting",
    label: "minting",
    description: "Build and mint NFTs at scale easily",
    link: "/solutions/minting",
    icon: require("../../../../../public/assets/solutions-icons/minting.svg"),
    section: "solutions",
  },
];

export const COMPANY: SectionItemProps[] = [
  {
    name: "Mission",
    label: "mission",
    description: "Why we work in web3",
    link: "/mission",
    icon: require("../../../../../public/assets/tw-icons/mission.svg"),
    section: "company",
  },
  {
    name: "Blog",
    label: "blog",
    description: "Our latest news and updates",
    link: "https://blog.thirdweb.com",
    icon: require("../../../../../public/assets/tw-icons/datastore.png"),
    section: "company",
  },
];

export const DEVELOPER_SECTIONS = [
  {
    name: "Resources",
    label: "resources",
    description: "Get started and learn how to build with thirdweb platform",
  },
  {
    name: "Dev Tools",
    label: "tools",
    description: "Interfaces for deploying and interacting with contracts",
  },
  {
    name: "SDKs",
    label: "sdks",
    description: "Smart and intuitive SDKs to get you up to speed",
  },
];

export const DEVELOPER_RESOURCES: SectionItemProps[] = [
  {
    name: "Docs",
    label: "docs",
    description: "Complete thirdweb documentation",
    link: "https://portal.thirdweb.com",
    icon: require("../../../../../public/assets/tw-icons/docs.svg"),
    section: "resources",
  },
  {
    name: "Templates",
    label: "templates",
    description: "Ready-to-ship repositories",
    link: "/templates",
    icon: require("../../../../../public/assets/tw-icons/templates.svg"),
    section: "resources",
  },
  {
    name: "Guides",
    label: "guides",
    description: "Learn how to build with thirdweb",
    link: "https://blog.thirdweb.com/guides",
    icon: require("../../../../../public/assets/tw-icons/guides.svg"),
    section: "resources",
  },
  {
    name: "Open Source",
    label: "open-source",
    description: "Learn how to contribute to thirdweb",
    link: "/open-source",
    icon: require("../../../../../public/assets/tw-icons/opensource.svg"),
    section: "resources",
  },
  {
    name: "TypeScript",
    label: "typescript",
    description: "Integrate web3 into your app",
    link: "https://portal.thirdweb.com/typescript/v5",
    icon: require("../../../../../public/assets/product-icons/typescript.svg"),
    section: "sdks",
  },
  {
    name: "React",
    label: "react",
    description: "Components and Hooks for wallets and contracts",
    link: "https://portal.thirdweb.com/typescript/v5/react",
    icon: require("../../../../../public/assets/product-icons/react.svg"),
    section: "sdks",
  },
  {
    name: "React Native",
    label: "react-native",
    description: "React Native hooks and components for mobile apps",
    link: "https://portal.thirdweb.com/react-native/v0",
    icon: require("../../../../../public/assets/product-icons/react.svg"),
    section: "sdks",
  },
  {
    name: "Unity",
    label: "unity",
    description: "Build games with blockchain and web3 capabilities",
    link: "https://portal.thirdweb.com/unity",
    icon: require("../../../../../public/assets/product-icons/unity.svg"),
    section: "sdks",
  },
  {
    name: ".NET",
    label: ".net",
    description: "Build .NET apps and Godot games",
    link: "https://portal.thirdweb.com/dotnet",
    icon: require("../../../../../public/assets/product-icons/net.svg"),
    section: "sdks",
  },
  {
    name: "Dashboard",
    label: "dashboard",
    description: "Manage and analyze contract activity",
    link: "/dashboards",
    icon: require("../../../../../public/assets/product-icons/dashboard.svg"),
    section: "tools",
  },
  {
    name: "Solidity",
    label: "solidity",
    description: "Build custom smart contracts efficiently",
    link: "https://portal.thirdweb.com/contracts/build/overview",
    icon: require("../../../../../public/assets/product-icons/solidity.svg"),
    section: "sdks",
  },
  {
    name: "CLI",
    label: "cli",
    description: "Tools to create, build, and deploy web3 applications",
    link: "https://portal.thirdweb.com/cli",
    icon: require("../../../../../public/assets/product-icons/cli.svg"),
    section: "tools",
  },
  {
    name: "Transaction Simulator",
    label: "transaction-simulator",
    description: "",
    link: "/tools/transaction-simulator",
    icon: require("../../../../../public/assets/product-icons/dashboard.svg"),
    section: "tools",
  },
  {
    name: "Wei Converter",
    label: "wei-converter",
    description: "",
    link: "https://thirdweb.com/tools/wei-converter",
    icon: require("../../../../../public/assets/product-icons/dashboard.svg"),
    section: "tools",
  },
  {
    name: "Hex Converter",
    label: "hex-converter",
    description: "",
    link: "https://thirdweb.com/tools/hex-converter",
    icon: require("../../../../../public/assets/product-icons/dashboard.svg"),
    section: "tools",
  },
  {
    name: "Unix Time Converter",
    label: "unixtime-converter",
    description: "",
    link: "https://thirdweb.com/tools/unixtime-converter",
    icon: require("../../../../../public/assets/product-icons/dashboard.svg"),
    section: "tools",
  },
  {
    name: "Keccak-256 Converter",
    label: "keccak256-converter",
    description: "",
    link: "https://thirdweb.com/tools/keccak256-converter",
    icon: require("../../../../../public/assets/product-icons/dashboard.svg"),
    section: "tools",
  },
];

export const metrics = [
  {
    title: "Pixels",
    description:
      "Building a web3 game with a thriving ecosystem — with VIP memberships, in-game tokens, and digital assets that users own, on the blockchain.",
    image: require("../../../../../public/assets/landingpage/pixels.png"),
    mobileImage: require("../../../../../public/assets/landingpage/mobile-pixels.png"),
    items: [
      {
        title: "100k+",
        description: "Daily Users",
      },
      {
        title: "1.5M+",
        description: "Monthly Transactions",
        colSpan: 2,
      },
      {
        title: "11k+",
        description: "VIP Members",
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/pixels-builds-an-onchain-ecosystem-for-its-web3-game",
    hoverBackground: "#622AFF",
  },
  {
    title: "Coinbase",
    description:
      "Bringing onchain experiences to the real world — with seamless NFT creation, delivery, & transaction management via the Coinbase Wallet app.",
    image: require("../../../../../public/assets/landingpage/coinbase.png"),
    mobileImage: require("../../../../../public/assets/landingpage/mobile-coinbase.png"),
    items: [
      {
        title: "1,000+",
        description: "Real-World Transactions",
        colSpan: 2,
      },
      {
        title: "4 Weeks",
        description: "Total Development Time",
        colSpan: 2,
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/coinbase-brings-onchain-experiences-to-life",
    hoverBackground: "#0053FF",
  },
  {
    title: "Mirror",
    description:
      "Empowering creators to build engaged audiences with 'Subscribe to Mint' NFTs — rewarding loyal fans for subscribing to their publication.",
    image: require("../../../../../public/assets/landingpage/mirror.png"),
    mobileImage: require("../../../../../public/assets/landingpage/mobile-mirror.png"),
    items: [
      {
        title: "2M+",
        description: "NFTs Minted",
      },
      {
        title: "1M+",
        description: "New Subscribers",
        colSpan: 2,
      },
      {
        title: "120+",
        description: "Publications",
      },
    ],
    href: "https://blog.thirdweb.com/case-studies/mirror-creators-build-loyal-audiences-with-subscriber-nfts",
    hoverBackground: "#007CFF",
  },
];
