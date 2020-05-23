import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {LoginButton, ShareDialog} from 'react-native-fbsdk';

const SHARE_LINK_CONTENT = {
  contentType: 'link',
  contentUrl: 'https://www.facebook.com/',
};

export default class App extends Component<{}> {
  _shareLinkWithShareDialog = async () => {
    const canShow = await ShareDialog.canShow(SHARE_LINK_CONTENT);
    if (canShow) {
      try {
        const {isCancelled, postId} = await ShareDialog.show(
          SHARE_LINK_CONTENT,
        );
        if (isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share success with postId: ' + postId);
        }
      } catch (error) {
        Alert.alert('Share fail with error: ' + error);
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={(error, data) => {
            console.log('AAAA');
            setTimeout(() => {
              Alert.alert(JSON.stringify(error || data, null, 2));
            }, 1000);
          }}
        />
        <TouchableHighlight onPress={this._shareLinkWithShareDialog}>
          <Text style={styles.shareText}>Share link with ShareDialog</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shareText: {
    fontSize: 20,
    margin: 10,
  },
});