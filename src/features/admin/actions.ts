import { collection, collectionData } from 'rxfire/firestore';
import { getCollection } from "app/hooks";
import { setLoadingUsers, setUsers } from "./index";
import { AppThunk } from "app/store";

export const fetchUsers = (): AppThunk => async (dispatch, getState) => {

  const users$ = getCollection('users').limit(10)

  // dispatch(setLoadingUsers(true))
  collectionData(users$)
  .subscribe((users: any) => {
    console.log('users data: ', users)
    // dispatch(setLoadingUsers(false))
    dispatch(setUsers(users))
  })
}
