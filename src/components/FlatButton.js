import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

function FlatButton({ bgColor, onPress, icon, count,title,countText }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.container, backgroundColor: bgColor }} >
            <View style={styles.firstRow}>
                <Text style={{ fontWeight: "bold", marginRight: 20, fontSize: 20, paddingTop: 5,color:"white" }}>{title}</Text>
                <FontAwesome name={icon} size={34} color="white" />
            </View>
            <View style={styles.secondRow}>
                <Text style={{color:"white"}}>{countText} </Text>
                <Text style={{ fontWeight: "bold", marginRight: 20, fontSize: 12,color:"white" }}>{count}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: { height: 140, width: 250, borderRadius: 10, padding: 20 },
    firstRow: { flexDirection: "row", marginTop: 30, alignSelf: "center" },
    secondRow: { flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: 20, left: 20 },
})
export default FlatButton