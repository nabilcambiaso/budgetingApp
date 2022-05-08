const transactionModel = {
  state: {
    transactionsList: [],
  },
  reducers: {
    setTransactionsList: (state, transactionsList) => {
      return {
        ...state,
        transactionsList: [...transactionsList]
      }
    },
    addToTransactionsList: (state, transaction) => {
      return {
        ...state,
        transactionsList: [...state.transactionsList,transaction]
      }
    },
    deleteOfflineTransaction: (state) => {
     var online = state.transactionsList.filter(function(transaction)
      { return transaction.is_offline != true; });
      return {
        ...state,
        transactionsList: [...online]
      }
    },
    addToTransactionsList: (state, transaction) => {
      return {
        ...state,
        transactionsList: [...state.transactionsList,transaction]
      }
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async setTransactionsListAsync(payload) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.transactions.setTransactionsList(payload);
    },
  }),
};

export default transactionModel;