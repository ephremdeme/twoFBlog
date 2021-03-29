import React from 'react';
import {UserRole} from 'features/user/types';
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
			path: '/auth/settings',
			icon: 'settings',
		},
		{
			name: 'Roles',
			path: '/products/list/admin',
			icon: 'admin_panel_settings',
		},
		{
			name: 'Products',
			path: '/products/list/admin',
			icon: 'scatter_plot',
		},
		{
			name: 'Blog Editor',
			path: '/editor',
			icon: 'rss_feed',
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: 'book',
		},
		// {
		// 	name: 'Chat',
		// 	path: '/chat',
		// 	icon: 'format_color_text',
		// },
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
		// {
		// 	name: 'Blog',
		// 	path: '/editor',
		// 	icon: 'format_color_text',
		// },
		{
			name: 'Blog Editor',
			path: '/editor',
			icon: 'format_color_text',
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: 'book',
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
			name: 'Blog Editor',
			path: '/editor',
			icon: 'format_color_text',
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: 'book',
		},
	],
	[UserRole.EDITOR]: [
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
			name: 'Blog Editor',
			path: '/editor',
			icon: 'format_color_text',
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: 'book',
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
			icon: 'book',
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
			name: 'Blogs',
			path: '/blogs',
			icon: 'book',
		},
	],
};

export default navs;
