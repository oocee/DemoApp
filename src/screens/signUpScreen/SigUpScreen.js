import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Button } from 'react-native';
import Logo from '../../../assets/Logos/icon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation } from '@react-navigation/native'
import Navigation from '../../Navigation/Navigation';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const onSignUp = () => {
        navigation.navigate('HomeScreen')
    }
    const onSignIn = () => {
        navigation.navigate('SignIn')
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text}>Register</Text>
            <CustomInput 
                placeholder="Username" 
                value={username} 
                setValue={setUsername} 
            />
            <CustomInput 
                placeholder="Email" 
                value={email} 
                setValue={setEmail} 
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry
            />
            <CustomInput 
                placeholder="Password again" 
                value={passwordConfirm} 
                setValue={setPasswordConfirm}
                secureTextEntry
            />
            <CustomButton
                text="Sign Up"
                onPress={onSignUp}
                type="blue"
            />
            <View style={styles.text2}>
                <CustomButton
                text="Sign In"
                type="link"
                onPress={onSignIn}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop: "20%",
        alignItems: 'center',
        backgroundColor: "#86c1cc47",
        flex: 1,
    },
    text: {
        color: "black",
        fontSize: "30px",
        marginBottom: 10,
    },
    text2: {
        alignItems: "center",
    },
  });

export default SignInScreen;