import {collection, collectionData} from 'rxfire/firestore';
import {getCollection} from 'app/hooks';
import {setLoadingUsers, setUsers} from './index';
import {AppThunk} from 'app/store';
import { convertTimestamp } from 'convert-firebase-timestamp';
import { map } from 'rxjs/operators';
import { useSprings } from 'react-spring';
import { User } from 'features/auth/types';

export const fetchUsers = (lastDocRef: any = null): AppThunk => async (
	dispatch,
	getState
) => {
	dispatch(setLoadingUsers(true));
	const users$ = getCollection('users').orderBy('user_name');
	collection(users$)
	.pipe(
		map(users => users.map((user) =>({
				...user.data(),
				last_send: new Date(Date.parse(`${convertTimestamp(user.data().last_send)}`))
			}))
		),
	)
	.subscribe((users:any) => {
		console.log('Users: ', users);
		dispatch(setUsers(users))
		dispatch(setLoadingUsers(false));
	})
};