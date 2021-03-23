import {createSlice} from '@reduxjs/toolkit';
import selectors from './selectors';
import reducers from './mutations';
import * as thunks from './actions';
import {initialState} from './init';

const productSlice = createSlice({
	name: 'product_store',
	initialState,
	reducers,
});

export const {
	setLoadingProducts,
	setProducts,
	setChart,
	removeProductsAll,
	removeProductChart,
	resetProductChart,
	resetChart,
	setFilterableProducts
} = productSlice.actions;

export const {
	selectProducts,
	selectLoadingProducts,
	selectProdcutsLoaded,
	selectChartTotal,
	selectChartProductQty,
	selectFilterableProducts
} = selectors;
export const {fetchProducts} = thunks;

export default productSlice.reducer;
