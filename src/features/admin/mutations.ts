import { PayloadAction } from '@reduxjs/toolkit';
import { User } from 'features/user/types';
import { IAdminState, UserData } from './types';

export interface IFieldQuery {
	strValue?: string;
	intValue?: number;
	field?: string;
	compare?: string;
}

export default {
	setLoadingUsers: (
		state: IAdminState,
		action: PayloadAction<boolean>
	) => {
		if (action.payload == false && !state.usersLoaded)
			state.usersLoaded = true;
		state.loadingUsers = action.payload;
	},
	setUsers: (state: IAdminState, action: PayloadAction<UserData>) => {
		state.users = action.payload;
		state.filterableUsers = action.payload;
	}
};
