import React, { useState, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View><Text>Requesting permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const sendDetails = () => {
    console.log('Details sent');
    navigation.navigate('RequestScreen');
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendDetails}>
            <Text style={styles.sendButtonText}>Send Details</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.3, 
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#2196F3', 
    borderRadius: 5,
    padding: 10,
  },
  sendButton: {
    flex: 0.3, 
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  sendButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
