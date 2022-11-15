import React from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';

//button styles "blue", "link"

const CustomButton = ({onPress, text, type}) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={styles[`container_${type}`].text}>{text}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '70%',
        padding: 5,
        maxWidth: 200,

        borderRadius: 5,

        marginVertical: 5,
        alignItems: 'center',
    },
    container_blue: {
        backgroundColor: '#2c4882',
        text: {
            color: 'white',
        }
    },
    container_link: {
        text: {
            color: "#2b2b2b",
            textDecorationLine: 'underline',
        },
    },
  });

export default CustomButton;