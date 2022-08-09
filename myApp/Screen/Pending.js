
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

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
    })
}

const Pending = ({navigation}) => {
    
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        CreateTable()
        // DeleteTable()
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM pendingTable`,
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
    },[data])

    return (
        <View style={styles.pageStyle}>
            <View style={{marginTop: 5}}>
                {isLoading ? <ActivityIndicator size='large' /> : (
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