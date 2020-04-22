import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class AppBar extends React.Component {
  render() {
    return (
      <View style={styles.appbar}>
        <View>
          <Text style={styles.appbarTitle}>MEMOT</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
// HTMLでいうところの.app、すなわち全体に対するスタイリングに対応
// flex 画面いっぱいに広がるという意味 styleの綴りミスは表示反映されない
  appbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 78,
    paddingTop: 30,
    backgroundColor: '#265366',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AppBar;
