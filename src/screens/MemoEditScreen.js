import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';

class MemoEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      key: '',
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      body: params.body,
      key: params.key,
    });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    const newDate = firebase.firestore.Timestamp.now();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/memos`)
      .doc(this.state.key)
      .update({
        body: this.state.body,
        createdOn: newDate,
      })
      .then(() => {
        const { navigation } = this.props;
        navigation.state.params.returnMemo({
          body: this.state.body,
          key: this.state.key,
          createdOn: newDate,
        });
        navigation.goBack();
      })
      .catch(() => {
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body: text }); }}
        />

        <CircleButton
          name="check"
          style={styles.editButton}
          onPress={this.handlePress.bind(this)}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
  // editButton: {
  //   top: 75,
  // },
});

export default MemoEditScreen;
