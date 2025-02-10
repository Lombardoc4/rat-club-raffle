/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelRaffleFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  images?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  drawing_date?: ModelStringInput | null,
  patreon?: ModelBooleanInput | null,
  pid?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRaffleFilterInput | null > | null,
  or?: Array< ModelRaffleFilterInput | null > | null,
  not?: ModelRaffleFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelRaffleConnection = {
  __typename: "ModelRaffleConnection",
  items:  Array<Raffle | null >,
  nextToken?: string | null,
};

export type Raffle = {
  __typename: "Raffle",
  id: string,
  name: string,
  images?: Array< string > | null,
  start_date: string,
  end_date: string,
  drawing_date?: string | null,
  patreon: boolean,
  pid: string,
  RaffleEntries?: ModelRaffleEntryConnection | null,
  Winners?: ModelWinnerConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelRaffleEntryConnection = {
  __typename: "ModelRaffleEntryConnection",
  items:  Array<RaffleEntry | null >,
  nextToken?: string | null,
};

export type RaffleEntry = {
  __typename: "RaffleEntry",
  id: string,
  name: string,
  email: string,
  raffle_id: string,
  patreon: boolean,
  raffleID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelWinnerConnection = {
  __typename: "ModelWinnerConnection",
  items:  Array<Winner | null >,
  nextToken?: string | null,
};

export type Winner = {
  __typename: "Winner",
  id: string,
  name: string,
  email: string,
  raffle_id: string,
  raffleID: string,
  createdAt: string,
  updatedAt: string,
};

export type CreateRaffleInput = {
  id?: string | null,
  name: string,
  images?: Array< string > | null,
  start_date: string,
  end_date: string,
  drawing_date?: string | null,
  patreon: boolean,
  pid: string,
};

export type ModelRaffleConditionInput = {
  name?: ModelStringInput | null,
  images?: ModelStringInput | null,
  start_date?: ModelStringInput | null,
  end_date?: ModelStringInput | null,
  drawing_date?: ModelStringInput | null,
  patreon?: ModelBooleanInput | null,
  pid?: ModelStringInput | null,
  and?: Array< ModelRaffleConditionInput | null > | null,
  or?: Array< ModelRaffleConditionInput | null > | null,
  not?: ModelRaffleConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateRaffleInput = {
  id: string,
  name?: string | null,
  images?: Array< string > | null,
  start_date?: string | null,
  end_date?: string | null,
  drawing_date?: string | null,
  patreon?: boolean | null,
  pid?: string | null,
};

export type DeleteRaffleInput = {
  id: string,
};

export type CreateRaffleEntryInput = {
  id?: string | null,
  name: string,
  email: string,
  raffle_id: string,
  patreon: boolean,
  raffleID: string,
};

export type ModelRaffleEntryConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  raffle_id?: ModelStringInput | null,
  patreon?: ModelBooleanInput | null,
  raffleID?: ModelIDInput | null,
  and?: Array< ModelRaffleEntryConditionInput | null > | null,
  or?: Array< ModelRaffleEntryConditionInput | null > | null,
  not?: ModelRaffleEntryConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateRaffleEntryInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  raffle_id?: string | null,
  patreon?: boolean | null,
  raffleID?: string | null,
};

export type DeleteRaffleEntryInput = {
  id: string,
};

export type CreateWinnerInput = {
  id?: string | null,
  name: string,
  email: string,
  raffle_id: string,
  raffleID: string,
};

export type ModelWinnerConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  raffle_id?: ModelStringInput | null,
  raffleID?: ModelIDInput | null,
  and?: Array< ModelWinnerConditionInput | null > | null,
  or?: Array< ModelWinnerConditionInput | null > | null,
  not?: ModelWinnerConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateWinnerInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  raffle_id?: string | null,
  raffleID?: string | null,
};

export type DeleteWinnerInput = {
  id: string,
};

export type ModelRaffleEntryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  raffle_id?: ModelStringInput | null,
  patreon?: ModelBooleanInput | null,
  raffleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelRaffleEntryFilterInput | null > | null,
  or?: Array< ModelRaffleEntryFilterInput | null > | null,
  not?: ModelRaffleEntryFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelWinnerFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  raffle_id?: ModelStringInput | null,
  raffleID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelWinnerFilterInput | null > | null,
  or?: Array< ModelWinnerFilterInput | null > | null,
  not?: ModelWinnerFilterInput | null,
};

export type ModelSubscriptionRaffleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  images?: ModelSubscriptionStringInput | null,
  start_date?: ModelSubscriptionStringInput | null,
  end_date?: ModelSubscriptionStringInput | null,
  drawing_date?: ModelSubscriptionStringInput | null,
  patreon?: ModelSubscriptionBooleanInput | null,
  pid?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRaffleFilterInput | null > | null,
  or?: Array< ModelSubscriptionRaffleFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionRaffleEntryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  raffle_id?: ModelSubscriptionStringInput | null,
  patreon?: ModelSubscriptionBooleanInput | null,
  raffleID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRaffleEntryFilterInput | null > | null,
  or?: Array< ModelSubscriptionRaffleEntryFilterInput | null > | null,
};

export type ModelSubscriptionWinnerFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  raffle_id?: ModelSubscriptionStringInput | null,
  raffleID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionWinnerFilterInput | null > | null,
  or?: Array< ModelSubscriptionWinnerFilterInput | null > | null,
};

export type ListRafflesDetailedQueryVariables = {
  filter?: ModelRaffleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRafflesDetailedQuery = {
  listRaffles?:  {
    __typename: "ModelRaffleConnection",
    items:  Array< {
      __typename: "Raffle",
      id: string,
      pid: string,
      name: string,
      images?: Array< string > | null,
      start_date: string,
      end_date: string,
      drawing_date?: string | null,
      RaffleEntries?:  {
        __typename: "ModelRaffleEntryConnection",
        items:  Array< {
          __typename: "RaffleEntry",
          name: string,
          email: string,
        } | null >,
      } | null,
      Winners?:  {
        __typename: "ModelWinnerConnection",
        items:  Array< {
          __typename: "Winner",
          name: string,
          email: string,
        } | null >,
      } | null,
    } | null >,
  } | null,
};

export type GetRaffleWithWinnersQueryVariables = {
  filter?: ModelRaffleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetRaffleWithWinnersQuery = {
  listRaffles?:  {
    __typename: "ModelRaffleConnection",
    items:  Array< {
      __typename: "Raffle",
      id: string,
      name: string,
      images?: Array< string > | null,
      start_date: string,
      end_date: string,
      drawing_date?: string | null,
      Winners?:  {
        __typename: "ModelWinnerConnection",
        items:  Array< {
          __typename: "Winner",
          name: string,
        } | null >,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateRaffleMutationVariables = {
  input: CreateRaffleInput,
  condition?: ModelRaffleConditionInput | null,
};

export type CreateRaffleMutation = {
  createRaffle?:  {
    __typename: "Raffle",
    id: string,
    name: string,
    images?: Array< string > | null,
    start_date: string,
    end_date: string,
    drawing_date?: string | null,
    patreon: boolean,
    pid: string,
    RaffleEntries?:  {
      __typename: "ModelRaffleEntryConnection",
      nextToken?: string | null,
    } | null,
    Winners?:  {
      __typename: "ModelWinnerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRaffleMutationVariables = {
  input: UpdateRaffleInput,
  condition?: ModelRaffleConditionInput | null,
};

export type UpdateRaffleMutation = {
  updateRaffle?:  {
    __typename: "Raffle",
    id: string,
    name: string,
    images?: Array< string > | null,
    start_date: string,
    end_date: string,
    drawing_date?: string | null,
    patreon: boolean,
    pid: string,
    RaffleEntries?:  {
      __typename: "ModelRaffleEntryConnection",
      nextToken?: string | null,
    } | null,
    Winners?:  {
      __typename: "ModelWinnerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRaffleMutationVariables = {
  input: DeleteRaffleInput,
  condition?: ModelRaffleConditionInput | null,
};

export type DeleteRaffleMutation = {
  deleteRaffle?:  {
    __typename: "Raffle",
    id: string,
    name: string,
    images?: Array< string > | null,
    start_date: string,
    end_date: string,
    drawing_date?: string | null,
    patreon: boolean,
    pid: string,
    RaffleEntries?:  {
      __typename: "ModelRaffleEntryConnection",
      nextToken?: string | null,
    } | null,
    Winners?:  {
      __typename: "ModelWinnerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRaffleEntryMutationVariables = {
  input: CreateRaffleEntryInput,
  condition?: ModelRaffleEntryConditionInput | null,
};

export type CreateRaffleEntryMutation = {
  createRaffleEntry?:  {
    __typename: "RaffleEntry",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    patreon: boolean,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRaffleEntryMutationVariables = {
  input: UpdateRaffleEntryInput,
  condition?: ModelRaffleEntryConditionInput | null,
};

export type UpdateRaffleEntryMutation = {
  updateRaffleEntry?:  {
    __typename: "RaffleEntry",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    patreon: boolean,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRaffleEntryMutationVariables = {
  input: DeleteRaffleEntryInput,
  condition?: ModelRaffleEntryConditionInput | null,
};

export type DeleteRaffleEntryMutation = {
  deleteRaffleEntry?:  {
    __typename: "RaffleEntry",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    patreon: boolean,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateWinnerMutationVariables = {
  input: CreateWinnerInput,
  condition?: ModelWinnerConditionInput | null,
};

export type CreateWinnerMutation = {
  createWinner?:  {
    __typename: "Winner",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateWinnerMutationVariables = {
  input: UpdateWinnerInput,
  condition?: ModelWinnerConditionInput | null,
};

export type UpdateWinnerMutation = {
  updateWinner?:  {
    __typename: "Winner",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteWinnerMutationVariables = {
  input: DeleteWinnerInput,
  condition?: ModelWinnerConditionInput | null,
};

export type DeleteWinnerMutation = {
  deleteWinner?:  {
    __typename: "Winner",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetRaffleQueryVariables = {
  id: string,
};

export type GetRaffleQuery = {
  getRaffle?:  {
    __typename: "Raffle",
    id: string,
    name: string,
    images?: Array< string > | null,
    start_date: string,
    end_date: string,
    drawing_date?: string | null,
    patreon: boolean,
    pid: string,
    RaffleEntries?:  {
      __typename: "ModelRaffleEntryConnection",
      nextToken?: string | null,
    } | null,
    Winners?:  {
      __typename: "ModelWinnerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRafflesQueryVariables = {
  filter?: ModelRaffleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRafflesQuery = {
  listRaffles?:  {
    __typename: "ModelRaffleConnection",
    items:  Array< {
      __typename: "Raffle",
      id: string,
      name: string,
      images?: Array< string > | null,
      start_date: string,
      end_date: string,
      drawing_date?: string | null,
      patreon: boolean,
      pid: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRaffleEntryQueryVariables = {
  id: string,
};

export type GetRaffleEntryQuery = {
  getRaffleEntry?:  {
    __typename: "RaffleEntry",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    patreon: boolean,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRaffleEntriesQueryVariables = {
  filter?: ModelRaffleEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRaffleEntriesQuery = {
  listRaffleEntries?:  {
    __typename: "ModelRaffleEntryConnection",
    items:  Array< {
      __typename: "RaffleEntry",
      id: string,
      name: string,
      email: string,
      raffle_id: string,
      patreon: boolean,
      raffleID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RaffleEntriesByRaffleIDQueryVariables = {
  raffleID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRaffleEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RaffleEntriesByRaffleIDQuery = {
  raffleEntriesByRaffleID?:  {
    __typename: "ModelRaffleEntryConnection",
    items:  Array< {
      __typename: "RaffleEntry",
      id: string,
      name: string,
      email: string,
      raffle_id: string,
      patreon: boolean,
      raffleID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetWinnerQueryVariables = {
  id: string,
};

export type GetWinnerQuery = {
  getWinner?:  {
    __typename: "Winner",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListWinnersQueryVariables = {
  filter?: ModelWinnerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWinnersQuery = {
  listWinners?:  {
    __typename: "ModelWinnerConnection",
    items:  Array< {
      __typename: "Winner",
      id: string,
      name: string,
      email: string,
      raffle_id: string,
      raffleID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type WinnersByRaffleIDQueryVariables = {
  raffleID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelWinnerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type WinnersByRaffleIDQuery = {
  winnersByRaffleID?:  {
    __typename: "ModelWinnerConnection",
    items:  Array< {
      __typename: "Winner",
      id: string,
      name: string,
      email: string,
      raffle_id: string,
      raffleID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRaffleSubscriptionVariables = {
  filter?: ModelSubscriptionRaffleFilterInput | null,
};

export type OnCreateRaffleSubscription = {
  onCreateRaffle?:  {
    __typename: "Raffle",
    id: string,
    name: string,
    images?: Array< string > | null,
    start_date: string,
    end_date: string,
    drawing_date?: string | null,
    patreon: boolean,
    pid: string,
    RaffleEntries?:  {
      __typename: "ModelRaffleEntryConnection",
      nextToken?: string | null,
    } | null,
    Winners?:  {
      __typename: "ModelWinnerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRaffleSubscriptionVariables = {
  filter?: ModelSubscriptionRaffleFilterInput | null,
};

export type OnUpdateRaffleSubscription = {
  onUpdateRaffle?:  {
    __typename: "Raffle",
    id: string,
    name: string,
    images?: Array< string > | null,
    start_date: string,
    end_date: string,
    drawing_date?: string | null,
    patreon: boolean,
    pid: string,
    RaffleEntries?:  {
      __typename: "ModelRaffleEntryConnection",
      nextToken?: string | null,
    } | null,
    Winners?:  {
      __typename: "ModelWinnerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRaffleSubscriptionVariables = {
  filter?: ModelSubscriptionRaffleFilterInput | null,
};

export type OnDeleteRaffleSubscription = {
  onDeleteRaffle?:  {
    __typename: "Raffle",
    id: string,
    name: string,
    images?: Array< string > | null,
    start_date: string,
    end_date: string,
    drawing_date?: string | null,
    patreon: boolean,
    pid: string,
    RaffleEntries?:  {
      __typename: "ModelRaffleEntryConnection",
      nextToken?: string | null,
    } | null,
    Winners?:  {
      __typename: "ModelWinnerConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRaffleEntrySubscriptionVariables = {
  filter?: ModelSubscriptionRaffleEntryFilterInput | null,
};

export type OnCreateRaffleEntrySubscription = {
  onCreateRaffleEntry?:  {
    __typename: "RaffleEntry",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    patreon: boolean,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRaffleEntrySubscriptionVariables = {
  filter?: ModelSubscriptionRaffleEntryFilterInput | null,
};

export type OnUpdateRaffleEntrySubscription = {
  onUpdateRaffleEntry?:  {
    __typename: "RaffleEntry",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    patreon: boolean,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRaffleEntrySubscriptionVariables = {
  filter?: ModelSubscriptionRaffleEntryFilterInput | null,
};

export type OnDeleteRaffleEntrySubscription = {
  onDeleteRaffleEntry?:  {
    __typename: "RaffleEntry",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    patreon: boolean,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateWinnerSubscriptionVariables = {
  filter?: ModelSubscriptionWinnerFilterInput | null,
};

export type OnCreateWinnerSubscription = {
  onCreateWinner?:  {
    __typename: "Winner",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateWinnerSubscriptionVariables = {
  filter?: ModelSubscriptionWinnerFilterInput | null,
};

export type OnUpdateWinnerSubscription = {
  onUpdateWinner?:  {
    __typename: "Winner",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteWinnerSubscriptionVariables = {
  filter?: ModelSubscriptionWinnerFilterInput | null,
};

export type OnDeleteWinnerSubscription = {
  onDeleteWinner?:  {
    __typename: "Winner",
    id: string,
    name: string,
    email: string,
    raffle_id: string,
    raffleID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
