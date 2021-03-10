import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers'
import selectors from './selectors'

export interface IAppState {
	logged: boolean,
	role: string,
	email: string
}

const initialState: IAppState = {
	logged: false,
	role: "guest",
	email: "",
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers
})

export const { setLogged, setRole, setEmail } = userSlice.actions;
export const { getLogged } = selectors;

export default userSlice.reducer