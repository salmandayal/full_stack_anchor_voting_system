import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React from "react";
import { Separator } from "./separator";

const Header = () => {
  return (
    <div>
      <div className='w-[100%] m-auto flex justify-between items-center py-[10px]'>
        <div>
          <h2>Opika Voting System</h2>
        </div>
        <div>
          <WalletMultiButton />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Header;
