
import { View, Text, StyleSheet, ActivityIndicator, TextInput, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';


import Card from './Card';

const Expense = ({navigation}) => {


    let date = moment()
                .utcOffset('+06:00') //get your time zone
                .format('MM-DD-YYYY hh:mm a'); // for format time

    const [data, setData] = useState(
        [
            {
                id: "1",
                title: "One",
                date: date,
                description: "It is description one",
                amount: "1000"
            },
            {
                id: "2",
                title: "Two",
                date: date,
                description: "It is description two",
                amount: "1000"
            },
            {
                id: "3",
                title: "Three",
                date: date,
                description: "It is description three",
                amount: "1000"
            },
            {
                id: "4",
                title: "Four",
                date: date,
                description: "It is description four",
                amount: "1000"
            },
            {
                id: "5",
                title: "Five",
                date: date,
                description: "It is description five",
                amount: "1000"
            },
            {
                id: "6",
                title: "Six",
                date: date,
                description: "It is description six",
                amount: "1000"
            },
            {
                id: "7",
                title: "Seven",
                date: date,
                description: "It is description seven",
                amount: "1000"
            },
            {
                id: "8",
                title: "Eight",
                date: date,
                description: "It is description eight",
                amount: "1000"
            },
            {
                id: "9",
                title: "Nine",
                date: date,
                description: "It is description nine",
                amount: "1000"
            },
            {
                id: "10",
                title: "Ten",
                date: date,
                description: "It is description ten",
                amount: "1000"
            },
        ]
    )

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        // Here fetch data from database
        setTimeout(() => {
            setLoading(false)
        },2000)
    })

    return (
        <View style={styles.pageStyle}>
            <View style={styles.searchBox}>
                <AntDesign name="search1" size={24} color="tomato" style={{paddingLeft: 10}} />
                <TextInput 
                    style={{padding: 5, paddingLeft: 10, fontSize: 18}}
                    placeholder='Search Here...'
                />
            </View>
            <View style={styles.listStyle}>
                {isLoading ? <ActivityIndicator size='large' /> : (
                    <FlatList 
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={({item}) => 
                                    <ListItem 
                                        navigation={navigation} 
                                        title={item.title} 
                                        date={item.date} 
                                        description={item.description} 
                                        amount={item.amount}
                                    />}
                    />
                )}
            </View>
        </View>
    )
}


function ListItem({navigation, title, date, description, amount}) {
    return (
        <Card 
            navigation={navigation} 
            onPress={() => {navigation.navigate('Expense Details', {
                                                    title: `${title}`, 
                                                    date: `${date}`, 
                                                    description: `${description}`,
                                                    amount: `${amount}`
                                                })}}
            title={title}
            date={date}
            amount={amount}
            name="Expense"
        />
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //margin: 10
    },
    searchBox: {
        width: Dimensions.get('window').width-20,
        marginTop: 10,
        minHeight: 40,
        borderWidth: 2,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listStyle: {
        flex: 1,
        marginTop: 5,
    }
})

export default Expense