import { IAuthState, User, UserRole } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./init";

export default {
	setLoginInProgress: (state: IAuthState, action: PayloadAction<boolean>) => {
		state.user.authenticating = action.payload;
	},
	setLoggedIn: (state: IAuthState, action: PayloadAction<boolean>) => {
		state.user.authenticated = action.payload;
	},
	setLogInSuccess: (state: IAuthState, action: PayloadAction<User>) => {
		state.user.uid = action.payload.uid;
		state.user.role = action.payload.role;
		state.user.email = action.payload.email;
		state.user.photo = action.payload.photo;
		state.user.user_name = action.payload.user_name;
		state.user.authenticating = action.payload.authenticating;
		state.user.authenticated = action.payload.authenticated;
		state.user.isGuest = action.payload.isGuest;
		state.user.error = action.payload.error;
		state.user.loaded = action.payload.loaded;
	},
	setLogInFaliure: (state: IAuthState, action: PayloadAction<string>) => {
		state.user.authenticating = false;
		state.user.isGuest = false;
		state.authError = action.payload
	},
	setLogoutSuccess: (state: IAuthState) => {
		state = initialState;
	},
	setLogoutFailure: (state: IAuthState, action: PayloadAction<string>) => {
		// state.user.error = action.payload
		state.user.authenticating = false;
		state.user.isGuest = false;
	},
	setAuthFailure: (state: IAuthState, action: PayloadAction<string>) => {
		// state.user.isGuest = false;
		state.user.errorMessage = action.payload;
	},
	setIsGuest: (state: IAuthState, action: PayloadAction<boolean>) => {
		state.user.authenticating = false;
		state.user.authenticated = false;
		state.user.role = UserRole.GUEST;
		state.user.isGuest = action.payload;
	},
	setCurrentRole: (state: IAuthState, action: PayloadAction<UserRole>) => {
		state.user.role = action.payload;
	},
	setFaliure: (state: IAuthState, action: PayloadAction<boolean>) => {
		state.user.error = action.payload;
	},
	setUserBlocked: (state: IAuthState, action: PayloadAction<boolean>) => {
		state.user.blocked = action.payload;
	},
}