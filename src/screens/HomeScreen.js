import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import FlatButton from '../components/FlatButton'
import { useGetAccounts, useGetTransactions, useSetTransaction } from '../graphQL/requests'
import { connect } from "react-redux";
import { SubscriptionClient } from "graphql-subscriptions-client";
import NetInfo from '@react-native-community/netinfo';

// get ready
const GRAPHQL_ENDPOINT = "ws://localhost:4000/graphql";

const transactionSubscription = `subscription Subscription {
    transactionCreated {
      id
      account_id
      amount
    }
  }
  `;

const accountSubscription = `subscription AccountCreated {
    accountCreated {
      name
      balance
      initial_balance
      opening_date
      note
      id
    }
  }
  `;

const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
    reconnect: true,
    lazy: true, // only connect when there is a query
    connectionCallback: (error) => {
        error && console.error(error);
    },
});

function HomeScreen(props) {

    const [isOffline, setOfflineStatus] = useState(false);
    const [retrieved, setRetrieved] = useState(false);

    const [subscribedTransactionsIdList, setSubscribedTransactionsIdList] = useState([]);
    const [subscribedAccountsIdList, setSubscribedAccountsIdList] = useState([]);
    const { data: accountData, error: accountError, refetch }
        = useGetAccounts();
    const { error: transactionsError, data: transactionsData, refetch: transactionsRefetch }
        = useGetTransactions();

    if (accountError)
        console.log(accountError)
    if (transactionsError)
        console.log(transactionsError)

    useEffect(() => {
        client
            .request({ query: transactionSubscription })
            .subscribe({
                next({ data }) {
                    if (data.transactionCreated) {
                        const idExist = subscribedTransactionsIdList.includes(data.transactionCreated.id);
                        if (!idExist) {
                            console.log("We got some transactions!", data.transactionCreated);
                            setSubscribedTransactionsIdList([...subscribedTransactionsIdList, data.transactionCreated.id]);
                            props.addToTransactionsList(data.transactionCreated)
                        }
                    }
                },
            });

        client
            .request({ query: accountSubscription })
            .subscribe({
                next({ data }) {
                    if (data.accountCreated) {
                        const idExist = subscribedAccountsIdList.includes(data.accountCreated.id);
                        if (!idExist) {
                            console.log("We got some accounts!", data.accountCreated);
                            setSubscribedAccountsIdList([...subscribedAccountsIdList, data.accountCreated.id]);
                            props.addToAccountList(data.accountCreated)
                        }
                    }
                },
            });
    }, [])

    useEffect(() => {
        NetInfo.addEventListener(async (state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            if (!offline) {
                setOfflineStatus(offline);
                var offline_transactions = props.transactionsList.filter(function (tr) {
                    return tr.is_offline == true
                });
                props.deleteOfflineTransaction();
                if (offline_transactions.length != 0) {
                    console.log("has offline trs")
                    if (retrieved == false) {
                        offline_transactions.forEach(element => {
                            var account_id = element.account_id;
                            var amount = element.amount
                            useSetTransaction({
                                input: {
                                    account_id: account_id,
                                    amount: amount
                                }
                            })
                        });
                        setRetrieved(true);
                    }
                }
                else {
                    console.log("no offline trns")
                    if (accountData)
                        props.setAccountListAsync(accountData.accounts)
                    if (transactionsData)
                        props.setTransactionsList(transactionsData.transactions)
                }
            }
        });

    }, [isOffline, accountData, transactionsData]);


    return (
        <View style={{ padding: 30, marginTop: 30 }}>
            <FlatButton bgColor="#00BFFF"
                onPress={() => { props.navigation.navigate('AddAccountScreen') }}
                title="Add Account"
                count={props.accountList.length}
                countText="Accounts Count:"
                icon="google-wallet"
            ></FlatButton>
            <View style={{ marginLeft: "auto", marginTop: 20 }}>
                <FlatButton bgColor="#5F9EA0"
                    onPress={() => { props.navigation.navigate('AddTransactionScreen') }}
                    title="Add transaction"
                    count={props.transactionsList.length}
                    countText="Transactions Count:"
                    icon="exchange"
                ></FlatButton>
            </View>
            <View style={{ marginTop: 20 }}>
                <FlatButton bgColor="#FFA07A"
                    onPress={() => { props.navigation.navigate('DisplayScreen') }}
                    title="Display All"
                    icon="object-group"
                ></FlatButton>
            </View>
            <Text style={{ paddingTop: 20, fontWeight: "bold" }} >The count is {props.transactionsList.length}</Text>
        </View>
    )
}
const mapState = (state) => ({
    accountList: state.account.accountList,
    transactionsList: state.transactions.transactionsList
});
const mapDispatch = (dispatch) => ({
    setAccountList: dispatch.account.setAccountList,
    setAccountListAsync: dispatch.account.setAccountListAsync,
    setTransactionsList: dispatch.transactions.setTransactionsList,
    addToTransactionsList: dispatch.transactions.addToTransactionsList,
    addToAccountList: dispatch.account.addToAccountList,
    deleteOfflineTransaction: dispatch.transactions.deleteOfflineTransaction
});

export default connect(mapState, mapDispatch)(HomeScreen);