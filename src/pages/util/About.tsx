import {Box} from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router';

const NotFound = () => {
	const {url} = useRouteMatch()

	return (
		<Box
			minHeight="100vh"
			minWidth="70%"
			m="auto"
			display="flex"
			flexDirection="column"
			justifyContent="center">
			<Box fontSize="4rem" fontWeight={700}>About Us Page</Box>
			<Box fontSize="1rem" fontWeight={400}>WHello Welcome to our page you as a gust can view see posts, add producst and more you can become our user by signing up!</Box>
		</Box>
	);
};

export default NotFound;
