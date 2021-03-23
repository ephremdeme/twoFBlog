import {PayloadAction} from '@reduxjs/toolkit';
import {IProductState} from './init';
import {IProduct} from './types';

export default {
	setLoadingProducts: (
		state: IProductState,
		action: PayloadAction<boolean>
	) => {
		if (action.payload == false && !state.prodcutsLoaded)
			state.prodcutsLoaded = true;
		state.loadingProducts = action.payload;
	},
	setProducts: (state: IProductState, action: PayloadAction<IProduct[]>) => {
		state.products = action.payload;
		state.filterableProducts = action.payload;
	},
	setChart: (
		state: IProductState,
		action: PayloadAction<IProduct | undefined>
	) => {
		if (action.payload) {
			const id = action.payload.id;

			if (state.chart[id]) {
				state.chart[id].total += action.payload.price;
				state.chart[id].products = [
					...state.chart[id].products,
					action.payload,
				];
			} else {
				state.chart[id] = {
					total: action.payload.price,
					products: [action.payload],
				};
			}
		}
	},
	removeProductChart: (state: IProductState, action: PayloadAction<string>) => {
		const id = action.payload;
		if (state.chart[id]) {
			const deltedItem = state.chart[id].products.pop();
			state.chart[id].total -= deltedItem.price;
			if (state.chart[id].products.length === 1)
				delete state.chart[id]
			state.chart[id].products.pop();
		}
	},
	removeProductsAll: (state: IProductState, action: PayloadAction<string>) => {
		const id = action.payload;
		if (state.chart[id]) {
			state.chart[id].products = [];
		}
	},
	resetProductChart: (state: IProductState, action: PayloadAction<string>) => {
		const id = action.payload;
		if (state.chart[id]) {
			state.chart[id] = {
				products: [],
				total: 0,
			};
		}
	},
	resetChart: (state: IProductState, action: PayloadAction<any>) => {
		state.chart = {};
	},

	setFilterableProducts: (
		state: IProductState,
		action: PayloadAction<string>
	) => {
		const filteredData = state.products.filter((prod) =>
			prod.name.toLowerCase().includes(action.payload.toLowerCase())
		);
		console.log(filteredData);
		state.filterableProducts = filteredData;
	},
};
