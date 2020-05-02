import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

// ({object})
class MemoListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memoList: [], // objectを格納する
    };
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/memos`)
      .get()
      .then((snapshot) => {
        const tempList = [];
        snapshot.forEach((doc) => {
          // tempList.push(doc.data(), { key: doc.id });
          tempList.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ memoList: tempList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePress() {
    // const { params } = this.props.navigation.state;
    // this.props.navigation.navigate('MemoCreateScreen', { currentUser: params.currentUser });
    this.props.navigation.navigate('MemoCreateScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <MemoList memoList={this.state.memoList} navigation={this.props.navigation} />
        <CircleButton name="plus" onPress={this.handlePress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default MemoListScreen;
