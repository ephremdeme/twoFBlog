import React, { useState } from 'react';
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	makeStyles,
	CssBaseline,
} from '@material-ui/core';
import {
	singUpWithProvider,
	signInWithEmailPassword,
	setAuthFailure,
} from '../../features/auth/index';
import AuthAlert from './AuthAlert';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as GoogleIcon } from '../../public/icons/icons8_google_logo_1.svg';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#ffffff",
		backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='.5' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cuse fill='%23fafafa' href='%23s' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='2'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23e5e5e5'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23e0e0e0'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(50) translate(-980 -735)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");`,
		backgroundAttachment: "fixed",
		backgroundSize: "cover",
		height: '100vh',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	container: {
		marginTop: "8vh",
		background: "#fff",
		color: "#111",
		boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
		borderRadius: 10,
		padding: "2rem 2rem 2rem"
	},
	signup: {
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
							<Box textAlign="center" fontSize="2.3rem" fontWeight={700}>
								Login
							</Box>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"></Typography>
						</Box>
						<Box mt={1} mb={1}>
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
						<Box mt={3} display="flex" justifyContent="center">
							<Button
								disableElevation
								color="primary"
								fullWidth
								variant="contained"
								onClick={() => {
									handleLogin();
								}}>
								Sign in now
							</Button>
						</Box>
					</form>

					<div>
						<Box my={2}>
							<Box>
								<Button
									fullWidth
									startIcon={<GoogleIcon width="20px" height="20px" />}
									onClick={handleSubmit}
									variant="outlined">
									Login with Google
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
