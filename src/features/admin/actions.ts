import {collection, collectionData} from 'rxfire/firestore';
import {getCollection} from 'app/hooks';
import {setLoadingUsers, setUsers} from './index';
import {AppThunk} from 'app/store';
import {map} from 'rxjs/operators';
import {User} from 'features/user/types';
import {UserData} from './types';

export const fetchUsers = (lastDocRef: any = null): AppThunk => async (
	dispatch,
	getState
) => {
	console.log('start redux here and the ref is: ', lastDocRef);
	const users$ = getCollection('users')
		.orderBy('user_name')
		// .startAfter(lastDocRef || 0)
		.limit(6);

	// dispatch(setLoadingUsers(true))
	// collectionData(users$)
	// .subscribe((users: any) => {
	//   // dispatch(setLoadingUsers(false))
	//   console.log('users data++++++++++++++++++++++++++++++: ', users);
	//   dispatch(setUsers([...getState().admin.users, ...users]));
	//   dispatch(setLastUserDoc(getState().admin.users[getState().admin.users.length - 1]));
	// }){
	// lastDocData = docs[docs.length - 1];
	// console.log('WTF WTF WTF: ', docs[docs.length-1], docs[docs.length-1].data())

	let lastDocData: any | null = null;

	collection(users$)
		.pipe(
			map((docs) => {
				lastDocData = docs[docs.length - 1];
				console.log('the map doc inside: ', docs);
				console.log('the map doc inside the last doc: ', docs[docs.length - 1]);
				return docs.map((d) => d.data());
			})
		)
		.subscribe((data: any[]) => {
			dispatch(
				setUsers({
					lastDoc: !getState().admin.users.lastDoc
						? lastDocData
						: getState().admin.users.lastDoc.id !== lastDocData.id
						? lastDocData
						: getState().admin.users.users,
					users: data as User[],
				})
			);
		});
	console.log('CALLLLLLLLLLLLLLLLLLLLLLLLLLLEEEEEEEDDDDDDDD', lastDocData);
};
