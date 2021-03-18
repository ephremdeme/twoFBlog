import React, { useState, useEffect } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider, makeStyles, Theme, createStyles, Container, Box } from '@material-ui/core';
import { RootState } from './app/store';
import { isLoggedIn } from './features/auth';
import { useSelector, useDispatch } from 'react-redux';
import Router from './router/Router';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import routes, { IRoute } from './router/config';
import { UserRole } from 'features/auth/types';
import AppNav from 'layouts/appLayout/AppNav';
import Loading from './components/loading/loading';
import Error from 'components/error/error'
import Chat from 'pages/chat/chatbox';
import { getMeTheFire } from "features/user";

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

	const theme = createMuiTheme({
		palette: {
			type: appTheme ? 'dark' : 'light',
		},
	});

	theme.overrides = {
		MuiCardHeader:{
			title:{
				fontSize: '16px'
			},
			subheader:{
				fontSize: '15px'
			}
		}
	}

	useEffect(() => {
		if (!auth.authenticated) {
			dispatch(isLoggedIn())
		}
	}, []);


	console.log('?', auth.authenticating)

	return (
		<div>
			{
				auth.authenticating && !auth.error ?
					<Loading /> :
					!auth.authenticating && auth.error?
					<Error/>:
					<div className={classes.root}>
						{
							auth.isGuest &&
							<ThemeProvider theme={theme}>
							<BrowserRouter>
								<Switch>
									{routes.map((route: IRoute, index) => (
										<Route
											key={index}
											path={route.path}
											exact={route.exact}
											children={route.sidebar}
										/>
									))}
								</Switch>
								<main className={classes.content}>
									<div className={classes.toolbar}></div>
									<Router routes={routes} />
									{auth.role === UserRole.GUEST || auth.role === UserRole.USER && !auth.authenticating ? <Chat/> : null}
								</main>
							</BrowserRouter>
						</ThemeProvider>
						}
					</div>
			}
		</div>
	);
}

export default App;
