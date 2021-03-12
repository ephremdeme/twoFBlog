import { PayloadAction } from "@reduxjs/toolkit";
import { IAppState } from './index'

export default {
	toggleTheme: (state: IAppState, action: PayloadAction<boolean>) => {
		state.appTheme = !action.payload;
	}	
}