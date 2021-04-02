import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import SettingsIcon from '@material-ui/icons/Settings';
import SecurityIcon from '@material-ui/icons/Security';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BallotIcon from '@material-ui/icons/Ballot';

import {UserRole} from 'features/user/types';
export interface INavRouter {
	name: string;
	path: string;
	icon: JSX.Element;
}

const navs = {
	[UserRole.ADMIN]: [
		{
			name: 'Dashboard',
			path: '/dashboard',
			icon: <DashboardIcon />
		},
		{
			name: 'Users',
			path: '/auth/users',
			icon: <PeopleIcon />
		},
		{
			name: 'Chat',
			path: '/chat',
			icon: <ChatIcon />
		},
		{
			name: 'Settings',
			path: '/auth/settings',
			icon: <SettingsIcon />
		},
		{
			name: 'Roles',
			path: '/auth/roles',
			icon: <SecurityIcon />
		},
		{
			name: 'Products',
			path: '/products/list/admin',
			icon: <ShoppingBasketIcon />
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: <BallotIcon />
		},
	],
	[UserRole.SHOPE_ADMIN]: [
		{
			name: 'Dashboard',
			path: '/',
			icon: <DashboardIcon />
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: <ShoppingBasketIcon />
		},
	],
	[UserRole.SELLER]: [
		{
			name: 'Dashboard',
			path: '/',
			icon: <DashboardIcon />
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: <ShoppingBasketIcon />
		},
	],

	[UserRole.CUSTOMER_SERVICE]: [
		{
			name: 'Dashboard',
			path: '/',
			icon: <DashboardIcon />
		},
		{
			name: 'Chat',
			path: '/chat',
			icon: <ChatIcon />
		},
	],
	[UserRole.BLOGGER]: [
		{
			name: 'User Dashboard',
			path: '/',
			icon: <DashboardIcon />
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: <DashboardIcon />
		},
	],
	[UserRole.EDITOR]: [
		{
			name: 'User Dashboard',
			path: '/',
			icon: <DashboardIcon />
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: <DashboardIcon />
		},
	],
	[UserRole.GUEST]: [
		{
			name: 'Products',
			path: '/products/list',
			icon: <ShoppingBasketIcon />
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: <DashboardIcon />
		},
		{
			name: 'About',
			path: '/about',
			icon: <DashboardIcon />
		},
	],
	[UserRole.USER]: [
		{
			name: 'User Dashboard',
			path: '/',
			icon: <DashboardIcon />
		},
		{
			name: 'Products',
			path: '/products/list',
			icon: <ShoppingBasketIcon />
		},
		{
			name: 'Blogs',
			path: '/blogs',
			icon: <DashboardIcon />
		},
	],
};

export default navs;
