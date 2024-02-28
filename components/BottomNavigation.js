// import React, { useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { TextInput, Button, Card } from 'react-native-paper';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '../firebase';



// const FormScreen = ({ navigation }) => {
//   const [vehicleMake, setVehicleMake] = useState('');
//   const [vehicleModel, setVehicleModel] = useState('');
//   const [vehicleYear, setVehicleYear] = useState('');
//   const [registrationNumber, setRegistrationNumber] = useState('');
//   const [color, setColor] = useState('');
//   const [incidentDate, setIncidentDate] = useState('');
//   const [incidentTime, setIncidentTime] = useState('');
//   const [incidentLocation, setIncidentLocation] = useState('');
//   const [violationDescription, setViolationDescription] = useState('');
//   const [driverName, setDriverName] = useState('');
//   const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
//   const [driverContact, setDriverContact] = useState('');
//   const [witnessName, setWitnessName] = useState('');
//   const [witnessContact, setWitnessContact] = useState('');
//   const [additionalComments, setAdditionalComments] = useState('');

//   const handleFormSubmit = () => {
//     console.log('Form submitted:', {
//       vehicleMake,
//       vehicleModel,
//       vehicleYear,
//       registrationNumber,
//       color,
//       incidentDate,
//       incidentTime,
//       incidentLocation,
//       violationDescription,
//       driverName,
//       driverLicenseNumber,
//       driverContact,
//       witnessName,
//       witnessContact,
//       additionalComments,
//     });

//     navigation.navigate('CameraScreen');

//   };
//   const addDataToFirestore = async (values) => {
//     console.log('Val', values);

//     try {
//       await setDoc(doc(db, 'DRIVER DETAILS', driverLicenseNumber), {
//         vehicleMake: vehicleMake,
//         vehicleModel: vehicleModel,
//         vehicleYear: vehicleYear,
//         registrationNumber: registrationNumber,
//         color: color,
//         incidentDate: incidentDate,
//         incidentTime: incidentTime,
//         incidentLocation: incidentLocation,
//         violationDescription: violationDescription,
//         driverName:driverLicenseNumber,
//         driverLicenseNumber: driverLicenseNumber,
//         driverContact: driverContact,
//         witnessName: witnessName,
//         witnessContact: witnessContact,
//         additionalComments: additionalComments

//       });
//     } catch (error) {
//       console.log('adding data firestore error', error);
//     } 
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Card style={styles.card}>
//         <Text style={styles.cardTitle}>Vehicle Information:</Text>
//         <TextInput label="Make" value={vehicleMake} onChangeText={setVehicleMake} mode="outlined" style={styles.input} />
//         <TextInput label="Model" value={vehicleModel} onChangeText={setVehicleModel} mode="outlined" style={styles.input} />
//         <TextInput label="Year" value={vehicleYear} onChangeText={setVehicleYear} mode="outlined" style={styles.input} />
//         <TextInput label="Registration Number" value={registrationNumber} onChangeText={setRegistrationNumber} mode="outlined" style={styles.input} />
//         <TextInput label="Color" value={color} onChangeText={setColor} mode="outlined" style={styles.input} />
//       </Card>

//       <Card style={styles.card}>
//         <Text style={styles.cardTitle}>Incident Details:</Text>
//         <TextInput label="Date" value={incidentDate} onChangeText={setIncidentDate} mode="outlined" style={styles.input} />
//         <TextInput label="Time" value={incidentTime} onChangeText={setIncidentTime} mode="outlined" style={styles.input} />
//         <TextInput label="Location" value={incidentLocation} onChangeText={setIncidentLocation} mode="outlined" style={styles.input} />
//         <TextInput label="Violation Description" value={violationDescription} onChangeText={setViolationDescription} mode="outlined" style={styles.input} />
//       </Card>

//       <Card style={styles.card}>
//         <Text style={styles.cardTitle}>Driver Information:</Text>
//         <TextInput label="Driver's Name" value={driverName} onChangeText={setDriverName} mode="outlined" style={styles.input} />
//         <TextInput label="Driver's License Number" value={driverLicenseNumber} onChangeText={setDriverLicenseNumber} mode="outlined" style={styles.input} />
//         <TextInput label="Driver's Contact" value={driverContact} onChangeText={setDriverContact} mode="outlined" style={styles.input} />
//       </Card>

//       <Card style={styles.card}>
//         <Text style={styles.cardTitle}>Witness Information:</Text>
//         <TextInput label="Witness Name" value={witnessName} onChangeText={setWitnessName} mode="outlined" style={styles.input} />
//         <TextInput label="Witness Contact" value={witnessContact} onChangeText={setWitnessContact} mode="outlined" style={styles.input} />
//       </Card>

//       <Card style={styles.card}>
//         <Text style={styles.cardTitle}>Additional Comments:</Text>
//         <TextInput
//           multiline
//           label="Add any additional comments here"
//           value={additionalComments}
//           onChangeText={setAdditionalComments}
//           mode="outlined"
//           style={styles.input}
//         />
//       </Card>
//       <Card style={styles.card}>
//         <Text style={styles.cardTitle}>Camera:</Text>
        
//       </Card>

//       <Button mode="contained" style={styles.submitButton} onPress={()=>{addDataToFirestore(),handleFormSubmit()}}>
//         Submit
//       </Button>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   card: {
//     marginVertical: 10,
//     padding: 10,
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: '#3498db',
//   },
//   input: {
//     backgroundColor: '#ecf0f1',
//     marginBottom: 10,
//   },
//   submitButton: {
//     marginTop: 20,
//     backgroundColor: '#3498db',
//     borderRadius: 4,
//   },
  
// });

// export default FormScreen;


// import React from 'react';
// import {AppRoute} from './app-routes';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {
//   ChatIcon,
//   MyCalendarIcon,
//   ProfileIcon,
//   SearchIcon,
// } from '../assets/icon';
// import {createStackNavigator} from '@react-navigation/stack';
// import PlayerHomeScreen from '../screens/Player/home';
// import PlayerProfileScreen from '../screens/Player/Profile/profile';
// import PlayerMyCalenderScreen from '../screens/Player/myCalender';
// import ComplexDetailsScreen from '../screens/Player/complexDetails';
// import BookingCourtScreen from '../screens/Player/Booking/courtBooking';
// import CourtDetailsScreen from '../screens/Player/Booking/courtDetails';
// import FilterDataScreen from '../screens/Player/Booking/filterData';
// import MyWalletScreen from '../screens/Player/My Wallet/myWallet';
// import ChatScreen from '../screens/Player/groups/chat';
// import GroupListScreen from '../screens/Player/groups/GroupList';
// import CreateGroupScreen from '../screens/Player/groups/CreateGroup';
// import {AddNewUsersScreen} from '../screens/Player/groups/AddNewUsers';
// import {AddTentativeBookingScreen} from '../screens/Player/groups/TentativeBooking/AddTentatiiveBooking';
// import TBookingFilterDataScreen from '../screens/Player/groups/TentativeBooking/TentativeBookingFilterResult';
// import ConfirmTBookingScreen from '../screens/Player/groups/TentativeBooking/ConfirmTBooking';
// import {AddTBookingParticipantsScreen} from '../screens/Player/groups/TentativeBooking/AddTBookingParticipants';
// import ContactUsScreen from '../screens/common/contactUs';
// import {TentativeBookingDetailedScreen} from '../screens/Player/groups/TentativeBooking/TentativeBookingDetailedScreen';
// import {TransactionDetails} from '../screens/Player/My Wallet/TransactionDetails';
// import {PlayerBookingDetails} from '../screens/Player/Booking/PlayerBookingDetails';
// import NotificationPage from '../screens/common/notification';
// import {NotificationContextProvider} from '../Providers/NotificationProvider';
// import {ChangePassword} from '../screens/Player/Profile/changePassword';
// import {LBSSearchResult} from '../screens/Player/Booking/lbs/LBSSearchResult';
// import {PickLocationScreen} from '../screens/common/locationPicker';
// import {FilterDataContextProvider} from '../Providers/FilterDataProvider';
// import VenueListScreen from '../screens/Player/VenueList';
// import {SelectContact} from '../screens/Player/My Wallet/SelectContact';
// import {TokenTransferDetails} from '../screens/Player/My Wallet/TokenTransferDetails';

// type HomeBottomTabsNavigatorParams = {
//   [AppRoute.AUTH]: undefined;
//   [AppRoute.PLAYER_PROFILE]: undefined;
//   [AppRoute.PLAYER_FAVOURITES]: undefined;
//   [AppRoute.PLAYER_CALENDER]: undefined;
//   [AppRoute.PLAYER_COMPLEX_DETAILS]: undefined;
//   [AppRoute.HOME]: undefined;
//   [AppRoute.PLAYER_GROUPS]: undefined;
// };
// const BottomTab = createBottomTabNavigator<HomeBottomTabsNavigatorParams>();

// const PlayerBottomNavigator = (): React.ReactElement => (
//   // @ts-ignore: tabBar also contains a DrawerNavigationProp
//   <BottomTab.Navigator
//     tabBarOptions={{
//       activeTintColor: '#2352d8',
//     }}>
//     <BottomTab.Screen
//       name={AppRoute.HOME}
//       component={PlayerHomeScreen}
//       options={{
//         title: 'Bookings',
//         tabBarIcon: ({color}) => {
//           return <SearchIcon style={{tintColor: color}} />;
//         },
//       }}
//     />
//     <BottomTab.Screen
//       name={AppRoute.PLAYER_CALENDER}
//       component={PlayerMyCalenderScreen}
//       options={{
//         title: 'Calendar',
//         tabBarIcon: ({color}) => {
//           return <MyCalendarIcon style={{tintColor: color}} />;
//         },
//       }}
//     />
//     <BottomTab.Screen
//       name={AppRoute.PLAYER_GROUPS}
//       component={GroupListScreen}
//       options={{
//         title: 'Clubs',
//         tabBarIcon: ({color}) => {
//           return <ChatIcon style={{tintColor: color}} />;
//         },
//       }}
//     />
//     <BottomTab.Screen
//       name={AppRoute.PLAYER_PROFILE}
//       component={PlayerProfileScreen}
//       options={{
//         title: 'Account',
//         tabBarIcon: ({color}) => {
//           return <ProfileIcon style={{tintColor: color}} />;
//         },
//       }}
//     />
//   </BottomTab.Navigator>
// );

// const Stack = createStackNavigator();

// export const PlayerNavigator = (): React.ReactElement => (
//   <NotificationContextProvider>
//     <FilterDataContextProvider>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen name={AppRoute.HOME} component={PlayerBottomNavigator} />
//         <Stack.Screen
//           name={AppRoute.PLAYER_COMPLEX_DETAILS}
//           component={ComplexDetailsScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_COURT_DETAILS}
//           component={CourtDetailsScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_BOOKING_COURT}
//           component={BookingCourtScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_FILTER_DATA}
//           component={FilterDataScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_CREATE_GROUP}
//           component={CreateGroupScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_ADD_GROUP_MEMBER}
//           component={AddNewUsersScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_ADD_TENTATIVE_BOOKING}
//           component={AddTentativeBookingScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_TENTATIVE_BOOKING_RESULT}
//           component={TBookingFilterDataScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_CONFIRM_TENTATIVE_BOOKING}
//           component={ConfirmTBookingScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_ADD_TBOOKING_PARTICIPANT}
//           component={AddTBookingParticipantsScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_MY_WALLET}
//           component={MyWalletScreen}
//         />
//         <Stack.Screen name={AppRoute.PLAYER_CHAT} component={ChatScreen} />
//         <Stack.Screen
//           name={AppRoute.PLAYER_CONTACT_US}
//           component={ContactUsScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_TENTATIVE_BOOKING_DETAILS}
//           component={TentativeBookingDetailedScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_BOOKING_DETAILS}
//           component={PlayerBookingDetails}
//         />
//         <Stack.Screen
//           name={AppRoute.TRASACTION_DETAILS}
//           component={TransactionDetails}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_NOTIFICATIONS}
//           component={NotificationPage}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_CHANGEPASSWORD}
//           component={ChangePassword}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_LBS_RESULTS}
//           component={LBSSearchResult}
//         />
//         <Stack.Screen
//           name={AppRoute.PICK_LOCATION}
//           component={PickLocationScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_VENUE_LIST}
//           component={VenueListScreen}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_SELECT_CONTACT}
//           component={SelectContact}
//         />
//         <Stack.Screen
//           name={AppRoute.PLAYER_TOKEN_TRANSFER_DETAILS}
//           component={TokenTransferDetails}
//         />
//       </Stack.Navigator>
//     </FilterDataContextProvider>
//   </NotificationContextProvider>
// );





// import React, {useState} from 'react';
// import {User} from '../../models/User';
// import {sendEmailVerification, signup} from '../../services/AuthService';
// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import {Formik} from 'formik';
// import * as yup from 'yup';
// import Loader from '../../components/PreLoader/loader';
// import {AppRoute} from '../../navigation/app-routes';
// import Page from './pageWrapper';
// import {Button, CheckBox, Text} from 'react-native-elements';
// import {UserType} from '../../enums/enum';
// import {useNavigation} from '@react-navigation/native';
// import moment from 'moment';
// import {getContactNumberAvailability} from '../../services/CommonService';
// import {AlertBoxProps} from '../../components/DialogBox/Alert';
// import {
//   SuccessAnimation,
//   WarningAnimation,
// } from '../../components/lottieAnimations/Animations';
// import {colors} from '../../../theme.json';
// import ConfirmDialog, {
//   ConfirmDialogProps,
// } from '../../components/DialogBox/ConfirmDialog';
// import TermsNCondtions from './termsnCondtions';
// import {X_FilledButton} from '../../components/Button/x_Filledbutton';
// import {X_Input} from '../../components/input/xInput';
// import X_Alert from '../../components/DialogBox/X_Alert';
// import {LatestAcceptedTOSVersion} from '../../configs/config';

// const SignupScreen = (props: any) => {
//   const [loading, setLoading] = useState(false);
//   const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);
//   const navigation = useNavigation();
//   const hideAlert = () => {
//     setAlert({...alert, visible: false});
//   };
//   const [isVisibleTerms, setisVisibleTerms] = useState<{
//     visible: boolean;
//     player: boolean;
//     accept: Function;
//     reject: Function;
//   }>({visible: false, player: true, accept: () => {}, reject: () => {}});
//   const [alert, setAlert] = React.useState<AlertBoxProps>({
//     title: 'Error',
//     cancelTitle: 'Cancel',
//     body: 'Something went wrong, please try again',
//     visible: false,
//     buttonColor: colors['blue-primary'],
//     onCancel: hideAlert,
//     hide: hideAlert,
//     image: <SuccessAnimation />,
//   });
//   const [confirmDialog, setConfirmDialog] = React.useState<ConfirmDialogProps>({
//     visible: false,
//     title: 'Warning',
//     body: '',
//     cancelTitle: 'Cancel',
//     confirmTitle: 'Confirm',
//     onCancel: () => {
//       setConfirmDialog({...confirmDialog, visible: false});
//     },
//     onConfirm: async () => {},
//     hide: () => {
//       setConfirmDialog({...confirmDialog, visible: false});
//     },
//     image: <WarningAnimation />,
//   });

//   const updateAlert = ({title, body, visible}: any) => {
//     setAlert({
//       ...alert,
//       title,
//       body,
//       visible,
//       cancelTitle: 'Okay',
//       image: title === 'Success' ? <SuccessAnimation /> : <WarningAnimation />,
//       onCancel: () => {
//         hideAlert();
//         if (title === 'Success') {
//           props.navigation.push(AppRoute.SIGN_IN);
//         }
//       },
//     });
//   };

//   const signupValidationSchema = yup.object().shape({
//     firstName: yup.string().required('First name is Required'),
//     lastName: yup.string().required('Last name is Required'),
//     email: yup.string().email().required('Email is Required'),
//     password:
//       props.route.params && props?.route?.params?.user.socialLogin
//         ? yup.string().optional()
//         : yup
//             .string()
//             .required('Password is Required')
//             .matches(
//               /(?=^.{5,}$)((?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/,
//               'Password must contain at least 5 characters, at least one number or special characters and both lower and uppercase letters',
//             ),
//     agreePlayerTerms: yup.bool().oneOf([true], 'Field must be checked'),
//     contact: yup
//       .string()
//       .min(10, 'Enter valid contact number 077xxxxxxx')
//       .required('Contact Number is Required')
//       .matches(/^[0-9]{10}$/, 'Enter valid contact number 077xxxxxxx')
//       .test(
//         'checkNumberAvailability',
//         'This number is already in use',
//         function (value) {
//           return new Promise((resolve, reject) => {
//             if (value && value.match(/^[0-9]{10}$/)) {
//               getContactNumberAvailability(value)
//                 .then(data => {
//                   // exists
//                   resolve(data.data);
//                 })
//                 .catch(e => {
//                   console.log('err', e);
//                   // note exists
//                   resolve(false);
//                 });
//             } else {
//               resolve(false);
//             }
//           });
//         },
//       ),
//   });

//   console.log('social,', props.route.params?.user.socialLogin);

//   return (
//     <Page title={'Signup'} enableBackButton={true} marginTop={-2}>
//       <X_Alert
//         title={alert.title}
//         cancelTitle={alert.cancelTitle}
//         body={alert.body}
//         visible={alert.visible}
//         buttonColor={alert.buttonColor}
//         onCancel={alert.onCancel}
//         hide={alert.hide}
//         image={alert.image}
//       />
//       <TermsNCondtions
//         reject={() => {
//           isVisibleTerms.reject();
//         }}
//         accept={() => {
//           isVisibleTerms.accept();
//         }}
//         isVisible={isVisibleTerms.visible}
//         player={isVisibleTerms.player}
//         close={() => {
//           setisVisibleTerms({...isVisibleTerms, visible: false});
//         }}
//       />
//       <ConfirmDialog
//         title={confirmDialog.title}
//         body={confirmDialog.body}
//         confirmTitle={confirmDialog.confirmTitle}
//         cancelTitle={confirmDialog.cancelTitle}
//         visible={confirmDialog.visible}
//         onConfirm={confirmDialog.onConfirm}
//         onCancel={confirmDialog.onCancel}
//         hide={confirmDialog.hide}
//         image={confirmDialog.image}
//       />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             testID="scroll-view"
//             style={{
//               paddingHorizontal: 16,
//               marginBottom: 16,
//               marginTop: 16,
//             }}>
//             <View>
//               <Loader visible={loading} />
//               <Text
//                 style={[
//                   {
//                     textAlign: 'center',
//                     fontSize: 18,
//                     color: 'white',
//                     marginBottom: 24,
//                   },
//                   styles.textType,
//                 ]}>
//                 Create your account
//               </Text>
//               <Formik
//                 validationSchema={signupValidationSchema}
//                 initialValues={{
//                   firstName: '',
//                   simpleName: '',
//                   lastName: '',
//                   email: props.route.params
//                     ? props.route.params?.user.email
//                     : '',
//                   password: '',
//                   contact: '',
//                   agreePlayerTerms: false,
//                 }}
//                 validateOnChange={true}
//                 onSubmit={(values: any, {resetForm}) => {
//                   setLoading(true);
//                   values.simpleName =
//                     values.firstName.toLowerCase() +
//                     ' ' +
//                     values.lastName.toLowerCase();
//                   signup(
//                     {
//                       ...values,
//                       password: values.password,
//                       type: [UserType.PLAYER],
//                       points: 0,
//                       createdAt: moment().unix(),
//                       email: values.email.toLowerCase(),
//                       lastAcceptedPlayerTOSVersion: LatestAcceptedTOSVersion,
//                     },
//                     props.route.params?.user.socialLogin,
//                   )
//                     .then(() => {
//                       console.log('added');
//                       resetForm();
//                       sendEmailVerification(updateAlert);
//                     })
//                     .catch(e => {
//                       updateAlert({
//                         title: 'Error',
//                         body: e.toString(),
//                         visible: true,
//                       });
//                       console.log(e);
//                     })
//                     .finally(() => {
//                       setLoading(false);
//                     });
//                 }}>
//                 {({
//                   handleChange,
//                   handleBlur,
//                   handleSubmit,
//                   values,
//                   errors,
//                   touched,
//                   setFieldValue,
//                   isValid,
//                   isSubmitting,
//                   setFieldTouched,
//                 }) => (
//                   <>
//                     <X_Input
//                       placeholder="First Name"
//                       value={values.firstName}
//                       onChange={(e: any) => {
//                         setFieldTouched('firstName');
//                         setFieldValue('firstName', e.nativeEvent.text);
//                       }}
//                       onBlur={handleBlur('firstName')}
//                       errorMessage={
//                         touched.firstName && errors.firstName
//                           ? errors.firstName
//                           : undefined
//                       }
//                     />
//                     <X_Input
//                       placeholder="Last Name"
//                       value={values.lastName}
//                       onChange={(e: any) => {
//                         setFieldTouched('lastName');
//                         setFieldValue('lastName', e.nativeEvent.text);
//                       }}
//                       onBlur={handleBlur('lastName')}
//                       errorMessage={
//                         touched.lastName && errors.lastName
//                           ? errors.lastName
//                           : undefined
//                       }
//                     />
//                     <X_Input
//                       placeholder="Contact Number"
//                       value={values.contact}
//                       onChange={(e: any) => {
//                         setFieldTouched('contact');
//                         setFieldValue('contact', e.nativeEvent.text);
//                       }}
//                       onBlur={handleBlur('contact')}
//                       keyboardType={'phone-pad'}
//                       errorMessage={
//                         touched.contact && errors.contact
//                           ? errors.contact
//                           : undefined
//                       }
//                     />
//                     <X_Input
//                       placeholder={'Enter your email address'}
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       value={values.email}
//                       onChange={(e: any) => {
//                         setFieldTouched('email');
//                         handleChange('email')(e.nativeEvent.text);
//                       }}
//                       onBlur={handleBlur('email')}
//                       errorMessage={
//                         touched.email && errors.email ? errors.email : undefined
//                       }
//                     />
//                     {!props.route.params?.user.socialLogin && (
//                       <X_Input
//                         autoCapitalize="none"
//                         onChange={(e: any) => {
//                           setFieldTouched('password');
//                           handleChange('password')(e.nativeEvent.text);
//                         }}
//                         onBlur={handleBlur('password')}
//                         rightIcon={() => (
//                           <Button
//                             icon={
//                               passwordVisible
//                                 ? {
//                                     type: 'ionicon',
//                                     name: 'eye-off-outline',
//                                     color: '#37474F',
//                                   }
//                                 : {
//                                     type: 'ionicon',
//                                     name: 'eye-outline',
//                                     color: '#37474F',
//                                   }
//                             }
//                             type={'clear'}
//                             onPress={() => setPasswordVisible(!passwordVisible)}
//                           />
//                         )}
//                         value={values.password}
//                         placeholder="Enter your password"
//                         secureTextEntry={passwordVisible}
//                         errorMessage={
//                           touched.password && errors.password
//                             ? errors.password
//                             : undefined
//                         }
//                       />
//                     )}

//                     <CheckBox
//                       containerStyle={{
//                         backfaceVisibility: 'hidden',
//                         backgroundColor: colors['blue-primary'],
//                         borderWidth: 0,
//                       }}
//                       textStyle={{color: 'white', fontSize: 10}}
//                       fontFamily={'Manrope-ExtraLight'}
//                       title="I agree to the terms & Policy"
//                       checked={values.agreePlayerTerms}
//                       onPress={() => {
//                         setisVisibleTerms({
//                           visible: true,
//                           player: true,
//                           accept: () => {
//                             setFieldValue('agreePlayerTerms', true);
//                           },
//                           reject: () => {
//                             setFieldValue('agreePlayerTerms', false);
//                           },
//                         });
//                       }}
//                     />
//                     <View testID="sign-up-button" style={{marginVertical: 20}}>
//                       <X_FilledButton
//                         onPress={handleSubmit}
//                         backgroundColor="white"
//                         disabled={!isValid}
//                         title="Sign Up"
//                         color={colors['blue-primary']}
//                         fontSize={14}
//                         borderWidth={0}
//                       />
//                     </View>
//                   </>
//                 )}
//               </Formik>
//             </View>
//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </Page>
//   );
// };

// export default SignupScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors['blue-primary'],
//   },
//   input: {
//     borderRadius: 100,
//     justifyContent: 'space-between',
//     paddingBottom: 8,
//   },
//   inputFinal: {
//     borderRadius: 100,
//     justifyContent: 'space-between',
//     paddingBottom: 14,
//   },
//   add: {
//     flex: 1,
//     borderRadius: 40,
//     backgroundColor: '#7474bf',
//   },
//   radio: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     flexWrap: 'wrap',
//   },
//   signUpButton: {
//     backgroundColor: '#7474bf',
//     borderRadius: 100,
//     marginHorizontal: '5%',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     elevation: 3,
//     textAlign: 'center',
//   },
//   onSelectedOutlay: {
//     height: 100,
//     width: 100,
//     margin: 15,
//     backgroundColor: colors['blue-primary'],
//     justifyContent: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: colors['blue-primary'],
//   },
//   onDeSelectedOutlay: {
//     justifyContent: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     height: 100,
//     width: 100,
//     margin: 15,
//     borderColor: colors['blue-primary'],
//     borderWidth: 2,
//     borderRadius: 10,
//   },
//   onSelectedText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     margin: 3,
//   },
//   onDeSelectedText: {
//     color: colors['blue-primary'],
//     fontWeight: 'bold',
//     textAlign: 'center',
//     margin: 3,
//   },
//   textType: {
//     fontFamily: 'Manrope-ExtraLight',
//   },
// });