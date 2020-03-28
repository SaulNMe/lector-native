import ApiService from 'horus-native/app/services/ApiService';
import { Notifications, Permissions } from 'expo';
import { Constants } from 'expo';
import { AsyncStorage } from "react-native";
import NavigationService from 'horus-native/app/services/NavigationService.js';
export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const SEND_PHONE_NUMBER_BEGIN = 'SEND_PHONE_NUMBER_BEGIN';
export const SEND_PHONE_NUMBER_SUCCESS = 'SEND_PHONE_NUMBER_SUCCESS';
export const SEND_PHONE_NUMBER_FAILURE = 'SEND_PHONE_NUMBER_FAILURE';
export const UPDATE_AUTH_DATA = 'UPDATE_AUTH_DATA';
export const RESET_LOADING = 'RESET_LOADING';

export function autenticateUser(loginCredentials) {
	return async dispatch => {
		dispatch(loginBegin());
		return ApiService.login(loginCredentials)
			.then(
				result => {
					dispatch(loginSuccess(result));
				},
				error => {
					dispatch(loginFailure(error));
					throw ({error: error, message: 'No se logró autenticar el usuario'});
				}
			)
	};
}

export function refreshAuth() {
	return async dispatch => {
		return ApiService.getNewToken()
			.then(
				result => {
					dispatch(updateAuthData(result));
				},
				error => {
					dispatch(logout());
					throw ({error: error, message: 'No se logró actualizar la sesión'});
				}
			)
	};
}

export function login(loginCredentials) {
	return async dispatch => {
		await dispatch(autenticateUser(loginCredentials));
		await dispatch(registerDevice());
		await dispatch(fetchUser());
	};
}

const registerDevice = () => {
	return async dispatch => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		// Stop here if the user did not grant permissions
		if (finalStatus !== 'granted') {
			return;
		}
		let token = await Notifications.getExpoPushTokenAsync();

		ApiService.registerDevice(token);
	}
}

export function logout() {
	return async dispatch => {
		dispatch(clearAuth());
		NavigationService.navigate('AuthLoadingScreen');
	};
}

export function sendPhoneNumber( phoneNumber ){
	return async dispatch => {
		let releaseChannel = Constants.manifest.releaseChannel;
		let isProd = releaseChannel && releaseChannel.indexOf('prod') !== -1;

		dispatch(sendPhoneNumberBegin());
		return ApiService.getOTP(phoneNumber, !isProd)
			.then(
				result => {
					// if(isDev){
					// 	Notifications.presentLocalNotificationAsync({
					// 		title: 'Código de verificación',
					// 		body: result.otp_request.code,
					// 	})
					// }
					dispatch(sendPhoneNumberSuccess(result.otp_request.phone, result.otp_request.code ));
				},
				error => {
					dispatch(sendPhoneNumberFailure(error))
					throw({error: error, message: 'No se logró obtener el código de verificación'})
				}
			)
	}
}

export function fetchUser(){
	return async dispatch => {
		dispatch(fetchUserBegin());
		return ApiService.getUser()
			.then(
				result => {
					dispatch(fetchUserSuccess(result.user));
				},
				error => {
					dispatch(fetchUserFailure(error))
					throw({error: error, message: 'No se encontró el usuario'})
				}
			)
	}
}

//Update
export const updateAuthData = authData => ({
	type: UPDATE_AUTH_DATA,
	payload: { authData }
})

//Phone
export const sendPhoneNumberBegin = () => ({
	type: SEND_PHONE_NUMBER_BEGIN 
})

export const sendPhoneNumberSuccess = (phone, code) => ({
	type: SEND_PHONE_NUMBER_SUCCESS,
	payload: { phone, code }
})

export const sendPhoneNumberFailure = error => ({
	type: SEND_PHONE_NUMBER_FAILURE,
	payload: { error }
});

//Login
export const loginBegin = () => ({
	type: LOGIN_BEGIN
})

export const resetIsLoading = () => ({
	type: RESET_LOADING
})
export const loginSuccess = authData => ({
	type: LOGIN_SUCCESS,
	payload: { authData }
})

export const loginFailure = error => ({
	type: LOGIN_FAILURE,
	payload: { error }
});

export const clearAuth = () => ({
	type: CLEAR_AUTH,
});

//USER
export const fetchUserBegin = () => ({
	type: FETCH_USER_BEGIN,
});

export const fetchUserSuccess = userData => ({
	type: FETCH_USER_SUCCESS,
	payload: { userData }
})

export const fetchUserFailure = error => ({
	type: FETCH_USER_FAILURE,
	payload: { error }
})

