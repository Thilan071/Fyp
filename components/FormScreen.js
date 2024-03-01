import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
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
    <View style={styles.container}>
      {formSection === 1 && (
        <>
          <View style={{ marginBottom: 10 }}>
            <Card style={styles.card}>
              <ScrollView>
                <Text style={[styles.cardTitle, { marginTop: 5 }]}>
                  Vehicle Information
                </Text>

                <View style={styles.textsAndInputs}>
                  <Text style={styles.mainTitle}>Make</Text>

                  <TextInput
                    placeholder="Toyota"
                    placeholderTextColor="#C7D0D9"
                    value={vehicleMake}
                    onChangeText={setVehicleMake}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Model</Text>
                  <TextInput
                    placeholder="Civic"
                    placeholderTextColor="#C7D0D9"
                    value={vehicleModel}
                    onChangeText={setVehicleModel}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Year</Text>
                  <TextInput
                    placeholder="2020"
                    placeholderTextColor="#C7D0D9"
                    value={vehicleYear}
                    onChangeText={setVehicleYear}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Registration Number</Text>
                  <TextInput
                    placeholder="ABC123"
                    placeholderTextColor="#C7D0D9"
                    value={registrationNumber}
                    onChangeText={setRegistrationNumber}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>
                <View>
                  <Text style={styles.mainTitle}>Color</Text>
                  <TextInput
                    placeholder="Blue"
                    placeholderTextColor="#C7D0D9"
                    value={color}
                    onChangeText={setColor}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <Text style={[styles.cardTitle, { marginTop: 20 }]}>
                  Incident Details
                </Text>
                <View>
                  <Text style={styles.mainTitle}>Date</Text>
                  <TextInput
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#C7D0D9"
                    value={incidentDate}
                    onChangeText={setIncidentDate}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Time</Text>
                  <TextInput
                    placeholder="HH:MM AM/PM"
                    placeholderTextColor="#C7D0D9"
                    value={incidentTime}
                    onChangeText={setIncidentTime}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Location</Text>
                  <TextInput
                    placeholder="Street address, City"
                    placeholderTextColor="#C7D0D9"
                    value={incidentLocation}
                    onChangeText={setIncidentLocation}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>
                <View>
                  <Text style={styles.mainTitle}>Violation Description </Text>
                  <TextInput
                    placeholder="Speeding"
                    placeholderTextColor="#C7D0D9"
                    value={violationDescription}
                    onChangeText={setViolationDescription}
                    style={styles.input}
                    underlineColor="white"
                    multiline
                  />
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => setFormSection(2)}
                    style={styles.button}
                  >
                    <Text style={styles.text}> Next </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Card>
          </View>
        </>
      )}

      {formSection === 2 && (
        <>
          <View style={{ marginBottom: 10 }}>
            <Card style={styles.card}>
              <ScrollView>
                <Text style={styles.cardTitle}>Driver Information:</Text>
                <View>
                  <Text style={styles.mainTitle}>Driver's Name</Text>
                  <TextInput
                    placeholder="Thilan"
                    placeholderTextColor="#C7D0D9"
                    value={driverName}
                    onChangeText={setDriverName}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}> Driver's License Number</Text>
                  <TextInput
                    placeholder="200120702665"
                    placeholderTextColor="#C7D0D9"
                    value={driverLicenseNumber}
                    onChangeText={setDriverLicenseNumber}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Driver's Contact</Text>
                  <TextInput
                    placeholder="0714074987"
                    placeholderTextColor="#C7D0D9"
                    value={driverContact}
                    onChangeText={setDriverContact}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <Text style={[styles.cardTitle, { marginTop: 20 }]}>
                  Witness Information:
                </Text>

                <View>
                  <Text style={styles.mainTitle}> Witness Name</Text>
                  <TextInput
                    placeholder="Lasith Herath"
                    placeholderTextColor="#C7D0D9"
                    value={witnessName}
                    onChangeText={setWitnessName}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Witness Contact </Text>
                  <TextInput
                    placeholder="0789833773"
                    placeholderTextColor="#C7D0D9"
                    value={witnessContact}
                    onChangeText={setWitnessContact}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Additional Comments</Text>
                  <TextInput
                    placeholder="Comment....."
                    placeholderTextColor="#C7D0D9"
                    value={additionalComments}
                    onChangeText={setAdditionalComments}
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <TouchableOpacity
                    onPress={() => {
                      addDataToFirestore(), handleSubmit();
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.text}> Submit </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Card>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2352D8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8, // Adjust the value to change the degree of rounding
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  submitButton: {
    borderRadius: 8,
    width: 358,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: ' #F7F9FA',
  },
  card: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 50,
  },
  cardTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#A8B4BF',
    fontSize: 16,
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
  textsAndInputs: {
    display: 'flex',
  },
  mainTitle: {
    color: '#576573',
  },
});

export default FormScreen;