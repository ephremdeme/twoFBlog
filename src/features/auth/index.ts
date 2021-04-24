import {createSlice} from '@reduxjs/toolkit';
import selectors from './selectors';
import reducers from './mutations';
import * as thunks from './actions';
import {initialState} from './init';

const productSlice = createSlice({
	name: 'product_store',
	initialState,
	reducers
});

export const {
	setLoginInProgress,
	setAuthFailure,
	setLogInSuccess,
	setLogInFaliure,
	setLogoutSuccess,
	setLogoutFailure,
	setIsGuest,
	setLoggedIn,
	setCurrentRole,
	setFaliure,
	setUserBlocked	
} = productSlice.actions;

export const {
	selectBlocked,
	selectUserRole,
	selectUserAuthenticated,
	selectUserId
} = selectors;

export const {
	createUserWithEmailPassword,
	createUserWithEmailPasswordAdmin,
	isLoggedIn,
	isPrivate,
	logoutUser,
	signAsGuest,
	signInWithEmailPassword,
	singUpWithProvider
} = thunks;

export default productSlice.reducer;
