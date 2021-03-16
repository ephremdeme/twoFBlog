import React, {useEffect} from 'react'
import { Route, Redirect } from "react-router-dom";
import { isPrivate } from "../../features/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

export default function Private({component: Component, ...rest}: any) {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(isPrivate())
    }, [])

    return (
        <>
       {!auth.authenticating?
        <Route {...rest} component={(props: any)=>{
            // const user = localStorage.getItem('user') ? JSON.stringify(localStorage.getItem('user')) : null;
            // const user = dispatch(isPrivate());
            if(auth.authenticated) return <Component {...props}/>
            else return <Redirect to="/"/>
        }}

        />: <h1>AALoading...</h1>}
        </>
    )
}
