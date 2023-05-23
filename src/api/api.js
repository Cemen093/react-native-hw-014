import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (category, apiKey) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: apiKey,
                q: category,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получении изображений');
    }
};
