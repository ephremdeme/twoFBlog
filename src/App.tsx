import React, { useEffect } from 'react';

import {
	createMuiTheme,
	ThemeProvider,
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core';

import firebase from 'firebase'
import Layout from 'layouts/app';
import AppRouter from 'AppRouter';
import Chat from 'pages/chat/chatbox';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';
import { UserRole } from 'features/auth/types';
import GlobalLoader from 'components/shared/GlobalLoader';
import { getCollection, useAppDispatch } from 'app/hooks';
import { getGlobalLoading, setGlobalLoader } from 'features/app';
import { BrowserRouter, useHistory, useLocation } from 'react-router-dom';
import { isLoggedIn, selectBlocked, selectUserId, setUserBlocked } from './features/auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		appBar: {
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: drawerWidth,
			marginTop: '65px',
		},
		content: {
			flexGrow: 1,
		},
		// list items
		listItems: {
			width: '90%',
			borderRadius: '4px',
			margin: '5px auto',
			transition: 'all .4s',
		},
	})
);

function App() {
	const dispatch = useAppDispatch();
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	const auth = useSelector((state: RootState) => state.auth);
	const classes = useStyles();
	const history = useHistory();
	const blocked = useSelector(selectBlocked);
	const globalLoader = useSelector(getGlobalLoading)

	const hideNavBars = [
		'/login', '/signup'
	];

	const theme = createMuiTheme({
		palette: {
			type: localStorage.getItem("theme") == 'dark' ? "dark" : appTheme ? "dark" : "light"
		},
		typography: {
			fontFamily: "Poppins",
			h5: {
				fontWeight: 500,
				fontSize: 26,
				letterSpacing: 0.5,
			},
		},
	});

	theme.overrides = {
		MuiCardHeader: {
			title: {
				fontSize: '16px',
			},
			subheader: {
				fontSize: '15px',
			},
		},
	};

	useEffect(() => {
		if (!auth.authenticated) {
			dispatch(isLoggedIn());
		}
		if (auth.authenticated) {
			dispatch(setGlobalLoader({
				loading: false,
				msg: ""
			}))
			history.push('/')
			firebase.auth().onAuthStateChanged((user: any) => {
				if (user) {
					getCollection('users')
						.where('uid', '==', user.uid)
						.onSnapshot((snapshot) => {
							const users = snapshot.docs.map((doc) => doc.data());
							if (users[0]) {
								console.log("BLOCKED USER: ", blocked);
								dispatch(setUserBlocked(users[0].blocked));
								if (!users[0].blocked) {
									dispatch(setGlobalLoader({
										loading: true,
										msg: "Verifying Account Validation...."
									}))
									history.push("/");
									setTimeout(() => dispatch(setGlobalLoader({
										loading: false,
										msg: ""
									})), 100)
								} else {
									dispatch(setGlobalLoader({
										loading: true,
										msg: "Your account has been blocked..."
									}));
									history.push('/account-blocked')
								}
							}
						});
				}
			})
		}
	}, [auth.authenticated]);

	return (
		<div>
			{ globalLoader.loading && <GlobalLoader thickness={4} size={50} />}
			{
				<div className={classes.root}>
					<ThemeProvider theme={theme}>
						<BrowserRouter>
							<Layout />
							<main className={classes.content}>
								<div className={classes.toolbar}></div>
								<AppRouter />
								{auth.role === UserRole.USER && !auth.authenticating ? (
									<Chat />
								) : null}
							</main>
						</BrowserRouter>
					</ThemeProvider>
				</div>
			}
		</div>
	);
}

export default App;
