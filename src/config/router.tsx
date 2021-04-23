import React, { lazy } from 'react';
import Loader from 'components/shared/Loader';
import { UserRole } from 'features/auth/types';
import { RouterConfig } from "react-rolebased-router/lib/types";

// page imports
import Dashboard from '../pages/dashboard'
import About from '../pages/util/About'
import UsersAdmin from '../pages/admin/user/'

const routes: RouterConfig[] = [
	{
		path: '/',
		exact: true,
		redirect: [
			{
				page: "/dashboard",
				permissions: [
					UserRole.ADMIN,
					UserRole.CUSTOMER_SERVICE,
					UserRole.BLOGGER,
					UserRole.EDITOR,
					UserRole.SELLER,
					UserRole.SHOPE_ADMIN
				]
			},
			{
				page: "/products/list",
				permissions: [UserRole.GUEST, UserRole.USER]
			}
		],
		fallback: <Loader />,
		permissions: [UserRole.GUEST, UserRole.USER],
	},
	{
		path: '/dashboard',
		component: Dashboard,
		exact: false,
		fallback: <Loader />,
		permissions: [
			UserRole.ADMIN,
			UserRole.CUSTOMER_SERVICE,
			UserRole.BLOGGER,
			UserRole.EDITOR,
			UserRole.SELLER,
			UserRole.SHOPE_ADMIN,
		],
	},
	{
		path: '/admin',
		component: lazy(() => import('../pages/dashboard/analytics/auth')),
		exact: false,
		fallback: <Loader />,
		permissions: [
			UserRole.GUEST
		],
	},
	{
		path: '/shop',
		component: lazy(() => import('../pages/shop')),
		exact: false,
		fallback: <Loader />,
		permissions: [
			UserRole.ADMIN, UserRole.SHOPE_ADMIN
		],
		routes: [
			{
				path: '/shop/list',
				component: lazy(() => import('../pages/shop/list')),
				exact: false,
				fallback: <Loader />,
				permissions: [
					UserRole.ADMIN, UserRole.SHOPE_ADMIN
				],
			},
			{
				path: '/shop/create',
				component: lazy(() => import('../pages/shop/create')),
				exact: false,
				fallback: <Loader />,
				permissions: [
					UserRole.ADMIN, UserRole.SHOPE_ADMIN
				],
			},
		]
	},
	{
		path: '/products/',
		exact: false,
		component: lazy(() => import('../pages/product/')),
		fallback: <Loader />,
		routes: [
			{
				path: '/products/list/admin',
				component: lazy(() => import('../pages/product/admin')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN, UserRole.SHOPE_ADMIN],
			},
			{
				path: '/products/list',
				exact: false,
				component: lazy(() => import('../pages/product/list/index')),
				fallback: <Loader />,
			},
			{
				path: '/products/chart',
				component: lazy(() => import('../pages/product/chart')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/products/orders',
				component: lazy(() => import('../pages/product/orders/index')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/products/:id/detail',
				component: lazy(() => import('../pages/product/detail/index')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN, UserRole.SHOPE_ADMIN, UserRole.USER],
			},
			{
				path: '/products/:id/edit',
				component: lazy(() => import('../pages/product/admin/Edit')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN, UserRole.SHOPE_ADMIN],
			},
			{
				path: '/products/create',
				component: lazy(() => import('../pages/product/create')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN, UserRole.SHOPE_ADMIN],
			},
			{
				path: '/products/*',
				component: lazy(() => import('../pages/util/NotFound')),
				exact: false,
				private: true,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN, UserRole.SHOPE_ADMIN],
			},
		],
	},
	{
		path: '/auth',
		component: lazy(() => import('../pages/admin')),
		exact: false,
		fallback: <Loader />,
		routes: [
			{
				path: '/auth/settings',
				component: lazy(() => import('../pages/admin/settings')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/users',
				component: UsersAdmin,
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/roles',
				component: lazy(() => import('../pages/admin/roles')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/user/:id/edit',
				component: lazy(() => import('../pages/admin/user/UserEdit')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/user/:id',
				component: lazy(() => import('../pages/admin/user/UserDetail')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/create/user',
				component: lazy(() => import('../pages/admin/user/CreateNewUser')),
				exact: false,
				fallback: <Loader />,
				permissions: [UserRole.ADMIN],
			},
		],
		permissions: [UserRole.ADMIN],
	},
	{
		path: '/chat',
		component: lazy(() => import('../pages/chat/ChatPage')),
		exact: false,
		fallback: <Loader />,
		permissions: [UserRole.CUSTOMER_SERVICE, UserRole.ADMIN],
	},
	{
		path: '/login',
		component: lazy(() => import('../pages/auth/Login')),
		exact: false,
		fallback: <Loader />,
		loginRedirect: '/products/list'
	},
	{
		path: '/signup',
		component: lazy(() => import('../pages/auth/SignUp')),
		exact: false,
		fallback: <Loader />,
		loginRedirect: '/products/list'
	},
	{
		path: '/about',
		component: About,
		exact: false,
		fallback: <Loader />,
		permissions: [UserRole.GUEST],
	},
	{
		path: '/guest_home',
		component: lazy(() => import('../pages/users/GuestsHomePage')),
		exact: false,
		fallback: <Loader />,
		permissions: [UserRole.GUEST],
	},
	{
		path: '/posts',
		component: lazy(() => import('../pages/editor/Posts/Posts')),
		exact: false,
		fallback: <Loader />,
		// permissions: [UserRole.GUEST],
		routes: [
			{
				path: '/posts/list',
				component: lazy(() => import('../pages/editor/Posts/Index')),
				exact: false,
				fallback: <Loader />,
				// permissions: [UserRole.GUEST],
			},
			{
				path: '/posts/:id/detail',
				component: lazy(() => import('../pages/editor/Posts/Detail')),
				exact: false,
				fallback: <Loader />,
				// permissions: [UserRole.GUEST],
			},
			{
				path: '/posts/:id/edit',
				component: lazy(() => import('../pages/editor/Posts/Edit')),
				exact: false,
				fallback: <Loader />,
				// permissions: [UserRole.GUEST],
			}
		]
	},
	{
		path: '/editor',
		component: lazy(() => import('../pages/editor/Editor/Index')),
		exact: false,
		fallback: <Loader />,
		// permissions: [UserRole.GUEST],
	},
	{
		path: '/editor',
		component: lazy(() => import('../pages/editor/Editor/Index')),
		exact: false,
		fallback: <Loader />,
		// permissions: [UserRole.GUEST],
	},
	{
		path: '/account-blocked',
		component: lazy(() => import('../pages/util/BlockedPage')),
		exact: false,
		private: true,
		fallback: <Loader />,
	},
	{
		path: '*',
		component: lazy(() => import('../pages/util/NotFound')),
		exact: false,
		private: true,
		fallback: <Loader />,
	},
];

export default routes;
