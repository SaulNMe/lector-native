// Declare action names as constants with uppercase string
export const GET_USERS_BEGIN = 'GET_USERS_BEGIN';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

// Thunk: this is a special type of action that can dispatch other actions
export function getUsers() {
	return async dispatch => {
		dispatch(getUsersBegin());
		await SomeApiService.getUserList()
			.then(
				result => {
					dispatch(getUsersSuccess(result));
				},
				error => {
					dispatch(getUsersFailure(error));
					throw ({error: error, message: 'This is a demo error message'});
				}
			)
	};
}

// Action: Function that returns an object with action data for reducer
export const getUsersBegin = () => ({
	type: GET_USERS_BEGIN
});
export const getUsersSuccess = data => ({
	type: GET_USERS_SUCCESS,
	payload: { data }
});
export const getUsersFailure = error => ({
	type: GET_USERS_FAILURE,
	payload: { error }
});
