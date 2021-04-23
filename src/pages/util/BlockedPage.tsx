import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectBlocked } from 'features/auth';
import { setGlobalLoader } from 'features/app';
import { useHistory, useRouteMatch } from 'react-router';

const BlockedPage = () => {
	const { url } = useRouteMatch();
	const dispatch = useAppDispatch();
	const blocked = useAppSelector(selectBlocked)
	const history = useHistory()

	useEffect(() => {
		dispatch(setGlobalLoader({
			loading: true,
			msg: "Your account has been blocked..."
		}));

		if (!blocked) {
			history.push('/')
			dispatch(setGlobalLoader({
				loading: false,
				msg: ""
			}));
		}
	}, []);

	if (!blocked) {
		history.push('/')
		dispatch(setGlobalLoader({
			loading: false,
			msg: ""
		}));
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			textAlign="center"
			mt="30vh"
			justifyContent="center">
			<Box fontSize="4rem" fontWeight={700} color={localStorage.getItem("theme") === 'dark' ? '#F56' : '#B45'} >Account Blocked</Box>
			<Box fontSize="1rem" fontWeight={400} color={localStorage.getItem("theme") === 'dark' ? '#F56' : '#B34'}> Wohoops Your account was bloced </Box>
			<Box fontSize=".8rem" fontWeight={400} color={localStorage.getItem("theme") === 'dark' ? '#F56' : '#B34'}> cant reach {url}</Box>
		</Box>
	);
};

export default BlockedPage;
