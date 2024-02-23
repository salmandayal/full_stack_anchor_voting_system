import { FC, ReactNode, useMemo, useState } from "react";
import "./App.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import Header from "./components/ui/header";
import { Content } from "./components/ui/content";

import("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  return (
    <Context>
      <div className='container items-center'>
        <Header />
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight mt-4'>
          A Voting system to create vote topics and vote on them.
        </h3>
        <Content />
      </div>
    </Context>
  );
}

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
