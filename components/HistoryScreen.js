import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; 

const HistoryScreen = () => {
  const [nicNumber, setNicNumber] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = () => {
 
    fetch(`YOUR_API_ENDPOINT?nic=${nicNumber}`)
      .then(response => response.json())
      .then(data => setHistory(data))
      .catch(error => console.error('Error fetching history:', error));
  };

  return (
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
          <Text key={index} style={styles.historyItem}>{item}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default HistoryScreen;
