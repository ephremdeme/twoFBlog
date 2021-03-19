import { Box } from '@material-ui/core'
import React from 'react';
import { ReactComponent as LoadingLogo } from "../../public/icons/ball-triangle.svg";

export default function Loading() {
    return (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100vh" bgcolor="#613BBB">
                <LoadingLogo style={{ color: 'green' }} />
            </Box>
        </div>
    )
}
