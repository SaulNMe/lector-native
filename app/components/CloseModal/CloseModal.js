import React, { Component } from 'react';
import { 
	Text, 
	View,
	Platform,
	TouchableOpacity 
} from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';

import styles from './CloseModalStyle';

export default class CloseModal extends Component {
	render() {
		return (
			<TouchableOpacity
				{...this.props}
			>
				<Feather 
					name='x' 
					size={Platform.OS === 'ios' ? 35:27} style={styles.black}
				/>
			</TouchableOpacity>
		);
	}
}

	CloseModal.propTypes = {
		// data: PropTypes.array
	}

	CloseModal.defaultProps = {
		// data: []
	}
