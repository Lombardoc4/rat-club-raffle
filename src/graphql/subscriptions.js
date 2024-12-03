/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRaffleEntry = /* GraphQL */ `
  subscription OnCreateRaffleEntry(
    $filter: ModelSubscriptionRaffleEntryFilterInput
  ) {
    onCreateRaffleEntry(filter: $filter) {
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
export const onUpdateRaffleEntry = /* GraphQL */ `
  subscription OnUpdateRaffleEntry(
    $filter: ModelSubscriptionRaffleEntryFilterInput
  ) {
    onUpdateRaffleEntry(filter: $filter) {
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
export const onDeleteRaffleEntry = /* GraphQL */ `
  subscription OnDeleteRaffleEntry(
    $filter: ModelSubscriptionRaffleEntryFilterInput
  ) {
    onDeleteRaffleEntry(filter: $filter) {
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
export const onCreateWinner = /* GraphQL */ `
  subscription OnCreateWinner($filter: ModelSubscriptionWinnerFilterInput) {
    onCreateWinner(filter: $filter) {
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
export const onUpdateWinner = /* GraphQL */ `
  subscription OnUpdateWinner($filter: ModelSubscriptionWinnerFilterInput) {
    onUpdateWinner(filter: $filter) {
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
export const onDeleteWinner = /* GraphQL */ `
  subscription OnDeleteWinner($filter: ModelSubscriptionWinnerFilterInput) {
    onDeleteWinner(filter: $filter) {
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
