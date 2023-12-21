// Import necessary components and modules
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Capture from '../assets/capture.png';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  // State variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login button press
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        navigation.navigate('FormScreen');
      })
      .catch((error) => {
        console.log('Login Error', error);
      });
  };

  const handleRegister = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={Capture} style={styles.logo} />
      <Text style={styles.appName}>Online Penalty Pay</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Officer ID"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input} // Ensure that the style is the same as the email input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.register}>
          Don't have an account? <Text style={styles.registerLink}>Register here.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Set a light background color
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
    color: '#3498db', // Set a primary color for the app name
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#3498db', // Set an accent color for the border
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF00', // Set the background color to black
  },
});

export default LoginScreen;
