import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Capture from '../assets/capture.png';
import { auth } from '../firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userLoggedIn').then(userLoggedIn => {
      if (userLoggedIn) {
        navigation.navigate('FormScreen');
      }
    }).catch(error => console.log('AsyncStorage Error:', error));
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await AsyncStorage.setItem('userLoggedIn', 'true');
        navigation.navigate('FormScreen');
      })
      .catch(error => console.log('Login Error', error));
  };

  return (
    <View style={styles.container}>
      <Image source={Capture} style={styles.logo} />
      <Text style={styles.appName}>Online Penalty Pay</Text>

      <TextInput
        style={styles.input}
        placeholder="Officer ID"
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input} 
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.register}>
          Don't have an account? <Text style={styles.registerLink}>Register here.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db', 
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#3498db', 
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    width: '80%',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
  forgotPassword: {
    color: '#3498db',
    marginTop: 10,
  },
  register: {
    marginTop: 16,
  },
  registerLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
