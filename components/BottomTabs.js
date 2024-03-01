import * as React from 'react';
import { Button, View, Text, Pressable, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormScreen from '../components/FormScreen';
import RequestScreen from '../components/RequestScreen';
import Home from '../assets/home.png';
import History from '../assets/history-book.png';
import Profile from '../assets/profile.png';
import ProfileScreen from './ProfileScreen';
const BottomTabs = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FormScreen}
        options={{
          headerShown: true,

          headerTitleAlign: 'center',

          headerTitle: 'Form',
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
        name="Driver History"
        component={RequestScreen}
        options={{
          headerShown: true,
          title: 'Driver History',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={History}
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
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={Profile}
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