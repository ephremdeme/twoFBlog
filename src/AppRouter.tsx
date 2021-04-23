import { getCollection, useAppDispatch } from 'app/hooks';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ReactRoleAccessRouter from "react-rolebased-router";
import { Redirect } from 'react-router';
import routes from './config/router';
import { selectBlocked, selectUserAuthenticated, selectUserRole, setUserBlocked, selectUserId } from 'features/auth';

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector(selectUserId)
  const role = useSelector(selectUserRole);
  const blocked = useSelector(selectBlocked);
	const authenticated = useSelector(selectUserAuthenticated)

  useEffect(() => {
    getCollection('users')
      .where('uid', '==', userId)
      .onSnapshot((snapshot) => {
        const users = snapshot.docs.map((doc) => doc.data());
        if (users[0]) {
          dispatch(setUserBlocked(users[0].blocked));
          if (!users[0].blocked) {
            <Redirect to="/" />
          }
        }
      });
    return () => { };
  }, []);

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