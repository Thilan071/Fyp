import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [unit, setUnit] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  // Function to handle profile picture change
  const handleChangeProfilePicture = async () => {
    // Request permission to access the gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // Check if image selection was cancelled
    if (!result.cancelled) {
      setProfilePicture(result.uri); // Update profile picture state with selected image URI
    }
  };

  // Function to save profile
  const handleSaveProfile = () => {
    // Implement logic to save profile data
    console.log('Profile saved:', { username, email, unit, profilePicture });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.changePictureIcon} onPress={handleChangeProfilePicture}>
        <View style={styles.profilePictureWrapper}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
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
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit"
        value={unit}
        onChangeText={setUnit}
      />
      {/* Save profile button */}
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
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
});

export default ProfileScreen;
