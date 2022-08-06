
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const Card = ({onPress, title, date, amount}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.cardStyle}>
            <View style={styles.contentStyle}>
                <View style={styles.textStyle}>
                    <View style={styles.titleStyle}>
                        <Text style={{paddingLeft: 10, fontSize: 40}}>{title}</Text>
                    </View>
                    <View style={styles.dateStyle}>
                        <Text style={{paddingLeft: 10, fontSize: 10}}>Saved On: {date}</Text>
                    </View>
                </View>
                <View style={styles.amountStyle}>
                    <Text style={{fontSize: 22, paddingRight: 10}}>{amount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        flex: 1,
        width: Dimensions.get('window').width-20,
        height: Dimensions.get('screen').height/6.5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 30,
        borderWidth: 2,
        overflow: 'hidden',
    },
    contentStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    textStyle: {
        flex: 1.5,
    },
    amountStyle: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-end', 
    },
    titleStyle: {
        flex: 3,
        justifyContent: 'flex-start',
    },
    dateStyle: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default Card