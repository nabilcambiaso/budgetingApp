export default (args, state, dispatch) => {
    try {
      dispatch.account.fetchedAccountList({ accountList: args.data });
    } catch (error) {
      console.log(error);
    }
  }