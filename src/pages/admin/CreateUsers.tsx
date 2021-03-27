import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import { ReactComponent as FacebookIcon } from '../../public/icons/icons8_google_logo_1.svg';
import { ReactComponent as GoogleIcon } from '../../public/icons/icons8_google_logo_1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
	singUpWithProvider,
	signAsGuest,
	isLoggedIn,
	createUserWithEmailPassword,
	createUserWithEmailPasswordAdmin,
	setAuthFailure,
} from '../../features/auth/index';
import { UserRole } from 'features/user/types';
import { Alert, AlertTitle } from '@material-ui/lab';
import AuthAlert from './AuthAlert';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
}));

const CreateNewUser = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const auth = useSelector((state: RootState) => state.auth);
	const [roleUser, setRoleUser] = React.useState('');
	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setRoleUser(event.target.value as string);
	};

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
			dispatch(createUserWithEmailPasswordAdmin(user, roleUser));
			history.push('/users/list')
		} else {
			dispatch(setAuthFailure('Fill the forms first!'));
		}
	};

	return (
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
						<Box fontSize="1.3rem" fontWeight={700} textAlign="center">
							Create New User With Email
						</Box>
					</Box>
					<TextField
						fullWidth
						label="User Name"
						margin="normal"
						name="name"
						type="text"
						size="small"
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
						size="small"
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
						size="small"
						error={auth.errorMessage !== undefined && password === ''}
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>

					<FormControl style={{width: "100%"}}>
						<InputLabel id="demo-simple-select-label">User Role</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={roleUser}
							onChange={handleChange}
						>
							<MenuItem value="ADMIN">ADMIN</MenuItem>
							<MenuItem value="BLOGGER">BLOGGER</MenuItem>
							<MenuItem value="CUSTOMER_SERVICE">CUSTOMER_SERVICE</MenuItem>
							<MenuItem value="USER">USER</MenuItem>
							<MenuItem value="GUEST">GUEST</MenuItem>
							<MenuItem value="SHOPE_ADMIN">SHOPE_ADMIN</MenuItem>
							<MenuItem value="SELLER">SELLER</MenuItem>
						</Select>
					</FormControl>

					<Box my={2}>
						<Button
							color="primary"
							variant="contained"
							onClick={() => {
								handleLogin();
							}}>
							Create Use
						</Button>
					</Box>
				</form>
			</Container>
		</Box>
	);
};

export default CreateNewUser;
