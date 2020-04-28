// import React from 'react';
// import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import AppBar from './src/components/AppBar';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <AppBar />
//       <SignupScreen />
//     </View>
//   );
// }

// EXPOSDKを36にしないとAndroidEmulator起動しない
const App = createStackNavigator({
  Home:             { screen: MemoListScreen },
  MemoDetailScreen: { screen: MemoDetailScreen },
  MemoEditScreen:   { screen: MemoEditScreen },
  LoginScreen:      { screen: LoginScreen },
  SignupScreen:     { screen: SignupScreen },
}, {
  defaultNavigationOptions: {
    headerTitle: 'MemoT',
    headerStyle: {
      backgroundColor: '#265366',
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
