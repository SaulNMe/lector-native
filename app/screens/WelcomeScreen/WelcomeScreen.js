import React, { Component } from 'react';
import { 
	Text, 
	View,
	Button,
	ScrollView,
	Alert,
	Image
} from 'react-native';

import { Notifications, Permissions } from 'expo';

import ApiService from 'horus-native/app/services/ApiService';

import styles from './WelcomeScreenStyle';
import BodyText from 'horus-native/app/components/BodyText';
import TitleText from 'horus-native/app/components/TitleText';
import InputField from 'horus-native/app/components/InputField';
import Draggable from 'horus-native/app/components/Draggable';
import IconButton from 'horus-native/app/components/IconButton';

import { sendPhoneNumber, resetIsLoading } from 'horus-native/app/actions/AuthActions';
import { connect } from 'react-redux';

class WelcomeScreen extends Component {
	state = {
		phoneNumber: ''
	}
	
	componentDidMount () {
		this.props.resetIsLoading();
	}

	onSubmit = async (val) => {
		//await this.props.login({username: 'omar.parent@kioru.com', password: 'p4ssg60rd'});
		try {
			let code = await this.props.sendPhoneNumber(val);
			this.setState({ phoneNumber: '' });
			this.props.navigation.navigate('CodeLoginScreen');
		} catch (e) {
			Alert.alert(e.message, 'Revisa que esté correcto tu número de teléfono');
		}
	}

	onChangeNumber = (val) => {
		this.setState({
			phoneNumber: val
		});
		if (val.length === 10)
			setTimeout(() => this.onSubmit(val));
			
	}

	onSubmitEditing = (val) => {
		if (this.state.phoneNumber.length === 10) {
			setTimeout(() => this.onSubmit(this.state.phoneNumber));
		} else {
			Alert.alert('Campo inválido', 'Tú número de teléfono debe ser de 10 dígitos');
		}
	}

	onSlide = () => {
		this.phoneInput.focus();
	}

	render() {
		return (
			<View style={styles.flex, styles.alignItemsCenter}>
				<View style={styles.backContainer}>
					<TitleText
						text='Escribe tu teléfono'
					/>
					<InputField 
						inputRef={(input) => { this.phoneInput = input; }}
						keyboardShouldPersist={'always'}
						value={this.state.phoneNumber}
						onSubmitEditing={this.onSubmitEditing}
						onChangeText={this.onChangeNumber}
						maxLength={10}
						placeholder='Tu número de teléfono aquí'
					/>
				</View>
				<Draggable 
					onSlide={this.onSlide}
					text='Por favor ingresa tu telefono celular para recibir el código de acceso.'
				/>
				{/*<Image
					style={[styles.logoImage]}
					source={require('horus-native/assets/HorusLogoW.png')}
				/>*/}
			</View>
		);
	}
}
mapStateToProps = (state) => ({
})


export default connect(mapStateToProps, { sendPhoneNumber, resetIsLoading })(WelcomeScreen);
