import React, { Component } from 'react';
import { 
	View,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './SimpleCardStyle';

export default class SimpleCard extends Component {
	render () {
		return (
			<React.Fragment>
				<TouchableOpacity
					{...this.props}
					onPress={this.props.onPress}				
					style={styles.simpleCard}
					activeOpacity={.9}
				>
					{this.props.children}
				</TouchableOpacity>
			</React.Fragment>
		);
	}
}

SimpleCard.propTypes = {
	onPress: PropTypes.func
}

SimpleCard.defaultProps = {
	onPress: () => {}
}
