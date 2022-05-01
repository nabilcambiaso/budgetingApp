import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { QUERY_ALL_ACCOUNTS } from '../graphQL/requests'
import { useQuery, gql } from '@apollo/client';


function DisplayScreen(props) {

    const { loading: accountLoading, data: accountData, error: accountError, refetch: accountRefetch } = useQuery(QUERY_ALL_ACCOUNTS);

    if (accountLoading) {
        accountRefetch()
    }


    // if (error)
    //     console.log(error)

    // if (accountData)
    //     console.log("dt", accountData)


    const renderAccounts = ({ item }) => {
        console.log(item)
        return (
            <View style={styles.card}>
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
    container: { flex: 1 },
    row: { flexDirection: "row" },
    label: { color: "white" },
    value: { color: "white", fontSize: 14, fontWeight: "bold", marginLeft: 10 },
    card: { display: "flex", padding: 15, marginRight: 10, borderRadius: 10, width: 220, height: 100, backgroundColor: "red" },
    horizontalScrollView: { padding: 20 }
})
export default DisplayScreen