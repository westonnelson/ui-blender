import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

export const apeBlendrStatisticsEntity = () => `
  query ApeBlendrStatistics {
    apeBlendrStatisticsEntity(id: "0x1") {
        playersCount
      }
  }
`;

export const apeBlendrAwardingFinishedEntities = () => `
  query AwardingFinishedEntities {
    awardingFinisheds(first: 15, orderBy: blockTimestamp, orderDirection: desc) {
        blockTimestamp
        awardForDraw
        winner
    }
  }
`;

export const queryApeBlendrSubgraphData = async (graphQuery: any) => {
  const client = new ApolloClient({
    uri: process.env.APE_BLENDR_SUBGRAPH,
    cache: new InMemoryCache(),
  });

  const graphData = await client.query({
    query: gql`
      ${graphQuery}
    `,
  });

  return graphData?.data;
};
