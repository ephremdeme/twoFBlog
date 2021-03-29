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
	setFilterableProducts,
	setFilterableProductsByField,
	clearProductsFilter
} = productSlice.actions;

export const {
	selectProducts,
	selectLoadingProducts,
	selectProdcutsLoaded,
	selectChartTotal,
	selectChartProductQty,
	selectFilterableProducts,
	selectDistinctProductCatagorys
} = selectors;
export const {fetchProducts, postProduct} = thunks;

export default productSlice.reducer;
