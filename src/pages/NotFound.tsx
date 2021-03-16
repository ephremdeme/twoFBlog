import {Box} from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router';

const NotFound = () => {
	const {url} = useRouteMatch()

	return (
		<Box
			minHeight="100vh"
			minWidth="100%"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center">
			<Box fontSize="4rem" fontWeight={700} color={'#556'} >Page Not Found</Box>
			<Box fontSize="1rem" fontWeight={400} color={"#557"}>Whooops we can't reach {url}</Box>
		</Box>
	);
};

export default NotFound;
