import ApiService from 'horus-native/app/services/ApiService';
import normalizeById from 'horus-native/app/utils/NormalizeById';

import { getIsLoadingStudents } from 'horus-native/app/reducers';

export const FETCH_STUDENTS_BEGIN ='FETCH_STUDENTS_BEGIN';
export const FETCH_STUDENTS_SUCCESS ='FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE ='FETCH_STUDENTS_FAILURE';
export const RESET_STUDENTS ='RESET_STUDENTS';

export function fetchStudents() {
	return async (dispatch, getState) => {
		dispatch(fetchStudentsBegin());
		return ApiService.getStudents()
			.then (
				result => {
					let normalized = normalizeById(result.students);
					dispatch(fetchStudentsSuccess(normalized));
					return normalized;
				},
				error => {
					dispatch(fetchStudentsFailure(error));
					throw ({ error, message: 'Unable to get students'});
				}
			);
	}
};

export const resetStudents = () => ({
	type: RESET_STUDENTS
});

export const fetchStudentsBegin = () => ({
	type: FETCH_STUDENTS_BEGIN
});

export const fetchStudentsSuccess = students => ({
	type: FETCH_STUDENTS_SUCCESS,
	payload: { students },
});

export const fetchStudentsFailure = error => ({
	type: FETCH_STUDENTS_FAILURE,
	payload: { error }
});
