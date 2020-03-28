import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Image,
	TouchableOpacity,
	Platform
} from 'react-native';
import styles from './HeaderMoreStyle.js';
import ActionSheet from 'react-native-actionsheet'
import Feather from 'react-native-vector-icons/Feather';

export default class HeaderMoreVertical extends Component {

	showActionSheet = () => this.actionSheet.show();
	
	render(){
		return(
			<View>
				<TouchableOpacity
					style={styles.containerTransp}
					onPress={this.showActionSheet}
				>
					<Feather 
						name={this.props.icon}
						size={Platform.OS === 'ios' ? 35:27} style={styles.transparent}
					/>
				</TouchableOpacity>
				<ActionSheet
					ref={o => this.actionSheet = o}
					options={this.props.items}
					style={{
						buttonBox: {...styles.buttonBox},
						cancelButtonBox: {...styles.cancelButtonBox},
						body: {...styles.body}
					}}
					cancelButtonIndex={this.props.items.length-1}
					destructiveButtonIndex={this.props.destructive}
					onPress={(index) =>{
						if (index === this.props.items.length-1) return;
						this.props.onPress(index, this.props.menu, this.props.items);
					}}
				/>
			</View>
		);
	}
}

HeaderMoreVertical.propTypes = {
	icon: PropTypes.string,
	items: PropTypes.array,
	onPress: PropTypes.func,
	menu: PropTypes.bool,
}

HeaderMoreVertical.defaultProps = {
	icon: 'more',
	items:['Ayuda', 'Cerrar sesión', 'Cancelar'],
	menu: true,
	destructive: -1,
}