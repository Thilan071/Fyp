// Import necessary components and modules
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Capture from '../assets/capture.png';

const LoginScreen = ({navigation}
  ) => {
  // State variables to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login button press
  const handleLogin = () => {
    navigation.navigate("FormScreen")


  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Online Penalty Pay</Text>
      <Image
        source={Capture}
           
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Officer ID"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}  // Ensure that the style is the same as the email input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <Text style={styles.register}>
        Don't have an account? <Text style={styles.registerLink}>Register here.</Text>
      </Text>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
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
  },
});

export default LoginScreen;
