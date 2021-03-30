import Loader from 'components/shared/Loader';
import {UserRole} from 'features/auth/types';
import Appbar from 'layouts/appLayout/Appbar';
import AppNav from 'layouts/appLayout/AppNav';
import ProductAppBar from 'layouts/appLayout/product';
import Chat from 'pages/chat/chatbox';
import React, {
	ComponentType,
	lazy,
	LazyExoticComponent,
	ReactNode,
} from 'react';

export interface IRoute {
	path: string;
	exact: boolean;
	fallback: NonNullable<ReactNode> | null;
	component?: LazyExoticComponent<ComponentType<any>>;
	routes?: IRoute[];
	redirect?: {
		page: string;
		permissions?: UserRole[];
	};
	private?: boolean;
	permissions?: UserRole[];
	sidebar?: () => React.ReactNode;
	appbar?: () => React.ReactNode;
}

const routes: IRoute[] = [
	{
		path: '/',
		exact: true,
		redirect: {
			page: '/products/list',
		},
		fallback: <Loader />,
		permissions: [UserRole.GUEST, UserRole.USER],
	},
	{
		path: '/dashboard',
		component: lazy(() => import('../pages/dashboard')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
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
		path: '/products/',
		exact: false,
		component: lazy(() => import('../pages/product/')),
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		appbar: () => <ProductAppBar />,
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
		sidebar: () => <AppNav />,
		routes: [
			{
				path: '/auth/settings',
				component: lazy(() => import('../pages/admin/Settings')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/users',
				component: lazy(() => import('../pages/admin/user/')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/user/:id/edit',
				component: lazy(() => import('../pages/admin/user/UserEdit')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/user/:id',
				component: lazy(() => import('../pages/admin/user/UserDetail')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/create/user',
				component: lazy(() => import('../pages/admin/user/CreateNewUser')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
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
		sidebar: () => <AppNav />,
		permissions: [UserRole.CUSTOMER_SERVICE, UserRole.ADMIN],
	},
	{
		path: '/login',
		component: lazy(() => import('../pages/signup/login')),
		exact: false,
		fallback: <Loader />,
	},
	{
		path: '/signup',
		component: lazy(() => import('../pages/signup/SignUp')),
		exact: false,
		fallback: <Loader />,
	},
	{
		path: '/about',
		component: lazy(() => import('../pages/util/About')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		permissions: [UserRole.GUEST],
	},
	{
		path: '/guest_home',
		component: lazy(() => import('../pages/users/GuestsHomePage')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		permissions: [UserRole.GUEST],
	},
	{
		path: '/editor',
		component: lazy(() => import('../pages/editor/editor')),
		exact: false,
		fallback: <Loader />,
		permissions: [UserRole.BLOGGER, UserRole.ADMIN, UserRole.EDITOR],
	},
	{
		path: '/blogs/:blogId/edit',
		component: lazy(() => import('../pages/editor/edit')),
		exact: true,
		fallback: <Loader />,
		permissions: [UserRole.BLOGGER, UserRole.ADMIN, UserRole.EDITOR],
	},
	{
		path: '/blogs/:blogId',
		component: lazy(() => import('../pages/blogs/show')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		permissions: [
			UserRole.BLOGGER,
			UserRole.ADMIN,
			UserRole.EDITOR,
			UserRole.GUEST,
			UserRole.USER,
		],
	},
	{
		path: '/blogs',
		component: lazy(() => import('../pages/blogs')),
		exact: true,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		permissions: [
			UserRole.BLOGGER,
			UserRole.ADMIN,
			UserRole.EDITOR,
			UserRole.GUEST,
			UserRole.USER,
		],
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
