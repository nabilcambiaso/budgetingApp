import { gql } from '@apollo/client';

export const CREATE_ACCOUNT_MUTATION = gql`
mutation Mutation($input: createAccountsInput!) {
  createAccount(input: $input) {
    name
    initial_balance
    note
  }
}
`
export const QUERY_ALL_ACCOUNTS = gql`
query Query {
  accounts {
    ... on AccountSuccessfulResult {
      accounts {
        id
        name
        balance
        initial_balance
        note
        opening_date
        transactions {
          id
          account_id
          amount
        }
      }
    }
    ... on AccountsErrorResult {
      message
      statusCode
    }
  }
}
`