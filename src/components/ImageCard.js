import React from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ImageCard = ({ imageUrl, title, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    title: {
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ImageCard;
