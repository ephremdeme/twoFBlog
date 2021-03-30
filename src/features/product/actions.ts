import { collection } from 'rxfire/firestore';
import { getCollection } from "app/hooks";
import { setLoadingProducts, setProducts } from "./index";
import { map } from 'rxjs/operators'
import { AppThunk } from "app/store";
import { PDB } from './init';
import FB from '../../firebase/firebase';
import { storage, firestore } from '../../app/hooks'
import firebase from 'firebase'
import { IProduct } from './types';


export const fetchProducts = (): AppThunk => async (dispatch, getState) => {
	const products$ = getCollection(PDB.PRODCUTS)

	dispatch(setLoadingProducts(true))
	collection(products$)
		.pipe(
			map(docs => docs.map(d => ({ ...d.data(), id: d.id })))
		)
		.subscribe((products: any) => {
			console.log('Products data: ', products)
			dispatch(setLoadingProducts(false))
			dispatch(setProducts(products))
		})
}

export const postProduct = ({ file, data }: any): AppThunk => async (
	dispatch
) => {
	const storageRef = storage.ref(`products/${file.name}${Date.now()}`);
	const collectionRef = firestore.collection(PDB.PRODCUTS);

	console.log('Storage REf: ', storageRef)
	console.log('lets upload');
	storageRef.put(file).on(
		'state_changed',
		(snap: any) => {
		},
		(err: any) => {
			console.error('FB upload error: ', err);
		},
		async () => {
			const url = await storageRef.getDownloadURL();
			const productPost = {
				thumbnail: url,
				...data,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			};

			collectionRef.add(productPost);
		}
	);
};

export const updateProduct = ({ id, file, data }: {
	id: string,
	file: any,
	data: IProduct
}): AppThunk => async (
	dispatch
) => {
		if (file) {
			const storageRef = storage.ref(`products/${file.name}${Date.now()}`);
			const collectionRef = firestore.collection(PDB.PRODCUTS).doc(id);

			storageRef.put(file).on(
				'state_changed',
				(snap: any) => {
				},
				(err: any) => {
					console.error('FB upload error: ', err);
				},
				async () => {
					const url = await storageRef.getDownloadURL();
					const productPost = {
						...data,
						createdAt: Date.now(),
						updatedAt: Date.now(),
						thumbnail: url
					};

					collectionRef.update(productPost);
				}
			);
		} else {
			const collectionRef = firestore.collection(PDB.PRODCUTS).doc(id);
			const productPost = {
				...data,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			};

			collectionRef.update(productPost);
		}
	};