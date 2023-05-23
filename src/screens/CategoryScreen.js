import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet, Text} from 'react-native';
import ImageCard from '../components/ImageCard';
import {fetchImages} from '../api/api';
import {ApiKeyContext} from "../../App";

const CategoryScreen = ({route}) => {
    const {key} = useContext(ApiKeyContext);
    const {category} = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchError, setIsFetchError] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!!key.apiKey) {
            fetchCategoryImages();
        }
    }, []);

    const fetchCategoryImages = async () => {
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
            {isLoading ?
                <ActivityIndicator size="large" color="blue"/>
                :
                <FlatList
                    data={images}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <ImageCard imageUrl={item.webformatURL} title={item.tags}/>
                    )}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
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

export default CategoryScreen;
