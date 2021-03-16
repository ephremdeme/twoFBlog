import React, { useEffect, useState } from 'react';
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
import { singUpWithProvider, signAsGuest, isLoggedIn, createUserWithEmailPassword, signInWithEmailPassword } from "../../features/auth/index";

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(singUpWithProvider());
    }

    const handleLogin = () => {
        if (email && password) {
            const user ={
                email,
                password
            }
            dispatch(signInWithEmailPassword(user))
        }
    }



    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            className={classes.root}
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
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                        >
                            <Button
                                fullWidth
                                // startIcon={<GoogleIcon />}
                                onClick={handleSubmit}
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
                        <Typography
                            align="center"
                            color="textSecondary"
                            variant="body1"
                        >
                            login with email address
                      </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        name="email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <Box my={2}>
                        <Button
                            color="primary"
                            fullWidth
                            size="large"
                            // type="submit"
                            variant="contained"
                            onClick={() => { handleLogin() }}
                        >
                            Sign in now
                      </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default LoginView;
