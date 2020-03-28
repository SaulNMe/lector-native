import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ListErrorStateStyle';
import TitleText from 'horus-native/app/components/TitleText';

export default class ListErrorState extends Component {
	render() {
		return (
			<View
				style={[styles.alignItemsCenter, styles.marginBottom, styles.marginHorizontal, styles.marginTop]}
			>
				<TitleText
					text='¡No se lograron cargar los registros!'
					color='white'
				/>
			</View>
		);
	}
}

	ListErrorState.propTypes = {
		// data: PropTypes.array
	}

	ListErrorState.defaultProps = {
		// data: []
	}
