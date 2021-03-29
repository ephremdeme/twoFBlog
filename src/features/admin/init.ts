import { IAdminState } from "./types";

export const initialState: IAdminState = {
	loadingUsers: false,
	usersLoaded: false,
	users: {
		lastDoc: null,
		users: []
	},
	filterableUsers: {
		lastDoc: null,
		users: []
	},
};