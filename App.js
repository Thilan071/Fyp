import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Fyp/components/LoginScreen';
import FormScreen from './components/FormScreen';
import RequestScreen from '../Fyp/components/RequestScreen';
import SignUpScreen from '../Fyp/components/SignUpScreen';
import CameraScreen from './components/CameraScreen ';
import BottomNavigation from './components/BottomNavigation';
import ProfileScreen from './components/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
<Stack.Navigator>
        {/* <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="FormScreen"
          component={FormScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="RequestScreen"
          component={RequestScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{title: 'Welcome'}}
        /> */}
        
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{title: 'ProfileScreen'}}
        />
        
        <Stack.Screen
  name="CameraScreen" 
  component={CameraScreen} 
  options={{title: 'Welcome'}}
/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
