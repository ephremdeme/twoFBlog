import { Box, Button } from '@material-ui/core'
import React from 'react';
import { ReactComponent as LoadingLogo } from "../../public/icons/icons8_error_1.svg";
import { useDispatch, useSelector } from "react-redux";
import { signAsGuest } from "features/auth";

export default function Error() {
    const dispatch = useDispatch();
    const handle = ()=>{
        dispatch(signAsGuest())
    }
    return (
        <div>
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" width="100%" height="100vh" bgcolor="#613BBB">
                <LoadingLogo style={{ color: 'green' }} />
                <Button variant="contained" onClick={()=>{handle()}}>Try Again</Button>
            </Box>
        </div>
    )
}
