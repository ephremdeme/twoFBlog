import { PayloadAction } from "@reduxjs/toolkit";
import { IAppState } from './index'

export default {
	setLogged: (state: IAppState, action: PayloadAction<boolean>) => {
		state.logged = action.payload;
	},
	setRole: (state: IAppState, action: PayloadAction<string>) => {
		state.role = action.payload
	},
	setEmail: (state: IAppState, action: PayloadAction<string>) => {
		state.email = action.payload
	}	
}