import React, {Component, Children, useEffect} from 'react'
import { savePageVisit } from "features/user";
import { useDispatch } from "react-redux";

function Main({children}: any) {
    useEffect(()=>{
        handleUnload();
    },[])   
    const dispatch = useDispatch();
    const handleUnload = () => {
        dispatch(savePageVisit());
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default React.memo(Main)
// export default Main
