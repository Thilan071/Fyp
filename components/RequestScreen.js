import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RequestScreen = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [penaltyPersonName, setPenaltyPersonName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendDetails = () => {
    // Implement the logic to send details
    // For now, you can just log the values
    console.log('Vehicle Number:', vehicleNumber);
    console.log('Penalty Person Name:', penaltyPersonName);
    console.log('Phone Number:', phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>

      {/* Vehicle Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Vehicle Number"
        onChangeText={(text) => setVehicleNumber(text)}
        value={vehicleNumber}
      />

      {/* Penalty Person's Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Penalty Person's Name"
        onChangeText={(text) => setPenaltyPersonName(text)}
        value={penaltyPersonName}
      />

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        keyboardType="phone-pad" // Set keyboard type to phone number
      />

      {/* Send Details Button */}
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
