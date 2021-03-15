import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import './App.css';
import EditorPage from './pages/editor/editor';
import DashboardPage from './pages/dashboard';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { RootState } from './app/store';
import SignUp from './pages/signup/SignUp';
import Chat from './pages/chat/ChatPage';
import { isLoggedIn } from './features/auth';
import firebase from './firebase/firebase';
import ProductPage from './pages/product';
import BlogsIndex from './pages/editor';
import ShowBlog from './pages/editor/show';
import AppNav from './layouts/appLayout/AppNav';
import PrivateRoutes from "./pages/private/private_route";
import { useSelector, useDispatch } from 'react-redux';

function App() {
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	const auth = useSelector((state: RootState) => state.auth)
	const [loading, setLoaing] = useState(true);
	const dispatch = useDispatch();

	const theme = createMuiTheme({
		palette: {
			type: appTheme ? 'dark' : 'light',
		},
	});

	console.log(auth.authenticated)

	useEffect(() => {
		setLoaing(true)
		if (!auth.authenticated) {
			dispatch(isLoggedIn())
			setLoaing(false);
		}
		setLoaing(false);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			{!loading ? (
				<div>
					<Router>
						<Switch>
							<Route
								exact
								path="/"
								component={SignUp}
							/>

							<PrivateRoutes
								path="/editor"
								component={EditorPage}
							/>
							<PrivateRoutes
								path="/blogs/:blogId"
								component={ShowBlog}
							/>
							<PrivateRoutes
								exact
								path="/blogs"
								component={BlogsIndex}
							/>
							<AppNav>
								<PrivateRoutes
									exact
									path="/dash"
									component={DashboardPage}
								/>
								<PrivateRoutes
									path="/product"
									component={ProductPage}
								/>
								<PrivateRoutes
									path="/chat"
									component={Chat}
								/>
							</AppNav>
						</Switch>
					</Router>
					{/* {logged && roles !== 'guest' && <Chat />} */}
				</div>
			) : (
				<h1>Loading page ...</h1>
			)}
		</ThemeProvider>
	);
}

export default App;
