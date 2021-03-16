import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Firebase from '../firebase/firebase';
import FB from '../firebase/firebase';

const useFirestore = (collection: any) => {
	const [docs, setDocs] = useState<any[]>([]);

	useEffect(() => {
		const unsub = FB.getInstance()
			.db.collection(collection)
			.orderBy('createdAt')
			.onSnapshot((snap) => {
				let documents: any[] = [];
				snap.forEach((doc) => {
					documents.push({...doc.data(), id: doc.id});
				});
				setDocs(documents);
			});

		return () => unsub();
	}, [collection]);

	return {docs};
};

export const useFireDoc = <T>(
	collection: string,
	id: string,
	action?: (data: T) => void
) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<T>();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchDoc = async () => {
			let docRef = FB.getInstance().db.collection(collection).doc(id);
			let doc = await docRef.get();
			setData(({...doc.data(), id: doc.id} as unknown) as T);
			if (action)
				dispatch(action(({...doc.data(), id: doc.id} as unknown) as T));
			setLoading(false);
		};

		fetchDoc();
	}, []);
	return {loading, data};
};

export const useFireCollection = <T>(
	collection: string,
	action: (data: T[]) => void,
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
	const dispatch = useDispatch();
	useEffect(() => {
		let dbRef = FB.getInstance().db.collection(collection);
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
			dispatch(action(allData));
			setData(allData);
			setLoading(false);
		});
		return () => unSub();
	}, []);
	return {loading, data};
};

export default useFirestore;
