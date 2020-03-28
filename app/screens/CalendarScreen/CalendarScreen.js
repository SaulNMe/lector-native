import React, { Component } from 'react';
import { 
	Text, 
	View,
	Button
} from 'react-native';

import styles from './CalendarScreenStyle';

export default class CalendarScreen extends Component {
	render() {
		return (
			<View>
				<Text style={styles.test}>CalendarScreen</Text>
			</View>
		);
	}
}
