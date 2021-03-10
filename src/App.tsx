import React, {useState, useEffect} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import './App.css';
import EditorPage from './pages/editor/editor';
import DashboardPage from './pages/dashboard';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from './app/store';
import SignUp from './pages/signup/SignUp';
import Chat from './pages/chat/Chatbox';
import firebase from './firebase/firebase';
import {setLogged, setRole, setEmail} from './features/user';
import ProductPage from './pages/product';
import BlogsIndex from './pages/editor';
import ShowBlog from './pages/editor/show';
import AppNav from './layouts/appLayout/AppNav';

function App() {
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	const logged = useSelector((state: RootState) => state.user.logged);
	const roles = useSelector((state: RootState) => state.user.role);
	const [loading, setLoaing] = useState(true);
	const dispatch = useDispatch();

	const theme = createMuiTheme({
		palette: {
			// type: appTheme ? 'dark' : 'light',
		},
	});

	const checkUser = async () => {
		setLoaing(true);
		return firebase.getInstance().auth.onAuthStateChanged((user): any => {
			if (user) {
				console.log(user);

				if (user.isAnonymous) {
					dispatch(setRole('guest'));
					dispatch(setLogged(true));
					setLoaing(false);
				} else {
					firebase
						.getInstance()
						.db.collection('users')
						.doc(user.uid)
						.get()
						.then((userData: any) => {
							if (userData.exists) {
								dispatch(setRole(userData.data().role));
								dispatch(setLogged(true));
								dispatch(setEmail(userData.data().email));
							}
							setLoaing(false);
						});
				}
			} else {
			}
		});
	};

	useEffect(() => {
		checkUser();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			{!loading ? (
				<div>
					<Router>
						<Switch>
							<ProtectedLogin
								exact
								path="/"
								component={SignUp}
								logged={logged}
							/>

							<ProtectedRoutes
								path="/editor"
								component={EditorPage}
								logged={logged}
							/>
							<ProtectedRoutes
								path="/blogs/:blogId"
								component={ShowBlog}
								logged={logged}
							/>
							<ProtectedRoutes
								exact
								path="/blogs"
								component={BlogsIndex}
								logged={logged}
							/>
							<AppNav>
								<ProtectedRoutes
									exact
									path="/dash"
									component={DashboardPage}
									logged={logged}
								/>
								<ProtectedRoutes
									path="/product"
									component={ProductPage}
									logged={logged}
								/>
							</AppNav>
						</Switch>
					</Router>
					{logged && roles !== 'guest' && <Chat />}
				</div>
			) : (
				<SignUp />
			)}
		</ThemeProvider>
	);
}

const ProtectedLogin = ({logged, component: Component, ...rest}: any) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				!logged ? <Component {...props} /> : <Redirect to="/dash" />
			}
		/>
	);
};

const ProtectedRoutes = ({logged, component: Component, ...rest}: any) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				logged ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default App;
