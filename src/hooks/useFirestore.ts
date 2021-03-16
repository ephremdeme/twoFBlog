import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {useAppDispatch, useCollection, useFirestore} from 'app/hooks';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

/**
 * Query a single document using document's {id}
 * and return its data
 * @template T
 * @param {string} collection - collection's name / Path.
 * @param {string} id - A slash-separated path to a document or Id.
 * @param {ActionCreatorWithPayload<T, string>} action - A redux action to dispatch.
 * @return { {loading: boolean, data: T| undefined}}
 */
export const useFireDoc = <T>(
	collection: string,
	id: string,
	action?: ActionCreatorWithPayload<T, string>
): {loading: boolean; data: T | undefined} => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T>();
	const dispatch = useAppDispatch();

	const docRef = useFirestore().collection(collection).doc(id);

	useEffect(() => {
		const fetchDoc = async () => {
			let doc = await docRef.get();
			setData(({...doc.data(), id: doc.id} as unknown) as T);
			if (action)
				dispatch(action(({...doc.data(), id: doc.id} as unknown) as T));
			setLoading(false);
		};

		fetchDoc();
	}, [action, dispatch, docRef, id]);
	return {loading, data};
};
/**
 * This function uses subscription to listen to changes from firestore
 * @template T
 * @param {string} collection - collection's name / Path
 * @param {ActionCreatorWithPayload<T, string>} action - A redux action to dispatch.
 * @return { {loading: boolean, data: T| undefined}}
 */
export const useFireCollection = <T>(
	collection: string,
	action?: ActionCreatorWithPayload<T[], string>,
	options?: {
		orderBy?: {
			field: string;
			order: 'desc' | 'asc' | undefined;
		};
		where?: {
			fieldPath: string /* fieldpath of the doc */;
			operator: firebase.default.firestore.WhereFilterOp /* use where filter Op */;
			value: any /* Use Ref for reference search  and string for non refernce field value
      example : to search for blog's comments => const blogRef = firebase.db.collection('blog').doc(id) 
        */;
		};
	}
) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T[]>([]);
	const dispatch = useAppDispatch();
	const dbRef = useFirestore().collection(collection);
	useEffect(() => {
		let whereDbRef;
		if (options) {
			let {orderBy, where} = options;

			if (where) {
				whereDbRef = dbRef.where(where.fieldPath, where.operator, where.value);
			}
			if (orderBy)
				whereDbRef = whereDbRef
					? whereDbRef?.orderBy(orderBy.field, orderBy.order)
					: dbRef.orderBy(orderBy.field, orderBy.order);
		}
		const unSub = (whereDbRef || dbRef).onSnapshot((snaphot) => {
			let allData: T[] = [];
			snaphot.forEach((doc) =>
				allData.push(({...doc.data(), id: doc.id} as unknown) as T)
			);
			if (action) dispatch(action(allData));
			setData(allData);
			setLoading(false);
		});
		return () => unSub();
	}, []);
	return {loading, data};
};

export const useFireCollectionRef = <T>(
	collectionRef: firebase.default.firestore.CollectionReference<firebase.default.firestore.DocumentData>,
	action?: ActionCreatorWithPayload<T[], string>
) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T[]>([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		collectionRef.get().then((querySnapshot) => {
			let allData: T[] = [];
			querySnapshot.forEach((doc) => {
				allData.push(({...doc.data(), id: doc.id} as unknown) as T);
			});
			if (action) dispatch(action(allData));
			setData(allData);
			setLoading(false);
		});
	}, []);

	return {loading, data};
};

export const useFireCollectionRefSub = <T>(
	collectionRef: firebase.default.firestore.CollectionReference<firebase.default.firestore.DocumentData>,
	action?: ActionCreatorWithPayload<T[], string>
) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T[]>([]);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unSubscribe = collectionRef.onSnapshot((snapshot) => {
			let allData: T[] = [];
			snapshot.forEach((doc) =>
				allData.push(({...doc.data(), id: doc.id} as unknown) as T)
			);
			if (action) dispatch(action(allData));
			setData(allData);
			setLoading(false);
		});

		return () => unSubscribe();
	}, []);

	return {loading, data};
};

export const useFireMutation = async (
	collection: string,
	data: firebase.default.firestore.DocumentData,
	id?: string
) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	const collRef = useCollection(collection);
	if (id) {
		await collRef.doc(id).update(data);
		setLoading(false);
	} else {
		let doc = await (await collRef.add(data)).get();
		let resp = {...doc.data(), id: doc.id};
	}
	return {loading};
};

export const useFireDelete = async (collection: string, id: string) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();

	const docRef = useCollection(collection).doc(id);
	try {
		await docRef.delete();
		setLoading(false);
	} catch (error) {
		console.log(error);
		throw error;
	}

	return {loading};
};
