import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY_STORAGE_KEY = 'API_KEY';

export const saveApiKey = async (apiKey) => {
    try {
        await AsyncStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    } catch (error) {
        console.error('Ошибка при сохранении API ключа:', error);
    }
};

export const loadApiKey = async () => {
    try {
        return await AsyncStorage.getItem(API_KEY_STORAGE_KEY);
    } catch (error) {
        console.error('Ошибка при загрузке API ключа:', error);
        return null;
    }
};

export const removeApiKey = async () => {
    try {
        await AsyncStorage.removeItem(API_KEY_STORAGE_KEY);
    } catch (error) {
        console.log('Ошибка при удалении ключа API:', error);
    }
};
