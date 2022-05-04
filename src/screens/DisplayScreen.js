import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { QUERY_ALL_ACCOUNTS,QUERY_ALL_TRANSACTIONS } from '../graphQL/requests'
import { useQuery } from '@apollo/client';
function DisplayScreen(props) {

    const colors = ["#5F9EA0", "#8A2BE2", "#D2691E", "#DB7093", "#CD853F", "#D8BFD8",
        "#DCDCDC", "#00CED1", "#9932CC", "#8B008B", "#008B8B", "#6495ED"];

    const { loading: accountLoading, data: accountData, error: accountError, refetch: accountRefetch } =
        useQuery(QUERY_ALL_ACCOUNTS, { fetchPolicy: 'cache-and-network' });
    const { loading: transactionsLoading, data: transactionsData, error: transactionsError, refetch: transactionsRefetch } =
        useQuery(QUERY_ALL_TRANSACTIONS, { fetchPolicy: "cache-and-network" });


    if (accountLoading) {
        accountRefetch()
    }
    if (accountError)
        console.log(accountError)

    if (transactionsLoading)
        accountRefetch()
    if (transactionsError)
        console.log(transactionsError)
    if (transactionsData)
        console.log(transactionsData)

        console.log(transactionsData)

    const renderAccounts = ({ item, index }) => {
        return (
            <View style={{ ...styles.card, backgroundColor: colors[1] }}>
                <View style={{ ...styles.cardCircle, backgroundColor: colors[index] }}>
                    <FontAwesome name={"google-wallet"} size={24} color="white" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{item.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Initial balance:</Text>
                    <Text style={styles.value}>{item.initial_balance}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Current balance:</Text>
                    <Text style={styles.value}>{item.balance}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Note:</Text>
                    <Text style={styles.label}  > {item.note} </Text>
                </View>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                style={styles.horizontalScrollView}
                horizontal
                renderItem={renderAccounts}
                data={accountData && accountData.accounts.accounts}
                keyExtractor={(item, index) => index.toString()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    row: { flexDirection: "row" },
    label: { color: "white" },
    value: { color: "white", fontSize: 14, fontWeight: "bold", marginLeft: 10 },
    card: { display: "flex", padding: 15, marginRight: 15, borderRadius: 10, width: 220, height: 100, backgroundColor: "red", marginTop: 20 },
    horizontalScrollView: { padding: 20 },
    cardCircle: {
        height: 45, width: 45, borderRadius: 45, position: "absolute", top: -18,
        right: -8, justifyContent: "center", alignItems: "center"
    }
})
export default DisplayScreen