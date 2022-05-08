import fetchAccountData from './effects/fetchAccountData'

const accountModel = {
  state: {
    accountList: [1],
    selectOneAccount: {}
  },
  reducers: {
    setAccountList: (state, accountList) => {
      return {
        ...state,
        accountList: [...accountList]
      }
    },
    addToAccountList: (state, account) => {
      return {
        ...state,
        accountList: [...state.accountList,account]
      }
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async setAccountListAsync(payload) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.account.setAccountList(payload);
    },
  }),
};

export default accountModel;