import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './myApp/Navigator/AppNavigator';

export default function App() {
    return (
        <NavigationContainer>

            <AppNavigator />

        </NavigationContainer>
    );
}

