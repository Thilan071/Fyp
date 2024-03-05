import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HistoryScreen = () => {
  const [nicNumber, setNicNumber] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = () => {
    // Implement logic to fetch history based on NIC number
    // For demonstration, let's assume history is fetched from an API
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    fetch(`YOUR_API_ENDPOINT?nic=${nicNumber}`)
      .then(response => response.json())
      .then(data => setHistory(data))
      .catch(error => console.error('Error fetching history:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter NIC Number"
        value={nicNumber}
        onChangeText={text => setNicNumber(text)}
      />
      <Button title="Fetch History" onPress={fetchHistory} />
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  historyContainer: {
    marginTop: 20,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HistoryScreen;
