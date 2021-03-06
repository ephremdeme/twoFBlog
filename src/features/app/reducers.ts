import { PayloadAction } from "@reduxjs/toolkit";
import { IAppState } from './index'

export default {
	setTheme: (state: IAppState, action: PayloadAction<boolean>) => {
		state.appTheme = action.payload;
	}	
}