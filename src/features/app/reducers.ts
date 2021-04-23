import { PayloadAction } from "@reduxjs/toolkit";
import { persistTheme } from "utils/localStorage";
import { IAppState, IGlobalLoader } from './index'

export default {
	toggleTheme: (state: IAppState, action: PayloadAction<boolean>) => {
		state.appTheme = !action.payload;
		persistTheme(!action.payload ? 'dark' : 'light')
	},
	setProfileMenu: (state: IAppState, action: PayloadAction<boolean>) => {
		state.profileMenu = action.payload;
	},
	setGlobalLoader: (state: IAppState, action: PayloadAction<IGlobalLoader>) => {
		state.globalLoading = action.payload;
	},
}