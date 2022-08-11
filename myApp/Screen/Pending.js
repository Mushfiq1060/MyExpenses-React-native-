
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from './Card';
import {DatabaseConnection} from '../Database/DatabaseConnection'

const db = DatabaseConnection.getPendingConnection()

function DeleteTable() {
    db.transaction((tx) => {
        tx.executeSql(
            `DROP TABLE IF EXISTS pendingTable`, []
        )
        tx.executeSql(
            `DROP TABLE IF EXISTS expenseTable`, []
        )
        tx.executeSql(
            `DROP TABLE IF EXISTS recurrentTable`, []
        )
    })
}

function CreateTable() {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS pendingTable (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, 
                amount TEXT, type TEXT, date TEXT)`,
        )
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS expenseTable (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, 
                amount TEXT, type TEXT, date TEXT)`,
        )
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS recurrentTable (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, 
                amount TEXT, type TEXT, date TEXT)`,
        )
    })
}

function FetchData({setData, setLoading}) {
    db.transaction((tx) => {
        console.log("Data use effect call")
        tx.executeSql(
            `SELECT * FROM pendingTable ORDER BY id DESC`,
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
                setData(temp)
                if(result.rows.length > 0) {
                    setLoading(false)
                } else {
                    setLoading(true)
                }
            }
        )
    })
}

const Pending = ({navigation, count}) => {
    
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [anotherFetch, setAnotherFetch] = useState(true)

    const GetAsyncData = async () => {
        let value = await AsyncStorage.getItem('lastTime')
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM recurrentTable',
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
                    var arr = []
                    for(let i = 0; i < temp.length; i++) {
                        let currentTime = moment().utcOffset('+06:00').format('MM-YYYY')
                        let lastTime = value
                        let insertTime = moment().utcOffset('+06:00').format('MM-DD-YYYY hh:mm a');
                        while(moment(lastTime,'MM-YYYY').isBefore(moment(currentTime,'MM-YYYY'))) {
                            lastTime = moment(lastTime, 'MM-YYYY').add(1, 'month').format('MM-YYYY')
                            arr.push({
                                id: temp[i].id,
                                title: temp[i].title,
                                description: temp[i].description,
                                amount: temp[i].amount,
                                type: temp[i].amount,
                                date: insertTime
                            })
                            insertTime = moment(insertTime,'MM-DD-YYYY hh:mm a').add(-1,'month').format('MM-DD-YYYY hh:mm a')
                        }
                    }
                    //console.log(arr)
                    for(let i = 0; i < arr.length; i++) {
                        db.transaction((tx) => {
                            tx.executeSql(
                                'INSERT INTO pendingTable (title, description, amount, type, date) VALUES (?,?,?,?,?)',
                                [arr[i].title, arr[i].description, arr[i].amount, arr[i].type, arr[i].date],
                            )
                        })
                    }
                    setAnotherFetch(false)
                }
            )
        })
    }

    const SetAsyncData = async () => {
        const date = moment().format('MM-YYYY')
        await AsyncStorage.setItem('lastTime', date)
    }

    useEffect(() => {
        CreateTable()
        //DeleteTable()
        FetchData({setData, setLoading})
    },[count, anotherFetch])


    useEffect(() => {
        GetAsyncData()
        SetAsyncData()
    },[])

    return (
        <View style={styles.pageStyle}>
            <View style={{marginTop: 5}}>
                {isLoading ? <Text>No Pending Avaiable</Text> : (
                    <FlatList 
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem= {({item}) => 
                                        <ListItem 
                                            navigation={navigation} 
                                            title={item.title} 
                                            date={item.date} 
                                            description={item.description} 
                                            amount={item.amount}
                                            type={item.type}
                                            id={item.id}
                                        />
                                    }
                    />
                )}
            </View>
            <Pressable 
                style={styles.floatingBtn} 
                onPress={() => {navigation.navigate('Add Expense')}}
            >
                <AntDesign name="plus" size={50} color="white" />
            </Pressable>
        </View>
    )
}

function ListItem({navigation, title, date, description, amount, type, id}) {
    return (
        <Card 
            navigation={navigation} 
            onPress={() => {navigation.navigate('Pending Details', {
                                                    title: `${title}`, 
                                                    date: `${date}`, 
                                                    description: `${description}`,
                                                    amount: `${amount}`,
                                                    type: `${type}`,
                                                    id: `${id}`
                                                })}}
            title={title}
            date={date}
            amount={amount}
            name="Pending"
        />
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