import React from 'react';
export interface INavRouter {
  name: string;
  path: string;
  icon: string;
}

const navs = {
  'admin': [
		{
			name: 'Admin Dashboard',
			path: '/',
			icon: "dashboard",
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: "scatter_plot",
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: "format_color_text",
		},
	],
	'user': [
		{
			name: 'User Dashboard',
			path: '/',
			icon: "dashboard",
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: "scatter_plot",
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: "format_color_text",
		},
	],
	'guest': [
		{
			name: 'Guest Dashboard',
			path: '/',
			icon: "dashboard",
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: "scatter_plot",
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: "format_color_text",
		},
		{
			name: 'Chat',
			path: '/chat',
			icon: "forum",
		},
	]
}

export default navs