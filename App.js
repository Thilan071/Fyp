
import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Fyp/components/LoginScreen';
import RequestScreen from '../Fyp/components/RequestScreen';
import SignUpScreen from '../Fyp/components/SignUpScreen';
import BottomTabs from './components/BottomTabs';
import HistoryScreen from './components/HistoryScreen';
import UpdatedForm from './components/UpdatedForm';
import SplashingScreen from './components/SplashingScreen'; 
import CameraScreen from './components/CameraScreen ';
import LanguageSelect from './components/LanguageSelect';
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
  }, []);

  if (isLoading) {
  
    return <SplashingScreen />;
   
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormScreen"
          component={BottomTabs}
          options={{ title: 'Form', headerShown: false }}
        />
        <Stack.Screen
          name="RequestScreen"
          component={RequestScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{ title: 'HistoryScreen' }}
        />
        <Stack.Screen
          name="UpdatedForm"
          component={UpdatedForm}
          options={{ title: 'UpdatedForm' }}
        />
      
                 </Stack.Navigator>
                
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
