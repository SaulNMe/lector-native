import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from 'horus-native/app/Store.js';
import { persistor } from 'horus-native/app/Store.js';
import 'horus-native/config/ReactotronConfig'
import { Asset, AppLoading } from 'expo';
import AppNavigator from './app/Router';
import moment from 'moment';
import './locales/moment-es';
import NavigationService from 'horus-native/app/services/NavigationService.js';
import { PersistGate } from 'redux-persist/lib/integration/react';

export default class App extends Component {

	state = {
		isReady: false,
	};
	render() {
		if (!this.state.isReady) {
			return (
				<AppLoading
					startAsync={this._cacheResourcesAsync}
					onFinish={() => this.setState({ isReady: true })}
					onError={console.warn}
				/>
			);
		}
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<StatusBar barStyle="light-content" />

					<View style={styles.container}>
						<AppNavigator 
							ref={navigatorRef => {
								NavigationService.setTopLevelNavigator(navigatorRef);
							}}
						/>
					</View>
				</PersistGate>
			</Provider>
		);
	}

	async _cacheResourcesAsync() {
		const images = [
			require('horus-native/assets/HorusLogoW.png'),
			require('horus-native/assets/logo.png')
		];

		const cacheImages = images.map((image) => {
			return Asset.fromModule(image).downloadAsync();
		});
		return Promise.all(cacheImages)

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
});
