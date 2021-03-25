import React, {useEffect, useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	Grid,
	TextField,
	Typography,
	makeStyles,
	CssBaseline,
} from '@material-ui/core';
import {ReactComponent as FacebookIcon} from '../../public/icons/icons8_google_logo_1.svg';
import {ReactComponent as GoogleIcon} from '../../public/icons/icons8_google_logo_1.svg';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {
	singUpWithProvider,
	signAsGuest,
	isLoggedIn,
	createUserWithEmailPassword,
	signInWithEmailPassword,
	setAuthFailure,
} from '../../features/auth/index';
import AuthAlert from './AuthAlert';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	signup: {
		textDecoration: 'none',
		paddingLeft: '5px',
		fontWeight: 700,
		fontSize: '1.15em',
		color: theme.palette.text.secondary,
	},
}));

const LoginView = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const auth = useSelector((state: RootState) => state.auth);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(singUpWithProvider());
	};

	const handleLogin = () => {
		if (email && password) {
			const user = {
				email,
				password,
			};
			dispatch(signInWithEmailPassword(user));
		} else {
			dispatch(setAuthFailure('Fill the forms first!'));
		}
	};

	if (auth.authenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<>
			<CssBaseline />
			<Box
				display="flex"
				flexDirection="column"
				height="100%"
				justifyContent="center"
				className={classes.root}>
				<Container maxWidth="sm">
					<form onSubmit={handleSubmit}>
						<Box mb={3}>
							<AuthAlert />
							<Box textAlign="center" fontSize="3.4rem" fontWeight={700}>
								Login
							</Box>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"></Typography>
						</Box>
						<Box mt={3} mb={1}>
							<AuthAlert />
							<Typography align="center" color="textSecondary" variant="body1">
								Login with email address
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
							error={auth.errorMessage !== undefined && email === ''}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<TextField
							fullWidth
							label="Password"
							margin="normal"
							name="password"
							type="password"
							variant="outlined"
							value={password}
							error={auth.errorMessage !== undefined && password === ''}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<Box my={2}>
							<Button
								color="primary"
								fullWidth
								size="large"
								variant="outlined"
								onClick={() => {
									handleLogin();
								}}>
								Sign in now
							</Button>
						</Box>
					</form>
					<Typography style={{textAlign: 'end'}} variant="body1">
						Don't have an account?
						<Typography
							variant="body1"
							component={Link}
							to="/signup"
							className={classes.signup}>
							Sign Up
						</Typography>
					</Typography>
					<div>
						<Box my={3}>
							<Box textAlign="center" fontWeight={600} fontSize="2rem">
								--- OR ---
							</Box>
							<Box>
								<Button
									fullWidth
									startIcon={<GoogleIcon width="30px" height="30px" />}
									onClick={handleSubmit}
									variant="outlined">
									Login with Google
								</Button>
							</Box>
						</Box>
					</div>
				</Container>
			</Box>
		</>
	);
};

export default LoginView;
