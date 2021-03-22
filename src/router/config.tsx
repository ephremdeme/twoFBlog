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
	redirect?: string;
	private?: boolean;
	permissions?: UserRole[];
	sidebar?: () => React.ReactNode;
	appbar?: () => React.ReactNode;
}

const routes: IRoute[] = [
	{
		path: '/',
		exact: true,
		redirect: '/guest_home',
		fallback: <Loader />,
		permissions: [UserRole.GUEST, UserRole.USER],
	},
	{
		path: '/dashboard',
		component: lazy(() => import('../pages/dashboard')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		permissions: [UserRole.ADMIN, UserRole.CUSTOMER_SERVICE],
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
				path: '/products/list',
				component: lazy(() => import('../pages/product/list')),
				exact: false,
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
				component: lazy(() => import('../pages/product/orders')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/products/:id/detail',
				component: lazy(() => import('../pages/product/detail')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/products/:id/update',
				component: lazy(() => import('../pages/product/UpdateProduct')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/products/create',
				component: lazy(() => import('../pages/product/create')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/products/create_product2',
				component: lazy(() => import('../pages/product/create')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/products/*',
				component: lazy(() => import('../pages/NotFound')),
				exact: false,
				private: true,
				fallback: <Loader />,
			},
		],
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
		path: '/guest_home',
		component: lazy(() => import('../pages/users/GuestsHomePage')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
	},
	{
		path: '/editor',
		component: lazy(() => import('../pages/editor/editor')),
		exact: false,
		fallback: <Loader />,
		permissions: [UserRole.BLOGGER, UserRole.ADMIN],
	},
	{
		path: '/blogs',
		component: lazy(() => import('../pages/editor')),
		exact: false,
		fallback: <Loader />,
		routes: [
			{
				path: '/blogs/:id',
				component: lazy(() => import('../pages/editor/editor')),
				exact: false,
				fallback: <Loader />
			},
		],
	},
	{
		path: '*',
		component: lazy(() => import('../pages/NotFound')),
		exact: false,
		private: true,
		fallback: <Loader />,
	},
];

export default routes;
