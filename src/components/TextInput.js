import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextInputComponent = ({ placeholder, value, onChangeText, style }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, style]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
});

export default TextInputComponent;
