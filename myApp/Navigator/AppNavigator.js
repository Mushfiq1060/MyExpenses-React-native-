
import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Pending from '../Screen/Pending'
import Expense from '../Screen/Expense'
import PendingDetails from '../Screen/PendingDetails'
import AddExpense from '../Screen/AddExpense'
import ExpenseDetails from '../Screen/ExpenseDetails'



const Tab = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()


const TabStack = () => {
    return (
        <Tab.Navigator 
            style={{paddingTop: StatusBar.currentHeight}}
            screenOptions={{
                tabBarStyle: {backgroundColor: 'transparent', elevation: 0}
            }}
        >

            <Tab.Screen name='Pending Expense' component={Pending}/>
            <Tab.Screen name='List Of Expense' component={Expense}/>

        </Tab.Navigator>
    )
}

const AppNavigator = () => {
    return (
        <Stack.Navigator>

            <Stack.Screen 
                options={{
                    headerShown: false
                }}
                name='Pending' 
                component={TabStack}
            />
            <Stack.Screen name='Add Expense' component={AddExpense} />
            <Stack.Screen name='Pending Details' component={PendingDetails} />
            <Stack.Screen name='Expense Details' component={ExpenseDetails} />

        </Stack.Navigator>
    )
}

export default AppNavigator