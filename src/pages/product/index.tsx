import { selectBlocked, selectUserAuthenticated, selectUserRole } from 'features/auth';
import React from 'react';
import { useSelector } from 'react-redux';
import ReactRoleAccessRouter from 'react-rolebased-router';
import { RouterConfig } from "react-rolebased-router/lib/types";

interface IProps {
	routes: RouterConfig[]
}

const Product: React.FC<IProps> = ({ routes }) => {
	const role = useSelector(selectUserRole);
  const blocked = useSelector(selectBlocked);
	const authenticated = useSelector(selectUserAuthenticated)

	return (
		<div>
			<ReactRoleAccessRouter
				routes={routes}
				userAuthRoles={role}
				loginRedirectPath={"/login"}
				isUserAuthenticated={authenticated}
				blocked={{
					isBlocked: blocked,
					path: "/account-blocked"
				}}
			/>
		</div>
	);
};

export default Product;
