import {User} from '../../user/types'

export interface UserData {
	lastDoc: any | null,
	users: User[]
}

export interface IAdminState {
	loadingUsers: boolean;
	usersLoaded: boolean;
	users: UserData,
	filterableUsers: UserData,
};