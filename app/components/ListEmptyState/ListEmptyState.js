import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './ListEmptyStateStyle';
import TitleText from 'horus-native/app/components/TitleText';

export default class ListEmptyState extends Component {
	render() {
		return (
			<View
				style={[styles.alignItemsCenter, styles.marginBottom, styles.marginHorizontal, styles.marginTop]}
			>
				<TitleText
					text='¡No se encontraron registros!'
					color='white'
				/>
			</View>
		);
	}
}

	ListEmptyState.propTypes = {
		// data: PropTypes.array
	}

	ListEmptyState.defaultProps = {
		// data: []
	}
