import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers' 

interface IProductState {
	// TODO: init product field types
}

const initialState: IProductState = {
	// TODO: init product field initial values 
}

const productSlice =  createSlice({
	name: 'product_store',
	initialState,
	reducers // defined in reducers file
})

// actions exported distructure here
export const {  } = productSlice.actions;

// selector field sample
// export const selectCount = (state: RootState) => state.counter.value;


export default productSlice.reducer