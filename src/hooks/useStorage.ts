import {useState, useEffect} from 'react';
import FB from '../firebase';

const useStorage = ({file, data, collection}: any) => {
	const storage = FB.storage();
	const firestore = FB.firestore();

	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<any>(null);
	const [url, setUrl] = useState<any>(null);

	useEffect(() => {
		// references
		const storageRef = storage.ref(file.name);
		const collectionRef = firestore.collection(collection);

		storageRef.put(file).on(
			'state_changed',
			(snap: any) => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage);
			},
			(err: any) => {
				setError(err);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				const createdAt = new Date();
				await collectionRef.add({img: url, ...data});
				setUrl(url);
			}
		);
	}, [file]);

	return {progress, url, error};
};

export const useImageUpload = (path: string) => {
	const storageRef = FB.storage().ref(path);
	const [url, seturl] = useState<string | undefined>(undefined);
	const [error, seterror] = useState(null);
	const {handleDelete} = useImageDelete(path);

	const handleUpload = async (
		file: Blob | Uint8Array | ArrayBuffer,
		fileName: string,
		prevAddress?: string
	) => {
		const fileRef = storageRef.child(fileName);

		try {
			await fileRef.put(file);
		} catch (error) {
			seterror(error);
		}
		const url = await fileRef.getDownloadURL();
		seturl(url);
		if (prevAddress) {
			try {
				handleDelete(prevAddress);
			} catch (error) {
				seterror(error);
			}
		}
	};

	return {url, error, handleUpload};
};

export const useImageDelete = (path: string) => {
	const storageRef = FB.storage().ref(path);

	const handleDelete = async (id: string) => {
		const deleteRef = storageRef.child(id);
		try {
			await deleteRef.delete();
		} catch (error) {
			return error;
		}
	};

	return {handleDelete};
};

export const useImageDirDelete = (path: string) => {
	const storageRef = FB.storage().ref(path);

	const handleDirDelete = async (id: string) => {
		const deleteRef = storageRef.child(id);
		try {
			deleteRef
				.listAll()
				.then(function (result) {
					result.items.forEach(function (file) {
						file.delete();
					});
				})
				.catch((err) => err);
		} catch (error) {
			return error;
		}
	};

	return {handleDirDelete};
};

export default useStorage;
