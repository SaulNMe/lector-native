const GET_CITIES_BEGIN = 'GET_CITIES_BEGIN';
const GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS';
const GET_CITIES_FAILURE = 'GET_CITIES_FAILURE';

const initialState = {
	all: [],
	byId: {},
	byFederalEntityId: {},
	allIds: [],
	isLoading: false,
	error: ''
};

export default (state, action) => {
	switch(action.type) {
		case GET_CITIES_BEGIN:
			return{
				...state,
				isLoading: true,
				error: ''
			}
		case GET_CITIES_SUCCESS: {
			let allIds = [...new Set(state.allIds.concat(action.payload.cities.allIds))];
			let byId = {
				...state.byId,
				...action.payload.cities.byId
			};
			let all = allIds.map(id => byId[id]);
			
			let byFederalEntityId = {
				...state.byFederalEntityId,
				...action.payload.cities.byFederalEntityId
			};
			return {
				...state,
				allIds,
				byId,
				all,
				byFederalEntityId,
				isLoading: false,
			};
		}
		case GET_CITIES_FAILURE:
			return{
				...state,
				isLoading: false,
				error: action.payload.error
			}
		default: {
			return state || initialState;
		}
	}
}
