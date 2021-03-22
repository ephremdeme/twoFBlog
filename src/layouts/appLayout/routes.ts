import {UserRole} from 'features/user/types';
import React from 'react';
export interface INavRouter {
	name: string;
	path: string;
	icon: string;
}

const navs = {
	[UserRole.ADMIN]: [
		{
			name: 'Admin Dashboard',
			path: '/',
			icon: 'dashboard',
		},
		{
			name: 'Products',
<<<<<<< HEAD
			path: '/products/list/admin',
			icon: "scatter_plot",
=======
			path: '/products/list',
			icon: 'scatter_plot',
>>>>>>> 778d6eaae7a0ab87f2c754d8db20436a8f85a946
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: 'format_color_text',
		},
	],
	[UserRole.SHOPE_ADMIN]: [
		{
			name: 'Admin Dashboard',
			path: '/',
			icon: 'dashboard',
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: 'scatter_plot',
		},
	],
	[UserRole.SELLER]: [
		{
			name: 'Admin Dashboard',
			path: '/',
			icon: 'dashboard',
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: 'scatter_plot',
		},
	],

	[UserRole.CUSTOMER_SERVICE]: [
		{
			name: 'Admin Dashboard',
			path: '/',
			icon: 'dashboard',
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: 'scatter_plot',
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: 'format_color_text',
		},
	],
	[UserRole.BLOGGER]: [
		{
			name: 'User Dashboard',
			path: '/',
			icon: 'dashboard',
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: 'scatter_plot',
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: 'format_color_text',
		},
	],
	[UserRole.GUEST]: [
		{
			name: 'Guest Dashboard',
			path: '/',
			icon: 'dashboard',
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: 'scatter_plot',
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: 'format_color_text',
		},
	],
	[UserRole.USER]: [
		{
			name: 'User Dashboard',
			path: '/',
			icon: 'dashboard',
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: 'scatter_plot',
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: 'format_color_text',
		},
	],
};

export default navs;
