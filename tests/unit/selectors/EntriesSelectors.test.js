import {
	getEntries,
	getEntriesGroupedByDay
} from "horus-native/app/reducers/EntriesReducer";

import moment from 'moment';

//Keep the state shape the same as the ones in the reducer test
const emptyState = {
	byId: {},
	allIds: [],
	isLoading: false,
	error: ''
};

const fullState = {
	byId: {
		1: { id: 1, created_at: "2019-03-05T11:34:34-06:00", studentName: 'Paul Marcelle Pacheque', imageUrl: 'something', isExit: false },
		2: { id: 2, created_at: "2019-03-05T12:34:34-06:00", studentName: 'Jorge Antonio Becerra Perea', imageUrl: 'something', isExit: true },
		3: { id: 3, created_at: "2019-03-06T11:34:34-06:00", studentName: 'Daniel Lopez Ramirez', imageUrl: 'something', isExit: false },
		4: { id: 4, created_at: "2019-03-06T12:34:34-06:00", studentName: 'Jose Carlos Lopez Gonzales', imageUrl: 'something', isExit: true },
		5: { id: 5, created_at: "2019-03-07T11:34:34-06:00", studentName: 'Eguzki Aguirre Mendieta', imageUrl: 'something', isExit: false },
		6: { id: 6, created_at: "2019-03-07T12:34:34-06:00", studentName: 'Jorge Ramirez Zapata', imageUrl: 'something', isExit: true },
		7: { id: 7, created_at: "2019-03-08T11:34:34-06:00", studentName: 'Gustavo Adolfo Pacheco', imageUrl: 'something', isExit: false },
		8: { id: 8, created_at: "2019-03-09T12:34:34-06:00", studentName: 'Paul Marcelle Pacheque', imageUrl: 'something', isExit: true },
	},
	allIds: [1,2,3,4,5,6,7,8],
	isLoading: false,
	error: ''
};

describe('entries selectors', () => {
	describe('getEntries', () => {
		it('returns empty array when the state is empty', () => {
			const actual = getEntries(emptyState);
			const expected = [];
			expect(actual).toEqual(expected)
		});
		it('Returns the right ammount of items', () => {
			const actual = getEntries(fullState);
			const expected = [];
			expect(actual).toHaveLength(fullState.allIds.length)
		});
	});
	describe('getEntriesGroupedByDay', () => {
		it('returns empty array when the state is empty', () => {
			const actual = getEntriesGroupedByDay(emptyState);
			const expected = [];
			expect(actual).toEqual(expected)
		});
		describe('when the state is full', () => {
			const actual = getEntriesGroupedByDay(fullState);
			const expected = [];
			it('returns an array of objects', () => {
				expect(actual).toEqual(expect.any(Array));
			});
			it('returns an array where each object has a date and a entries field', () => {
				expect(actual[0]).toHaveProperty('date');
				expect(actual[0]).toHaveProperty('collection');
			});
			it('groups the entries of the same day', () => {
				let day = moment(actual[0].date).format('YYYY-MM-DD');
				actual[0].collection.forEach(entry => {
					expect(moment(entry.created_at).format('YYYY-MM-DD')).toBe(day);
				});
			})
		})
	});
});
