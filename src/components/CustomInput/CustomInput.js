import React from 'react';
import { View, Text, TextInput, Image, StyleSheet} from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 5,
        maxWidth: 200,

        borderColor: 'black',
        borderWidth: 1,

        borderRadius: 5,

        marginVertical: 5,

    },
  });

export default CustomInput;