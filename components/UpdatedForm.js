import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { doc, setDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Picker } from '@react-native-picker/picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from 'react-native-dropdown-select-list'


const UpdatedForm = ({ navigation }) => {
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

  const [penalties, setPenalties] = useState([]);
  const [selectedPenalty, setSelectedPenalty] = useState({});
  const [selectedOpenClose, setSelectedOpenCLose] = React.useState('');

  const data = [
    { key: '1', value: 'Unpaid' },
    { key: '2', value: 'Paid' },
  ];

  const dataForOpenClose = [
    { key: '1', value: 'Open' },
    { key: '2', value: 'Closed' },
  ];
  
  useEffect(() => {
    const getPenalties = async () => {
      const penaltiesColRef = collection(db, 'penalties');
      try {
        const penaltiesSnapshot = await getDocs(penaltiesColRef);
        const penaltiesList = penaltiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPenalties(penaltiesList);
      } catch (error) {
        console.error('Error fetching penalties: ', error);
      }
    };

    getPenalties();
  }, []);

  console.log('checking database', penalties);

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
      penaltyCost,
    });

    navigation.navigate('CameraScreen');
  };
  const addDataToFirestore = async (values) => {
    console.log('Val', values);

    try {
      await setDoc(doc(db, 'DRIVER DETAILS', licenseNumber), {
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
        penaltyCost: penaltyCost,
      });
    } catch (error) {
      console.log('adding data firestore error', error);
    }
  };
  const getExpireDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    const formattedExpireDate = today.toISOString().split('T')[0];
    return formattedExpireDate;
  };

  const handleMobileNumberChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const truncatedValue = numericValue.slice(0, 10);
    setMobileNumber(truncatedValue);
  };

  const fetchPenalties = async () => {
    const penaltiesCol = collection(db, 'penalties');
    const penaltySnapshot = await getDocs(penaltiesCol);
    const penaltyList = penaltySnapshot.docs.map((doc) => ({
      id: doc.id,
      penaltyCost: doc.data().penalty_cost,
      penaltyDescription: doc.data().penalty_description,
    }));
    return penaltyList;
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
                    Must you have to pay within fourteen days from today:{' '}
                    {getExpireDate()}
                  </Text>
                </View>

                <View>
                  <Text style={styles.mainTitle}>Case Status</Text>
                  <SelectList
                    setSelected={(val) => setCaseStatus(val)}
                    data={dataForOpenClose}
                    save="value"
                  />
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
                  <SelectList
                    setSelected={(val) => setPaymentStatus(val)}
                    data={data}
                    save="value"
                  />
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
                  <View>
                    <Text style={styles.mainTitle}>Penalty</Text>

                    <Picker
                      selectedValue={selectedPenalty.id}
                      onValueChange={(itemValue) => {
                        const penalty = penalties.find(
                          (p) => p.id === itemValue,
                        );
                        setSelectedPenalty(penalty || {});
                        setPenaltyDescription(
                          penalty?.penaltyDescription ?? '',
                        );
                        setPenaltyCost(penalty?.penaltyCost?.toString() ?? '');
                      }}
                      style={styles.input}
                    >
                      {penalties.map((penalty) => (
                        <Picker.Item
                          key={penalty.id}
                          label={penalty.penaltyDescription}
                          value={penalty.id}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View>
                    <Text style={styles.mainTitle}>Vehicle Type</Text>
                   <SelectList
                    setSelected={(val) => setVehicleType(val)}
                    // data={dataVehicleType}
                    save="value"
                  />
                  </View>

                  <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />

                  <TextInput
                    placeholder="Penalty Cost"
                    placeholderTextColor="#C7D0D9"
                    value={penaltyCost}
                    onChangeText={setPenaltyCost}
                    style={styles.input}
                    underlineColor="white"
                    keyboardType="numeric"
                  />
                </ScrollView>

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
    borderRadius: 8,
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

export default UpdatedForm;