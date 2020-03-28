import Auth, * as fromAuth from 'horus-native/app/reducers/AuthReducer.js'
import Entries, * as fromEntries from 'horus-native/app/reducers/EntriesReducer.js'
import Students, * as fromStudents from 'horus-native/app/reducers/StudentsReducer.js'
import Lectures, * as fromLectures from 'horus-native/app/reducers/LecturesReducer.js'
import Cities from 'horus-native/app/reducers/CitiesReducer.js'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    Entries,
    Cities,
    Students,
    Lectures,
    Auth
});

export default rootReducer;

// Auth 
export const getIsLoggedIn = state =>
	fromAuth.getIsLoggedIn(state.Auth);

export const getAuthData = state =>
	fromAuth.getAuthData(state.Auth);

export const getUserData = state =>
	fromAuth.getUserData(state.Auth);

export const getPhoneNumber = state =>
	fromAuth.getPhoneNumber(state.Auth);

export const getCode = state =>
	fromAuth.getCode(state.Auth);

export const getIsLoading = state =>
	fromAuth.getIsLoading(state.Auth);

//Entries
export const getEntries = state =>
	fromEntries.getEntries(state.Entries);

export const getEntriesGroupedByDay = state =>
	fromEntries.getEntriesGroupedByDay(state.Entries);

export const getIsLoadingEntries = state => 
	fromEntries.getIsLoadingEntries(state.Entries);

export const getErrorEntries = state => 
	fromEntries.getErrorEntries(state.Entries);

export const getEntriesByDay = (state, date) => 
	fromEntries.getEntriesByDay(state.Entries, date);

export const getEntriesSelectedMonth = (state) => 
	fromEntries.getEntriesSelectedMonth(state.Entries);

export const getEntriesSelectedDateRange = (state, date) => 
	fromEntries.getEntriesSelectedDateRange(state.Entries, date);

export const getEntriesEndReached = (state) => 
	fromEntries.getEntriesEndReached(state.Entries);

export const getEntriesPaginationData = state =>
	fromEntries.getEntriesPaginationData(state.Entries);

//Students
export const getStudents = state =>
	fromStudents.getStudents(state.Students);

export const getIsLoadingStudents = state =>
	fromStudents.getIsLoadingStudents(state.Students);

export const getStudentsError = state =>
	fromStudents.getStudentsError(state.Students);

//Lectures
export const getLectures = state =>
	fromLectures.getLectures(state.Lectures);

export const getIsLoadingLectures = state =>
	fromLectures.getIsLoadingLectures(state.Lectures);

export const getLecturesError = state =>
	fromLectures.getLecturesError(state.Lectures);
