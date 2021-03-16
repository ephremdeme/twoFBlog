import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, IUsers, User } from "./types/index";
import { AppThunk } from 'app/store';
import firebase, { provider } from '../../firebase/firebase';


const initialState: IUsers = {
	users: [],
	conversations: []
};

interface Iuser {
	uid: string;
	view: number;
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
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
		setGetUser: (state: IUsers, action: PayloadAction<Iuser>) => {
			state.users.forEach((user)=>{
				if(user.uid === action.payload.uid)
					user.view = action.payload.view
			})
		}
	}
});

export const { setGetRealTimeUser, setGetRealTimeMessage, setRefreshUser, setClearRealTimeMessage, setGetUser } = userSlice.actions;

export const getRealTimeUser = (uid: string): AppThunk => async dispatch => {
	const db = firebase.getInstance().db;
	const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
		const user: User[] | any = [];
		querySnapshot.forEach((doc) => {
			if (doc.data().uid !== uid) {
				user.push({ ...doc.data(), view: 0 })
			}
		})
		dispatch(setRefreshUser())
		dispatch(setGetRealTimeUser(user))
		dispatch(getRealTimeMessageView(uid));
	})

	return unsubscribe;
}

export const sendRealTimeMessage = (conversation: Conversation): AppThunk => async dispatch => {
	const db = firebase.getInstance().database;
	console.log(conversation.createdAt)
	db.ref('convserations').push().set({
		createdAt: Date(),
		message: conversation.message,
		user_uid_1: conversation.user_uid_1,
		user_uid_2: conversation.user_uid_2,
		isView: conversation.isView,
	}).then(_ => console.log('[DONE]', _))
		.catch(err => console.log(err.message))
}

export const getRealTimeMessage = (user: any): AppThunk => async dispatch => {
	const db = firebase.getInstance().database;
	dispatch(setClearRealTimeMessage());
	db.ref("convserations").orderByChild('createdAt').on('value', (snapshot) => {
		const conversations: Conversation[] | any = [];
		if (snapshot.exists()) {
			snapshot.forEach((message) => {
				if (
					(message.val().user_uid_1 === user.uid_1 && message.val().user_uid_2 === user.uid_2)
					||
					(message.val().user_uid_1 === user.uid_2 && message.val().user_uid_2 === user.uid_1)
				) {
					conversations.push(message.val())
					if(message.val().user_uid_2 === user.uid_1)
					dispatch(updateViewStatus(`${message.key}`));
				}
				if (conversations.length > 0) {
					console.log('[UR CONVOS]', conversations)
					dispatch(setClearRealTimeMessage());
					dispatch(setGetRealTimeMessage(conversations))
				} else {
				}
			})
		} else {
			// console.log('[No conversation avialable]')
		}
	})
}

export const updateViewStatus = (key: string): AppThunk => async dispatch =>{
	const db = firebase.getInstance().database;
	db.ref("convserations").child(`${key}`).update({
		isView: true
	})
}

export const getRealTimeMessageView = (uid: string): AppThunk => async (dispatch, getState) => {
	const users = getState().user.users;
	let u = [...users];
	const db = firebase.getInstance().database;
	console.log(u)
	db.ref("convserations").orderByChild('createdAt').on('value', (snapshot) => {
		let views = 0;
		if (snapshot.exists()) {
			u.map(user => {
				console.log('1::')
				snapshot.forEach((message) => {
					if (message.val().user_uid_1 === user.uid && message.val().user_uid_2 === uid && message.val().isView === false) {
						views++;
					}
				})
				dispatch(setGetUser({uid: user.uid, view: views}))
				views = 0;
			})
		}
	})
}

export default userSlice.reducer;
