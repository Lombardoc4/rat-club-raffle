/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateRaffle = /* GraphQL */ `subscription OnCreateRaffle($filter: ModelSubscriptionRaffleFilterInput) {
  onCreateRaffle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRaffleSubscriptionVariables,
  APITypes.OnCreateRaffleSubscription
>;
export const onUpdateRaffle = /* GraphQL */ `subscription OnUpdateRaffle($filter: ModelSubscriptionRaffleFilterInput) {
  onUpdateRaffle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRaffleSubscriptionVariables,
  APITypes.OnUpdateRaffleSubscription
>;
export const onDeleteRaffle = /* GraphQL */ `subscription OnDeleteRaffle($filter: ModelSubscriptionRaffleFilterInput) {
  onDeleteRaffle(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRaffleSubscriptionVariables,
  APITypes.OnDeleteRaffleSubscription
>;
export const onCreateRaffleEntry = /* GraphQL */ `subscription OnCreateRaffleEntry(
  $filter: ModelSubscriptionRaffleEntryFilterInput
) {
  onCreateRaffleEntry(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRaffleEntrySubscriptionVariables,
  APITypes.OnCreateRaffleEntrySubscription
>;
export const onUpdateRaffleEntry = /* GraphQL */ `subscription OnUpdateRaffleEntry(
  $filter: ModelSubscriptionRaffleEntryFilterInput
) {
  onUpdateRaffleEntry(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRaffleEntrySubscriptionVariables,
  APITypes.OnUpdateRaffleEntrySubscription
>;
export const onDeleteRaffleEntry = /* GraphQL */ `subscription OnDeleteRaffleEntry(
  $filter: ModelSubscriptionRaffleEntryFilterInput
) {
  onDeleteRaffleEntry(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRaffleEntrySubscriptionVariables,
  APITypes.OnDeleteRaffleEntrySubscription
>;
export const onCreateWinner = /* GraphQL */ `subscription OnCreateWinner($filter: ModelSubscriptionWinnerFilterInput) {
  onCreateWinner(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateWinnerSubscriptionVariables,
  APITypes.OnCreateWinnerSubscription
>;
export const onUpdateWinner = /* GraphQL */ `subscription OnUpdateWinner($filter: ModelSubscriptionWinnerFilterInput) {
  onUpdateWinner(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateWinnerSubscriptionVariables,
  APITypes.OnUpdateWinnerSubscription
>;
export const onDeleteWinner = /* GraphQL */ `subscription OnDeleteWinner($filter: ModelSubscriptionWinnerFilterInput) {
  onDeleteWinner(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteWinnerSubscriptionVariables,
  APITypes.OnDeleteWinnerSubscription
>;
