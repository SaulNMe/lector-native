import reducer from 'horus-native/app/reducers/CitiesReducer'

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

const sampleState = {
	all: [
		{ id: 1, name: "Armeria", state_id: 1 },
		{ id: 2, name: "Colima", state_id: 1 },
		{ id: 3, name: "Manzanillo", state_id: 2 }
	],
	byId: {
		1: { id: 1, name: "Armeria", state_id: 1 },
		2: { id: 2, name: "Colima", state_id: 1 },
		3: { id: 3, name: "Manzanillo", state_id: 2 }
	},
	byFederalEntityId: {
		1: [1, 2],
		2: [3]
	},
	allIds: [1,2,3],
	isLoading: false,
	error: ''
};

const samplePayload = {
	cities: {
		all: [{ id: 4, name: "Pachuca", state_id: 2 }],
		byId: {
			4: { id: 4, name: "Pachuca", state_id: 2 } 
		},
		allIds: [4],
		byFederalEntityId: {
			1: [1, 2],
			2: [3, 2]
		}
	}
}

//This one should have an item already existing in sampleState
const overwritingPayload = {
	cities: {
		all: [{ id: 3, name: "Overridden", state_id: 2 }],
		byId: {
			3: { id: 3, name: "Overridden", state_id: 2 }
		},
		allIds: [3]
	}
}


//MORE STATES

describe('cities reducer', () => {
	it('should return the initial state', () => {
		const actual = reducer(undefined, {});
		const expected = initialState;
		expect(actual).toEqual(expected)
	});
	describe('GET_CITIES_BEGIN', () => {
		it('sets isLoading to true',() => {
			const action = {
				type: GET_CITIES_BEGIN
			};
			const actual = reducer(sampleState, action);
			const expected = {
				...sampleState,
				isLoading: true
			};
			expect(actual).toEqual(expected)
		});
	})
	describe('GET_CITIES_SUCCESS', () => {
		describe('when just adding items', () => {
			const action = {
				type: GET_CITIES_SUCCESS,
				payload: samplePayload
			};
			const result = reducer({ ...sampleState, isLoading: true }, action);
			it('keeps the old items on byId', () => {
				expect(result.byId).toMatchObject(sampleState.byId);
			});
			it('adds the new items to byId', () => {
				expect(result.byId).toMatchObject(samplePayload.cities.byId);
			});
			it('merges new allIds into old ones in the correct order', () => {
				expect(result.allIds).toEqual([...sampleState.allIds, ...samplePayload.cities.allIds ])
			});
			it('returns isLoading to false', () => {
				expect(result.isLoading).toBe(false);
			});
			it('merges byFederalEntityId keys correctly', () => {
				const newId = samplePayload.cities.allIds[0];
				const entityId = samplePayload.cities.byId[newId].state_id;
				expect(result.byFederalEntityId[entityId]).toEqual([...new Set([ ...sampleState.byFederalEntityId[entityId], entityId ])]);
			})
		});
		describe('when overwriting items', () => {
			const action = {
				type: GET_CITIES_SUCCESS,
				payload: overwritingPayload
			};
			const result = reducer(sampleState, action);
			it('overwrites items with same Id', () => {
				const overwrittenId = overwritingPayload.cities.allIds[0];
				expect(result.byId[overwrittenId]).toEqual(overwritingPayload.cities.byId[overwrittenId]);
			})
			it('doesnt repeat ids on allIds', () => {
				expect(result.allIds).toEqual([...new Set(result.allIds)]);
			})
		});
	})
	describe('GET_CITIES_FAILURE', () => {
		it('sets error string',() => {
			const action = {
				type: GET_CITIES_FAILURE,
				payload: { error: 'Test error' }
			};
			const actual = reducer(sampleState, action);
			const expected = {
				...sampleState,
				error: 'Test error'
			};
			expect(actual).toEqual(expected)
		});
	})
});
