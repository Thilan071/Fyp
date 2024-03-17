// import React, { useCallback, useEffect, useState } from 'react';
// import { Text, View } from 'react-native';
// import Entypo from '@expo/vector-icons/Entypo';
// import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';

// SplashScreen.preventAutoHideAsync();

// export default function SplashingScreen(){
//     const [appIsReady, setAppIsReady] = useState(false);

//     useEffect(() => {
//       async function prepare() {
//         try {
//           // Pre-load fonts, make any API calls you need to do here
//           await Font.loadAsync(Entypo.font);
//           // Artificially delay for two seconds to simulate a slow loading
//           // experience. Please remove this if you copy and paste the code!
//           await new Promise(resolve => setTimeout(resolve, 2000));
//         } catch (e) {
//           console.warn(e);
//         } finally {
//           // Tell the application to render
//           setAppIsReady(true);
//         }
//       }
  
//       prepare();
//     }, []);
  
//     const onLayoutRootView = useCallback(async () => {
//       if (appIsReady) {
        
//         await SplashScreen.hideAsync();
//       }
//     }, [appIsReady]);
  
//     if (!appIsReady) {
//       return null;
//     }
  
//     return (
//       <View
//         style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
//         onLayout={onLayoutRootView}>
//         <Text>SplashScreen Demo! 👋</Text>
//         <Entypo name="rocket" size={30} />
//       </View>
//     );
//   }



