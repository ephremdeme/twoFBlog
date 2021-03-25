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
			path: '/products/list/admin',
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
		{
			name: 'Users',
			path: '/users',
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
