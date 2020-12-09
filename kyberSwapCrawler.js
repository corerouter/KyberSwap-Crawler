import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';

const ENDPOINT = "https://api.thegraph.com/subgraphs/name/blocklytics/kyberswap"

const client = new ApolloClient({
  uri: ENDPOINT,
});

const QUERY = gql`
    {
      proxyTrades(
        first: 5, skip: 0, 
        orderBy: createdAtBlockTimestamp, 
        orderDirection: desc) {
        id
        trader {
          id
        }
        src
        dest
        actualSrcAmount
        actualDestAmount
        createdAtBlockTimestamp
        createdAtBlockNumber
        createdAtLogIndex
      }
    }
`;

function tradeRates() {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return "Loading now...";
  if (error) return "Error response";

  return data.proxyTrades.map(({ id, actualSrcAmount, actualDestAmount }) => (
    {id}: {actualSrcAmount / actualDestAmount}
  ));
}