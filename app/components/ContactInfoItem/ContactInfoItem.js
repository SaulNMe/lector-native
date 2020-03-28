import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Feather from 'react-native-vector-icons/Feather';
import BodyText from 'horus-native/app/components/BodyText';
import Divider from 'horus-native/app/components/Divider';

import styles from './ContactInfoItemStyle';

export default class ContactInfoItem extends Component {
  render() {
    return (
    	<React.Fragment>
		<View style={[styles.row, styles.justifyContentSpaceBetween, styles.smallMarginVertical]}>
			<View style={styles.smallMarginHorizontal}>
				<Feather name={this.props.iconName} size={28} />
			</View>
			<View style={styles.smallMarginHorizontal}>
				<BodyText 
					text={this.props.text}
				/>
			</View>
		</View>
		<Divider />
    	</React.Fragment>
    );
  }
}

ContactInfoItem.propTypes = {
	iconName: PropTypes.string,
	text: PropTypes.string
}

ContactInfoItem.defaultProps = {
	iconName: "alert-circle",
	text: "Text"
}
