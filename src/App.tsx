import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {getAppTheme, IAppState} from './features/app';
import {RootState} from './app/store';
import './App.css';
import EditorPage from './pages/editor';
import DashboardPage from './pages/dashboard';
import ProductPage from './pages/product';
import AppNav from 'layout/AppNav';

function App() {
	// const appTheme = useSelector((state: RootState) => state.app.appTheme);

	const appTheme = useSelector((state: RootState) => state.app.appTheme);

	const theme = createMuiTheme({
		palette: {
			type: appTheme ? 'dark' : 'light',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route path="/editor" component={EditorPage} />
					<AppNav>
						<Route exact path="/" component={DashboardPage} />
						<Route path="/product" component={ProductPage} />
					</AppNav>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
