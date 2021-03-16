import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from './store';
import FB from '../firebase/firebase';
const fbInstance = FB.getInstance();

const firestore = fbInstance.db;
const storage = fbInstance.storage;
const database = fbInstance.database;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFirestore = () => firestore;
export const useCollection = (collectionPath: string) =>
	firestore.collection(collectionPath);
export const useStorage = () => storage;
export const useDatabase = () => database;
