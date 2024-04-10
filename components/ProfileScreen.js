


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { storage, auth, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import {
  doc,
  getDoc,
  addDoc,
  collection,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const ProfileScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [unit, setUnit] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [officerDetails, setOfficerDetails] = useState([]);

  useEffect(() => {
    const getCoupleNames = async () => {
      const docRef = doc(db, 'OFFICER DETAILS', route.params?.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document Data', docSnap.data());
        setOfficerDetails(docSnap.data());
      } else {
        console.log('No such document');
      }
    };
    getCoupleNames();
  }, [route.params?.email]);

  const handleUploadProfilePicture = async () => {
    try {
      const response = await fetch(profilePicture);
      const blob = await response.blob();
      const fileName = 'profile_picture.jpg';
      const storageRef = ref(storage, fileName);
      const upload = await uploadBytes(storageRef, blob);
      const imageURL = await getDownloadURL(upload.ref);
      const officerDocRef = doc(db, 'OFFICER DETAILS', route.params?.email);

      await updateDoc(officerDocRef, {
        profilePic: imageURL,
      });

      console.log('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleChangeProfilePicture = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.uri);
    }
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', { username, email, unit, profilePicture });
    if (profilePicture) {
      handleUploadProfilePicture();
    }
  };
  const logOut = () => {
    signOut(auth).then((value) => {
      navigation.navigate('LoginScreen');
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.changePictureIcon}
        onPress={handleChangeProfilePicture}
      >
        <View style={styles.profilePictureWrapper}>
          {officerDetails.profilePic ? (
            <Image
              source={{ uri: officerDetails.profilePic }}
              style={styles.profilePicture}
            />
          ) : (
            <FontAwesome5 name="user" size={48} color="#2c3e50" />
          )}
        </View>
        <View style={styles.overlay}>
          <FontAwesome5 name="plus" size={16} color="#fff" />
        </View>
      </TouchableOpacity>

      <Text style={styles.heading}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={officerDetails.officerName}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={officerDetails.officerEmail}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit"
        value={officerDetails.officerUnit}
        onChangeText={setUnit}
      />
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>LOG OUT</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleUploadProfilePicture}
      >
        <Text style={styles.uploadButtonText}>Upload Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  changePictureIcon: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePictureWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3498db',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;