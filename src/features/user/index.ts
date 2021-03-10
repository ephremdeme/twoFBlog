import {createSlice} from '@reduxjs/toolkit';
import reducers from './reducers';
import selectors from './selectors';

export interface IAppState {
	logged: boolean;
	role: string;
	email: string;
	user: IUser;
}

export interface IUser {
	user_name: string;
	role: string;
	email: string;
	photo: string;
}

const initialState: IAppState = {
	logged: false,
	role: 'guest',
	email: '',
	user: {
		user_name: '',
		role: '',
		email: '',
		photo: '',
	},
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers,
});

export const {setLogged} = userSlice.actions;
export const {setRole} = userSlice.actions;
export const {setEmail} = userSlice.actions;
export const {getLogged} = selectors;

export default userSlice.reducer;
