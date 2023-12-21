// SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [officerPassword, setOfficerPassword] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, officerEmail, officerPassword);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error with SignUp', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Officer Email"
        onChangeText={(text) => setOfficerEmail(text)}
        value={officerEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Officer Password"
        secureTextEntry={true}
        onChangeText={(text) => setOfficerPassword(text)}
        value={officerPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Your Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
