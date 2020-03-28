import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from 'horus-native/app/styles';
import SubtitleText from 'horus-native/app/components/SubtitleText';
import BodyText from 'horus-native/app/components/BodyText';


import styles from './EntryStyle';

export default class Entry extends Component {
	render () {
		const bgColor = this.props.registrationMode === 'in' ? { backgroundColor: Colors.lightBlue} : { backgroundColor: Colors.leave};
		return (
			<View style={[styles.row, styles.fullWidth]}>
				<View style={styles.timeContainer}>
					<SubtitleText 
						text={this.props.entryTime}
						weight='light'
					/>
				</View>

				<View style={[styles.marginHorizontal, styles.circleContainer]}>
					<View style={[styles.circle, bgColor]} testID='entry-color-indicator'></View>
				</View>

				<View style={styles.flex1}>
					<SubtitleText
						weight='bold' 
						text={ this.props.registrationMode === 'out' ? 'Salida' : 'Entrada'}
						testID='entry-message'
					/>
					<BodyText 
						text={this.props.name}
						weight='light'
					/>
				</View>
			</View>
		);
	}
}

Entry.propTypes = {
	entryTime: PropTypes.string,
	registrationMode: PropTypes.string,
	name: PropTypes.string

}

Entry.defaultProps = {
	entryTime: "00:00",
	registrationMode: 'out',
	name: '--'
}
