import {configureStore, ThunkAction, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import editorReducer from '../features/editor';
import productReducer from '../features/product';
import appReducer from '../features/app';
import userReducer from '../features/user';
import authReducer from '../features/auth';
import {
	getFirebase,
	actionTypes as rrfActionTypes
  } from 'react-redux-firebase'
  import { constants as rfConstants } from 'redux-firestore'

export const store = configureStore({
	reducer: {
		app: appReducer,
		editor: editorReducer,
		product: productReducer,
		user: userReducer,
		auth: authReducer,
	},
	middleware: getDefaultMiddleware =>
	getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [
			  // just ignore every redux-firebase and react-redux-firebase action type
			  ...Object.keys(rfConstants.actionTypes).map(
				type => `${rfConstants.actionsPrefix}/${type}`
			  ),
			  ...Object.keys(rrfActionTypes).map(
				type => `@@reactReduxFirebase/${type}`
			  )
			],
			ignoredPaths: ['firebase', 'firestore']
		  },
		thunk:{
			extraArgument:{
				getFirebase
			}
		}
	})
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export type AppDispatch = typeof store.dispatch;
