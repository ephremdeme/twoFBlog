import { useState, useEffect } from 'react';
import FB from '../firebase/firebase'

const useStorage = ({ file, data, collection }: any) => {
	const storage = FB.getInstance().storage;
	const firestore = FB.getInstance().db;

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<any>(null);
  const [url, setUrl] = useState<any>(null);

  useEffect(() => {
    // references
    const storageRef = storage.ref(file.name);
    const collectionRef = firestore.collection(collection);
    
    storageRef.put(file).on('state_changed', (snap: any) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err: any) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = new Date();
      await collectionRef.add({ img: url, ...data });
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;