import { AppThunk } from 'app/store';
import firebase from '../../firebase/firebase';
import Cookies from 'js-cookie';
import { Conversation, User } from "./types/index";
import { convertTimestamp } from "convert-firebase-timestamp";
import { setGetPageView, setGetRealTimeUser, setGetRealTimeUser_admin, setGetUser_admin, setMessageView, setRefreshUser, setRefreshUser_admin, setTempo } from '.';
import { UserRole } from 'features/auth/types';

export const setGTempo = (is: boolean): AppThunk => async dispatch => {
	dispatch(setTempo(is))
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
	allUser.forEach((uid: any, index: number) => {
		db.collection("users").doc(uid).get().then(user => {
			if (user.exists) {
				users_list.push({ ...user.data(), view: 0 });
			} else {
				const guest_user = {
					uid: uid,
					role: UserRole.GUEST,
					email: "temporary@guest.com",
					photo: 'https://i.imgur.com/Yuv7QE6.png',
					user_name: 'Guest User',
					isOnline: false,
					view: 0,
					typing: {
						isTyping: false,
						isTypingTo: ""
					}
				}
				users_list.push(guest_user)
			}
		}).then(_ => {
			if (index === allUser.length - 1) {
				users_list.sort(function (a: any, b: any) {
					var keyA = new Date(Date.parse(`${convertTimestamp(a.last_send)}`)),
						keyB = new Date(Date.parse(`${convertTimestamp(b.last_send)}`));
					if (keyA > keyB) return -1;
					if (keyA < keyB) return 1;
					return 0;
				})
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
			if (doc.data().uid !== uid && (doc.data().role === UserRole.CUSTOMER_SERVICE) && doc.data().isOnline === true) {
				user.push({ ...doc.data(), view: 0 })
			}
		})
		dispatch(setRefreshUser())
		dispatch(setGetRealTimeUser(user))
		dispatch(getRealTimeMessageView_USERS(uid));
	})
	return unsubscribe;
}

export const setIsTyping = (uid: string, is: boolean): AppThunk => async dispatch => {
	if (Cookies.get('reciver')) {
		const db = firebase.firestore();
		db.collection("users").doc(uid).get()
			.then((user: any) => {
				if (user.data().typing.isTyping === false && is) {
					db.collection("users").doc(uid).update({
						typing: {
							isTyping: is,
							isTypingTo: Cookies.get('reciver')
						}
					});
				}
				else if (user.data().typing.isTyping === true && is === false) {
					db.collection("users").doc(uid).update({
						typing: {
							isTyping: is,
							isTypingTo: Cookies.get('reciver')
						}
					});
				}
			})
	}
}

export const sendRealTimeMessage = (conversation: Conversation): AppThunk => async dispatch => {
	const db = firebase.database();
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
	Cookies.remove('reciver')
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
			// console.log('object', Cookies.get('reciver'))
			if (allUsers_id.length > 0) {
				const date = new Date()
				db.collection("users").doc(conversation.user_uid_1).update({
					last_send: date
				}).then(() => {
					real_time.ref('convserations').push().set({
						createdAt: Date(),
						message: conversation.message,
						user_uid_1: conversation.user_uid_1,
						user_uid_2: Cookies.get('reciver'),
						isView: conversation.isView,
						from: UserRole.USER
					}).then(_ => console.log('', _))
						.catch(err => console.log(err.message))
				})
			}

		})
}

export const updateViewStatus = (users: any[], uid: string): AppThunk => async dispatch => {
	const db = firebase.database();
	const current = users.filter((item) => {
		return item.user_uid_2 === uid
	})
	current.forEach((user) => {
		db.ref("convserations").child(`${user.key}`).update({
			isView: true
		})
	})
}

export const updateViewStatusForAdmin = (users: any[]): AppThunk => async dispatch => {
	const db = firebase.database();
	users.forEach((user) => {
		db.ref("convserations").child(`${user.key}`).update({
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

export const getRealTimeMessageView_USERS = (uid: string): AppThunk => async (dispatch, getState) => {
	const users = getState().user.users;
	let u = [...users];
	const db = firebase.database();
	db.ref("convserations").orderByChild('createdAt').on('value', (snapshot) => {
		let views = 0;
		if (snapshot.exists()) {
			u.map(user => {
				snapshot.forEach((message) => {
					if (message) {
						if (message.val().user_uid_1 === user.uid && message.val().user_uid_2 === uid && message.val().isView === false) {
							views++;
						}
					}
				})
				dispatch(setMessageView(views))
				views = 0;
			})
		}
	})
}

export const savePageVisit = (): AppThunk => async dispatch => {
	return firebase.firestore().collection("page").doc('mywebpagevisit').get()
		.then((value: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | any) => {
			if (value && value.data()) {
				firebase.firestore().collection("page").doc('mywebpagevisit').update({
					visit: value.data()?.visit + 1
				})
			}
		})
}

export const getVisit = (): AppThunk => async (dispatch) => {
	firebase.firestore().collection("page").doc('mywebpagevisit').get()
		.then((value: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | any) => {
			if (value && value.data()) {
				const visits: number = value.data().visit;
				dispatch(setGetPageView(visits))
			}
		})
}

export const getAllUser = (): AppThunk => async (dispatch) => {
	firebase.firestore().collection("users").get()
		.then((value: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | any) => {
			const users: any[] = [];
			if (value && value.data()) {
				value.forEach((user: any) => {
					if (user.data().role === UserRole.USER) {
						users.push({ ...user.data() })
					}
				});
				dispatch(filterUserChat(users));
			}
		})
}

export const filterUserChat = (users: any[]): AppThunk => async (dispatch) => {
	const realtime_db = firebase.database();
	realtime_db.ref("convserations").on('value', (onSnapshot) => {
		const userFilterd: any[] = [];
		if (onSnapshot.exists()) {
			onSnapshot.forEach(message => {
				users.map((user) => {
					if (message.val().user_uid_1 === user.uid) {
						userFilterd.push(message.val().user_uid_1)
					}
				})
			})
			const rmv_duplicate = userFilterd.filter((item, index) => {
				return userFilterd.indexOf(item) === index
			})
			console.log(rmv_duplicate)
			const avialable_users: any[] = []
			users.filter((item) => {
				rmv_duplicate.forEach((uid) => {
					if (item.uid === uid) {
						avialable_users.push({ ...item, view: 0 })
						return 1
					}
				});
			})
			avialable_users.sort(function (a: any, b: any) {
				var keyA = new Date(Date.parse(`${convertTimestamp(a.last_send)}`)),
					keyB = new Date(Date.parse(`${convertTimestamp(b.last_send)}`));
				if (keyA > keyB) return -1;
				if (keyA < keyB) return 1;
				return 0;
			})
			dispatch(setRefreshUser_admin())
			dispatch(setGetRealTimeUser_admin(avialable_users))
			dispatch(getRealTimeMessageViewForAdmin());
		}
	})
}

export const getRealTimeMessageViewForAdmin = (): AppThunk => async (dispatch, getState) => {
	const users = getState().user.users_admin;
	let u = [...users];
	const db = firebase.database();
	db.ref("convserations").orderByChild('createdAt').on('value', (snapshot) => {
		let views = 0;
		if (snapshot.exists()) {
			u.map(user => {
				snapshot.forEach((message) => {
					if (message.val().user_uid_1 === user.uid && message.val().isView === false) {
						views++;
					}
				})
				dispatch(setGetUser_admin({ uid: user.uid, view: views }))
				views = 0;
			})
		}
	})
}