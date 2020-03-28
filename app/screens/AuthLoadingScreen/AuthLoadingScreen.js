import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

//import { rehydrateMe } from "horus-native/app/actions/MeActions";
import styles from './AuthLoadingScreenStyle';
import { getIsLoggedIn } from 'horus-native/app/reducers';
import { registerNotificationHandler } from 'horus-native/app/services/NotificationService';
import { reloadEntries } from 'horus-native/app/actions/EntriesActions';
import { connect } from 'react-redux';

class AuthLoadingScreen extends Component {
  static navigationOptions = {
    title: 'AuthLoadingScreen'
  }

  constructor (props) {
    super(props)
    this._boostrapAsync();
  }
  
  componentDidMount () {
	  registerNotificationHandler(() => this.props.dispatch(reloadEntries()))
  }

  _boostrapAsync = async () => {
    let loggedIn = this.props.loggedIn;

    if (loggedIn) {
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render () {
    return (
      <View style={[styles.paddedContainer, styles.alignItemsCenter, styles.justifyContentCenter, styles.backgroundBlue]}>
        <Image    
          style={styles.loadImage}    
          source={require('horus-native/assets/HorusLogoW.png')}
        />
      </View>
    );
  }
}

mapStateToProps = state => ({
  loggedIn: getIsLoggedIn(state)
});

export default connect(mapStateToProps)(AuthLoadingScreen);
