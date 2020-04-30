import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

class SignupScreen extends React.Component {
  // state = {
  //   email: '',
  //   password: '',
  // }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit() {
    // Signup
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      // ...
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          メンバー登録
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableHighlight style={styles.button} underlayColor="#C70F66" onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.buttonTitle}>送信する</Text>
        </TouchableHighlight>
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
});

export default SignupScreen;
