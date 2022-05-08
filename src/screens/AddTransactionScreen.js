import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { transaction_image } from '../constants'
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetAccounts, useSetTransaction } from '../graphQL/requests'
import RBSheet from "react-native-raw-bottom-sheet";
import { FontAwesome } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { connect } from "react-redux";

function AddTransactionScreen(props) {

    const [accountName, setAccountName] = useState("Choose Account");
    const [amount, setAmount] = useState("");
    const [accountId, setAccountId] = useState("");
    const refRBSheet = useRef();

    // const { loading: accountLoading, data: accountData, error: accountError, refetch }
    //     = useGetAccounts();

    const resetInputs = () => {
        setAccountName("Choose account");
        setAmount("");
        setAccountId("");
    }
console.log(props.transactionsList.length)
    const renderItem = (itemData) => {
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 20, width: "100%" }}>
                <TouchableOpacity onPress={async () => {
                    setAccountName(itemData.item.name);
                    setAccountId(itemData.item.id)
                    refRBSheet.current.close()
                }} style={{ flexDirection: "row", width: "100%" }}>
                    <FontAwesome style={{ paddingTop: 8, paddingRight: 10, width: "15%" }} name="bank" size={12} color="#4DDA54" />
                    <View style={{ width: "45%" }}>
                        <Text style={{ color: "black", fontSize: 15 }}>{itemData.item.name}</Text>
                    </View >
                    <View style={{
                        flex: 1, paddingRight: 10, alignItems: "flex- end", width: "43%"
                    }}>
                        <Text style={{ color: "black", fontSize: 15 }}>
                            {itemData.item.balance}
                        </Text>
                    </View >
                </TouchableOpacity >
            </View >
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19, color: "#1E90FF" }}>Add transaction</Text>
            <Image source={transaction_image} style={styles.image} />

            <TextInput
                value={amount.toString()} onChange={(e) => setAmount(isNaN(e.nativeEvent.text) ? 0 : Number(e.nativeEvent.text))}
                selectionColor='#1E90FF' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor={"#1E90FF"} placeholder='Transaction amount' style={styles.textInput}  ></TextInput>

            <Button
                onPress={() => refRBSheet.current.open()}
                style={{
                    ...styles.button, width: "90%",
                    backgroundColor: "#E6E6FA", alignItems: "flex-start"
                }} labelStyle={{ color: "#1E90FF" }}>{accountName}</Button>
            <Button
                onPress={async () => {
                    NetInfo.fetch().then(state => {
                        if (!state.isConnected && state.isInternetReachable) {
                            useSetTransaction({
                                input: {
                                    account_id: accountId,
                                    amount: amount
                                }
                            })
                                .then((resJson) => {
                                    if (resJson.createTransaction) {
                                        resetInputs();
                                    }
                                }).catch((err) => console.log(err))
                        } else {
                            props.addToTransactionsList({
                                account_id: accountId,
                                amount: amount,
                                is_offline:true,
                                id:parseInt(Date.now())
                            })
                            console.log("Connection type", state.type);
                            console.log("Is connected?", state.isConnected);
                            console.log("Is connected?", state.isInternetReachable);
                        }
                    }).catch((err)=>{
                        console.log("err",err);
                    });

                }}
                style={styles.button} labelStyle={{ color: "white" }}>Add New Transactions</Button>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(128, 128, 128, 0.7)"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <SafeAreaView
                    style={{
                        backgroundColor: "white",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10
                    }}
                >
                    <FlatList
                        ListFooterComponent={<View style={{ height: 10, marginBottom: 10 }}></View>}
                        scrollEnabled={true}
                        key={Math.random()}
                        data={props.accountList}
                        keyExtractor={(item, index) => {
                            return index.toString();
                        }}
                        renderItem={(itemData) => renderItem(itemData)}
                        showsVerticalScrollIndicator={false}
                    />

                </SafeAreaView>


            </RBSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    image: { height: 150, width: 150, alignSelf: "center" },
    textInput: {
        backgroundColor: "#E6E6FA",
        marginTop: 20, width: "90%", borderRadius: 10, borderTopRightRadius: 10,
        borderTopLeftRadius: 10, height: 50, alignSelf: "center"
    },
    button: {
        alignSelf: "center", marginTop: 20, height: 45, borderRadius: 10, width: "80%",
        paddingHorizontal: 20, backgroundColor: "#1E90FF", justifyContent: "center"
    }
})

const mapState = (state) => ({
    accountList: state.account.accountList,
    transactionsList: state.transactions.transactionsList
});
const mapDispatch = (dispatch) => ({
    addToTransactionsList: dispatch.transactions.addToTransactionsList
});

export default connect(mapState, mapDispatch)(AddTransactionScreen);
