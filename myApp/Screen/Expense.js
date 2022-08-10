
import { View, Text, StyleSheet, ActivityIndicator, TextInput, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

import Card from './Card';
import {DatabaseConnection} from '../Database/DatabaseConnection'

const db = DatabaseConnection.getPendingConnection()

const Expense = ({navigation, count}) => {

    const [data, setData] = useState([])
    const [mainData, setMainData] = useState([])
    const [search, setSearch] = useState('')
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        console.log("Main data use effect call")
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM expenseTable ORDER BY id DESC`,
                [],
                (tx, result) => {
                    var temp = []
                    for(let i = 0; i < result.rows.length; i++) {
                        let obj={
                            id: result.rows.item(i).id,
                            title: result.rows.item(i).title,
                            description: result.rows.item(i).description,
                            amount: result.rows.item(i).amount,
                            type: result.rows.item(i).type,
                            date: result.rows.item(i).date
                        }
                        temp.push(obj)
                    }
                    setMainData(temp)
                    if(result.rows.length > 0) {
                        setLoading(false)
                    } else {
                        setLoading(true)
                    }
                }
            )
        })
    },[count])

    const searchData = (text) => {
        setSearch(text)
        if(text.length > 0) {
            const newData = mainData.filter((item) => {
                const itemData = item.title.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) == 0
            })
            setData(newData)
        } else {
            setData(mainData)
        }
    }

    return (
        <View style={styles.pageStyle}>
            <View style={styles.searchBox}>
                <AntDesign name="search1" size={24} color="tomato" style={{paddingLeft: 10}} />
                <TextInput 
                    style={{padding: 5, paddingLeft: 10, fontSize: 18}}
                    placeholder='Search Here...'
                    value={search}
                    onChangeText={(text) => searchData(text)}
                />
            </View>
            <View style={styles.listStyle}>
                {isLoading ? <Text>No Expense Available</Text> : (
                    <FlatList 
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        data={search.length == 0 ? mainData : data}
                        renderItem={({item}) => 
                                    <ListItem 
                                        navigation={navigation} 
                                        title={item.title} 
                                        date={item.date} 
                                        description={item.description} 
                                        amount={item.amount}
                                        type={item.type}
                                    />}
                    />
                )}
            </View>
        </View>
    )
}


function ListItem({navigation, title, date, description, amount, type}) {
    return (
        <Card 
            navigation={navigation} 
            onPress={() => {navigation.navigate('Expense Details', {
                                                    title: `${title}`, 
                                                    date: `${date}`, 
                                                    description: `${description}`,
                                                    amount: `${amount}`,
                                                    type: `${type}`
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
        justifyContent: 'center'
    }
})

export default Expense