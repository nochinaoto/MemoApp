import React from 'react';
import { StyleSheet, View } from 'react-native';
// import BodyText from './src/elements/BodyText';
import MemoList from './src/components/MemoList';
import AppBar from './src/components/AppBar';
import CircleButton from './src/elements/CircleButton';

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <MemoList />
      <CircleButton>+</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
// HTMLでいうところの.app、すなわち全体に対するスタイリングに対応
// flex 画面いっぱいに広がるという意味 styleの綴りミスは表示反映されない
  container: {
    flex: 1,
    backgroundColor: '#FFFDF6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 78,
  },
});
