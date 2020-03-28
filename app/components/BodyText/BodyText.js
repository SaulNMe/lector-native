import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './BodyTextStyle';
import { Fonts, Colors } from 'horus-native/app/styles';

export default class BodyText extends Component {
	render() {
		const color = { color: Colors[this.props.color] || Colors.dark };
		const weight = { fontWeight: Fonts.weight[this.props.weight] || Fonts.weight.regular };
		const center = this.props.center ? {textAlign: 'center'} : {textAlign: 'left'};

		return (
			<View>
				<Text style={[styles.text, color, weight, center]}>{this.props.text}</Text>
			</View>
		);
	}
}

BodyText.propTypes = {
	text: PropTypes.string
}

BodyText.defaultProps = {
	text: "BodyText"
}