import normalizeById from 'horus-native/app/utils/NormalizeById';
import ApiService from 'horus-native/app/services/ApiService';
import moment from 'moment';

import { 
	getEntriesSelectedDateRange,
	getIsLoadingEntries,
	getEntriesEndReached,
	getEntriesPaginationData
} from 'horus-native/app/reducers';

export const FETCH_ENTRIES_BEGIN ='FETCH_ENTRIES_BEGIN';
export const FETCH_ENTRIES_SUCCESS ='FETCH_ENTRIES_SUCCESS';
export const FETCH_ENTRIES_FAILURE ='FETCH_ENTRIES_FAILURE';
export const SET_SELECTED_MONTH ='SET_SELECTED_MONTH';
export const CLEAR_ENTRIES ='CLEAR_ENTRIES';
export const INCREMENT_ENTRIES_PAGE ='INCREMENT_ENTRIES_PAGE';
export const RESET_ENTRIES_PAGINATION ='RESET_ENTRIES_PAGINATION';

export function fetchEntriesBatch(clearAfterFetch=false){
	return async (dispatch, getState) => {
		if( getIsLoadingEntries(getState()) || getEntriesEndReached(getState())) return;
		let paginationData = getEntriesPaginationData(getState());
		let dateRange = getEntriesSelectedDateRange(getState());
		await dispatch(fetchEntries(dateRange, paginationData, clearAfterFetch))
	}
}

export function fetchEntries(dateRange={}, paginationData, clearAfterFetch=false) {
	return async (dispatch, getState) => {
		dispatch(fetchEntriesBegin());
		return ApiService.getEntries(paginationData, dateRange)
			.then (
				result => {
					let normalized = normalizeById(result.attendance_logs);
					let cursor = result.meta.cursor_desc;
					if(clearAfterFetch) dispatch(clearEntries());
					dispatch(fetchEntriesSuccess(normalized));
					if(paginationData) dispatch(incrementPage(cursor));
					return normalized;
				},
				error => {
					dispatch(fetchEntriesFailure(error));
					throw ({ error, message: 'Unable to get entries'});
				}
			);
	}
};

export function reloadEntries() {
	return async (dispatch, getState) => {
		dispatch(resetPagination());
		dispatch(fetchEntriesBatch(true));
	}
}

export function selectMonthAndReload(month) {
	return async (dispatch, getState) => {
		dispatch(setSelectedMonth(month));
		dispatch(reloadEntries());
	}
}

export const clearEntries = () => ({
	type: CLEAR_ENTRIES,
});

export const fetchEntriesBegin = () => ({
	type: FETCH_ENTRIES_BEGIN
});

export const fetchEntriesSuccess = entries => ({
	type: FETCH_ENTRIES_SUCCESS,
	payload: { entries },
});

export const fetchEntriesFailure = error => ({
	type: FETCH_ENTRIES_FAILURE,
	payload: { error }
});

export const setSelectedMonth = month => ({
	type: SET_SELECTED_MONTH,
	payload: { month }
});

export const incrementPage = cursor => ({
	type: INCREMENT_ENTRIES_PAGE,
	payload: { cursor }
});

export const resetPagination = () => ({
	type: RESET_ENTRIES_PAGINATION
});
