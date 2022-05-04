import { gql } from "@apollo/client";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation Mutation($input: createAccountsInput!) {
    createAccount(input: $input) {
      name
      initial_balance
      note
    }
  }
`;

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation Mutation($input: createTransactionInput!) {
    createTransaction(input: $input) {
      account_id
      amount
    }
  }
`;

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
`;
export const QUERY_ALL_TRANSACTIONS = gql`
  query Query {
    transactions {
      ... on TransactionsSuccessfulResult {
        transactions {
          id
          account_id
          amount
          created_at
          updated_at
        }
      }
      ... on TransactionsErrorResult {
        message
        statusCode
      }
    }
  }
`;
