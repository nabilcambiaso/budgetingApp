import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
function AddAccountScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 19, color: "#1E90FF" }}>Add Account</Text>
            <TextInput selectionColor='#1E90FF' underlineColor='transparent' activeUnderlineColor='transparent'  placeholderTextColor={"#1E90FF"} placeholder='Account Name' style={styles.textInput }  ></TextInput>
            <TextInput selectionColor='#1E90FF' underlineColor='transparent' activeUnderlineColor='transparent' placeholderTextColor={"#1E90FF"} placeholder='Account Balance' style={styles.textInput }  ></TextInput>
            <Button style={styles.button} labelStyle={{color:"white"}}>Add New Account</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        marginTop: 20, width: "90%", borderRadius: 20, borderTopRightRadius: 20,
        borderTopLeftRadius: 20, height: 50,alignSelf:"center"
    },
    button:{alignSelf:"center", marginTop:20,height:50,borderRadius:20,width:"60%", 
    paddingHorizontal:20,backgroundColor:"#1E90FF",justifyContent:"center"}
})

export default AddAccountScreen