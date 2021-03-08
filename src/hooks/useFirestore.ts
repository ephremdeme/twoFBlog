import { useState, useEffect } from 'react';
import FB from '../firebase/firebase'

const useFirestore = (collection: any) => {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    const unsub = FB.getInstance().db.collection(collection)
      .orderBy('createdAt')
      .onSnapshot(snap => {
        let documents: any[] = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
}

export default useFirestore;