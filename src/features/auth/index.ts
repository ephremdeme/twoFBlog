import { createSlice } from '@reduxjs/toolkit';
import { User, UserRole } from "./types/index";
import { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import fb from 'firebase';
import firebase, { provider } from '../../firebase/firebase';


const initialState: User = {
	uid: "",
	role: UserRole.GUEST,
	email: "",
	photo: "",
	user_name: "",
	authenticating: false,
	authenticated: false,
	isGuest: false,
	error: ""
}

const authSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setLoginInProgress: (state: User, action: PayloadAction<boolean>) => {
			state.authenticating = action.payload
		},
		setLoggedIn: (state: User, action: PayloadAction<boolean>) => {
			state.authenticated = action.payload
		},
		setLogInSuccess: (state: User, action: PayloadAction<User>) => {
			state.uid = action.payload.uid;
			state.role = action.payload.role;
			state.email = action.payload.email;
			state.photo = action.payload.photo;
			state.user_name = action.payload.user_name;
			state.authenticating = action.payload.authenticating;
			state.authenticated = action.payload.authenticated;
			state.isGuest = action.payload.isGuest;
			state.error = action.payload.error;
		},
		setLogInFaliure: (state: User, action: PayloadAction<string>) => {
			state.authenticating = false
			state.isGuest = false;
			state.error = action.payload
		},
		setLogoutSuccess: (state: User) => {
			state = initialState
		},
		setLogoutFailure: (state: User, action: PayloadAction<string>) => {
			state.error = action.payload
			state.authenticating = false
			state.isGuest = false;
		},
		setIsGuest: (state: User, action: PayloadAction<string>) => {
			state.isGuest = true;
		}
	}
});

export const { setLoginInProgress, setLogInSuccess, setLogInFaliure, setLogoutSuccess, setLogoutFailure, setIsGuest, setLoggedIn } = authSlice.actions;

export const signupUser = (): AppThunk => async (dispatch) => {
	try {
		dispatch(setLoginInProgress(true));
		const authenticate = firebase.getInstance().auth;
		const db = firebase.getInstance().db;
		console.log('Proceeding')
		const responce = await authenticate.signInWithPopup(provider)
		const user: any = await db.collection("users").doc(responce.user?.uid).get();
		if (user.exists) {
			console.log('Proceeding2')
			const localUser = {
				email: user.data().email,
				user_name: user.data().user_name,
				photo: user.data().photo,
				uid: user.data().uid,
				role: user.data().role
			}
			localStorage.setItem('user', JSON.stringify(localUser))
			dispatch(setLogInSuccess({ ...localUser, authenticating: false, authenticated: true, isGuest: false, error: "" }))
		}
		else {
			await db.collection("users").doc(responce.user?.uid).set({
				email: responce.user?.email,
				user_name: responce.user?.displayName,
				photo: responce.user?.photoURL,
				isOnline: true,
				uid: responce.user?.uid,
				role: UserRole.USER
			}).then(async _ => {
				const new_user: any = await db.collection("users").doc(responce.user?.uid).get();
				const localUser = {
					email: new_user.data().email,
					user_name: new_user.data().user_name,
					photo: new_user.data().photo,
					uid: new_user.data().uid,
					role: new_user.data().role
				}
				localStorage.setItem('user', JSON.stringify({ localUser }))
				dispatch(setLogInSuccess({ ...localUser, authenticating: false, authenticated: true, isGuest: false, error: "" }))
			})
		}
	} catch (e) {
		setLogInFaliure(e.message)
	}
}

export const logoutUser = (uid: string, isGuest: boolean): AppThunk => {

	return async (dispatch) => {
		const auth = firebase.getInstance().auth;
		const db = firebase.getInstance().db;
		// if (isGuest) {
		// 	return await auth.signOut().then(_ => {
		// 		localStorage.clear();
		// 		dispatch(setLogoutSuccess())
		// 	}).catch(e => dispatch(setLogoutFailure(e.message)))
		// }
		const logout = db.collection("users").doc(uid).update({
			isOnline: false
		}).then(_ => {
			auth.signOut().then(_ => {
				localStorage.clear();
				dispatch(setLogoutSuccess())
				window.location.href = window.location.href;
			})
		}).catch(e => dispatch(setLogoutFailure(e.message)))

		return logout

	}
}

export const isLoggedIn = (): AppThunk => async (dispatch) => {
	const auth = firebase.getInstance().auth;
	auth.onAuthStateChanged((user: any) => {
		if (user) {
			const current_user: any = {
				uid: user.uid,
				role: UserRole.GUEST,
				email: user.email,
				photo: user.email,
				user_name: user.displayName
			}
			dispatch(setLogInSuccess({ ...current_user, authenticating: false, authenticated: true, isGuest: false, error: "" }))
		} else {
			// No user is signed in.
			console.log('[USER NOT FOUND]')
			dispatch(setLogInFaliure("Log in"))
		}
	});
}

export const isPrivate = (): AppThunk => async (dispatch) => {
	const auth = firebase.getInstance().auth;
	dispatch(setLoginInProgress(true));
	auth.onAuthStateChanged((user: any) => {
		if (user) {
			dispatch(setLoginInProgress(false));
			dispatch(setLoggedIn(true));
			
		}
		dispatch(setLoginInProgress(false));
	});
}

export const signAsGuest = (): AppThunk => async (dispatch) => {
	const auth = firebase.getInstance().auth;
	const guest = await auth.signInAnonymously();
	const localUser = {
		uid: guest.user?.uid
	}
	localStorage.setItem('user', JSON.stringify(localUser))
	dispatch(setIsGuest(guest.user?.uid || ''))
}

export default authSlice.reducer;
