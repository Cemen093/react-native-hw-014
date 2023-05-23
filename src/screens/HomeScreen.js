import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import ImageCard from '../components/ImageCard';
import {fetchImages} from '../api/api';
import {useNavigation} from "@react-navigation/native";
import {ApiKeyContext} from "../../App";
import SearchBar from "../components/SearchBar";

const HomeScreen = () => {
    const {key} = useContext(ApiKeyContext);
    const navigation = useNavigation();
    const [query, setQuery] = useState('beauty');
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchError, setIsFetchError] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!!key.apiKey) {
            loadImagesByCategory(query);
        }
    }, []);

    const loadImagesByCategory = async (category) => {
        try {
            setIsLoading(true);
            const data = await fetchImages(category, key.apiKey);
            if (data) {
                setImages(data.hits);
            }
        } catch (e) {
            setIsFetchError(true);
        }
        setIsLoading(false)
    };

    const handleImagePress = (imageUrl) => {
        navigation.navigate('ImageDetail', {imageUrl});
    };

    if (!key.apiKey) {
        return (
            <Text style={styles.noApiKeyText}>
                У вас отсутствует API ключ. Пожалуйста, введите ключ в настройках.
            </Text>
        )
    }

    if (isLoading) {
        return <Text style={styles.loadingText}>Загрузка...</Text>
    }

    if (isFetchError) {
        return (
            <Text style={styles.errorText}>
                При загрузке изображения произошла ошибка, пожалуйста проверьте ваш ключ API
            </Text>
        )
    }

    return (
        <View style={styles.container}>
            <SearchBar
                style={{flex: 1}}
                text={query}
                onChangeText={(query) => setQuery(query)}
                onEndEditing = {() => loadImagesByCategory(query)}
            />
            <FlatList
                data={images}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <ImageCard
                        imageUrl={item.webformatURL}
                        onPress={() => handleImagePress(item.webformatURL)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 16,
    },
    noApiKeyText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 16,
        paddingHorizontal: 16,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 16,
        paddingHorizontal: 16,
        textAlign: 'center',
        color: "red",
    },
});

export default HomeScreen;
