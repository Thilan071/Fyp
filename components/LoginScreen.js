


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Capture from '../assets/capture.png';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../theme.json';
// import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userLoggedIn')
      .then((userLoggedIn) => {
        if (userLoggedIn) {
          navigation.navigate('FormScreen');
        }
      })
      .catch((error) => console.log('AsyncStorage Error:', error));
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await AsyncStorage.setItem('userLoggedIn', 'true');
        navigation.navigate('FormScreen', {
          email: email,
        });
      })
      .catch((error) => console.log('Login Error', error));
  };

  return (
    <View style={styles.container}>
      <Image source={Capture} style={styles.logo} />
      <Text style={styles.appName}>Online Penalty Pay</Text>

      <TextInput
        style={styles.input}
        placeholder="Officer ID"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
  
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.register}>
          Don't have an account?{' '}
          <Text style={styles.registerLink}>Register here.</Text>
     
        </Text>
      </TouchableOpacity>
    </View>
   
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginHorizontal: '5%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 100,
    elevation: 3,
    textAlign: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 10,
    fontFamily: 'Ubuntu-Regular',
  },
  socialBtn: {
    flexDirection: 'row',
    marginHorizontal: '10%',
  },

  roundButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors['blue-primary'],
    elevation: 3,
  },
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSignIn: {
    marginTop: 100,
    padding: 5,
    borderRadius: 10,
    // marginVertical: 20,
  },
  input: {
    borderRadius: 100,
    marginVertical: 8,
    // fontFamily: 'notoserif'
  },
  cardShadow: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  textType: {
    // fontFamily: 'Manrope-Medium',
    fontSize: 14,
  },
  signWith: {
    // fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  signupText: {
    // fontFamily: 'Manrope-Bold',
    fontSize: 14,
  },
  button: {
    marginTop: 40,
    marginBottom: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: colors['blue-primary'],
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 4,
  },
  title: {
    // fontFamily: 'Ubuntu-Bold',
    color: 'white',
    alignItems: 'center',
    width: '100%',
    fontSize: 35,
    paddingTop: '15%',
  },
  subTitle: {
    // fontFamily: 'Manrope-ExtraBold',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
  },
  subSubTitle: {
    // fontFamily: 'Manrope-Medium',
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    width: '75%',
    alignSelf: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
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
  forgotPassword: {
    color: '#3498db',
    marginTop: 10,
  },
  register: {
    marginTop: 16,
  },
  registerLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8', 
  },
});

export default LoginScreen;