import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const SplashingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash.png')}
        style={styles.splashImage}
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
  },
  splashImage: {
    width: window.width,
    height: window.height,
  },
});

export default SplashingScreen;
