import { ethers } from "ethers";

export type ApeBlendrType = {
  hasEpochEnded: boolean;
  epochEndAt: ethers.BigNumber;
  apeCoinStakeDeposited: ethers.BigNumber;
  apeCoinStakeUnclaimed: ethers.BigNumber;
  totalPrizeDraws: ethers.BigNumber;
  userStakedBalance: ethers.BigNumber;
  userApeCoinBalance: ethers.BigNumber;
  userAllowance: ethers.BigNumber;
};

export type AlchemyType = {
  apeBlendrData: ApeBlendrType | undefined;
};

export type AlchemyContextType = {
  alchemy: AlchemyType | undefined;
  updateUserData: () => void
};
