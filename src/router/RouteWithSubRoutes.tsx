import { RootState } from 'app/store';
import React, {Suspense} from 'react';
import { useSelector } from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {IRoute} from './config';

const RouteWithSubRoutes = (route: IRoute) => {
	const role = useSelector((state: RootState) => state.auth.role);
	const authenticated = useSelector((state: RootState) => state.auth.authenticated)

	return (
		<Suspense fallback={route.fallback}>
			<Route
				path={route.path}
				render={(props) => {
					if (route.redirect) {
						return <Redirect to={route.redirect} />;
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
