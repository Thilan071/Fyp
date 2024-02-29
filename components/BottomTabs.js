import * as React from 'react';
import { Button, View, Text, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormScreen from '../components/FormScreen';
import RequestScreen from '../components/RequestScreen';
import Home from '../assets/home.png';
const BottomTabs = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FormScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={Home}
              style={{
                tintColor: color === '#009' ? 'blue' : '#b2b2b2',

                width: 24,
                height: 24,
                borderRadius: 24,
              }}
            />
          ),
          tabBarStyle: { position: 'absolute' },
          tabBarActiveTintColor: '#009',

          tabBarInactiveTintColor: '#b2b2b2',
        }}
      />
      <Tab.Screen
        name="DetailsScreen"
        component={RequestScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/5582/5582477.png',
              }}
              style={{
                tintColor: color === '#009' ? 'blue' : '#b2b2b2',
                width: 24,
                height: 24,
                borderRadius: 24,
              }}
            />
          ),
          tabBarStyle: { position: 'absolute' },
          tabBarActiveTintColor: '#009',
          tabBarInactiveTintColor: '#b2b2b2',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
