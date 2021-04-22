import { createSlice } from '@reduxjs/toolkit';
import { User, UserRole } from './types/index';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import firebase, { provider } from '../../firebase/firebase';
import Cookies from 'js-cookie';


const initialState: User = {
	uid: '',
	role: Cookies.get('user')
		? JSON.parse(`${Cookies.get('user')}`).role
		: UserRole.GUEST,
	email: '',
	photo: '',
	user_name: '',
	authenticating: false,
	authenticated: false,
	isGuest: true,
	error: false,
	loaded: false
};

const authSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setLoginInProgress: (state: User, action: PayloadAction<boolean>) => {
			state.authenticating = action.payload;
		},
		setLoggedIn: (state: User, action: PayloadAction<boolean>) => {
			state.authenticated = action.payload;
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
			state.loaded = action.payload.loaded;
		},
		setLogInFaliure: (state: User, action: PayloadAction<string>) => {
			state.authenticating = false;
			state.isGuest = false;
			// state.error = action.payload
		},
		setLogoutSuccess: (state: User) => {
			state = initialState;
		},
		setLogoutFailure: (state: User, action: PayloadAction<string>) => {
			// state.error = action.payload
			state.authenticating = false;
			state.isGuest = false;
		},
		setAuthFailure: (state: User, action: PayloadAction<string>) => {
			// state.isGuest = false;
			state.errorMessage = action.payload;
		},
		setIsGuest: (state: User, action: PayloadAction<boolean>) => {
			state.authenticating = false;
			state.authenticated = false;
			state.role = UserRole.GUEST;
			state.isGuest = action.payload;
		},
		setCurrentRole: (state: User, action: PayloadAction<UserRole>) => {
			state.role = action.payload;
		},
		setFaliure: (state: User, action: PayloadAction<boolean>) => {
			state.error = action.payload;
		},
	},
});

export const {
	setLoginInProgress,
	setAuthFailure,
	setLogInSuccess,
	setLogInFaliure,
	setLogoutSuccess,
	setLogoutFailure,
	setIsGuest,
	setLoggedIn,
	setCurrentRole,
	setFaliure,
} = authSlice.actions;

export const singUpWithProvider = (): AppThunk => async (dispatch) => {
	try {
		const authenticate = firebase.auth();
		const db = firebase.firestore();
		const responce: any = await authenticate
			.signInWithPopup(provider)
			.catch((e) => {
				dispatch(setLogInFaliure(e.message));
				console.log('Error');
			});
		const user: any = await db
			.collection('users')
			.doc(responce.user?.uid)
			.get();
		if (user.exists) {
			const localUser = {
				email: user.data().email,
				user_name: user.data().user_name,
				photo: user.data().photo,
				uid: user.data().uid,
				role: user.data().role,
			};
			db.collection('users')
				.doc(responce.user?.uid)
				.update({
					isOnline: true,
				})
				.then(() => {
					dispatch(
						setLogInSuccess({
							...localUser,
							authenticating: false,
							authenticated: true,
							isGuest: false,
							error: false,
							loaded: true
						})
					);
					Cookies.set('user', {
						...localUser,
						authenticating: false,
						authenticated: true,
						isGuest: false,
						error: false,
						loaded: true
					});
				});
		} else {
			await db
				.collection('users')
				.doc(responce.user?.uid)
				.set({
					email: responce.user?.email,
					user_name: responce.user?.displayName,
					photo: responce.user?.photoURL,
					isOnline: true,
					uid: responce.user?.uid,
					role: UserRole.USER,
					last_send: new Date(),
					typing: {
						isTyping: false,
						isTypingTo: ""
					}
				})
				.then(
					async (_) => {
						const new_user: any = await db
							.collection('users')
							.doc(responce.user?.uid)
							.get();
						const localUser = {
							email: new_user.data().email,
							user_name: new_user.data().user_name,
							photo: new_user.data().photo,
							uid: new_user.data().uid,
							role: new_user.data().role,
						};
						dispatch(
							setLogInSuccess({
								...localUser,
								authenticating: false,
								authenticated: true,
								isGuest: false,
								error: false,
								loaded: true,
							})
						);
					},
					(err) => {
						console.log('here is error', err.t, err.message);
						dispatch(setAuthFailure(err.message));
						return;
					}
				);
		}
		const current = authenticate.currentUser;
		console.log(current);
	} catch (e) { }
};

export const createUserWithEmailPassword = (user: any): AppThunk => async (
	dispatch
) => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	auth.createUserWithEmailAndPassword(user.email, user.password).then(
		(_) => {
			db.collection('users').doc(_.user?.uid).set({
				email: _.user?.email,
				user_name: user.name,
				photo:
					'https://firebasestorage.googleapis.com/v0/b/cooomerce.appspot.com/o/avatar.png?alt=media',
				isOnline: true,
				uid: _.user?.uid,
				role: UserRole.USER,
				last_send: new Date(),
				typing: {
					isTyping: false,
					isTypingTo: ""
				}
			});
			const current_user: any = {
				uid: _.user?.uid,
				role: UserRole.USER,
				email: user.email,
				photo:
					'https://firebasestorage.googleapis.com/v0/b/cooomerce.appspot.com/o/avatar.png?alt=media',
				user_name: user.name,
			};
			dispatch(
				setLogInSuccess({
					...current_user,
					authenticating: false,
					authenticated: true,
					isGuest: false,
					error: false,
					loaded: true
				})
			);
		},
		(err) => {
			console.log('here is error', err.t, err.message);
			dispatch(setFaliure(true));
			dispatch(setLoginInProgress(false))
			dispatch(setAuthFailure(err.message));
			return;
		}
	);
};


export const createUserWithEmailPasswordAdmin = (user: any, userRole: string): AppThunk => async (
	dispatch
) => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	auth.createUserWithEmailAndPassword(user.email, user.password).then(
		(_) => {
			db.collection('users').doc(_.user?.uid).set({
				email: _.user?.email,
				user_name: user.name,
				photo:
					'https://firebasestorage.googleapis.com/v0/b/cooomerce.appspot.com/o/avatar.png?alt=media',
				isOnline: true,
				uid: _.user?.uid,
				role: userRole,
				last_send: new Date(),
				typing: {
					isTyping: false,
					isTypingTo: ""
				}
			});
			const current_user: any = {
				uid: _.user?.uid,
				role: userRole,
				email: user.email,
				photo:
					'https://firebasestorage.googleapis.com/v0/b/cooomerce.appspot.com/o/avatar.png?alt=media',
				user_name: user.name,
			};
			dispatch(
				setLogInSuccess({
					...current_user,
					authenticating: false,
					authenticated: true,
					isGuest: false,
					error: false,
					loaded: true
				})
			);
		},
		(err) => {
			dispatch(setFaliure(true));
			dispatch(setLoginInProgress(false))
			dispatch(setAuthFailure(err.message));
			return;
		}
	);
};


export const signInWithEmailPassword = (user: any): AppThunk => async (
	dispatch
) => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	auth.signInWithEmailAndPassword(user.email, user.password).then((_) => {
		db.collection('users')
			.doc(_.user?.uid)
			.get()
			.then(
				(_: any) => {
					const current_user: any = {
						uid: _.data().uid,
						role: _.data().role,
						email: _.data().email,
						photo: _.data().photo,
						user_name: _.data().user_name,
					};
					dispatch(
						setLogInSuccess({
							...current_user,
							authenticating: false,
							authenticated: true,
							isGuest: false,
							error: false,
							loaded: true
						})
					);
					Cookies.set('user', {
						...current_user,
						authenticating: false,
						authenticated: true,
						isGuest: false,
						error: false,
					});
				},
				(err) => {
					console.log('here is error', err.t, err.message);
					dispatch(setFaliure(true));
					dispatch(setLoginInProgress(false))
					dispatch(setAuthFailure(err.message));
					return;
				}
			);
	});
};

export const logoutUser = (uid: string): AppThunk => {
	return async (dispatch, getState) => {
		const auth = firebase.auth();
		const db = firebase.firestore();
		dispatch(setLoginInProgress(true));
		db
			.collection('users')
			.doc(uid)
			.update({
				isOnline: false
			})
			.then(
				(_) => {
					auth.signOut().then((_) => {
						dispatch(setLoginInProgress(false));
						dispatch(setLogoutSuccess());
						localStorage.clear();
					});
				},
				(err) => {
					dispatch(setFaliure(true));
					dispatch(setLoginInProgress(false));
					dispatch(setAuthFailure(err.message));
					return;
				}
			)
			.catch((e) => dispatch(setLogoutFailure(e.message)));
	};
};

export const isLoggedIn = (): AppThunk => async (dispatch, getState) => {
	dispatch(setLoginInProgress(true));
	dispatch(setFaliure(false));
	const auth = firebase.auth();
	const db = firebase.firestore();
	auth.onAuthStateChanged((user: any) => {
		if (user) {
			if (user.isAnonymous === false) {
				db.collection('users')
					.doc(user.uid)
					.update({
						isOnline: true,
					})
					.then((_) => {
						db.collection('users')
							.doc(user.uid)
							.get()
							.then((_: any) => {
								const current_user: any = {
									uid: _.data().uid,
									role: _.data().role,
									email: _.data().email,
									photo: _.data().photo,
									user_name: _.data().user_name,
								};
								dispatch(setLoginInProgress(false));
								dispatch(
									setLogInSuccess({
										...current_user,
										authenticating: false,
										authenticated: true,
										isGuest: false,
										error: false,
										loaded: true
									})
								);
								Cookies.set('user', {
									...current_user,
									authenticating: false,
									authenticated: true,
									isGuest: false,
									error: false,
									loaded: true
								});
							});
					}).catch(err => {
						dispatch(setFaliure(true))
						dispatch(setLoginInProgress(false));
					});
			} else {
				const current_guest = {
					uid: user.uid,
					isGuest: true,
					authenticating: false,
					authenticated: false,
					error: false,
					role: UserRole.GUEST,
					photo: '',
					user_name: 'Guest',
					email: '',
					loaded: true
				};
				dispatch(setLoginInProgress(false));
				dispatch(setLogInSuccess({ ...current_guest }));
				Cookies.set('user', { ...current_guest });
			}
		} else {
			dispatch(signAsGuest());
		}
	});
};

export const isPrivate = (): AppThunk => async (dispatch) => {
	const auth = firebase.auth();
	dispatch(setLoginInProgress(true));
	auth.onAuthStateChanged((user: any) => {
		if (user) {
			dispatch(setLoginInProgress(false));
			dispatch(setLoggedIn(true));
		}
		dispatch(setLoginInProgress(false));
	});
};

export const signAsGuest = (): AppThunk => async (dispatch) => {
	const auth = firebase.auth();
	try {
		const guest = await auth
			.signInAnonymously()
			.then((_: any) => {
				const current_guest = {
					uid: _.user?.uid,
					isGuest: true,
					authenticating: false,
					authenticated: false,
					error: false,
					role: UserRole.GUEST,
					photo: '',
					user_name: 'Guest',
					email: '',
					loaded: true
				};
				dispatch(setLoginInProgress(false));
				dispatch(setLogInSuccess({ ...current_guest }));
				Cookies.set('user', { ...current_guest });
			})
			.catch((e) => {
				console.log('ERROR...');
				dispatch(setFaliure(true));
				dispatch(setLoginInProgress(false));
			});
	} catch (e) {
		console.log(e.code);
		console.log(e.message);
		dispatch(setLoginInProgress(false));
		dispatch(setFaliure(true));
	}
};

export default authSlice.reducer;
