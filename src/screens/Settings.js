import React, {useContext, useState} from 'react';
import {View, StyleSheet, Linking, Text} from 'react-native';
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import {ApiKeyContext} from "../../App";
import {removeApiKey, saveApiKey} from "../utils/keyStorage";

const Settings = () => {
    const {key} = useContext(ApiKeyContext);
    const [newApiKey, setNewApiKey] = useState(key.apiKey);
    const handleRegisterApiKey = () => {
        Linking.openURL('https://pixabay.com/accounts/register/');
    };

    const handleSaveApiKey = () => {
        key.setApiKey(newApiKey);
        saveApiKey(newApiKey);
    };

    const handleDeleteApiKey = () => {
        setNewApiKey('');
        key.setApiKey('');
        removeApiKey();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Текущий API ключ</Text>
            <TextInput
                style={styles.input}
                placeholder="Введите новый API ключ"
                value={newApiKey}
                onChangeText={setNewApiKey}
            />
            <Button style={styles.button} title="Сохранить" onPress={handleSaveApiKey} />
            <Button style={[styles.button, styles.buttonDelete]} title="Удалить" onPress={handleDeleteApiKey} />
            <Button style={[styles.button, styles.buttonRegistration]} title="Регистрация API ключа" onPress={handleRegisterApiKey} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center",
    },
    input: {
        textAlign: "center",
    },
    button: {
        marginTop: 16,
    },
    buttonDelete: {

    },
    buttonRegistration: {
        backgroundColor: "green",
    }
});

export default Settings;
