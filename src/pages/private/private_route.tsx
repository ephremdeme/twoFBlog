import React from 'react'
import { Route, Redirect } from "react-router-dom";

export default function Private({component: Component, ...rest}: any) {
    return (
        <Route {...rest} component={(props: any)=>{
            const user = localStorage.getItem('user') ? JSON.stringify(localStorage.getItem('user')) : null;
            if(user) return <Component {...props}/>
            else return <Redirect to="/"/>
        }}

        />
    )
}
