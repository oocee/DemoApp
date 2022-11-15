import 'react-native-gesture-handler';
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/signInScreen';
import SignUpScreen from '../screens/signUpScreen';
import HomeScreen from '../screens/homeScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <StatusBar/>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;