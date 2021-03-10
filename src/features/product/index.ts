import {createSlice} from '@reduxjs/toolkit';
import {RootState, AppThunk} from './../../app/store';
import {PayloadAction} from '@reduxjs/toolkit';
import FB from '../../firebase/firebase';

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
		setProducts: (state: IProductState, action: PayloadAction<any>) => {
			state.products = action.payload;
			state.filterableProducts = action.payload
		},
		setFilterableProducts: (state: IProductState, action: PayloadAction<string>) => {
			console.log('filter here dood come on WTF: ', action.payload)
			const filteredData = state.products.filter(prod => prod.name.toLowerCase().includes(action.payload.toLowerCase()));	
			console.log(filteredData);
			state.filterableProducts = filteredData;
		}
	},
});

export const {setLoadingPost, setProducts, setFilterableProducts} = productSlice.actions;
export const selectLoading = (state: RootState) => state.product.loading;
export const selectFilterableProducts = (state: RootState) => state.product.filterableProducts;

export const postProduct = ({file, data}: any): AppThunk => async (
	dispatch
) => {
	const storage = FB.getInstance().storage;
	const firestore = FB.getInstance().db;
	dispatch(setLoadingPost(true));
	const storageRef = storage.ref(file.name);
	const collectionRef = firestore.collection(PRODUCT_COLLECTION);

	storageRef.put(file).on(
		'state_changed',
		(snap: any) => {
			console.log('uploading here: ', snap);
		},
		(err: any) => {
			console.error('FB upload error: ', err);
			dispatch(setLoadingPost(false));
		},
		async () => {
			const url = await storageRef.getDownloadURL();
			const productPost = {
				image: url,
				...data,
				createdAt: FB.getTimestamp(),
			};

			collectionRef.add(productPost);
			dispatch(setLoadingPost(false));
		}
	);
};

export const fetchProducts = (): AppThunk => async (dispatch) => {
	dispatch(setLoadingPost(true));
	FB.getInstance()
		.db.collection(PRODUCT_COLLECTION)
		.orderBy('createdAt')
		.onSnapshot((snap) => {
			let documents: any[] = [];
			snap.forEach((doc) => {
				documents.push({...doc.data(), id: doc.id});
			});
			documents = documents;
			dispatch(setLoadingPost(false));
			dispatch(setProducts(documents));
		});
};

export default productSlice.reducer;
