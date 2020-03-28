import React, { Component } from 'react';
import { 
	Text, 
	View,
	Button,
	ScrollView,
	Alert,
	Keyboard,
	SafeAreaView,
	StatusBar,
} from 'react-native';

import styles from './CodeLoginScreenStyle';
import { ApplicationStyles } from 'horus-native/app/styles';
import BodyText from 'horus-native/app/components/BodyText';
import TitleText from 'horus-native/app/components/TitleText';
import InputField from 'horus-native/app/components/InputField';
import Draggable from 'horus-native/app/components/Draggable';
import ModalBack from 'horus-native/app/components/ModalBack';

import { NavigationEvents } from 'react-navigation';
import { login } from 'horus-native/app/actions/AuthActions';
import { getPhoneNumber, getIsLoading, getCode } from 'horus-native/app/reducers';
import { connect } from "react-redux";

class CodeLoginScreen extends Component {

	static navigationOptions = () => ({
		header: null
	});

	state = {
		codeNumber: ''
	}

	componentDidMount = () =>{
		this.setState({codeNumber: this.props.code});
		if(this.props.code && this.props.code.length === 6){
			this.onSubmit(this.props.code);
		}
	}

	onSubmit = async (val) => {
		try {
			Keyboard.dismiss();
			await this.props.login({username: this.props.phoneNumber, password: val});
			this.setState({ codeNumber: '' });
			this.props.navigation.navigate('AuthLoadingScreen');
		} catch (e) {
			Alert.alert(e.message, 'Revisa que tu código esté correcto');
		}
	}

	onChangeNumber = async (val) => {
		this.setState({
			codeNumber: val
		});
		if (val.length === 6) {
			this.onSubmit(val);
		}
	}

	onSubmitEditing = async () => {
		if (this.state.codeNumber.length === 6) {
			this.onSubmit(this.state.codeNumber);
		} else {
			Alert.alert('Campo inválido', 'El código debe ser de 6 dígitos');
		}
	}

	onDidFocus = () => {
		this.codeInput.focus();
	}

	render() {
		return (
			<View>
				<View style={[{position:'absolute', zIndex: 999}, styles.navBarHeight, styles.marginStatus]}>
					<ModalBack
						navigation={this.props.navigation}
						color='white'
						backLabel
					/>
				</View>
				<View style={[ styles.alignItemsCenter]}>
					<NavigationEvents
						onDidFocus={this.onDidFocus}
					/>
					<View style={[styles.backContainer]}>
						<TitleText
							text='Registra el Código'
						/>
						<InputField 
							disabled={true}
							inputRef={(input) => { this.codeInput = input; }}
							keyboardShouldPersist={'always'}
							value={this.state.codeNumber}
							onSubmitEditing={this.onSubmitEditing}
							onChangeText={this.onChangeNumber}
							maxLength={6}
							placeholder='- - - - - -'
						/>
						{this.props.isLoading &&
							<View style={[styles.alignItemsCenter, styles.paddedTop, styles.flex1]}>
								<TitleText
									text='Iniciando...'	
								/>
							</View>
						}
					</View>
					<Draggable 
						slid
						phoneNumber={this.props.phoneNumber}
						navigation={this.props.navigation}
						slidContainer
						text='Hemos enviado el código de acceso a tu telefono celular.'
					/>
				</View>
			</View>
		);
	}
}
mapStateToProps = (state) => ({
	code: getCode(state),
	phoneNumber: getPhoneNumber(state),
	isLoading: getIsLoading(state),
})


export default connect(mapStateToProps, {login})(CodeLoginScreen);
