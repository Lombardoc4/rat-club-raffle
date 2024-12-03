/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRaffleEntry = /* GraphQL */ `
  query GetRaffleEntry($id: ID!) {
    getRaffleEntry(id: $id) {
      id
      name
      email
      raffle_id
      patreon
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRaffleEntries = /* GraphQL */ `
  query ListRaffleEntries(
    $filter: ModelRaffleEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRaffleEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        raffle_id
        patreon
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWinner = /* GraphQL */ `
  query GetWinner($id: ID!) {
    getWinner(id: $id) {
      id
      name
      email
      raffle_id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listWinners = /* GraphQL */ `
  query ListWinners(
    $filter: ModelWinnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWinners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        raffle_id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
