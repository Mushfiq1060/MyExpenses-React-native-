
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const ExpenseDetails = ({navigation, route}) => {
    const {title, date, description, amount, type} = route.params
    return (
        <View style={styles.pageStyle}>
            <View style={styles.informationStyle}>
                <View style={styles.dateStyle}>
                    <AntDesign name="calendar" size={24} color="tomato" style={{paddingLeft: 10}}/>
                    <Text style={{fontSize: 12, paddingRight: 10}}>{date}</Text>
                </View>
                <View style={styles.titleStyle}>
                    <Text style={{fontSize: 20}}>{title} ({type})</Text>
                </View>
                <View style={styles.descriptionStyle}>
                    <Text style={{fontSize: 18}}>{description}</Text>
                </View>
                <View style={styles.amountStyle}>
                    <Text style={{fontSize: 18}}>Amount is {amount}$</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    pageStyle: {
        paddingTop: StatusBar.currentHeight, 
        flex: 1, 
        margin: 10
    },
    informationStyle: {
        width: '100%',
        height: '94%',
        position: 'absolute',
        top: 0,
        alignItems: 'center'
    },
    dateStyle: {
        minWidth: '50%',
        height: '7%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 30,
    },
    titleStyle: {
        width: '100%',
        minHeight: '10%',
        marginTop: 10,
        borderRadius: 30,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
    },
    descriptionStyle: {
        width: '100%',
        height: '50%',
        marginTop: 10,
        borderRadius: 30,
        justifyContent: 'flex-start',
        padding: 10,
        borderWidth: 2,
    },
    amountStyle: {
        width: '100%',
        minHeight: '9%',
        marginTop: 10,
        borderRadius: 30,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
    }

})

export default ExpenseDetails