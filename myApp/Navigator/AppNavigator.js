
import { View, Text, StatusBar } from 'react-native'
import React, { useState } from 'react'
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

const TabStack = ({count}) => {
    return (
        <Tab.Navigator 
            style={{paddingTop: StatusBar.currentHeight}}
            screenOptions={{
                tabBarStyle: {backgroundColor: 'transparent', elevation: 0}
            }}
        >
            <Tab.Screen name='Pending Expense'>
                {(props) => <Pending {...props} count={count} />}
            </Tab.Screen>
            <Tab.Screen name='List Of Expense'>
                {(props) => <Expense {...props} count={count} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const AppNavigator = () => {
    const [count, setCount] = useState(0)
    return (
        <Stack.Navigator>
            <Stack.Screen  
                options={{
                    headerShown: false
                }}
                name='Pending' 
            >
                {(props) => <TabStack {...props} count={count} />}  
            </Stack.Screen>
            <Stack.Screen name='Add Expense'>
                {(props) => <AddExpense {...props} setCount={setCount} />}
            </Stack.Screen>
            <Stack.Screen name='Pending Details'>
                {(props) => <PendingDetails {...props} setCount={setCount} />}
            </Stack.Screen>
            <Stack.Screen name='Expense Details'>
                {(props) => <ExpenseDetails {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export default AppNavigator