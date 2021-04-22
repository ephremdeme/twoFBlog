import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers'
import selectors from './selectors'

export interface IAppState {
	appTheme: boolean;
	profileMenu: boolean;
}

const initialState: IAppState = {
	appTheme: false,
	profileMenu: localStorage.getItem("theme") == "dark"
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers
})

export const { toggleTheme, setProfileMenu } = appSlice.actions;
export const { getAppTheme, getProfileMenu } = selectors;

export default appSlice.reducer