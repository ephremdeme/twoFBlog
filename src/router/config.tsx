import Loader from 'components/shared/Loader';
import { UserRole } from 'features/auth/types';
import AppNav from 'layouts/appLayout/AppNav';
import React, {
	ComponentType,
	lazy,
	LazyExoticComponent,
	ReactNode,
} from 'react';

import Dashboard from '../pages/dashboard'
import About from '../pages/util/About'
import UsersAdmin from '../pages/admin/user/'

export interface IRoute {
	path: string;
	exact: boolean;
	fallback: NonNullable<ReactNode> | null;
	component?: LazyExoticComponent<ComponentType<any>> | any;
	routes?: IRoute[];
	redirect?: {
		page: string;
		permissions?: UserRole[];
	};
	private?: boolean;
	permissions?: UserRole[];
	loginRedirect?: string;
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
		component: Dashboard,
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
		path: '/admin',
		component: lazy(() => import('../pages/dashboard/analytics/auth')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		permissions: [
			UserRole.GUEST
		],
	},
	{
		path: '/shop',
		component: lazy(() => import('../pages/shop')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		permissions: [
			UserRole.ADMIN, UserRole.SHOPE_ADMIN
		],
		routes: [
			{
				path: '/shop/list',
				component: lazy(() => import('../pages/shop/list')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				permissions: [
					UserRole.ADMIN, UserRole.SHOPE_ADMIN
				],
			},
			{
				path: '/shop/create',
				component: lazy(() => import('../pages/shop/create')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
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
		sidebar: () => <AppNav />,
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
				component: UsersAdmin,
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				permissions: [UserRole.ADMIN],
			},
			{
				path: '/auth/roles',
				component: lazy(() => import('../pages/admin/roles')),
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
		path: '/posts',
		component: lazy(() => import('../pages/editor_new/Posts/Posts')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		// permissions: [UserRole.GUEST],
		routes: [
			{
				path: '/posts/list',
				component: lazy(() => import('../pages/editor_new/Posts/Index')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				// permissions: [UserRole.GUEST],
			},
			{
				path: '/posts/:id/detail',
				component: lazy(() => import('../pages/editor_new/Posts/Detail')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				// permissions: [UserRole.GUEST],
			},
			{
				path: '/posts/:id/edit',
				component: lazy(() => import('../pages/editor_new/Posts/Edit')),
				exact: false,
				fallback: <Loader />,
				sidebar: () => <AppNav />,
				// permissions: [UserRole.GUEST],
			}
		]
	},
	{
		path: '/editor',
		component: lazy(() => import('../pages/editor_new/Editor/Index')),
		exact: false,
		fallback: <Loader />,
		sidebar: () => <AppNav />,
		// permissions: [UserRole.GUEST],
	},
	
	
	
	// {
	// 	path: '/editor',
	// 	component: lazy(() => import('../pages/editor/editor')),
	// 	exact: false,
	// 	fallback: <Loader />,
	// 	permissions: [UserRole.BLOGGER, UserRole.ADMIN, UserRole.EDITOR],
	// },
	// {
	// 	path: '/blogs/:blogId/edit',
	// 	component: lazy(() => import('../pages/editor/edit')),
	// 	exact: true,
	// 	fallback: <Loader />,
	// 	permissions: [UserRole.BLOGGER, UserRole.ADMIN, UserRole.EDITOR],
	// },
	// {
	// 	path: '/blogs/:blogId',
	// 	component: lazy(() => import('../pages/blogs/show')),
	// 	exact: false,
	// 	fallback: <Loader />,
	// 	sidebar: () => <AppNav />,
	// 	permissions: [
	// 		UserRole.BLOGGER,
	// 		UserRole.ADMIN,
	// 		UserRole.EDITOR,
	// 		UserRole.GUEST,
	// 		UserRole.USER,
	// 	],
	// },
	// {
	// 	path: '/blogs',
	// 	component: lazy(() => import('../pages/blogs')),
	// 	exact: true,
	// 	fallback: <Loader />,
	// 	sidebar: () => <AppNav />,
	// 	permissions: [
	// 		UserRole.BLOGGER,
	// 		UserRole.ADMIN,
	// 		UserRole.EDITOR,
	// 		UserRole.GUEST,
	// 		UserRole.USER,
	// 	],
	// },
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
