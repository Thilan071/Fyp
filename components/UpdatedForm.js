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
import { Picker } from '@react-native-picker/picker';


const FormScreen = ({ navigation }) => {
  const [formSection, setFormSection] = useState(1);
  const [caseDate, setCaseDate] = useState('');
  const [caseTime, setCaseTime] = useState('');
  const [caseLocation, setCaseLocation] = useState('');
  const [caseDirection, setCaseDirection] = useState('');
  const [caseExpireDate, setCaseExpireDate] = useState('');
  const [caseStatus, setCaseStatus] = useState('Open');
  const [trafficOicNumber, setTrafficOicNumber] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [penaltyPayment, setPenaltyPayment] = useState('');
  const [penaltyId, setPenaltyId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleTypeId, setVehicleTypeId] = useState('');
  const [nic, setNic] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [penaltyDescription, setPenaltyDescription] = useState('');
  const [penaltyCost, setPenaltyCost] = useState('');
  

  const handleSubmit = () => {
    console.log('Form submitted:', {
        caseDate,
        caseTime,
        caseLocation,
        caseDirection,
        caseExpireDate,
        caseStatus,
        trafficOicNumber,
        caseDescription,
        penaltyPayment,
        penaltyId,
        driverId,
        paymentDate,
        paymentStatus,
        vehicleNumber,
        vehicleTypeId,
        nic,
        firstName,
        lastName,
        address,
        mobileNumber,
        licenseNumber,
        vehicleType,
        penaltyDescription,
        penaltyCost
    });

    navigation.navigate('CameraScreen');
  };
  const addDataToFirestore = async (values) => {
    console.log('Val', values);

    try {
      await setDoc(doc(db, 'DRIVER DETAILS', driverLicenseNumber), {
        caseDate: caseDate,
        caseTime: caseTime,
        caseLocation: caseLocation,
        caseDirection: caseDirection,
        caseExpireDate: caseExpireDate,
        caseStatus: caseStatus,
        trafficOicNumber: trafficOicNumber,
        caseDescription: caseDescription,
        penaltyPayment: penaltyPayment,
        penaltyId: penaltyId,
        driverId: driverId,
        paymentDate: paymentDate,
        paymentStatus: paymentStatus,
        vehicleNumber: vehicleNumber,
        vehicleTypeId: vehicleTypeId,
        nic: nic,
        firstName: firstName,
        lastName: lastName,
        address: address,
        mobileNumber: mobileNumber,
        licenseNumber: licenseNumber,
        vehicleType: vehicleType,
        penaltyDescription: penaltyDescription,
        penaltyCost: penaltyCost
      });
    } catch (error) {
      console.log('adding data firestore error', error);
    }
  };
  const getExpireDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 14); // Adding 14 days
    const formattedExpireDate = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
    return formattedExpireDate;
  };

  const handleMobileNumberChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const truncatedValue = numericValue.slice(0, 10);
    setMobileNumber(truncatedValue);
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
                  <Text style={styles.mainTitle}>Case Date</Text>

                  <TextInput
                    placeholder={new Date().toLocaleDateString()}
                    placeholderTextColor="#C7D0D9"
                    value={caseDate}
                    onChangeText={setCaseDate}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Case Time</Text>
                  <TextInput
                    placeholder="HH:MM AM/PM"                    
                    placeholderTextColor="#C7D0D9"
                    value={caseTime}
                    onChangeText={setCaseTime}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Case Location</Text>
                  <TextInput
                    placeholder="Kandy"
                    placeholderTextColor="#C7D0D9"
                    value={caseLocation}
                    onChangeText={setCaseLocation}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Case Direction</Text>
                  <TextInput
                    placeholder="Kandy to Colombo"
                    placeholderTextColor="#C7D0D9"
                    value={caseDirection}
                    onChangeText={setCaseDirection}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>
                <View>
                <Text style={styles.mainTitle}>Case Expire Date</Text>
                <Text style={styles.input}>
                    Must you have to pay within fourteen days from today: {getExpireDate()}
                </Text>
                </View>

                <View>
                <Text style={styles.mainTitle}>Case Status</Text>
                <Picker
                    selectedValue={caseStatus}
                    onValueChange={(itemValue, itemIndex) => setCaseStatus(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Open" value="Open" />
                    <Picker.Item label="Closed" value="Closed" />
                </Picker>
                </View>

                <View>
                  <Text style={styles.mainTitle}>Traffic OIC Number</Text>
                  <TextInput
                    placeholder="A125346"
                    placeholderTextColor="#C7D0D9"
                    value={trafficOicNumber}
                    onChangeText={setTrafficOicNumber}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>
                <View>
                  <Text style={styles.mainTitle}>Additional Comments</Text>
                  <TextInput
                    placeholder="Comment....."
                    placeholderTextColor="#C7D0D9"
                    value={caseDescription}
                    onChangeText={setCaseDescription}
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    underlineColor="white"
                  />
                </View>
                
                <View>
                  <Text style={styles.mainTitle}>Penalty Payment</Text>
                  <TextInput
                    placeholder="10500/="
                    placeholderTextColor="#C7D0D9"
                    value={penaltyPayment}
                    onChangeText={setPenaltyPayment}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>
                
                <View>
                  <Text style={styles.mainTitle}>Penalty ID</Text>
                  <TextInput
                    placeholder="0001"
                    placeholderTextColor="#C7D0D9"
                    value={penaltyId}
                    onChangeText={setPenaltyId}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>
                
                <View>
                  <Text style={styles.mainTitle}>Driver ID</Text>
                  <TextInput
                    placeholder="7667"
                    placeholderTextColor="#C7D0D9"
                    value={driverId}
                    onChangeText={setDriverId}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Payment Date</Text>
                  <TextInput
                    placeholder="payment date"
                    placeholderTextColor="#C7D0D9" // this is not be here i think
                    value={paymentDate}
                    onChangeText={setPaymentDate}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                <Text style={styles.mainTitle}>Payment Status</Text>
                <Picker
                    selectedValue={paymentStatus}
                    onValueChange={(itemValue) => setCaseStatus(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Paid" value="Paid" />
                    <Picker.Item label="Un-pPaid" value="Un-pPaid" />
                </Picker>
                </View>

                <View>
                  <Text style={styles.mainTitle}>Vehicle Number</Text>
                  <TextInput
                    placeholder="BC6546"
                    placeholderTextColor="#C7D0D9" // this is not be here i think
                    value={vehicleNumber}
                    onChangeText={setVehicleNumber}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Vehicle Type ID</Text>
                  <TextInput
                    placeholder="BHG76"
                    placeholderTextColor="#C7D0D9" // this is not be here i think
                    value={vehicleTypeId}
                    onChangeText={setVehicleTypeId}
                    style={styles.input}
                    underlineColor="white"
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
                  <Text style={styles.mainTitle}>First Name</Text>
                  <TextInput
                    placeholder="Thilan"
                    placeholderTextColor="#C7D0D9"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Last Name</Text>
                  <TextInput
                    placeholder="Theekshana"
                    placeholderTextColor="#C7D0D9" 
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>NIC</Text>
                  <TextInput
                    placeholder="20010450350v"
                    placeholderTextColor="#C7D0D9" 
                    value={nic}
                    onChangeText={setNic}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                  <Text style={styles.mainTitle}>Address</Text>
                  <TextInput
                    placeholder="Kandy , Sri Lanka"
                    placeholderTextColor="#C7D0D9" 
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <View>
                <Text style={styles.mainTitle}>Mobile Number</Text>
                <TextInput
                    placeholder="078-3498097"
                    placeholderTextColor="#C7D0D9" 
                    value={mobileNumber}
                    onChangeText={handleMobileNumberChange}
                    style={styles.input}
                    underlineColorAndroid="transparent" 
                    keyboardType="numeric"
                    maxLength={10} 
                />
                </View>

                <View>
                  <Text style={styles.mainTitle}>License Number</Text>
                  <TextInput
                    placeholder="3456789"
                    placeholderTextColor="#C7D0D9" 
                    value={licenseNumber}
                    onChangeText={setLicenseNumber}
                    style={styles.input}
                    underlineColor="white"
                  />
                </View>

                <ScrollView>
      <Text style={[styles.cardTitle, { marginTop: 5 }]}>
        Vehicle Information
      </Text>

      <View style={styles.textsAndInputs}>
        <Text style={styles.mainTitle}>Vehicle Type</Text>

        <TextInput
          placeholder="SUV"
          placeholderTextColor="#C7D0D9"
          value={vehicleType}
          onChangeText={setVehicleType}
          style={styles.input}
          underlineColor="white"
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 3, marginRight: 8 }}>
                    <Text style={styles.mainTitle}>Penalty Description</Text>
                    <TextInput
                    placeholder="Description"
                    placeholderTextColor="#C7D0D9"
                    value={penaltyDescription}
                    onChangeText={setPenaltyDescription}
                    style={[styles.input, { height: 40 }]} // Adjust as needed
                    underlineColorAndroid="transparent"
                    multiline={true}
                    />
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={styles.mainTitle}>Cost</Text>
                    <TextInput
                    placeholder="Cost"
                    placeholderTextColor="#C7D0D9"
                    value={penaltyCost}
                    onChangeText={setPenaltyCost}
                    style={[styles.input, { height: 40 }]} // Ensure consistent height with description input
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                    />
                </View>
                </View>

                    </ScrollView>

                

                

                

                




                


                {/* <View>
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
                </View> */}

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