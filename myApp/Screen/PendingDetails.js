
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { AntDesign } from '@expo/vector-icons';

const PendingDetails = ({navigation, route}) => {
    const {title, date, description, amount} = route.params
    return (
        <View style={styles.pageStyle}>
            <View style={styles.informationStyle}>
                <View style={styles.dateStyle}>
                    <AntDesign name="calendar" size={24} color="tomato" style={{paddingLeft: 10}}/>
                    <Text style={{fontSize: 12, paddingRight: 10}}>{date}</Text>
                </View>
                <View style={styles.titleStyle}>
                    <Text style={{fontSize: 20}}>{title}</Text>
                </View>
                <View style={styles.descriptionStyle}>
                    <Text style={{fontSize: 18}}>{description}</Text>
                </View>
                <View style={styles.amountStyle}>
                    <Text style={{fontSize: 18}}>Amount is {amount}$</Text>
                </View>
            </View>
            <Pressable 
                style={styles.btnStyle}
                onPress={() => {navigation.navigate('Pending')}}
            >
                <Text style={styles.btnTextStyle}>Paid</Text>
            </Pressable>
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
    btnStyle: {
        width: '100%',
        height: '8%',
        backgroundColor: 'dodgerblue',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    btnTextStyle: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase'
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

export default PendingDetails