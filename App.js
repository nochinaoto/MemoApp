// import React from 'react';
// import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import firebase from 'firebase';
import ENV from './env.json';

// import AppBar from './src/components/AppBar';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';


// eslint-disable-next-line
require("firebase/firestore");

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <AppBar />
//       <SignupScreen />
//     </View>
//   );
// }

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PRJ_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
  appId: ENV.FIREBASE_APPID,
  measurementId: ENV.FIREBASE_MEASUREMENTID,
};
firebase.initializeApp(firebaseConfig);

// EXPOSDKを36にしないとAndroidEmulator起動しない
const App = createStackNavigator({
  LoginScreen:      { screen: LoginScreen },
  SignupScreen:     { screen: SignupScreen },
  Home:             { screen: MemoListScreen },
  MemoCreateScreen: { screen: MemoCreateScreen },
  MemoDetailScreen: { screen: MemoDetailScreen },
  MemoEditScreen:   { screen: MemoEditScreen },
}, {
  defaultNavigationOptions: {
    headerTitle: 'MemoT',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      shadowColor: '#000', // ios
      shadowOffset: { width: 0, height: 2 }, // ios
      shadowOpacity: 0.2, // ios
      shadowRadius: 3, // ios
      backgroundColor: '#265366',
      ...Platform.select({
        android: {
          height: 80,
          paddingTop: 16,
        },
      }),
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
});

export default createAppContainer(App);


// const styles = StyleSheet.create({
// // HTMLでいうところの.app、すなわち全体に対するスタイリングに対応
// // flex 画面いっぱいに広がるという意味 styleの綴りミスは表示反映されない
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFDF6',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 78,
//   },
// });

// export default App;
