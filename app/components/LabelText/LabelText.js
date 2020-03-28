import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './LabelTextStyle';
import { Fonts, Colors } from 'horus-native/app/styles';

export default class LabelText extends Component {
	render() {
		const color = { color: Colors[this.props.color] || Colors.dark };
		const weight = { fontWeight: Fonts.weight[this.props.weight] || Fonts.weight.regular };

		return (
			<View>
				<Text style={[styles.text, color, weight]}>{this.props.text}</Text>
			</View>
		);
	}
}

LabelText.propTypes = {
	text: PropTypes.string,
}

LabelText.defaultProps = {
	text: "LabelText"
}
