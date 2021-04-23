import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
	createUserWithEmailPassword,
	setAuthFailure,
} from '../../features/auth/index';
import AuthAlert from './AuthAlert';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#ffffff",
		backgroundImage: localStorage.getItem('theme') === 'dark' ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23181818' stroke-width='0.44' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cuse fill='%231d1d1d' href='%23s' y='2'/%3E%3Cuse fill='%231d1d1d' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23212121' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23212121' href='%23s'/%3E%3Cuse fill='%23262626' href='%23s' x='2'/%3E%3Cuse fill='%23262626' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%232a2a2a'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%232a2a2a'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%232f2f2f'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%23181818'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23343434'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%236a40db'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%236a40db'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%236a40db'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E")` : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='0.44' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cuse fill='%23fafafa' href='%23s' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='2'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%23e5e5e5'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23e0e0e0'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%236a40db'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%236a40db'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(226 1000 750) scale(55.85) translate(-982.09 -736.57)'%3E%3Cg fill='%236a40db'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
		backgroundAttachment: "fixed",
		backgroundSize: "cover",
		height: '100vh',
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: theme.spacing(3),
	},
	container: {
		marginTop: "-5vh",
		background: localStorage.getItem('theme') === 'dark' ? "#333" : "#fff",
		color: localStorage.getItem('theme') === 'dark' ? "#f4f4f4" : "#111",
		boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
		borderRadius: 10,
		padding: "2rem 2rem 2rem"
	},
	signup: {
		textDecoration: 'none',
		paddingLeft: '5px',
		...theme.typography.button,
		backgroundColor: theme.palette.background.paper,
	},
	login: {
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
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const auth = useSelector((state: RootState) => state.auth);
	const [loadingLogin, setLoadingLogin] = useState(false);

	const [open, setOpen] = React.useState<boolean>(
		auth.errorMessage !== undefined
	);

	const handleLogin = () => {
		setLoadingLogin(true)
		if (email && password && name) {
			const user = {
				email,
				password,
				name,
			};
			dispatch(createUserWithEmailPassword(user));
			setTimeout(() => setLoadingLogin(false), 500);
			history.push('/')
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
					<form>
						<Box mb={3}>
							<Typography color="textPrimary" variant="h2">
								<Box textAlign="center" fontWeight={700} fontSize="2.3rem">
									Sign Up
								</Box>
							</Typography>
						</Box>
						<Box mt={3} mb={1}>
							<AuthAlert />
							<Typography align="center" color="textSecondary" variant="body1">
								Sign Up with email address
							</Typography>
						</Box>
						<TextField
							size="small"
							fullWidth
							label="User Name"
							margin="normal"
							variant="outlined"
							name="name"
							type="text"
							error={auth.errorMessage !== undefined && name === ''}
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<TextField
							size="small"
							fullWidth
							label="Email Address"
							margin="normal"
							name="email"
							variant="outlined"
							type="email"
							error={auth.errorMessage !== undefined && email === ''}
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<TextField
							size="small"
							fullWidth
							label="Password"
							margin="normal"
							name="password"
							variant="outlined"
							type="password"
							error={auth.errorMessage !== undefined && password === ''}
							value={password}
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
									Sign Up now
								</Button>
								{loadingLogin && (
									<CircularProgress size={30} className={classes.buttonProgress} />
								)}
							</div>
						</Box>

					</form>
					<Typography style={{ float: 'right' }} variant="body1">
						<Box fontWeight={600} display="flex" alignItems="center">

							<Box fontSize=".85rem">
								Already a member?
							</Box>
							<Box ml={2}
								fontSize=".85rem"
							>
								<Link to="/login">
									Login
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
