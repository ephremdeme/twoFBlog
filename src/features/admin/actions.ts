import { collection, collectionData } from 'rxfire/firestore';
import { getCollection } from "app/hooks";
import { setLoadingUsers, setUsers } from "./index";
import { AppThunk } from "app/store";

export const fetchUsers = (): AppThunk => async (dispatch, getState) => {

  console.log('The Last Doc', getState().admin.lastUserDoc )
  const lastDoc = getState().admin.lastUserDoc;
  const users$ = getCollection('users').orderBy('user_name')
  .startAfter(lastDoc || 0)
  .limit(6);

  // dispatch(setLoadingUsers(true))
  collectionData(users$)
  .subscribe((users: any) => {
    console.log('users data: ', users)
    // dispatch(setLoadingUsers(false))
    dispatch(setUsers([...getState().admin.users, ...users]))
  })
}
