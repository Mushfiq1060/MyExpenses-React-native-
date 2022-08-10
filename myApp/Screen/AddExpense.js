
import { View, Text, StatusBar, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import RadioButtonRN from 'radio-buttons-react-native'  
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

import {DatabaseConnection} from '../Database/DatabaseConnection'

const db = DatabaseConnection.getPendingConnection()

const AddExpense = ({navigation}) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("")

    const addData = () => {
        if(title.length == 0 || description.length == 0 || amount.length == 0) {
            alert("Please Insert All Information")
        } else {
            db.transaction((tx) => {
                let date = moment().utcOffset('+06:00').format('MM-DD-YYYY hh:mm a');
                tx.executeSql(
                   'INSERT INTO pendingTable (title, description, amount, type, date) VALUES (?,?,?,?,?)',
                    [title, description, amount, type, date],
                    (tx, result) => {
                        navigation.navigate('Pending')
                    }
                )
            })
        }
    }

    return (
        <View style={styles.pageStyle}>
            <View style={styles.informationStyle}>
                <View style={styles.titleStyle}>
                    <TextInput 
                        style={{fontSize: 20,}}
                        placeholder='Enter Your Title'
                        onChangeText={(value) => setTitle(value)}
                    />
                </View>
                <View style={styles.descriptionStyle}>
                    <TextInput 
                        style={{fontSize: 18,}}
                        placeholder='Enter Your Description'
                        multiline
                        onChangeText={(value) => setDescription(value)}
                    />
                </View>
                <View style={styles.amountStyle}>
                    <TextInput 
                        style={{fontSize: 18,}}
                        keyboardType='number-pad'
                        placeholder='Enter Your Amount'
                        onChangeText={(value) => setAmount(value)}
                    />
                </View>
                <RadioButtonRN
                    style={{width: '100%', flexDirection: 'row'}}
                    boxStyle={{width: '50%', borderWidth: 2, borderRadius: 30}}
                    activeColor='#000'
                    data={[{label: 'Recurrent'},{label: 'Random'}]}
                    initial={1}
                    selectedBtn={(e) => setType(e.label)}
                    icon={
                        <FontAwesome name="check-circle-o" size={24} color="tomato" />
                    }
                />
            </View>
            <Pressable 
                style={styles.btnStyle}
                onPress={addData}
            >
                <Text style={styles.btnTextStyle}>Add Expense</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    
    pageStyle: {
        paddingTop: StatusBar.currentHeight, 
        flex: 1, 
        margin: 10,
    },
    informationStyle: {
        width: '100%',
        height: '94%',
        position: 'absolute',
        top: 0,
        alignItems: 'center'
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

export default AddExpense