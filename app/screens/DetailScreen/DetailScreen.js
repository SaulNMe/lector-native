import React, { Component } from 'react';
import { 
	Text, 
	View,
	FlatList,
	StatusBar
} from 'react-native';

import moment from 'moment';
import { ApplicationStyles, Colors } from 'horus-native/app/styles';
import styles from './DetailScreenStyle';
import SubtitleText from 'horus-native/app/components/SubtitleText';
import EntryDetail from 'horus-native/app/components/EntryDetail';
import DayEntriesContainer from 'horus-native/app/containers/DayEntriesContainer';

export default class DetailScreen extends Component {
	static navigationOptions = ({navigation}) => ({
			...ApplicationStyles.detailStackNavigatorOptions,
			headerTitle: (
				<SubtitleText
					text={moment(navigation.state.params.date).format('LL')}
					color="white"
				/>
			),
		});
	render() {
		let date = this.props.navigation.state.params.date;
		return (
			<View style={[styles.container, styles.backgroundMain]}>
				
				<View style={[styles.navBarHeight, styles.paddingTop]}/>
				<DayEntriesContainer
					date={date}
					footer={
						<View style={styles.smallMarginTop}/>
					}
				/>
			</View>
		);
	}
}
