import React, { Component } from 'react';
import { 
	Text, 
	View,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './IconButtonStyle';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from 'horus-native/app/styles';


export default class IconButton extends Component {
	render() {
		return (
			<TouchableOpacity
				{...this.props}
			>	
				<Feather name={this.props.iconName} size={24} color={Colors.white}/>
			</TouchableOpacity>
		);
	}
}

	IconButton.propTypes = {
		iconName: PropTypes.string
	}

	IconButton.defaultProps = {
		iconName: ''
	}
