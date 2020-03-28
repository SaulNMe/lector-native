import {
	FETCH_LECTURES_BEGIN,
	FETCH_LECTURES_SUCCESS,
	FETCH_LECTURES_FAILURE,
	RESET_LECTURES,
} from 'horus-native/app/actions/LecturesActions';


const initialState = {
	byId: {},
	allIds: [],
	isLoading: false,
	error: '',
}

export default function LecturesReducer (state = initialState, action){
	switch(action.type){
		case FETCH_LECTURES_BEGIN:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case FETCH_LECTURES_SUCCESS:
			let allIds = [...new Set(state.allIds.concat(action.payload.lectures.allIds))];
			let byId = {
				...state.byId,
				...action.payload.lectures.byId
			};
			return{
				...state,
				allIds,
				byId,
				isLoading: false,
			}
		case FETCH_LECTURES_FAILURE:
			return{
				...state,
				isLoading: false,
				error: action.payload.error,
			}
		case RESET_LECTURES:
			return{
				...initialState
			}
		default:
			return state
	}
}

export const getLecturesError = state => {
	return state.error;
}

export const getIsLoadingLectures = state => {
	return state.isLoading;
}

export const getLectures = state => {
	return state.allIds.map(id => state.byId[id]);
}
