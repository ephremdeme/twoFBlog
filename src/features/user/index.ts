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
export interface IAppState {
	logged: boolean;
	role: string;
	email: string;
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

export const { setLogged, setRole, setEmail } = userSlice.actions;
export const { getLogged, getRole, getEmail } = selectors;


export default userSlice.reducer;
