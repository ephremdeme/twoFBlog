import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers'
import selectors from './selectors'

export interface IAppState {
	appTheme: boolean;
}

const initialState: IAppState = {
	appTheme: false
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers
})

export const { setTheme } = appSlice.actions;
export const { getAppTheme } = selectors;

export default appSlice.reducer