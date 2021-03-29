import React, { useEffect, useState } from 'react';
import { collection } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import firebase from "../../../firebase/firebase";
import { ReactComponent as TypingLoad } from "public/chat_icons/typing.svg";
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { setTypingStatus } from 'features/user';

export default function Toast({uid}: any) {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.user.isTyping)
    useEffect(() => {
        const db = firebase.firestore();
        const collectionRef = db.collection('users');
        const typing = collection(collectionRef)
            .pipe(map(docs => {
                let data: any = [];
                docs.map(d => {
                    if (d.data().uid === uid)
                        data.push(d.data())
                })
                return data;
            }))
            .subscribe(users => {
                if (users.length > 0) {
                    dispatch(setTypingStatus(users[0].typing.isTyping))
                }
            });
        return () => {
            typing.unsubscribe();
        }
    }, [])
    return (
        <div>
            {
                state ?
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                        typing <TypingLoad width="2rem" height="2rem" />
                    </Box>
                    :
                    null
            }
        </div>
    )
}
