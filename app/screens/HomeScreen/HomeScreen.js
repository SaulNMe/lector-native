import React, { Component } from 'react';
import { 	
	View,
	Image,
	Platform,
	StatusBar,
	SafeAreaView
} from 'react-native';

import styles from './HomeScreenStyle';
import { ApplicationStyles } from 'horus-native/app/styles';
import EntriesListContainer from 'horus-native/app/containers/EntriesListContainer';
import HomeHeaderContainer from 'horus-native/app/containers/HomeHeaderContainer';
import HugeText from 'horus-native/app/components/HugeText';
import SubtitleText from 'horus-native/app/components/SubtitleText';
import HeaderMore from 'horus-native/app/components/HeaderMore';
import ApiService from 'horus-native/app/services/ApiService';
import moment from 'moment';

export default class HomeScreen extends Component {
	static navigationOptions = {
		...ApplicationStyles.detailStackNavigatorOptions,
		header: null
	};

	state={
		month: moment().format('MMMM'),
	}

	render() {
		let menu = ['Ayuda', 'Cerrar sesión', 'Cancelar'];
		return (
			<View style={styles.flex1}>
					<View style={[styles.container, styles.bg]}>
						<StatusBar barStyle="light-content"/>
						<SafeAreaView style={[{backgroundColor: '#243575'}]}>
							{Platform.OS === 'ios' && <View style={styles.toolBar}></View>}
							<HomeHeaderContainer/>
						</SafeAreaView>
						<EntriesListContainer
							x={this.state.month}
						/>
					</View>
			</View>
		);
	}
}
