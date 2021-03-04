import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers' 

interface IEditorState {
	// TODO: init editor field types
}

const initialState: IEditorState = {
	// TODO: init editor field initial values 
}

const editorSlice =  createSlice({
	name: 'editor_store',
	initialState,
	reducers // defined in reducers file
})

// actions exported distructure here
export const {  } = editorSlice.actions;

// selector field sample
// export const selectCount = (state: RootState) => state.counter.value;


export default editorSlice.reducer