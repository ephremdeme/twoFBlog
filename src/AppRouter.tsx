import { useAppDispatch } from 'app/hooks';
import React from 'react'
import { useSelector } from 'react-redux';
import ReactRoleAccessRouter from "react-rolebased-router";
import routes from './config/router';
import { selectBlocked, selectUserAuthenticated, selectUserRole, setUserBlocked, selectUserId } from 'features/auth';

const AppRouter = () => {
  const dispatch = useAppDispatch();
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
  )
}

export default AppRouter