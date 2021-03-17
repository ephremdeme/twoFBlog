import {createSlice} from '@reduxjs/toolkit';
import {RootState, AppThunk} from './../../app/store';
import {PayloadAction} from '@reduxjs/toolkit';
import selectors from './selectors'
import { IProduct } from './types';

const PRODUCT_COLLECTION = 'products';
export interface IProductState {
	loading: boolean;
	products: any[];
	filterableProducts: any[];
}

const initialState: IProductState = {
	loading: false,
	products: [],
	filterableProducts: []
};

const productSlice = createSlice({
	name: 'product_store',
	initialState,
	reducers: {
		setLoadingPost: (state: IProductState, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setProducts: (state: IProductState, action: PayloadAction<IProduct[]>) => {
			// state.products = action.payload;
			console.log('hisss of us who are you to judge: ', action.payload)
			state.filterableProducts = action.payload;
		},
		setFilterableProducts: (state: IProductState, action: PayloadAction<string>) => {
			const filteredData = state.products.filter(prod => prod.name.toLowerCase().includes(action.payload.toLowerCase()));	
			console.log(filteredData);
			state.filterableProducts = filteredData;
		}
	},
});

export const { setLoadingPost, setProducts, setFilterableProducts } = productSlice.actions
export const { selectFilteredProducts } = selectors;

export default productSlice.reducer;
