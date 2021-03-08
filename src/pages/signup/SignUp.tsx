import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ReactComponent as ReactLogo } from '../../icons8_google_logo_1.svg';
import firebase, { provider } from "../../firebase/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { setLogged, setRole, setEmail } from '../../features/user';
import { RootState } from "../../app/store";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignIn() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const onSubmit = (e: any) => {
        e.preventDefault();
        firebase.getInstance().auth
            .signInWithPopup(provider)
            .then((result) => {
                firebase.getInstance().db.collection("users").doc(result.user?.uid).get()
                    .then((data) => {
                        if (data.exists) {
                        } else {
                            firebase.getInstance().db.collection("users").doc(result.user?.uid).set({
                                user_name: result.user?.displayName,
                                email: result.user?.email,
                                photo: result.user?.photoURL,
                                role: "user"
                            })
                        }
                    });
                firebase.getInstance().db.collection("users").doc(result.user?.uid).get()
                    .then((userData: any) => {
                        if (userData.exists) {
                            dispatch(setRole(userData.data().role))
                            dispatch(setLogged(true))
                            dispatch(setEmail(userData.data().email))
                        }
                    })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.submit}
                        startIcon={<ReactLogo />}
                    >
                        Sign In with Google
          </Button>
                </form>
            </div>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                    const user = firebase.getInstance().auth.signInAnonymously()
                        .then((user)=>{
                            console.log(user)
                            dispatch(setLogged(true))
                            dispatch(setRole("guest"))
                        })
                    // firebase.getInstance().auth.signOut();
                }}
            >
                Continue as A guest
            </Button>
        </Container>
    );
}