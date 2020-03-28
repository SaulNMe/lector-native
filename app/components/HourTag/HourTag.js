import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BodyText from 'horus-native/app/components/BodyText';
import { Colors } from 'horus-native/app/styles';


import styles from './HourTagStyle';

export default class HourTag extends Component {
	render() {
		const icon = this.props.registrationMode === 'out' ? <MaterialIcons name='arrow-upward' size={28} color={Colors.leave}/> : <MaterialIcons name='arrow-downward' size={28} color={Colors.arrive}/>
		return (
			<View style={[styles.row, styles.alignItemsCenter]}>
				<BodyText 
					text={this.props.entryTime}
					color={this.props.color}
				/>
				{icon}
			</View>
		);
	}
}

	HourTag.propTypes = {
		entryTime: PropTypes.string,
		registrationMode: PropTypes.string.isRequired,
		color:PropTypes.string
	}

	HourTag.defaultProps = {
		entryTime: "00:00",
		registrationMode: 'out',
		color:null
	}
