
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PendingDetails = () => {
    return (
        <View style={styles.pageStyle}>
            <Text>PendingDetails</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default PendingDetails