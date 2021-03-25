import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
	makeStyles,
	Collapse,
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
	setAuthFailure,
} from '../../features/auth/index';
import {UserRole} from 'features/user/types';
import {Alert, AlertTitle} from '@material-ui/lab';
import AuthAlert from './AuthAlert';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const LoginView = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const auth = useSelector((state: RootState) => state.auth);

	console.log('Err msg', auth.errorMessage);

	const [open, setOpen] = React.useState<boolean>(
		auth.errorMessage !== undefined
	);

	const handleLogin = () => {
		if (email && password && name) {
			const user = {
				email,
				password,
				name,
			};
			dispatch(createUserWithEmailPassword(user));
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
					<form>
						<Box mb={3}>
							<AuthAlert />
							<Typography color="textPrimary" variant="h2">
								Sign Up
							</Typography>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"></Typography>
						</Box>
						<Box mt={3} mb={1}>
							<Typography align="center" color="textSecondary" variant="body1">
								Signup with email address
							</Typography>
						</Box>
						<TextField
							fullWidth
							label="User Name"
							margin="normal"
							name="name"
							type="text"
							variant="outlined"
							error={auth.errorMessage !== undefined && name === ''}
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<TextField
							fullWidth
							label="Email Address"
							margin="normal"
							name="email"
							type="email"
							variant="outlined"
							error={auth.errorMessage !== undefined && email === ''}
							value={email}
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
							error={auth.errorMessage !== undefined && password === ''}
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<Box my={2}>
							<Button
								color="primary"
								fullWidth
								size="large"
								// type="submit"
								variant="contained"
								onClick={() => {
									handleLogin();
								}}>
								Sign Up now
							</Button>
						</Box>
					</form>
				</Container>
			</Box>
		</>
	);
};

export default LoginView;
