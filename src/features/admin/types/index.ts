import {User} from '../../user/types'

export interface IAdminState {
	loadingUsers: boolean;
	usersLoaded: boolean;
	users: User[],
	filterableUsers: User[],
};