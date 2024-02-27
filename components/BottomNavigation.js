import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';



const FormScreen = ({ navigation }) => {
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [color, setColor] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentTime, setIncidentTime] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [violationDescription, setViolationDescription] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [driverContact, setDriverContact] = useState('');
  const [witnessName, setWitnessName] = useState('');
  const [witnessContact, setWitnessContact] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');

  const handleFormSubmit = () => {
    console.log('Form submitted:', {
      vehicleMake,
      vehicleModel,
      vehicleYear,
      registrationNumber,
      color,
      incidentDate,
      incidentTime,
      incidentLocation,
      violationDescription,
      driverName,
      driverLicenseNumber,
      driverContact,
      witnessName,
      witnessContact,
      additionalComments,
    });

    navigation.navigate('CameraScreen');

  };
  const addDataToFirestore = async (values) => {
    console.log('Val', values);

    try {
      await setDoc(doc(db, 'DRIVER DETAILS', driverLicenseNumber), {
        vehicleMake: vehicleMake,
        vehicleModel: vehicleModel,
        vehicleYear: vehicleYear,
        registrationNumber: registrationNumber,
        color: color,
        incidentDate: incidentDate,
        incidentTime: incidentTime,
        incidentLocation: incidentLocation,
        violationDescription: violationDescription,
        driverName:driverLicenseNumber,
        driverLicenseNumber: driverLicenseNumber,
        driverContact: driverContact,
        witnessName: witnessName,
        witnessContact: witnessContact,
        additionalComments: additionalComments

      });
    } catch (error) {
      console.log('adding data firestore error', error);
    } 
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Vehicle Information:</Text>
        <TextInput label="Make" value={vehicleMake} onChangeText={setVehicleMake} mode="outlined" style={styles.input} />
        <TextInput label="Model" value={vehicleModel} onChangeText={setVehicleModel} mode="outlined" style={styles.input} />
        <TextInput label="Year" value={vehicleYear} onChangeText={setVehicleYear} mode="outlined" style={styles.input} />
        <TextInput label="Registration Number" value={registrationNumber} onChangeText={setRegistrationNumber} mode="outlined" style={styles.input} />
        <TextInput label="Color" value={color} onChangeText={setColor} mode="outlined" style={styles.input} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Incident Details:</Text>
        <TextInput label="Date" value={incidentDate} onChangeText={setIncidentDate} mode="outlined" style={styles.input} />
        <TextInput label="Time" value={incidentTime} onChangeText={setIncidentTime} mode="outlined" style={styles.input} />
        <TextInput label="Location" value={incidentLocation} onChangeText={setIncidentLocation} mode="outlined" style={styles.input} />
        <TextInput label="Violation Description" value={violationDescription} onChangeText={setViolationDescription} mode="outlined" style={styles.input} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Driver Information:</Text>
        <TextInput label="Driver's Name" value={driverName} onChangeText={setDriverName} mode="outlined" style={styles.input} />
        <TextInput label="Driver's License Number" value={driverLicenseNumber} onChangeText={setDriverLicenseNumber} mode="outlined" style={styles.input} />
        <TextInput label="Driver's Contact" value={driverContact} onChangeText={setDriverContact} mode="outlined" style={styles.input} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Witness Information:</Text>
        <TextInput label="Witness Name" value={witnessName} onChangeText={setWitnessName} mode="outlined" style={styles.input} />
        <TextInput label="Witness Contact" value={witnessContact} onChangeText={setWitnessContact} mode="outlined" style={styles.input} />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Additional Comments:</Text>
        <TextInput
          multiline
          label="Add any additional comments here"
          value={additionalComments}
          onChangeText={setAdditionalComments}
          mode="outlined"
          style={styles.input}
        />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Camera:</Text>
        
      </Card>

      <Button mode="contained" style={styles.submitButton} onPress={()=>{addDataToFirestore(),handleFormSubmit()}}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#3498db',
  },
  input: {
    backgroundColor: '#ecf0f1',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  
});

export default FormScreen;
