import ApiService from 'horus-native/app/services/ApiService';
import normalizeById from 'horus-native/app/utils/NormalizeById';

import { getIsLoadingLectures } from 'horus-native/app/reducers';

export const FETCH_LECTURES_BEGIN ='FETCH_LECTURES_BEGIN';
export const FETCH_LECTURES_SUCCESS ='FETCH_LECTURES_SUCCESS';
export const FETCH_LECTURES_FAILURE ='FETCH_LECTURES_FAILURE';
export const RESET_LECTURES ='RESET_LECTURES';

export function fetchLecturesByStudentId(studentId, start_date, end_date) {
	return async (dispatch, getState) => {
		dispatch(fetchLecturesBegin());
		return ApiService.getLecturesByStudentId({studentId, start_date, end_date})
			.then (
				result => {
					let normalized = normalizeById(result.lectures);
					dispatch(fetchLecturesSuccess(normalized));
					return normalized;
				},
				error => {
					dispatch(fetchLecturesFailure(error));
					throw ({ error, message: 'Unable to get lectures'});
				}
			);
	}
};

export const resetLectures = () => ({
	type: RESET_LECTURES
});

export const fetchLecturesBegin = () => ({
	type: FETCH_LECTURES_BEGIN
});

export const fetchLecturesSuccess = lectures => ({
	type: FETCH_LECTURES_SUCCESS,
	payload: { lectures },
});

export const fetchLecturesFailure = error => ({
	type: FETCH_LECTURES_FAILURE,
	payload: { error }
});
