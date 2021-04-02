import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Loader from 'components/shared/Loader';
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "./firebase/firebase";
import route from "./hooks/useRoutes";
import { Router } from "react-router";
import Main from 'hoc/main';

const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true
}

const rrfProps = {
	firebase: firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<Router history={route}>
					<Main>
						<App />
					</Main>
				</Router>
			</ReactReduxFirebaseProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
