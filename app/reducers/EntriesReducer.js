import {
	FETCH_ENTRIES_BEGIN,
	FETCH_ENTRIES_SUCCESS,
	FETCH_ENTRIES_FAILURE,
	SET_SELECTED_MONTH,
	CLEAR_ENTRIES,
	INCREMENT_ENTRIES_PAGE,
	RESET_ENTRIES_PAGINATION,
} from 'horus-native/app/actions/EntriesActions';
import moment from 'moment';
import GroupNormalizedDataByDate from 'horus-native/app/utils/GroupNormalizedDataByDate';

const PAGE_SIZE = 25;

const initialState = {
	byId: {},
	allIds: [],
	isLoading: false,
	error: '',
	limit: PAGE_SIZE,
	cursor: '',
	endReached: false,
	selectedMonth: moment().format('YYYY-MM'),
};

export default function EntriesReducer (state = initialState, action) {
	switch (action.type) {
		case FETCH_ENTRIES_BEGIN:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case FETCH_ENTRIES_SUCCESS:
			let allIds = [...new Set(state.allIds.concat(action.payload.entries.allIds))];
			let byId = {
				...state.byId,
				...action.payload.entries.byId
			};
			return {
				...state,
				allIds,
				byId,
				isLoading: false,
				endReached: action.payload.entries.allIds < PAGE_SIZE
			};
		case FETCH_ENTRIES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload.error
			}
		case SET_SELECTED_MONTH:
			return {
				...state,
				selectedMonth: action.payload.month
			}
		case CLEAR_ENTRIES: 
			return {
				...state,
				byId: {},
				cursor: '',
				endReached: false,
				allIds: [],
			}
		case RESET_ENTRIES_PAGINATION: {
			return {
				...state,
				endReached: initialState.endReached,
				cursor: initialState.cursor,
				limit: initialState.limit,
			}
		}
		case INCREMENT_ENTRIES_PAGE: 
			if (action.payload.cursor){	
				return {
					...state,
					cursor: action.payload.cursor
				}
			}
		default: {
			return state;
		}
	}
};

export const getEntries = state => {
	return state.allIds.map( id => state.byId[id] );
}

export const getEntriesGroupedByDay = state => {
	return GroupNormalizedDataByDate(state);
}

export const getIsLoadingEntries =  state => {
	return state.isLoading;
}

export const getErrorEntries =  state => {
	return state.error;
}

export const getEntriesByDay =  (state, date) => {
	//let items = state.allIds.filter(id => date === moment(state.byId[id].created_at).format('YYYY-MM-DD'));
	let items = [];
	state.allIds.forEach(id => {
		const currentItem = state.byId[id];
		let itemDate = moment(currentItem.created_at).format('YYYY-MM-DD');
		if (itemDate === date) {
			items.push(currentItem);
		};
	})
	return items;
}

export const getEntriesSelectedMonth = (state) => {
	return state.selectedMonth;
} 

export const getEntriesSelectedDateRange = (state) => {
	let until_date = moment(state.selectedMonth).startOf('month').format('YYYY-MM-DD');
	let from_date = moment(state.selectedMonth).endOf('month').format('YYYY-MM-DD');
	return { from_date, until_date }
}

export const getEntriesEndReached = (state) => {
	return state.endReached;
}

export const getEntriesPaginationData = state => {
	return { cursor: state.cursor, limit: state.limit, order: 'desc' }
}