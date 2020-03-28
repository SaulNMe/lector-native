import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './EntryDetialStyle.js';

import HourTag from 'horus-native/app/components/HourTag';
import ImageContainer from 'horus-native/app/components/ImageContainer';

export default class EntryDetail extends Component {
	render() {
		return (
			<View style={[styles.column, styles.alignItemsCenter]}>
				<View style={[styles.alignSelfEnd, styles.customMargin]} >
					<HourTag 
						entryTime={this.props.entryTime}
						registrationMode={this.props.registrationMode}
						color={this.props.textColor}
					/>
				</View>
				<ImageContainer 
					imageURL={this.props.imageURL}
				/>
			</View>
		);
	}
}

	EntryDetail.propTypes = {
		entryTime: PropTypes.string,
		registrationMode: PropTypes.string.isRequired,
		textColor: PropTypes.string,
		imageURL: PropTypes.string
	}

	EntryDetail.defaultProps = {
		entryTime: '00:00',
		textColor: 'white',
		imageURL: '',
		registrationMode: 'out',
	}
