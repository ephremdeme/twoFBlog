import { RootState } from 'app/store'
import { getMeTheFire } from 'features/user'
import React, { useEffect } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from "../../firebase/firebase";

export default function GuestsHomePage() {
    const test = useSelector((state: RootState) => state.user.test)
    const dispatch = useDispatch()
    const [value, loading, error] = useCollection(
        firebase.firestore().collection('products'),
    );

    // useEffect(() => {
    //     dispatch(getMeTheFire())
    // }, [])
    // const firestore = useFirestore();
    // useFirestoreConnect("users");

    return (
        <div>
            <p>
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <span>Collection: Loading...</span>}
                {value && (
                    <span>
                        Collection:{' '}
                        {value.docs.map((doc) => (
                            <React.Fragment key={doc.id}>
                                <pre>{JSON.stringify(doc.data(), null, 2)}</pre>
                            </React.Fragment>
                        ))}
                    </span>
                )}
            </p>
            <h3>GuestsHomePage</h3>
            <button onClick={() => { dispatch(getMeTheFire()) }}>get</button>
        </div>
    )
}


