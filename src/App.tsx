import React, {useState, useEffect} from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {RootState} from './app/store';
import {isLoggedIn} from './features/auth';
import {useSelector, useDispatch} from 'react-redux';
import Router from './router/Router';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import routes, {IRoute} from './router/config';
import {UserRole} from 'features/auth/types';

function App() {
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	const auth = useSelector((state: RootState) => state.auth);
	const [loading, setLoaing] = useState(true);
	const dispatch = useDispatch();

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
		<div>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					{/* <Switch>
						{routes.map((route: IRoute, index) => (
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								children={route.sidebar}
							/>
						))}
					</Switch> */}
					<Router routes={routes} />
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
