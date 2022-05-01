import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { credit_card } from '../constants'
import { CREATE_ACCOUNT_MUTATION } from '../graphQL/requests'
import { useMutation } from '@apollo/client';
function AddAccountScreen() {

    const [accountName, setAccountName] = useState("");
    const [accountInitialBalance, setInitialBalance] = useState("");
    const [accountNote, setAccountNote] = useState("");

    const [createAccount, { error }] = useMutation(CREATE_ACCOUNT_MUTATION);

    const resetInputs = () => {
        setAccountName("");
        setAccountNote("");
        setInitialBalance("");
    }
    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19, color: "#1E90FF" }}>Add Account</Text>
            <Image source={credit_card} style={styles.image} />
            <TextInput
                value={accountName} onChange={(e) => setAccountName(e.nativeEvent.text)}
                selectionColor='#1E90FF' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor={"#1E90FF"} placeholder='Account Name' style={styles.textInput}  ></TextInput>
            <TextInput
                value={accountInitialBalance.toString()} onChange={(e) => setInitialBalance(isNaN(e.nativeEvent.text) ? 0 : Number(e.nativeEvent.text))}
                selectionColor='#1E90FF' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor={"#1E90FF"} placeholder='Account initial Balance' style={styles.textInput}  ></TextInput>
            <TextInput
                value={accountNote} onChange={(e) => setAccountNote(e.nativeEvent.text)}
                selectionColor='#1E90FF' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor={"#1E90FF"} placeholder='Account Note' style={styles.textInput}  ></TextInput>

            <Button
                onPress={async () => {
                    await createAccount({
                        variables: {
                            input: {
                                name: accountName,
                                initial_balance: accountInitialBalance,
                                note: accountNote
                            }
                        }
                    }).then((resJson) => {
                        if (resJson.data)
                            resetInputs();
                    }).catch((err) => console.log(err))
                }}
                style={styles.button} labelStyle={{ color: "white" }}>Add New Account</Button>
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

export default AddAccountScreen