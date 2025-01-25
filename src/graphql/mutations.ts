/* tslint:disable */

// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createRaffle = /* GraphQL */ `mutation CreateRaffle(
  $input: CreateRaffleInput!
  $condition: ModelRaffleConditionInput
) {
  createRaffle(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateRaffleMutationVariables,
  APITypes.CreateRaffleMutation
>;
export const updateRaffle = /* GraphQL */ `mutation UpdateRaffle(
  $input: UpdateRaffleInput!
  $condition: ModelRaffleConditionInput
) {
  updateRaffle(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateRaffleMutationVariables,
  APITypes.UpdateRaffleMutation
>;
export const deleteRaffle = /* GraphQL */ `mutation DeleteRaffle(
  $input: DeleteRaffleInput!
  $condition: ModelRaffleConditionInput
) {
  deleteRaffle(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRaffleMutationVariables,
  APITypes.DeleteRaffleMutation
>;
export const createRaffleEntry = /* GraphQL */ `mutation CreateRaffleEntry(
  $input: CreateRaffleEntryInput!
  $condition: ModelRaffleEntryConditionInput
) {
  createRaffleEntry(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateRaffleEntryMutationVariables,
  APITypes.CreateRaffleEntryMutation
>;
export const updateRaffleEntry = /* GraphQL */ `mutation UpdateRaffleEntry(
  $input: UpdateRaffleEntryInput!
  $condition: ModelRaffleEntryConditionInput
) {
  updateRaffleEntry(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateRaffleEntryMutationVariables,
  APITypes.UpdateRaffleEntryMutation
>;
export const deleteRaffleEntry = /* GraphQL */ `mutation DeleteRaffleEntry(
  $input: DeleteRaffleEntryInput!
  $condition: ModelRaffleEntryConditionInput
) {
  deleteRaffleEntry(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRaffleEntryMutationVariables,
  APITypes.DeleteRaffleEntryMutation
>;
export const createWinner = /* GraphQL */ `mutation CreateWinner(
  $input: CreateWinnerInput!
  $condition: ModelWinnerConditionInput
) {
  createWinner(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateWinnerMutationVariables,
  APITypes.CreateWinnerMutation
>;
export const updateWinner = /* GraphQL */ `mutation UpdateWinner(
  $input: UpdateWinnerInput!
  $condition: ModelWinnerConditionInput
) {
  updateWinner(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateWinnerMutationVariables,
  APITypes.UpdateWinnerMutation
>;
export const deleteWinner = /* GraphQL */ `mutation DeleteWinner(
  $input: DeleteWinnerInput!
  $condition: ModelWinnerConditionInput
) {
  deleteWinner(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteWinnerMutationVariables,
  APITypes.DeleteWinnerMutation
>;
