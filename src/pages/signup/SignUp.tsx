import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ReactComponent as ReactLogo } from '../../public/icons/icons8_google_logo_1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { signupUser, logoutUser, signAsGuest } from "../../features/auth/index";


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
	const auth = useSelector((state: RootState) => state.auth.authenticated)
	const uid = useSelector((state: RootState) => state.auth.uid)

	const sign = (e: any) => {
		e.preventDefault();
		dispatch(signupUser());
	}

	if (auth) {
		return <Redirect to={"/dash"} />
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
				<form className={classes.form} onSubmit={sign}>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						size="large"
						className={classes.submit}
						startIcon={<ReactLogo />}>
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
					
				}}>
				Guest (Currently Unavailable)
			</Button>
		</Container>
	);
}
