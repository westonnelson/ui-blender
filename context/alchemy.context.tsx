import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { FC, ReactNode } from "react";
import ApeBlendrContract from "../contracts/ApeBlendr.json";
import ApeCoinContract from "../contracts/ApeCoin.json";
import {
  AlchemyContextType,
  AlchemyType,
  ApeBlendrType,
} from "../types/alchemy";
import { BigNumber, Contract, ethers } from "ethers";
import { AlchemyProvider } from "@ethersproject/providers";
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const AlchemyContext = createContext<AlchemyContextType>({
  alchemy: undefined,
});

export const AlchemyContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const [alchemy, setAlchemy] = useState<AlchemyType>();

  useEffect(() => {
    const initApeBlendrData = async () => {

      const alchemyProvider = new AlchemyProvider(
        `${process.env.ALCHEMY_NETWORK}`,
        `${process.env.ALCHEMY_API_KEY}`
      );

      const apeCoinContract = new Contract(
        process.env.APE_COIN_CONTRACT as any,
        ApeCoinContract?.abi,
        alchemyProvider
      );

      const apeBlendrContract = new Contract(
        process.env.APE_BLENDR_CONTRACT as any,
        ApeBlendrContract?.abi,
        alchemyProvider
      );

      let userApeCoinBalance = BigNumber.from(0);
      let userStakedBalance = BigNumber.from(0);

      if (address) {
        userApeCoinBalance = await apeCoinContract.balanceOf(address);
        userStakedBalance = await apeBlendrContract.balanceOf(address);
      }

      const hasEpochEnded = await apeBlendrContract.hasEpochEnded();
      const epochEndAt = await apeBlendrContract.epochEndAt();
      const apeCoinStake = await apeBlendrContract.getApeCoinStake();
      const totalPrizeDraws = await apeBlendrContract.totalPrizeDraws();

      setAlchemy({
        apeBlendrData: {
          hasEpochEnded: hasEpochEnded,
          epochEndAt: epochEndAt,
          apeCoinStakeDeposited: apeCoinStake.deposited,
          apeCoinStakeUnclaimed: apeCoinStake.unclaimed,
          totalPrizeDraws: totalPrizeDraws,
          userStakedBalance: userStakedBalance,
          userApeCoinBalance: userApeCoinBalance
        } as ApeBlendrType
      });
    };
    initApeBlendrData();
  }, [address]);

  return (
    <AlchemyContext.Provider
      value={{
        alchemy,
      }}
    >
      {children}
    </AlchemyContext.Provider>
  );
};

export function useAlchemyContext() {
  return useContext(AlchemyContext);
}
