import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	makeStyles,
	CssBaseline,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {
	createUserWithEmailPassword,
	setAuthFailure,
} from '../../features/auth/index';
import AuthAlert from './AuthAlert';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	signup: {
		textDecoration: 'none',
		paddingLeft: '5px',
		...theme.typography.button,
		backgroundColor: theme.palette.background.paper,
	},
	login: {
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
	const [name, setName] = useState('');
	const auth = useSelector((state: RootState) => state.auth);

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
							<Typography color="textPrimary" variant="h2">
								Sign Up
							</Typography>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"></Typography>
						</Box>
						<Box mt={3} mb={1}>
							<AuthAlert />
							<Typography align="center" color="textSecondary" variant="body1">
								Sign Up with email address
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
					<Typography style={{float: 'right'}} variant="body1">
						Already a member?
						<Typography
							variant="body1"
							component={Link}
							to="/login"
							className={classes.login}>
							Login
						</Typography>
					</Typography>
				</Container>
			</Box>
		</>
	);
};

export default LoginView;
