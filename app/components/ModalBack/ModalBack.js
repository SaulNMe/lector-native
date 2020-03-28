import React, { Component } from 'react';
import { 
	View, 
	Platform,
	TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import LabelText from 'horus-native/app/components/LabelText';
import styles from './ModalBackStyle.js';
export default class ModalBack extends Component {
	render() {
		let mainView = (
			<View style={styles.column}>
				<Feather
					name={Platform.OS === 'ios' ? 'chevron-left':'arrow-left'}
					size={Platform.OS === 'ios' ? 35:24}
					style={styles.icon}
					color={this.props.color}
				/>
			</View>
		);
		return (
			<View style={[styles.row, styles.alignItemsCenter]}>
			{
				this.props.isCloseModal? (
					<View style={[styles.row, styles.alignItemsCenter]}>
						{ mainView }
						{this.props.backLabel &&
							<View style={styles.column}>
								<LabelText
									text='Regresar'
									color={this.props.color}
								/>
							</View>
						}
					</View>
				):(
					<TouchableOpacity
						onPress={() => this.props.navigation.goBack()}
						style={[styles.row, styles.alignItemsCenter]}
					>
						{ mainView }
						{this.props.backLabel &&
							<View style={styles.column}>
								<LabelText
									text='Regresar'
									color={this.props.color}
								/>
							</View>
						}
					</TouchableOpacity>
				)
			}
			</View>
		);
	}
}

ModalBack.propTypes = {
	color: PropTypes.string,
	backLabel: PropTypes.bool,
	isCloseModal: PropTypes.bool,
}

ModalBack.defaultProps = {
	color: 'black',
	backLabel: false,
	isCloseModal: false,
}
