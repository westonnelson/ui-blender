import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { FC, ReactNode } from "react";
import ApeBlendrContract from "../contracts/ApeBlendr.json";
import ApeCoinContract from "../contracts/ApeCoin.json";
import {
  AlchemyContextType,
  AlchemyType,
  ApeBlendrType,
} from "../types/alchemy";
import { Contract, ethers } from "ethers";
import { AlchemyProvider } from "@ethersproject/providers";

const AlchemyContext = createContext<AlchemyContextType>({
  alchemy: undefined,
});

export const AlchemyContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
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
          totalPrizeDraws: totalPrizeDraws
        } as ApeBlendrType
      });
    };
    initApeBlendrData();
  }, []);

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
