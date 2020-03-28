import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import BodyText from 'horus-native/app/components/BodyText';
import styles from './PrimaryBtnStyle';
import { Fonts, Colors } from 'horus-native/app/styles';

export default class PrimaryBtn extends Component {
	render() {
		const backgroundColor = { backgroundColor: Colors[this.props.backgroundColor] || Colors.main }

		return (
			<View>
				<TouchableOpacity 
					onPress={this.props.onPress}
					style={[backgroundColor, styles.btn]}
				>
					<BodyText 
						color={this.props.color} 
						text={this.props.text}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

PrimaryBtn.propTypes = {
	color: PropTypes.string,
	backgroundColor: PropTypes.string,
}

PrimaryBtn.defaultProps = {
 	color: 'white'
}
