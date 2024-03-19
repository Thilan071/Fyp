import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

const HistoryScreen = () => {
  const [nicNumber, setNicNumber] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const q = query(collection(db, 'DRIVER DETAILS'), where('nic', '==', nicNumber));
      const querySnapshot = await getDocs(q);
      const historyData = [];
      querySnapshot.forEach((doc) => {
        historyData.push(doc.data());
      });
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  return (
  <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>History Screen</Text>
      <TextInput
        mode="outlined" 
        label="Enter NIC Number" 
        value={nicNumber}
        onChangeText={text => setNicNumber(text)}
        style={styles.input} 
      />
      <Button mode="contained" onPress={fetchHistory} style={styles.button}>
        Fetch History
      </Button>
      <View style={styles.historyContainer}>
        {history.map((item, index) => (
            <View key={index}>
              <Text style={styles.historyItem}>Description: {item.penaltyDescription}</Text>
              <Text style={styles.historyItem}>NIC: {item.nic}</Text>
              <Text style={styles.historyItem}>Full Name: {item.firstName} {item.lastName}</Text>
              <Text style={styles.historyItem}>Fee: {item.penaltyCost}</Text>
              <Text style={styles.historyItem}>Location: {item.caseLocation}</Text>
              <Text style={styles.historyItem}>licenseNumber: {item.licenseNumber}</Text>
              <Text style={styles.historyItem}>vehicleNumber: {item.vehicleNumber}</Text>
              <Image style={styles.image} source={{ uri: item.penalty_image }} />
              <Image style={styles.image} source={{ uri: item.penalty_insurance }} />
            </View>
        ))}
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20, 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%', 
    marginBottom: 10,
  },
  button: {
    marginTop: 10, 
  },
  historyContainer: {
    marginTop: 20,
    width: '100%', 
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 10,
  },
});

export default HistoryScreen;
