import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import { ReactComponent as FacebookIcon } from '../../public/icons/icons8_google_logo_1.svg';
import { ReactComponent as GoogleIcon } from '../../public/icons/icons8_google_logo_1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { singUpWithProvider, signAsGuest, isLoggedIn } from "../../features/auth/index";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const LoginView = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(singUpWithProvider());
    }



    return (
        <>
            {
                true ?
                    <Box
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        justifyContent="center"
                    >
                        <Container maxWidth="sm">
                            <form onSubmit={handleSubmit}>
                                <Box mb={3}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Sign in
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Sign in on the internal platform
                                    </Typography>
                                </Box>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                    >
                                        <Button
                                            fullWidth
                                            startIcon={<GoogleIcon />}
                                            type="submit"
                                            size="large"
                                            variant="contained"
                                        >
                                            Login with Google
                    </Button>
                                    </Grid>
                                </Grid>
                                <Box
                                    mt={3}
                                    mb={1}
                                >
                                </Box>
                            </form>
                        </Container>
                    </Box> : <h1>Loading</h1>
            }
        </>
    );
};

export default LoginView;
