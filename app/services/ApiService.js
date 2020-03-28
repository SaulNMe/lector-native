import axios from 'axios';
import { getAuthData }  from 'horus-native/app/reducers';
import store from 'horus-native/app/Store.js';
import { refreshAuth } from 'horus-native/app/actions/AuthActions';
import ChannelConfig from 'horus-native/config/Constants';

const { API_HOST, API_CLIENT_ID, AUTH_HOST } = ChannelConfig;

const authAxios = axios.create();
axios.defaults.headers.common['Content-Type'] = 'application/json';
authAxios.defaults.headers.common['Content-Type'] = 'application/json';

authAxios.interceptors.request.use(request => {
	let tokenData = getAuthData(store.getState());
	let accessToken = tokenData.access_token;
	request.headers['Authorization'] = `Bearer ${accessToken}`;
	return request;
});

export default {

	isRefreshingToken: false,
	refreshCall: null,
	
	async login ({username, password}) {
		const method = 'POST';
		const url = AUTH_HOST + '/oauth/token';
		let data = {
			username,
			password,
			client_id: API_CLIENT_ID,
			grant_type: 'password',
			scope: "public feed attendance"
		}
		let authData = await this.makeRequest({ method, url, data });
		return authData;
	},
	
	async getOTP (phone, silent) {
		const method = 'POST';
		const url = API_HOST + '/auth/otp_requests';
		let data = {
			phone,
			country_alpha2: 'MX',
			silent
		}
		return this.makeAuthorizedRequest({ method, url, data });

		// return '123456';
	},

	async registerDevice(token) {
		const url = API_HOST + '/api/v1/activity_stream/mobile_devices';
		const method = 'POST';
		const data = {
			mobile_device: { expo_token: token }
		}
		return this.makeAuthorizedRequest({ method, url, data });
	},

	getStudents () {
		const method = 'GET';
		const url = API_HOST + '/api/v1/core/students';
		return this.makeAuthorizedRequest({ method, url });
	},
	
	// getLecturesByStudentId ({ studentId, start_date, end_date }) {
	// 	const url = `${this.host}/scheduling/students/${studentId}/lectures`;
	// 	const params = { start_date, end_date }
	// 	return this.makeAuthorizedRequest('GET', url, {}, {}, params);
	// },

	getUser () {
		const method = 'GET';
		const url = API_HOST + '/api/v1/core/user';
		return this.makeAuthorizedRequest({ method, url });
	},

	getEntries (paginationData={}, dateRange) {
		let {from_date, until_date} = dateRange;
		let { limit, cursor, order } = paginationData;
		const url = API_HOST + '/api/v1/scheduling/attendance_logs';
		const method = 'GET';
		const params = {include_fields: 'image_url,lecture_id', from_date, until_date, limit, cursor, order };
		return this.makeAuthorizedRequest({ method, url, params });
	},

	async getNewToken () {
		const url = AUTH_HOST + '/oauth/token';
		const method = 'POST';
		let { refresh_token } = getAuthData(store.getState());
		const data = {
			grant_type: 'refresh_token',
			refresh_token
		};
		return this.makeRequest({ method, url, data });
	},

	async makeRequest ( requestData={} ) {
		let res = await axios(requestData);
		return res.data;
	},

	async makeAuthorizedRequest ( requestData={} ) {
		try {
			let res = await authAxios(requestData);
			return res.data;
		} catch (error) {
			let status = error.response ? error.response.status : 0;
			if ( status === 401 ) {
				await this.suscribeForRefreshAuth();
				let retryResult = await this.makeAuthorizedRequest(requestData);
				return retryResult;
			} else {
				throw error;
			}
		}
	},
	
	async suscribeForRefreshAuth() {
		if (this.isRefreshingToken) {
			await this.refreshCall;
		} else {
			this.isRefreshingToken = true;
			let refreshPromise = store.dispatch(refreshAuth());
			this.refreshCall = refreshPromise;
			await refreshPromise;
			this.isRefreshingToken = false;
		}
	},

};
