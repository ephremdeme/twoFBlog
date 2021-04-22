import React, { useEffect, useState } from 'react';
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core';
import { RootState } from './app/store';
import { isLoggedIn } from './features/auth';
import { useSelector, useDispatch } from 'react-redux';
import Router from './router/Router';
import { BrowserRouter, Switch, useLocation } from 'react-router-dom';
import routes from './router/config';
import { UserRole } from 'features/auth/types';
import Chat from 'pages/chat/chatbox';
import Layout from 'layouts/app';
import { hideOnRoute } from 'utils/hideOnRoute';

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
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const classes = useStyles();
	const location = useLocation();
	const hideNavBars = [
		'/login', '/signup'
	];
	const [hideOnRouteState, setHideOnRouteState] = useState(hideOnRoute(hideNavBars, location.pathname))

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
	}, [auth.authenticated]);

	return (
		<div>
			{
				<div className={classes.root}>
					<ThemeProvider theme={theme}>
						<BrowserRouter>
							<Layout />
							<main className={classes.content}>
								{hideOnRouteState &&
									<div className={classes.toolbar}></div>
								}
								<Router routes={routes} />
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
