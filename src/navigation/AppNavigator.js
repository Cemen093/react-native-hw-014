import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ImageDetailScreen from '../screens/ImageDetailScreen';
import Settings from '../screens/Settings';
import {CATEGORIES} from "../utils/constants";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    const HomeStack = () => (
        <Stack.Navigator>
            <Stack.Screen
                name="Searsh"
                component={HomeScreen}
                options={{
                    title: 'Поиск',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="ImageDetail"
                component={ImageDetailScreen}
                options={{
                    title: 'Детали изображения',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );

    const CategoryStack = () => (
        <Drawer.Navigator initialRouteName="Home">
            {CATEGORIES.map(category =>
                <Drawer.Screen
                    name={category.title}
                    component={CategoryScreen}
                    initialParams={{category}}
                    options={{
                        headerTitleAlign: 'center',
                    }}
                />
            )}
        </Drawer.Navigator>
    );

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({color, size}) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Категории') {
                            iconName = 'view-grid';
                        } else if (route.name === 'Настройки') {
                            iconName = 'cog';
                        }

                        return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
                <Tab.Screen name="Категории" component={CategoryStack} options={{headerShown: false}}/>
                <Tab.Screen
                    name="Настройки"
                    component={Settings}
                    options={{headerShown: false}}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
