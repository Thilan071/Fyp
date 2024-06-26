
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
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const UpdatedForm = ({ navigation, route }) => {
  const [formSection, setFormSection] = useState(1);
  const [caseDate, setCaseDate] = useState(new Date().toLocaleDateString());
  const [caseTime, setCaseTime] = useState(new Date().toLocaleTimeString());
  const [caseLocation, setCaseLocation] = useState('');
  const [caseDirection, setCaseDirection] = useState('');
  const [caseExpireDate, setCaseExpireDate] = useState('');
  const [caseStatus, setCaseStatus] = useState('Open');
  const [trafficOicNumber, setTrafficOicNumber] = useState('');
  const [trafficOicName, settrafficOicName] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [driverId, setDriverId] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [nic, setNic] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [penaltyDescription, setPenaltyDescription] = useState('');
  const [penaltyCost, setPenaltyCost] = useState('');
  const [showVehicleList, setShowVehicleList] = useState(false);
  const [vehicles, setVehicles] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [penalties, setPenalties] = useState([]);
  const [showPenaltyList, setShowPenaltyList] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState({});
  const [selectedOpenClose, setSelectedOpenCLose] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.caseLocation = caseLocation ? "" : "Case location is required.";
    tempErrors.nic = nic ? (/\d{9}[vxVX]|\d{12}/.test(nic) ? "" : "Invalid NIC format.") : "NIC is required.";
    tempErrors.mobileNumber = mobileNumber ? (/\d{10}/.test(mobileNumber) ? "" : "Invalid mobile number format.") : "Mobile number is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).every(key => tempErrors[key] === "");
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTimePicker = (time) => {
    const formattedTime = new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setCaseTime(formattedTime);

    hideTimePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setCaseDate(formattedDate);

    hideDatePicker();
  };

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

  useEffect(() => {
    const getVehicles = async () => {
      const vehiclesColRef = collection(db, 'vehicles');
      try {
        const vehiclesSnapshot = await getDocs(vehiclesColRef);
        const vehiclesList = vehiclesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(vehiclesList);
      } catch (error) {
        console.error('Error fetching vehicles: ', error);
      }
    };

    getVehicles();
  }, []);


  const handleSubmit = async () => {
    if (validateForm()) {
      console.log('Form is valid, proceeding with submission');
    } else {
      console.log('Form validation failed');
    }
  };
  const addDataToCases = async () => {
    const docRef = await addDoc(collection(db, 'cases'), {
      caseLocation: caseLocation,
      caseDirection: caseDirection,
      caseDescription: caseDescription,
      nic: nic,
      address: address,
    });
  };
  const addDataToDrivers = async () => {
    const docRef = await addDoc(collection(db, 'drivers'), {
      driverId: driverId,
      nic: nic,
      firstName: firstName,
      lastName: lastName,
      address: address,
      mobileNumber: mobileNumber,
      licenseNumber: licenseNumber,
    });
  };
  
  const addDataToTrafficOics = async () => {
    const docRef = await addDoc(collection(db, 'traffic_oics'), {
      trafficOicNumber: trafficOicNumber,
      trafficOicName: trafficOicName,
    });
  };
  const addDataToFirestore = async () => {
    const docRef = await setDoc(doc(db, 'DRIVER DETAILS', nic), {
      caseDate: caseDate,
      caseTime: caseTime,
      caseLocation: caseLocation,
      caseDirection: caseDirection,
      caseExpireDate: caseExpireDate,
      caseStatus: caseStatus,
      trafficOicNumber: trafficOicNumber,
      trafficOicName: trafficOicName,
      caseDescription: caseDescription,
      driverId: driverId,
      vehicleNumber: vehicleNumber,
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

  const handleVehicleChange = (value) => {
    setSelectedVehicle(value);
    console.log(selectedVehicle);
    setShowVehicleList(false);
  };

  const handlePenaltyChange = (value) => {
    console.log('Selected penalty value:', value);
    const selectedPenalty = penalties.find(
      (penalty) => penalty.penaltyTitle === value,
    );
    console.log('Selected penalty:', selectedPenalty);
    setSelectedPenalty(selectedPenalty);
    setPenaltyDescription(selectedPenalty?.penaltyDescription ?? '');
    setPenaltyCost(selectedPenalty?.penaltyCost?.toString() ?? '');
    setSelectedPenalty(value);
    console.log(selectedVehicle);
    setShowPenaltyList(false);
  };

  console.log('🚀 ~ penaltiesList ~ penalties:', penalties);
  const penaltiesList = penalties?.map((penalty) => ({
    key: penalty.id,
    value: penalty.penaltyTitle || penalty.penaltyDescription || 'N/A',
  }));
  console.log('🚀 ~ penaltiesList ~ penaltiesList:', penaltiesList);

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
                  <View>
                    <Button title="Pick A Date" onPress={showDatePicker} />
                    <View>
                      <TextInput
                        placeholder={caseDate}
                        placeholderTextColor="#C7D0D9"
                        style={styles.input}
                        underlineColor="white"
                        value={caseDate}
                      />
                    </View>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                </View>

                <View>
                  <Button title="Pick A Time" onPress={showTimePicker} />
                  <View>
                    <TextInput
                      placeholder={caseTime}
                      placeholderTextColor="#C7D0D9"
                      style={styles.input}
                      underlineColor="white"
                      value={caseTime}
                    />
                  </View>
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmTimePicker}
                    onCancel={hideTimePicker}
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
                  <Text style={styles.input}>{getExpireDate()}</Text>
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
                  <Text style={styles.mainTitle}>Traffic OIC Name</Text>
                  <TextInput
                    placeholder="Mr. Bandara"
                    placeholderTextColor="#C7D0D9"
                    value={trafficOicName}
                    onChangeText={settrafficOicName}
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
                  <Text style={styles.mainTitle}>Vehicle Number</Text>
                  <TextInput
                    placeholder="BC6546"
                    placeholderTextColor="#C7D0D9"
                    value={vehicleNumber}
                    onChangeText={setVehicleNumber}
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

                  {!!penalties?.length && (
                    <View>
                      <Text style={styles.mainTitle}>Select Penalty</Text>
                      <SelectList
                        dropdownStyles={{ maxHeight: '20px' }}
                        setSelected={(val) => handlePenaltyChange(val)}
                        placeholder="-- Select Penalty --"
                        data={penaltiesList}
                        save="value"
                      />
                    </View>
                  )}

                  <View>
                    <Text style={styles.mainTitle}>Penalty Description</Text>
                    <TextInput
                      placeholder="Penalty Description"
                      placeholderTextColor="#C7D0D9"
                      value={penaltyDescription}
                      onChangeText={setPenaltyDescription}
                      style={styles.input}
                      underlineColor="white"
                    />
                  </View>

                  <View>
                    <Text style={styles.mainTitle}>Select Vehicle</Text>
                    <SelectList
                      dropdownStyles={{ maxHeight: '20px' }}
                      setSelected={(val) => handleVehicleChange(val)}
                      placeholder="-- Select Vehicle --"
                      data={vehicles.map((vehicle) => ({
                        key: vehicle.id,
                        value: vehicle.vehicleName,
                      }))}
                      save="value"
                    />
                  </View>

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
                      navigation.navigate('CameraScreen', {
                        nic: nic,
                      });

                      addDataToCases(),
                        addDataToDrivers(),
                        // addDataToPenalties(),
                        addDataToTrafficOics(),
                        addDataToFirestore(),
                        handleSubmit();
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
    paddingLeft: 16,
    paddingRight: 8,
  },
  textsAndInputs: {
    display: 'flex',
  },
  mainTitle: {
    color: '#576573',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginLeft: 15,
  },
});

export default UpdatedForm;

