import {
	FETCH_STUDENTS_BEGIN,
	FETCH_STUDENTS_SUCCESS,
	FETCH_STUDENTS_FAILURE,
	RESET_STUDENTS,
} from 'horus-native/app/actions/StudentsActions';


const initialState = {
	byId: {},
	allIds: [],
	isLoading: false,
	error: '',
}

export default function StudentsReducer (state = initialState, action){
	switch(action.type){
		case FETCH_STUDENTS_BEGIN:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case FETCH_STUDENTS_SUCCESS:
			let allIds = [...new Set(state.allIds.concat(action.payload.students.allIds))];
			let byId = {
				...state.byId,
				...action.payload.students.byId
			};
			return{
				...state,
				allIds,
				byId,
				isLoading: false,
			}
		case FETCH_STUDENTS_FAILURE:
			return{
				...state,
				isLoading: false,
				error: action.payload.error,
			}
		case RESET_STUDENTS:
			return{
				...initialState
			}
		default:
			return state
	}
}

export const getStudentsError = state => {
	return state.error;
}

export const getIsLoadingStudents = state => {
	return state.isLoading;
}

export const getStudents = state => {
	return state.allIds.map(id => state.byId[id]);
}
