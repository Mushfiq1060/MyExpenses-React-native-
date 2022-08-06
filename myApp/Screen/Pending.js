
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Pending = ({navigation}) => {
    return (
        <View style={styles.pageStyle}>
            <Text>Pending</Text>
            <Pressable 
                style={styles.floatingBtn} 
                onPress={() => {navigation.navigate('Add Expense')}}
            >
                <AntDesign name="plus" size={50} color="white" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    pageStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingBtn: {
        height: 70,
        width: 70,
        backgroundColor: 'dodgerblue',
        borderRadius: 35,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },

})

export default Pending