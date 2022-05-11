import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import FlatButton from '../components/FlatButton'
import { useGetAccounts, useGetTransactions, useSetTransaction } from '../graphQL/requests'
import { connect } from "react-redux";
import { SubscriptionClient } from "graphql-subscriptions-client";
import NetInfo from '@react-native-community/netinfo';

// get ready
const GRAPHQL_ENDPOINT = "ws://localhost:4000/graphql";

const query = `subscription Subscription {
    transactionCreated {
      id
      account_id
      amount
    }
  }`;

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
            .request({ query })
            .subscribe({
                next({ data }) {
                    if (data) {
                        props.addToTransactionsList(data.transactionCreated)
                        // console.log("We got something!", data);
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

    }, [isOffline,accountData,transactionsData]);


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
    deleteOfflineTransaction: dispatch.transactions.deleteOfflineTransaction
});

export default connect(mapState, mapDispatch)(HomeScreen);