import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { encode } from 'base-64';

const RequestScreen = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [penaltyPersonName, setPenaltyPersonName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const predefinedMessage = "This is a predefined message from our system.";

  const handleSendDetails = () => {
   const apiKey = '893e9529'; 
    const apiSecret = 'u0OIdgENzdxx7ocL'; 
    const fromNumber = 'Vonage APIs'; 
    const toNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`; 
    const textMessage = `Vehicle Number: ${vehicleNumber}, Penalty Person Name: ${penaltyPersonName}, This is a predefined message from our system. This is the link to the website: https://online-penalty-pay.firebaseapp.com/`;

    const authHeader = 'Basic ' + encode(`${apiKey}:${apiSecret}`);

    axios.post('https://rest.nexmo.com/sms/json', {
      from: fromNumber,
      to: toNumber,
      text: textMessage,
      api_key: apiKey, 
      api_secret: apiSecret 
    }, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.data.messages[0].status === "0") {
        Alert.alert('Success', 'SMS sent successfully!');
      } else {
        throw new Error(response.data.messages[0]['error-text']);
      }
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Error', `Failed to send SMS: ${error.message}`);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Vehicle Number"
        onChangeText={setVehicleNumber}
        value={vehicleNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Penalty Person's Name"
        onChangeText={setPenaltyPersonName}
        value={penaltyPersonName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendDetails}>
        <Text style={styles.buttonText}>Send Details</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
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
    borderRadius: 4,
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
});

export default RequestScreen;

