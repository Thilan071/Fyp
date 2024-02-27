import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignUpScreen = ({ navigation }) => {
  const [officerName, setOfficerName] = useState('');
  const [officerUnit, setOfficerUnit] = useState('');
  const [officerId, setOfficerId] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [officerPassword, setOfficerPassword] = useState('');

  const handleSignUp = async () => {
    try {
      console.log('Officer Name:', officerName);
      console.log('Officer Unit:', officerUnit);
      console.log('Officer ID:', officerId);

      await createUserWithEmailAndPassword(auth, officerEmail, officerPassword);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error with SignUp', error);
    }
  };
  const addDataToFirestore = async (values) => {
    console.log('Val', values);

    try {
      await setDoc(doc(db, 'OFFICER DETAILS',officerEmail), {
        officerName: officerName,
        officerUnit: officerUnit,
        officerId:officerId,
        officerEmail:officerEmail,
        officerPassword:officerPassword
      });
    } catch (error) {
      console.log('adding data firestore error', error);
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Officer Name"
        onChangeText={(text) => setOfficerName(text)}
        value={officerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Officer Unit"
        onChangeText={(text) => setOfficerUnit(text)}
        value={officerUnit}
      />
      <TextInput
        style={styles.input}
        placeholder="Officer ID"
        onChangeText={(text) => setOfficerId(text)}
        value={officerId}
      />
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

      <TouchableOpacity style={styles.button} onPress={()=>{addDataToFirestore(),handleSignUp()}}>
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
