import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './InputFieldStyle';

export default class InputField extends Component {
	render() {
		return (
			<View>
				<TextInput 
					ref={this.props.inputRef}
					style={styles.input}
					onSubmitEditing={this.props.onSubmitEditing}
					onChangeText={this.props.onChangeText}
					value={this.props.value}
					placeholder={this.props.placeholder}
					placeholderTextColor='#B2B2B2'
					keyboardType={this.props.type}
					maxLength={this.props.maxLength}
					keyboardShouldPersistTaps={this.props.keyboardShouldPersist}
				/>
			</View>
		);
	}
}

InputField.propTypes = {
	value: PropTypes.string,
	type: PropTypes.string,
	maxLength: PropTypes.number
}

InputField.defaultProps = {
	value: '',
	type: 'phone-pad',
	maxLength: 500
}
