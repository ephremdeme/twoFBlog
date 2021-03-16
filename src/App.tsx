import React, { useState, useEffect } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider, makeStyles, Theme, createStyles } from '@material-ui/core';
import { RootState } from './app/store';
import { isLoggedIn } from './features/auth';
import { useSelector, useDispatch } from 'react-redux';
import Router from './router/Router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes, { IRoute } from './router/config';
import { UserRole } from 'features/auth/types';
import AppNav from 'layouts/appLayout/AppNav';

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
	const [loading, setLoaing] = useState(true);
	const dispatch = useDispatch();
	const classes = useStyles(); 

	const theme = createMuiTheme({
		palette: {
			type: appTheme ? 'dark' : 'light',
		},
	});

	useEffect(() => {
		setLoaing(true);
		if (!auth.authenticated) {
			dispatch(isLoggedIn());
			setLoaing(false);
		}
		setLoaing(false);
	}, []);

	return (
		<div className={classes.root}>
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
					</main>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
