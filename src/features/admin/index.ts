import {createSlice} from '@reduxjs/toolkit';
import selectors from './selectors';
import reducers from './mutations';
import * as thunks from './actions';
import {initialState} from './init';

const adminSlice = createSlice({
	name: 'admin_store',
	initialState,
	reducers,
});

export const {
	selectUsers
} = selectors;

export const {
	setLoadingUsers,
	setUsers,
} = adminSlice.actions;

export const {fetchUsers} = thunks;

export default adminSlice.reducer;
