import {getCollection} from 'app/hooks';
import {RootState} from 'app/store';
import React, {Suspense, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {IRoute} from './config';

const RouteWithSubRoutes = (route: IRoute) => {
	const role = useSelector((state: RootState) => state.auth.role);
	const authenticated = useSelector(
		(state: RootState) => state.auth.authenticated
	);
	const userId = useSelector((state: RootState) => state.auth.uid);
	const [userBlocked, setUserBlocked] = useState(false);

	useEffect(() => {
		getCollection('users')
			.where('uid', '==', userId)
			.onSnapshot((snapshot) => {
				const users = snapshot.docs.map((doc) => doc.data());
				if (users[0]) {
					setUserBlocked(users[0].blocked);
				}
			});
		return () => {};
	}, []);

	return (
		<Suspense fallback={route.fallback}>
			<Route
				path={route.path}
				render={(props) => {
					if (userBlocked) {
						return <Redirect to={'/account-blocked'} />;
					}
					if (route.redirect) {
						if (route.redirect.page) {
							if (route.redirect.permissions) {
								if (route.redirect.permissions.includes(role)) {
									return <Redirect to={route.redirect.page} />;
								} else {
									return <Redirect to="/signup" />;
								}
							} else {
								return <Redirect to={route.redirect.page} />;
							}
						}
					} else if (route.permissions) {
						if (route.permissions.includes(role)) {
							if (route.component) {
								return <route.component {...props} routes={route.routes} />;
							}
						} else {
							return <Redirect to="/signup" />;
						}
					} else if (route.private) {
						if (authenticated) {
							if (route.component) {
								return <route.component {...props} routes={route.routes} />;
							}
						} else {
							return <Redirect to="/signup" />;
						}
					} else {
						if (route.component) {
							return <route.component {...props} routes={route.routes} />;
						}
					}
				}}
			/>
		</Suspense>
	);
};

export default RouteWithSubRoutes;
