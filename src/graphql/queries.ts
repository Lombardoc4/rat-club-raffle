/* tslint:disable */

// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getRaffle = /* GraphQL */ `query GetRaffle($id: ID!) {
  getRaffle(id: $id) {
    id
    name
    images
    start_date
    end_date
    drawing_date
    patreon
    pid
    RaffleEntries {
      nextToken
      __typename
    }
    Winners {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetRaffleQueryVariables, APITypes.GetRaffleQuery>;
export const listRaffles = /* GraphQL */ `query ListRaffles(
  $filter: ModelRaffleFilterInput
  $limit: Int
  $nextToken: String
) {
  listRaffles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      images
      start_date
      end_date
      drawing_date
      patreon
      pid
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRafflesQueryVariables,
  APITypes.ListRafflesQuery
>;
export const getRaffleEntry = /* GraphQL */ `query GetRaffleEntry($id: ID!) {
  getRaffleEntry(id: $id) {
    id
    name
    email
    raffle_id
    patreon
    raffleID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRaffleEntryQueryVariables,
  APITypes.GetRaffleEntryQuery
>;
export const listRaffleEntries = /* GraphQL */ `query ListRaffleEntries(
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
      raffleID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRaffleEntriesQueryVariables,
  APITypes.ListRaffleEntriesQuery
>;
export const raffleEntriesByRaffleID =
  /* GraphQL */ `query RaffleEntriesByRaffleID(
  $raffleID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRaffleEntryFilterInput
  $limit: Int
  $nextToken: String
) {
  raffleEntriesByRaffleID(
    raffleID: $raffleID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      email
      raffle_id
      patreon
      raffleID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.RaffleEntriesByRaffleIDQueryVariables,
    APITypes.RaffleEntriesByRaffleIDQuery
  >;
export const getWinner = /* GraphQL */ `query GetWinner($id: ID!) {
  getWinner(id: $id) {
    id
    name
    email
    raffle_id
    raffleID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetWinnerQueryVariables, APITypes.GetWinnerQuery>;
export const listWinners = /* GraphQL */ `query ListWinners(
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
      raffleID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListWinnersQueryVariables,
  APITypes.ListWinnersQuery
>;
export const winnersByRaffleID = /* GraphQL */ `query WinnersByRaffleID(
  $raffleID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelWinnerFilterInput
  $limit: Int
  $nextToken: String
) {
  winnersByRaffleID(
    raffleID: $raffleID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      email
      raffle_id
      raffleID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.WinnersByRaffleIDQueryVariables,
  APITypes.WinnersByRaffleIDQuery
>;
