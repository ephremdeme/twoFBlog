import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers'
import selectors from './selectors'

export interface IAppState {
	appTheme: boolean;
}

const initialState: IAppState = {
	appTheme: true
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers
})

export const { toggleTheme } = appSlice.actions;
export const { getAppTheme } = selectors;

export default appSlice.reducer