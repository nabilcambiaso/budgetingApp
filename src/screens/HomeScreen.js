import React from 'react'
import { View } from 'react-native'
import FlatButton from '../components/FlatButton'
import { QUERY_ALL_ACCOUNTS, QUERY_ALL_TRANSACTIONS } from '../graphQL/requests'
import { useLazyQuery, useQuery } from '@apollo/client';

function HomeScreen(props) {

    const { loading: accountLoading, data: accountData, error: accountError, refetch: accountRefetch } = useLazyQuery(QUERY_ALL_ACCOUNTS);
    const { loading: transactionsLoading, data: transactionsData, error: transactionsError, refetch: transactionsRefetch } = 
    useLazyQuery(QUERY_ALL_TRANSACTIONS,{fetchPolicy:"cache-and-network"});

    if (accountLoading)
        accountRefetch()
    if (accountError)
        console.log(accountError)

    if (transactionsLoading)
        accountRefetch()
    if (transactionsError)
        console.log(transactionsError)
if(transactionsData)
        console.log(transactionsData)


    return (
        <View style={{ padding: 30, marginTop: 30 }}>
            <FlatButton bgColor="#00BFFF"
                onPress={() => { props.navigation.navigate('AddAccountScreen') }}
                title="Add Account"
                count={10}
                countText="Accounts Count:"
                icon="google-wallet"
            ></FlatButton>
            <View style={{ marginLeft: "auto", marginTop: 20 }}>
                <FlatButton bgColor="#5F9EA0"
                    onPress={() => { props.navigation.navigate('AddTransactionScreen') }}
                    title="Add transaction"
                    count={10}
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

        </View>
    )
}

export default HomeScreen