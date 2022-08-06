
import { View, Text, StatusBar, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const AddExpense = ({navigation}) => {
    return (
        <View style={styles.pageStyle}>
            <View style={styles.informationStyle}>
                <View style={styles.titleStyle}>
                    <TextInput 
                        style={{fontSize: 20,}}
                        placeholder='Enter Your Title'
                    />
                </View>
                <View style={styles.descriptionStyle}>
                    <TextInput 
                        style={{fontSize: 18,}}
                        placeholder='Enter Your Description'
                        multiline
                    />
                </View>
                <View style={styles.amountStyle}>
                    <TextInput 
                        style={{fontSize: 18,}}
                        placeholder='Enter Your Amount'
                    />
                </View>
            </View>
            <Pressable 
                style={styles.btnStyle}
                onPress={() => {navigation.navigate('Pending')}}
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
        margin: 10
    },
    informationStyle: {
        width: '100%',
        height: '94%',
        position: 'absolute',
        top: 0,
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
        height: '9%',
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
        height: '8%',
        marginTop: 10,
        borderRadius: 30,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
    }

})

export default AddExpense