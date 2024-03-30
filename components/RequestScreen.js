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
   // const apiKey = 'c3529489'; // Your Vonage API key
    const apiSecret = 'AFKiwWB0tViUa3AB'; // Your Vonage API secret
    const fromNumber = 'Vonage APIs'; // Your Vonage 'from' identifier
    const toNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`; // Ensure the number is in international format
    const textMessage = `Vehicle Number: ${vehicleNumber}, Penalty Person Name: ${penaltyPersonName}, This is a predefined message from our system.`;

    const authHeader = 'Basic ' + encode(`${apiKey}:${apiSecret}`);

    axios.post('https://rest.nexmo.com/sms/json', {
      from: fromNumber,
      to: toNumber,
      text: textMessage,
      api_key: apiKey, // Note: Including API key and secret in client-side code is unsafe
      api_secret: apiSecret // Note: Including API key and secret in client-side code is unsafe
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


// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button } from 'react-native';
// import * as SMS from 'expo-sms';

// const RequestScreen = () => {
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [penaltyPersonName, setPenaltyPersonName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');


//   const checkSMS = async()=>{
//     const isAvailable  = await SMS.isAvailableAsync();

//     if(isAvailable){
//       alert('SMS is available on the device');

//     }
//     else{
//     alert('SMS is not available on the device');
//     }
//   };

//   const sendSMS = async () => {
//     if (!phoneNumber) {
//         alert('Please enter a phone number.');
//         return;
//     }

//     const message = `Vehicle Number: ${vehicleNumber}\nPenalty Person Name: ${penaltyPersonName}`;
//     if (!message) {
//         alert('Message content is empty.');
//         return;
//     }

//     const isAvailable = await SMS.isAvailableAsync();
//     if (!isAvailable) {
//         alert('SMS is not available on this device');
//         return;
//     }

//     try {
//         const { result } = await SMS.sendSMSAsync([phoneNumber], message);
//         if (result === 'sent' || result === 'unknown') { 
//             alert('Message sent successfully');
//         } else {
//             alert('Failed to send the message');
//         }
//     } catch (error) {
//         console.error(error);
//         alert('An error occurred while sending the SMS');
//     }
// };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Request Details</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Vehicle Number"
//         onChangeText={(text) => setVehicleNumber(text)}
//         value={vehicleNumber}
//       />

// <TouchableOpacity style={styles.button} onPress={checkSMS}>
//         <Text style={styles.buttonText}>check sms</Text>
//       </TouchableOpacity>


//       <TextInput
//         style={styles.input}
//         placeholder="Penalty Person's Name"
//         onChangeText={(text) => setPenaltyPersonName(text)}
//         value={penaltyPersonName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Phone Number"
//         onChangeText={(text) => setPhoneNumber(text)}
//         value={phoneNumber}
//         keyboardType="phone-pad" 
//       />

//       <TouchableOpacity style={styles.button} onPress={sendSMS}>
//         <Text style={styles.buttonText}>Send Details</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     color: '#3498db',
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: '#3498db',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 4,
//   },
//   button: {
//     backgroundColor: '#3498db',
//     padding: 10,
//     width: '80%',
//     borderRadius: 4,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#ffffff',
//   },
// });

// export default RequestScreen;
