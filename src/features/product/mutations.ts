import { PayloadAction } from '@reduxjs/toolkit';
import { IProductState } from './init';
import { IProduct } from './types';

export interface IFieldQuery {
	strValue?: string;
	intValue?: number;
	field?: string;
	compare?: string;
}

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
			if (!state.chart[id].products.length)
				state.chart[id] = {
					total: 0,
					products: [],
				};
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
		state.filterableProducts = filteredData;
	},

	setFilterableProductsByField: (
		state: IProductState,
		action: PayloadAction<IFieldQuery>
	) => {
		if (action.payload) {
			if (
				(action.payload.field && action.payload.intValue) ||
				action.payload.strValue
			) {
				let field = action.payload.field;
				let intValue = action.payload.intValue;
				let strValue = action.payload.strValue;
				let compare = action.payload.compare;

				if (field) {
					if (intValue) {
						intValue = +intValue;
						const filteredData = state.products.filter(
							(prod: IProduct | any) => {
								let fieldValid = false;
								if (field && intValue) {
									if (compare === '==') {
										fieldValid = prod[field] === intValue;
									} else if (compare === '>') {
										fieldValid = prod[field] > intValue;
									} else if (compare === '>=') {
										fieldValid = prod[field] >= intValue;
									} else if (compare === '<') {
										console.log('its less than');
										fieldValid = prod[field] < intValue;
										console.log(fieldValid, prod[field]);
									} else if (compare === '<=') {
										fieldValid = prod[field] <= intValue;
									} else if (compare === '!=') {
										fieldValid = prod[field] !== intValue;
									}
								}
								return fieldValid;
							}
						);
						state.filterableProducts = filteredData;
					} else if (strValue) {
						const filteredData = state.products.filter(
							(prod: IProduct | any) => {
								if (field && strValue) {
									const isValid = prod[field]
										.toLowerCase()
										.includes(strValue.toLowerCase());
									return isValid;
								}
							}
						);
						state.filterableProducts = filteredData;
					}
				}
			}
		}
	},
	clearProductsFilter: (state: IProductState) => {
		state.filterableProducts = state.products;
	}
};
