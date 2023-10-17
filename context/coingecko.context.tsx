import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { CoingeckoContextType, CoingeckoType } from "@/types/coingecko";
import axios from "axios";

const CoingeckoContext = createContext<CoingeckoContextType>({
  coingeckoData: undefined,
});

export const CoingeckoContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [coingeckoData, setCoingeckoData] = useState<CoingeckoType>();

  useEffect(() => {
    const initCoingeckoData = async () => {
      const apeCoinPrice = await axios.get(
        `${process.env.COINGECKO_API_URL}ids=apecoin&vs_currencies=usd`
      );
      setCoingeckoData({
        apeCoinUSDPrice: apeCoinPrice?.data?.apecoin?.usd,
      });
    };

    initCoingeckoData();
  }, []);

  return (
    <CoingeckoContext.Provider
      value={{
        coingeckoData,
      }}
    >
      {children}
    </CoingeckoContext.Provider>
  );
};

export function useCoingeckoContext() {
  return useContext(CoingeckoContext);
}
