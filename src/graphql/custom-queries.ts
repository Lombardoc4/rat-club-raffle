import * as APITypes from '../API';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const listRafflesDetailed = /* GraphQL */ `
      query ListRafflesDetailed(  $filter: ModelRaffleFilterInput
  $limit: Int
  $nextToken: String
) {
  listRaffles(filter: $filter, limit: $limit, nextToken: $nextToken) {
              items {
                  id
                  pid
                  name
                  images
                  start_date
                  end_date
                  drawing_date
                  RaffleEntries(limit: 1000) {
                      items {
                          name
                      }
                  }
                      Winners {
        items {
          name
          email
        }
      }
              }
          }
      }
  ` as GeneratedQuery<
  APITypes.ListRafflesDetailedQueryVariables,
  APITypes.ListRafflesDetailedQuery
>;

export const getRaffleWithWinners = /* GraphQL */ `query GetRaffleWithWinners(
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
      Winners {
        items {
          name
        }
      }
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRaffleWithWinnersQueryVariables,
  APITypes.GetRaffleWithWinnersQuery
>;
