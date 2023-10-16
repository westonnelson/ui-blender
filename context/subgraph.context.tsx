import { createContext, useContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { SubgraphContextType, SubgraphType } from "../types/subgraph";
import {
  apeBlendrStatisticsEntity,
  apeBlendrAwardingFinishedEntities,
  queryApeBlendrSubgraphData,
} from "../utils/graphql/queries";

const SubgraphContext = createContext<SubgraphContextType>({
  subgraph: undefined,
});

export const SubgraphContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [subgraph, setSubgraph] = useState<SubgraphType>();

  useEffect(() => {
    const initSubgraph = async () => {
      const blendrStatistics = await queryApeBlendrSubgraphData(
        apeBlendrStatisticsEntity()
      );
      const prizeDraws = await queryApeBlendrSubgraphData(
        apeBlendrAwardingFinishedEntities()
      );
      setSubgraph({
        prizeDraws: prizeDraws.awardingFinisheds,
        apeBlendrStatistics: blendrStatistics.apeBlendrStatisticsEntity,
      });
    };

    initSubgraph();
  }, []);

  return (
    <SubgraphContext.Provider
      value={{
        subgraph,
      }}
    >
      {children}
    </SubgraphContext.Provider>
  );
};

export function useSubgraphContext() {
  return useContext(SubgraphContext);
}
