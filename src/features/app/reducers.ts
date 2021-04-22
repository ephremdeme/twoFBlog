import { PayloadAction } from "@reduxjs/toolkit";
import { persistTheme } from "utils/localStorage";
import { IAppState } from './index'

export default {
	toggleTheme: (state: IAppState, action: PayloadAction<boolean>) => {
		state.appTheme = !action.payload;
		persistTheme(!action.payload ? 'dark' : 'light')
	},
	setProfileMenu: (state: IAppState, action: PayloadAction<boolean>) => {
		state.profileMenu = action.payload;
	}
}