import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import EditorPage from './pages/editor';
import DashboardPage from './pages/dashboard';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {getAppTheme, IAppState} from './features/app';
import {RootState} from './app/store';

function App() {
	const appTheme = useSelector((state: RootState) => state.app.appTheme);

	const theme = createMuiTheme({
		typography: {
			fontSize: 12,
		},
		palette: {
			type: appTheme ? 'dark' : 'light',
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path="/" component={DashboardPage} />
					<Route path="/editor" component={EditorPage} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
