// SplashingScreen.js
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const SplashingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Replace the require path with your actual splash screen image */}
      <Image
        source={require('../assets/splash.png')}
        style={styles.splashImage}
        resizeMode="contain" // or 'cover' depending on your preference
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Change this to match your splash background color
  },
  splashImage: {
    width: window.width,
    height: window.height,
  },
});

export default SplashingScreen;
