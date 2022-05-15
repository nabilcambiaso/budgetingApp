import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useGetAccounts, useGetTransactions } from '../graphQL/requests'
import { connect } from "react-redux";


function DisplayScreen(props) {

    const colors = ["#5F9EA0", "#8A2BE2", "#D2691E", "#DB7093", "#CD853F", "#D8BFD8",
        "#DCDCDC", "#00CED1", "#9932CC", "#8B008B", "#008B8B", "#6495ED"];

    // const { loading: accountLoading, data: accountData, error: accountError, refetch }
    //     = useGetAccounts();
    // const { loading: transactionsLoading, error: transactionsError, data: transactionsData, refetch: transactionsRefetch }
    //     = useGetTransactions();
   const sum = (key) => {
        return this.reduce((a, b) => a + (b[key] || 0), 0);
    }

    const renderAccounts = ({ item, index }) => {
        return (
            <View style={{ ...styles.card, backgroundColor: colors[index+1] }}>
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

    const renderTransactions = ({ item, index }) => {
        return (
            <View style={{ ...styles.cardVertical, backgroundColor:index<10? colors[index + 1]:"grey" }}>
                <View style={{ ...styles.cardCircle, backgroundColor:index<10? colors[index]:"black" }}>
                    <FontAwesome name={"google-wallet"} size={24} color="white" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Id:</Text>
                    <Text style={styles.value}>{item.id}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Amount :</Text>
                    <Text style={styles.value}>{item.amount}</Text>
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
                data={props.accountList}
                keyExtractor={(item, index) => index.toString()} />
       
       <Text style={{paddingHorizontal:20,fontWeight:"bold"}}>{"transactions sum : "+props.transactionsList.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)}</Text>
            <FlatList
                style={styles.ScrollView}
                renderItem={renderTransactions}
                data={props.transactionsList}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<View style={{height:300}}></View>}
                 />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    row: { flexDirection: "row" },
    label: { color: "white" },
    value: { color: "white", fontSize: 14, fontWeight: "bold", marginLeft: 10 },
    card: { display: "flex", padding: 15, marginRight: 15, borderRadius: 10, width: 220, height: 100, backgroundColor: "red", marginTop: 20,marginBottom:50 },
    cardVertical: {alignSelf:"center", display: "flex", padding: 15, marginRight: 15, borderRadius: 10, width: 300, height: 60, backgroundColor: "red", marginTop: 20, },
    horizontalScrollView: { padding: 20,marginBottom:20 },
    cardCircle: {
        height: 45, width: 45, borderRadius: 45, position: "absolute", top: -18,
        right: -8, justifyContent: "center", alignItems: "center"
    },
    ScrollView:{alignSelf:"center",width:"100%"}
})

const mapState = (state) => ({
    accountList: state.account.accountList,
    transactionsList: state.transactions.transactionsList
  });
  const mapDispatch = (dispatch) => ({
    setAccountList: dispatch.account.setAccountList,
    setAccountListAsync: dispatch.account.setAccountListAsync
  });

export default connect(mapState, mapDispatch)(DisplayScreen);
