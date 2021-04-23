import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers'
import selectors from './selectors'

export interface IGlobalLoader {
	loading: boolean;
	msg: string;
}

export interface IAppState {
	appTheme: boolean;
	profileMenu: boolean;
	globalLoading: IGlobalLoader
}

const initialState: IAppState = {
	appTheme: false,
	profileMenu: localStorage.getItem("theme") == "dark",
	globalLoading: {
		loading: false,
		msg: "Loading Please Wait...."
	}
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers
})

export const { toggleTheme, setProfileMenu, setGlobalLoader } = appSlice.actions;
export const { getAppTheme, getProfileMenu, getGlobalLoading } = selectors;

export default appSlice.reducer