import { GraphQLClient, gql } from "graphql-request";
import { useQuery } from "react-query";

const API_URL = `http://127.0.0.1:4000/graphql`;



const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`
  }
});

 const CREATE_ACCOUNT_MUTATION = gql`
  mutation Mutation($input: createAccountsInput!) {
    createAccount(input: $input) {
      name
      initial_balance
      note
    }
  }
`;

const CREATE_TRANSACTION_MUTATION = gql`
  mutation Mutation($input: createTransactionInput!) {
    createTransaction(input: $input) {
      account_id
      amount
    }
  }
`;

const QUERY_ALL_ACCOUNTS = gql`
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

const QUERY_ALL_TRANSACTIONS = gql`
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

export function useGetAccounts() {
  return useQuery("get-accounts", async () => {
    const { accounts } = await graphQLClient.request(QUERY_ALL_ACCOUNTS);
    return accounts;
  });
}

export function useGetTransactions() {
  return useQuery("get-transactions", async () => {
    const { transactions } = await graphQLClient.request(QUERY_ALL_TRANSACTIONS);
    return transactions;
  });
}

export async function useSetAccount(variables) {
    const  account = await graphQLClient.request(CREATE_ACCOUNT_MUTATION,variables);
    return account;
}

export async function useSetTransaction(variables) {
  const  transaction = await graphQLClient.request(CREATE_TRANSACTION_MUTATION,variables);
  return transaction;
}