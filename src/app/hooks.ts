import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from './store';
import { database, storage, firestore } from '../firebase';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFirestore = () => firestore;
export const useCollection = (collectionPath: string) =>
	firestore.collection(collectionPath);
export const useStorage = () => storage;
export const useDatabase = () => database;

export const getFirestore = () => firestore;
export const getCollection = (collectionPath: string) =>
	firestore.collection(collectionPath);
export const getStorage = () => storage;
export const getDatabase = () => database;