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
			name: 'Dashboard',
			path: '/dashboard',
			icon: 'dashboard',
		},
		{
			name: 'Users',
			path: '/auth/users',
			icon: 'group',
		},
		{
			name: 'Settings',
			path: '/auth/list/admin',
			icon: "settings",
		},
		{
			name: 'Roles',
			path: '/products/list/admin',
			icon: "admin_panel_settings",
		},
		{
			name: 'Products',
			path: '/products/list/admin',
			icon: "scatter_plot",
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: 'rss_feed',
		},
	],
	[UserRole.SHOPE_ADMIN]: [
		{
			name: 'Dashboard',
			path: '/',
			icon: 'dashboard',
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: 'scatter_plot',
		},
		{
			name: 'Users',
			path: '/users',
			icon: 'scatter_plot',
		},
	],
	[UserRole.SELLER]: [
		{
			name: 'Dashboard',
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
			name: 'Dashboard',
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
			name: 'Products',
			path: '/products/list',
			icon: 'category',
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: 'format_color_text',
		},
		{
			name: 'About',
			path: '/about',
			icon: 'live_help',
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
