import React, {createContext, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import AppNavigator from './src/navigation/AppNavigator';
import {loadApiKey} from './src/utils/keyStorage';

export const ApiKeyContext = createContext(null);
const App = () => {
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSavedApiKey = async () => {
            try {
                const savedApiKey = await loadApiKey();
                if (savedApiKey) {
                    setApiKey(savedApiKey);
                }
            } catch (error) {
                console.error('Ошибка при загрузке сохраненного API ключа:', error);
            }
            setIsLoading(false)
        };

        loadSavedApiKey();
    }, []);

    if (isLoading) {
        return <Text>Loading</Text>
    }

    return (
        <SafeAreaView style={styles.container}>
            <ApiKeyContext.Provider value={{key: {apiKey, setApiKey}}}>
                <AppNavigator apiKey={apiKey}/>
            </ApiKeyContext.Provider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default App;
