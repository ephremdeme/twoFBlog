import React, { useState } from 'react';

import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	makeStyles,
	CssBaseline,
	CircularProgress,
} from '@material-ui/core';

import {
	singUpWithProvider,
	signInWithEmailPassword,
	setAuthFailure,
} from '../../features/auth/index';

import AuthAlert from './AuthAlert';
import { RootState } from '../../app/store';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as GoogleIcon } from '../../public/icons/icons8_google_logo_1.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#ffffff",
		backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%234f4f4f' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%230f0a21' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%2313112a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23171533' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%231c193c' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23221c45' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%2328204f' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%232e2458' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23342762' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%233b2b6c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23432e76' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%234a3280' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23523589' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%235b3893' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23643c9d' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%236d3fa7' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%237642b1' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%238044ba' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%238a47c4' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
		height: 'calc(100vh - 64px)',
		display: "flex",
		alignItems: 'center',
		backgroundSize: "cover",
		justifyContent: 'center',
		backgroundAttachment: "fixed",
		paddingBottom: theme.spacing(3),
	},
	container: {
		marginTop: "3vh",
		background: localStorage.getItem('theme') === 'dark' ? "#333" : "#fff",
		color: localStorage.getItem('theme') === 'dark' ? "#f4f4f4" : "#111",
		boxShadow: "0 4px 30px 6px rgba(0,0,0,0.5)",
		borderRadius: 10,
		padding: "2rem 2rem 2rem"
	},
	signup: {
		paddingLeft: '5px',
		fontWeight: 700,
		fontSize: '1.15em',
		color: localStorage.getItem('theme') === 'dark' ? "#f4f4f4" : "#111",
	},
	loginText: {
		color: localStorage.getItem('theme') === 'dark' ? "#f4f4f4" : "#111"
	},
	wrapper: {
		position: 'relative',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

const LoginView = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [loadingLogin, setLoadingLogin] = useState(false);
	const [password, setPassword] = useState('');
	const auth = useSelector((state: RootState) => state.auth);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setLoadingLogin(true)
		dispatch(singUpWithProvider());
		if (auth.uid) {
			setTimeout(() => setLoadingLogin(false), 500);
			history.push('/')
		}
	};

	const handleLogin = () => {
		setLoadingLogin(true);
		if (email && password) {
			const user = {
				email,
				password,
			};
			dispatch(signInWithEmailPassword(user));

			if (auth) {
				setTimeout(() => setLoadingLogin(false), 500);
				console.log('REDIRECT NOW OMG!!!!!!!!!!!')
				history.push('/')
			}
		} else {
			dispatch(setAuthFailure('Fill the forms first!'));
			setTimeout(() => setLoadingLogin(false), 500);
		}
	};

	return (
		<>
			<CssBaseline />
			<Box
				display="flex"
				flexDirection="column"
				height="100%"
				className={classes.root}>
				<Container maxWidth="sm" className={classes.container} style={{ minWidth: '300px', maxWidth: "400px" }}>
					<form onSubmit={handleSubmit}>
						<Box mb={1}>
							<AuthAlert />
							<Box className={classes.loginText} textAlign="center" fontSize="2.3rem" fontWeight={700}>
								Login
							</Box>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"></Typography>
						</Box>
						<Box mt={1} mb={1}>
							<Typography align="center" color="textSecondary" variant="body1">
								Login with email address
							</Typography>
						</Box>
						<TextField
							fullWidth
							label="Email Address"
							margin="normal"
							name="email"
							variant="outlined"
							type="email"
							size="small"
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
							variant="outlined"
							type="password"
							size="small"
							value={password}
							error={auth.errorMessage !== undefined && password === ''}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>

						<Box my={3} >
							<div className={classes.wrapper}>
								<Button
									color="primary"
									fullWidth
									disabled={loadingLogin}
									size="large"
									variant="contained"
									onClick={handleLogin}>
									Login
								</Button>
								{loadingLogin && (
									<CircularProgress size={30} className={classes.buttonProgress} />
								)}
							</div>
						</Box>
					</form>

					<div>
						<Box my={2}>
							<Box>
								<Button
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
									size="large"
									onClick={handleSubmit}
									variant="outlined">
									<GoogleIcon width="20px" height="20px" />
								</Button>
							</Box>
						</Box>
					</div>

					<Typography style={{ float: 'right' }} variant="body1">
						<Box fontWeight={600} display="flex" alignItems="center">
							<Box fontSize=".85rem">
								Don't have an account?
							</Box>
							<Box ml={2}
								fontSize=".85rem"
							>
								<Link to="/signup">
									Sign Up
								</Link>
							</Box>
						</Box>
					</Typography>

				</Container>
			</Box>
		</>
	);
};

export default LoginView;
