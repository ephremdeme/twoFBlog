import {PayloadAction} from '@reduxjs/toolkit';
import { IProductState } from './init'
import { IProduct } from './types';

export default {
	setLoadingProducts: (state: IProductState, action: PayloadAction<boolean>) => {
		state.loadingProducts = action.payload;
		// if(action.payload == false && !state.prodcutsLoaded)
		// 	state.prodcutsLoaded = true;
	},
	setProducts: (state: IProductState, action: PayloadAction<boolean>) => {
		state.loadingProducts = action.payload;
	},
	// setFilterableProducts: (
	// 	state: IProductState,
	// 	action: PayloadAction<string>
	// ) => {
	// 	const filteredData = state.products.filter((prod) =>
	// 		prod.name.toLowerCase().includes(action.payload.toLowerCase())
	// 	);
	// 	console.log(filteredData);
	// 	state.filterableProducts = filteredData;
	// },
};