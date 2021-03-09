import {createSlice} from '@reduxjs/toolkit';
import {RootState, AppThunk} from './../../app/store';
import {PayloadAction} from '@reduxjs/toolkit';
import FB from '../../firebase/firebase';

const PRODUCT_COLLECTION = 'products';

export interface IProductState {
	loading: boolean;
	products: any[];
}

const initialState: IProductState = {
	loading: false,
	products: [],
};

const productSlice = createSlice({
	name: 'product_store',
	initialState,
	reducers: {
		setLoadingPost: (state: IProductState, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setProducts: (state: IProductState, action: PayloadAction<any>) => {
			console.log('dispatched hook: ', action.payload);
			state.products = action.payload;
		},
	},
});

export const {setLoadingPost, setProducts} = productSlice.actions;
export const selectLoading = (state: RootState) => state.product.loading;
export const selectProducts = (state: RootState) => state.product.products;

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
			collectionRef.add({
				image: url,
				...data,
				createdAt: FB.getTimestamp(),
			});
			dispatch(setLoadingPost(false));
		}
	);
};

export const fetchProducts = (): AppThunk => async (dispatch) => {
	console.log('we are here');

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
