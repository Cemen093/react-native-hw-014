import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SearchBar = ({ text, onChangeText, onEndEditing }) => {
    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Поиск"
                value={text}
                onChangeText={onChangeText}
                onEndEditing={onEndEditing}
            />
            <FontAwesome name="search" style={styles.iconStyle} onPress={onEndEditing}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        backgroundColor: '#F0EEEE',
        height: 44,
        borderRadius: 5,
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 18,
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 10,
    },
});

export default SearchBar;
