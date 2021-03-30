import {Box} from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router';

const BlockedPage = () => {
	const {url} = useRouteMatch()

	return (
		<Box
			minHeight="100vh"
			minWidth="100vw"
			display="flex"
			flexDirection="column"
			mt={6}
			textAlign="center"
			justifyContent="center">
			<Box fontSize="4rem" fontWeight={700} color={'#B56'} >Account Blocked</Box>
			<Box fontSize="1rem" fontWeight={400} color={"#557"}>Wohoops Your account was bloced </Box>
		</Box>
	);
};

export default BlockedPage;
