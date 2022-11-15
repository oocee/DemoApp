import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Button } from 'react-native';
import Logo from '../../../assets/Logos/icon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation } from '@react-navigation/native'

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const {height} = useWindowDimensions();

    const onSignIn = () => {
        navigation.navigate('HomeScreen');
    }
    const onRegister = () => {
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} />
            <CustomInput 
                placeholder="Username" 
                value={username} 
                setValue={setUsername} 
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry
            />
            <CustomButton
                text="Sign In"
                type="blue"
                onPress={onSignIn}
            />
            <CustomButton
                text="Create account"
                type="blue"
                onPress={onRegister}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: "#86c1cc47",
        flex: 1,
    },
    logo: {
        width: '70%',
        maxWidth: 250,
        marginTop: '5%',
    },
  });

export default SignInScreen;