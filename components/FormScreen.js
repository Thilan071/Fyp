import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const FormScreen = ({ navigation }) => {
  const [formSection, setFormSection] = useState(1);

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

  const handleSubmit = () => {
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
        driverName: driverLicenseNumber,
        driverLicenseNumber: driverLicenseNumber,
        driverContact: driverContact,
        witnessName: witnessName,
        witnessContact: witnessContact,
        additionalComments: additionalComments,
      });
    } catch (error) {
      console.log('adding data firestore error', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {formSection === 1 && (
        <>
          <Card style={styles.card}>
            <ScrollView>
              <Text style={styles.cardTitle}>Vehicle Information:</Text>
              <TextInput
                label="Make"
                value={vehicleMake}
                onChangeText={setVehicleMake}
                style={styles.input}
              />
              <TextInput
                label="Model"
                value={vehicleModel}
                onChangeText={setVehicleModel}
                style={styles.input}
              />
              <TextInput
                label="Year"
                value={vehicleYear}
                onChangeText={setVehicleYear}
                style={styles.input}
              />
              <TextInput
                label="Registration Number"
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
                style={styles.input}
              />
              <TextInput
                label="Color"
                value={color}
                onChangeText={setColor}
                style={styles.input}
              />
              <Text style={styles.cardTitle}>Incident Details:</Text>
              <TextInput
                label="Date"
                value={incidentDate}
                onChangeText={setIncidentDate}
                style={styles.input}
              />
              <TextInput
                label="Time"
                value={incidentTime}
                onChangeText={setIncidentTime}
                style={styles.input}
              />
              <TextInput
                label="Location"
                value={incidentLocation}
                onChangeText={setIncidentLocation}
                style={styles.input}
              />
              <TextInput
                label="Violation Description"
                value={violationDescription}
                onChangeText={setViolationDescription}
                style={styles.input}
                multiline
              />
              <Text style={styles.cardTitle}>Driver Information:</Text>
              <TextInput
                label="Driver's Name"
                value={driverName}
                onChangeText={setDriverName}
                style={styles.input}
              />
              <TextInput
                label="Driver's License Number"
                value={driverLicenseNumber}
                onChangeText={setDriverLicenseNumber}
                style={styles.input}
              />
              <TextInput
                label="Driver's Contact"
                value={driverContact}
                onChangeText={setDriverContact}
                style={styles.input}
              />
              <Button title="Next" onPress={() => setFormSection(2)} />
            </ScrollView>
          </Card>
          {/* 
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Incident Details:</Text>
            <TextInput
              label="Date"
              value={incidentDate}
              onChangeText={setIncidentDate}
              style={styles.input}
            />
            <TextInput
              label="Time"
              value={incidentTime}
              onChangeText={setIncidentTime}
              style={styles.input}
            />
            <TextInput
              label="Location"
              value={incidentLocation}
              onChangeText={setIncidentLocation}
              style={styles.input}
            />
            <TextInput
              label="Violation Description"
              value={violationDescription}
              onChangeText={setViolationDescription}
              style={styles.input}
              multiline
            />
          </Card> */}

          <Button title="Next" onPress={() => setFormSection(2)} />
        </>
      )}

      {formSection === 2 && (
        <>
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Driver Information:</Text>
            <TextInput
              label="Driver's Name"
              value={driverName}
              onChangeText={setDriverName}
              style={styles.input}
            />
            <TextInput
              label="Driver's License Number"
              value={driverLicenseNumber}
              onChangeText={setDriverLicenseNumber}
              style={styles.input}
            />
            <TextInput
              label="Driver's Contact"
              value={driverContact}
              onChangeText={setDriverContact}
              style={styles.input}
            />
          </Card>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Witness Information:</Text>
            <TextInput
              label="Witness Name"
              value={witnessName}
              onChangeText={setWitnessName}
              style={styles.input}
            />
            <TextInput
              label="Witness Contact"
              value={witnessContact}
              onChangeText={setWitnessContact}
              style={styles.input}
            />
          </Card>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Additional Comments:</Text>
            <TextInput
              label="Additional Comments"
              value={additionalComments}
              onChangeText={setAdditionalComments}
              style={styles.input}
              multiline
              numberOfLines={4}
            />
          </Card>

          <Button
            style={styles.submitButton}
            title="Submit"
            onPress={() => {
              addDataToFirestore(), handleSubmit();
            }}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    paddingBottom: 3,
    marginBottom: 5,
    bottom: 6,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: ' #F7F9FA',
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
  },
  cardTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    backgroundColor: '#ff000000',
    paddingHorizontal: 0,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: '#E9EDF2',
    borderWidth: 1,
    backgroundColor: '#F7F9FA',
    textAlignVertical: 'top',
    height: 48,
    paddingLeft: 16,
    paddingRight: 8,
  },
});

export default FormScreen;
