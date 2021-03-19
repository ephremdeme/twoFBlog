import { createSlice, getDefaultMiddleware, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, IUsers, User, UserRole } from "./types/index";
import { AppThunk } from 'app/store';
import firebase, { provider } from '../../firebase/firebase';
import { array } from 'prop-types';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { object, list } from 'rxfire/database';
import { map } from 'rxjs/operators';
import Cookies from 'js-cookie';


const initialState: IUsers = {
	users: [],
	conversations: [],
	users_admin: [],
	conversations_admin: [],
	test: []
};

interface Iuser {
	uid: string;
	view: number;
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setTest: (state: any, action: PayloadAction<any[]>) => {
			state.test = action.payload;
		},
		setRefreshUser: (state: IUsers) => {
			console.log('Dispatched...')
			state.users = initialState.users;
		},
		setGetRealTimeUser: (state: IUsers, action: PayloadAction<User[]>) => {
			state.users.push(...action.payload)
		},
		setGetRealTimeMessage: (state: IUsers, action: PayloadAction<Conversation[]>) => {
			state.conversations.push(...action.payload)
		},
		setClearRealTimeMessage: (state: IUsers) => {
			state.conversations = initialState.conversations;
		},
		// ------------------------------------------------
		setRefreshUser_admin: (state: IUsers) => {
			console.log('Dispatched...')
			state.users_admin = initialState.users_admin;
		},
		setGetRealTimeUser_admin: (state: IUsers, action: PayloadAction<User[]>) => {
			state.users_admin.push(...action.payload)
		},
		setGetRealTimeMessage_admin: (state: IUsers, action: PayloadAction<Conversation[]>) => {
			state.conversations_admin.push(...action.payload)
		},
		setClearRealTimeMessage_admin: (state: IUsers) => {
			state.conversations_admin = initialState.conversations_admin;
		},
		setGetUser_admin: (state: IUsers, action: PayloadAction<Iuser>) => {
			state.users_admin.forEach((user) => {
				if (user.uid === action.payload.uid)
					user.view = action.payload.view
			})
		},
		//  --------------------------------------------------
		setGetUser: (state: IUsers, action: PayloadAction<Iuser>) => {
			state.users.forEach((user) => {
				if (user.uid === action.payload.uid)
					user.view = action.payload.view
			})
		}
	}
});

export const { setTest, setGetRealTimeUser, setGetRealTimeMessage, setRefreshUser, setClearRealTimeMessage, setGetRealTimeUser_admin, setGetRealTimeMessage_admin, setRefreshUser_admin, setClearRealTimeMessage_admin, setGetUser, setGetUser_admin } = userSlice.actions;

export const getRealTimeUser = (uid: string): AppThunk => async dispatch => {
	const db = firebase.firestore();
	const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
		const user: User[] | any = [];
		querySnapshot.forEach((doc) => {
			if (doc.data().uid !== uid && doc.data().role === UserRole.USER) {
				user.push({ ...doc.data(), view: 0 })
			}
		})
		dispatch(setRefreshUser())
		dispatch(setGetRealTimeUser(user))
		dispatch(getRealTimeMessageView(uid));
	})
	return unsubscribe;
}

export const getSupportUser = (uid: string): AppThunk => async dispatch => {
	const realtime_db = firebase.database();
	realtime_db.ref("convserations").on('value', (onSnapshot) => {
		const user: any[] = [];
		if (onSnapshot.exists()) {
			onSnapshot.forEach(message => {
				if (message.val().user_uid_2 === uid) {
					user.push(message.val().user_uid_1)
				}
			})
			const rmv_duplicate = user.filter((item, index) => {
				return user.indexOf(item) === index
			})
			dispatch(getUserFromCloud(rmv_duplicate, uid));
		}
	})
}

export const getUserFromCloud = (allUser: any[], current_uid: string): AppThunk => async dispatch => {
	const db = firebase.firestore();
	const users_list: any = [];
	let done = false;
	console.log('go', allUser)
	allUser.forEach((uid: any, index: number) => {
		db.collection("users").doc(uid).get().then(user => {
			if (user.exists) {
				users_list.push({ ...user.data(), view: 0 });
			} else {
				console.log('!Exsist')
				const guest_user = {
					uid: uid,
					role: UserRole.GUEST,
					email: "temporary@guest.com",
					photo: 'https://lh4.googleusercontent.com/-djFaMA_PnyA/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnO6peXlTzU6r1flAVs2tlgjoEl1Q/s96-c/photo.jpg',
					user_name: 'Guest User',
					isOnline: false,
					view: 0,
				}
				users_list.push(guest_user)
			}
		}).then(_ => {
			if (index === allUser.length - 1) {
				console.log(users_list);
				dispatch(setRefreshUser_admin())
				dispatch(setGetRealTimeUser_admin(users_list))
				dispatch(getRealTimeMessageView(current_uid));
			}
		})
	})

}

export const getRealTimeUser_Customer_Service = (uid: string): AppThunk => async dispatch => {
	const db = firebase.firestore();
	const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
		const user: User[] | any = [];
		querySnapshot.forEach((doc) => {
			if (doc.data().uid !== uid && doc.data().role === UserRole.CUSTOMER_SERVICE && doc.data().isOnline === true) {
				user.push({ ...doc.data(), view: 0 })
			}
		})
		dispatch(setRefreshUser())
		dispatch(setGetRealTimeUser(user))
		// dispatch(getRealTimeMessageView(uid));
	})

	return unsubscribe;
}

export const sendRealTimeMessage = (conversation: Conversation): AppThunk => async dispatch => {
	const db = firebase.database();
	console.log(conversation.createdAt)
	const message = {
		createdAt: Date(),
		message: conversation.message,
		user_uid_1: conversation.user_uid_1,
		user_uid_2: conversation.user_uid_2,
		isView: conversation.isView,
		from: UserRole.CUSTOMER_SERVICE
	}
	db.ref('convserations').push()
		.set({
			createdAt: Date(),
			message: conversation.message,
			user_uid_1: conversation.user_uid_1,
			user_uid_2: conversation.user_uid_2,
			isView: conversation.isView,
			from: UserRole.CUSTOMER_SERVICE
		})
		.then(_ => console.log('[DONE]', _))
		.catch(err => console.log(err.message))
}

export const sendRealTimeUserMessage = (conversation: any): AppThunk => async dispatch => {
	const real_time = firebase.database();
	const db = firebase.firestore();
	db.collection("users").where("role", "==", UserRole.CUSTOMER_SERVICE).get()
		.then(users => {
			const onlineUsers: any = [];
			const allUsers_id: string[] = [];
			let counter = 0;
			users.forEach(user => {
				if (user.data().isOnline) {
					onlineUsers.push(user.data().uid)
				}
				allUsers_id.push(user.data().uid)
				counter++;
			})
			let reciver;
			if (Cookies.get('reciver')) {
				reciver = Cookies.get('reciver')
			}
			else if (onlineUsers.length > 0 && (Cookies.get('reciver') === undefined)) {
				const rand = Math.floor((Math.random() * onlineUsers.length) + 0)
				reciver = onlineUsers[rand];
				Cookies.set('reciver', reciver);
			} else if ((onlineUsers.length === 0) && (Cookies.get('reciver') === undefined) && (allUsers_id.length > 0)) {
				const rand = Math.floor((Math.random() * counter) + 0);
				reciver = allUsers_id[rand];
				Cookies.set('reciver', reciver);
			}
			if (allUsers_id.length > 0) {
				real_time.ref('convserations').push().set({
					createdAt: Date(),
					message: conversation.message,
					user_uid_1: conversation.user_uid_1,
					user_uid_2: onlineUsers[0],
					isView: conversation.isView,
					from: UserRole.USER
				}).then(_ => console.log('[DONE]', _))
					.catch(err => console.log(err.message))
			}

		})
}

export const updateViewStatus = (users: any[], uid: string): AppThunk => async dispatch => {
	const db = firebase.database();
	const current = users.filter((item) => {
		return item.user_uid_2 === uid
	})
	current.forEach((user) => {
		db.ref("convserations").child(`${user._key}`).update({
			isView: true
		})
	})

}

export const getRealTimeMessageView = (uid: string): AppThunk => async (dispatch, getState) => {
	const users = getState().user.users_admin;
	let u = [...users];
	const db = firebase.database();
	db.ref("convserations").orderByChild('createdAt').on('value', (snapshot) => {
		let views = 0;
		if (snapshot.exists()) {
			u.map(user => {
				snapshot.forEach((message) => {
					if (message.val().user_uid_1 === user.uid && message.val().user_uid_2 === uid && message.val().isView === false) {
						views++;
					}
				})
				dispatch(setGetUser_admin({ uid: user.uid, view: views }))
				views = 0;
			})
		}
	})
}

export const fetchMessage = (uid_1: string, uid_2: string): AppThunk => async (dispatch) => {
	const ref = firebase.database().ref("convserations");
	list(ref)
		.pipe(
			map((changes: any) => changes.map((c: any) => {
				return { _key: c.snapshot.key, event: c.event, ...c.snapshot.val() }
			})
			))
		.subscribe((data: any[]) => {
			const filtered = data.filter((item) => {
				return item.user_uid_1 === uid_1 && item.user_uid_2 === uid_2 && item.from === UserRole.CUSTOMER_SERVICE ||
					item.user_uid_1 === uid_2 && item.user_uid_2 === uid_1 && item.from === UserRole.USER
			})
			dispatch(updateViewStatus(filtered, uid_1))
			dispatch(setClearRealTimeMessage_admin());
			dispatch(setGetRealTimeMessage_admin(filtered))
		})
}

export const fetchMessage_user = (uid_1: string): AppThunk => async (dispatch) => {
	const ref = firebase.database().ref("convserations");
	list(ref)
		.pipe(
			map((changes: any) => changes.map((c: any) => {
				return { _key: c.snapshot.key, event: c.event, ...c.snapshot.val() }
			})
			))
		.subscribe((data: any[]) => {
			const filtered = data.filter((item) => {
				return (item.user_uid_1 === uid_1 || item.user_uid_2 === uid_1) &&
					(item.from === UserRole.CUSTOMER_SERVICE || item.from === UserRole.USER)
			})
			dispatch(setClearRealTimeMessage());
			dispatch(setGetRealTimeMessage(filtered))
		})
}

export default userSlice.reducer;
