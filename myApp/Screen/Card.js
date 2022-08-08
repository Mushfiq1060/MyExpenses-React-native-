
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'


const Card = ({onPress, title, date, amount, name}) => {
    let width = Dimensions.get('window').width
    return (
        <TouchableOpacity onPress={onPress} style={[styles.cardStyle,{width: name=="Pending"?width-20:width-20}]}>
            <View style={styles.contentStyle}>
                <View style={styles.textStyle}>
                    <View style={styles.titleStyle}>
                        <Text style={{paddingLeft: 10, fontSize: 30}}>{title}</Text>
                    </View>
                    <View style={styles.dateStyle}>
                        {name=="Pending" ? <Text style={{paddingLeft: 10, fontSize: 10}}>Saved On: {date}</Text> : 
                                           <Text style={{paddingLeft: 10, fontSize: 10}}>Paid On: {date}</Text>}
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
        height: 120,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 30,
        borderWidth: 2,
        overflow: 'hidden',
        elevation: 6,
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