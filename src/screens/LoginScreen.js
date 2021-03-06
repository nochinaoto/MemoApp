import React from 'react';
// import Expo from 'expo';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';

import Loading from '../elements/Loading';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: true,
    };
  }

  // awaitはasync必要
  async componentDidMount() {
    const email = await SecureStore.getItemAsync('email');
    const password = await SecureStore.getItemAsync('password');
    // email / password が存在していたら自動ログインを行う
    // このチェックがないと、初回起動の際に空のメール・パスワードでログインを試みてしまう
    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ isLoading: false });
          this.navigateToHome();
        })
        .catch();
    // SecureStore.getItemAsync('email')
    //   .then((data) => {
    //   })
    }
  }

  navigateToHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleSubmit() {
    // Login
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        // secure store
        SecureStore.setItemAsync('email', this.state.email);
        SecureStore.setItemAsync('password', this.state.password);
        this.navigateToHome();
      })
      .catch(() => {
      });
  }

  handlePress() {
    this.props.navigation.navigate('SignupScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading text="Now Loading" isLoading={this.state.isLoading} />
        <Text style={styles.title}>
          ログイン
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }); }}
          // パフォーマンス悪い、Javascriptのスコープを繋ぐ
          autoCapitalize="none"
          autoCollect={false}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCapitalize="none"
          autoCollect={false}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.buttonTitle}>ログインする</Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.signup} onPress={this.handlePress.bind(this)}>
          <Text style={styles.signupText}>メンバー登録する</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#ddd',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
    // color: '#dadada',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#E31676',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
    // color: '#333333',
  },
});

export default LoginScreen;
