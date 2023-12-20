// FormScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

const FormScreen = ({navigation}) => {
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

    navigation.navigate("RequestScreen")

    
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Card style={{ marginVertical: 10, padding: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Vehicle Information:</Text>
        <TextInput label="Make" value={vehicleMake} onChangeText={setVehicleMake} mode="outlined" />
        <TextInput label="Model" value={vehicleModel} onChangeText={setVehicleModel} mode="outlined" />
        <TextInput label="Year" value={vehicleYear} onChangeText={setVehicleYear} mode="outlined" />
        <TextInput label="Registration Number" value={registrationNumber} onChangeText={setRegistrationNumber} mode="outlined" />
        <TextInput label="Color" value={color} onChangeText={setColor} mode="outlined" />
      </Card>

      <Card style={{ marginVertical: 10, padding: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Incident Details:</Text>
        <TextInput label="Date" value={incidentDate} onChangeText={setIncidentDate} mode="outlined" />
        <TextInput label="Time" value={incidentTime} onChangeText={setIncidentTime} mode="outlined" />
        <TextInput label="Location" value={incidentLocation} onChangeText={setIncidentLocation} mode="outlined" />
        <TextInput label="Violation Description" value={violationDescription} onChangeText={setViolationDescription} mode="outlined" />
      </Card>

      <Card style={{ marginVertical: 10, padding: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Driver Information:</Text>
        <TextInput label="Driver's Name" value={driverName} onChangeText={setDriverName} mode="outlined" />
        <TextInput label="Driver's License Number" value={driverLicenseNumber} onChangeText={setDriverLicenseNumber} mode="outlined" />
        <TextInput label="Driver's Contact" value={driverContact} onChangeText={setDriverContact} mode="outlined" />
      </Card>

      <Card style={{ marginVertical: 10, padding: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Witness Information:</Text>
        <TextInput label="Witness Name" value={witnessName} onChangeText={setWitnessName} mode="outlined" />
        <TextInput label="Witness Contact" value={witnessContact} onChangeText={setWitnessContact} mode="outlined" />
      </Card>

      <Card style={{ marginVertical: 10, padding: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Additional Comments:</Text>
        <TextInput
          multiline
          label="Add any additional comments here"
          value={additionalComments}
          onChangeText={setAdditionalComments}
          mode="outlined"
        />
      </Card>

      <Button mode="contained" style={{ marginTop: 20 }} onPress={handleFormSubmit}>
        Submit
      </Button>
    </ScrollView>
  );
};

export default FormScreen;
