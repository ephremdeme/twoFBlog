import { IAdminState } from "./types";

export const initialState: IAdminState = {
	loadingUsers: false,
	usersLoaded: false,
	users: [],
	filterableUsers: [],
	lastUserDoc: null
};