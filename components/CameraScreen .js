
import React, { useState, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { storage , db } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';


export default function CameraScreen({route}) {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);

  if (!permission) {
    return <View><Text>Requesting permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need permission to show the camera.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
console.log('camera',route.params.nic);
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
      setCapturedImages([...capturedImages, data.uri]);
      savePhoto(data.uri);
    }
  };

  const savePhoto = async (uri) => {
    try {
      await MediaLibrary.saveToLibraryAsync(uri);
    } catch (error) {
      console.error('Failed to save photo:', error);
    }
  };

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const handleUpload = async () => {
    const imageUrls = [];
    try {
        const promises = capturedImages.map(async (imageUri, index) => {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const fileName = `image_${index + 1}_${new Date().getTime()}.jpg`; // Ensuring unique file name
            const storageRef = ref(storage, `Images/${route.params.nic}/${fileName}`);
            const uploadResult = await uploadBytes(storageRef, blob);
            const downloadUrl = await getDownloadURL(uploadResult.ref);
            imageUrls.push(downloadUrl);
        });

        await Promise.all(promises);

        // Ensure docRef is correctly pointing to a document inside a collection
        const docRef = doc(db, 'DRIVER DETAILS', route.params.nic); // Corrected path

        // Update Firestore document with the image URLs
        await updateDoc(docRef, {
            imageUrls: imageUrls // Storing an array of image URLs
        });
        console.log('Firestore document updated with image URLs:', imageUrls);
    } catch (error) {
        console.error('Error during the image upload or Firestore update:', error);
    }
};


  console.log('trying to get images ', route.params.nic);


  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
          <MaterialIcons name="flip" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePicture}
            style={[styles.takePictureButton, styles.centerButton]}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: 'white',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={sendDetails}>
            <Text style={styles.sendButtonText}>Send Details</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.imagesContainer}>
        {capturedImages.map((imageUri, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(imageUri)}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  flipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  centerButton: {
    alignSelf: 'center',
  },
  takePictureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  sendButtonText: {
    fontSize: 18,
    color: 'white',
  },
  uploadButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
  },
  uploadButtonText: {
    fontSize: 18,
    color: 'white',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});

