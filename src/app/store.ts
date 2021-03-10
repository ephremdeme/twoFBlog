import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import editorReducer from '../features/editor';
import productReducer from '../features/product';
import appReducer from '../features/app';
import userReducer from '../features/user';

export const store = configureStore({
	reducer: {
		app: appReducer,
		editor: editorReducer,
		product: productReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export type AppDispatch = typeof store.dispatch;
