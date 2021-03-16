import Loader from 'components/shared/Loader';
import {UserRole} from 'features/auth/types';
import AppNav from 'layouts/appLayout/AppNav';
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
}

const routes: IRoute[] = [
	{
		path: '/',
		exact: true,
		redirect: '/dashboard',
		fallback: <Loader />,
	},
	{
		path: '/dashboard',
		component: lazy(() => import('../pages/dashboard')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />
	},
	{
		path: '/product',
		exact: false,
		redirect: '/product/list',
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		routes: [
			{
				path: '/product/list',
				component: lazy(() => import('../pages/product/ProductList')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/product/product_detail',
				component: lazy(() => import('../pages/product/ProductDetial')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/product/update_product',
				component: lazy(() => import('../pages/product/UpdateProduct')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/product/create_product',
				component: lazy(() => import('../pages/product/CreateProduct')),
				exact: false,
				fallback: <Loader />,
			},
			{
				path: '/product/create_product2',
				component: lazy(() => import('../pages/product/create')),
				exact: false,
				fallback: <Loader />,
			},
		],
	},
	{
		path: '/chat',
		component: lazy(() => import('../pages/chat/ChatPage')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />
	},
	{
		path: '/editor',
		component: lazy(() => import('../pages/editor/editor')),
		exact: false,
		fallback: <Loader />,
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
		path: '/blogs',
		component: lazy(() => import('../pages/editor')),
		exact: false,
		fallback: <Loader />,
	},
	{
		path: '/blogs/:blogId',
		component: lazy(() => import('../pages/editor/show')),
		exact: false,
		fallback: <Loader />,
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
