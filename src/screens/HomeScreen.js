import React from 'react'
import { View, Text, Button } from 'react-native'
import FlatButton from '../components/FlatButton'

function HomeScreen(props) {
    return (
        <View style={{ padding: 30,marginTop:30 }}>
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