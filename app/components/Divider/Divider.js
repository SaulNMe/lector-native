import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './DividerStyle';
import { Colors } from 'horus-native/app/styles';

export default class Divider extends Component {
	render () {
		const backgroundColor = { backgroundColor: Colors[this.props.color] || Colors.grey };
		return (
			<View style={[styles.divider, backgroundColor]}>
			</View>
		);
	}
}

Divider.propTypes = {
	text: PropTypes.string
}

Divider.defaultProps = {
	text: "Divider"
}
