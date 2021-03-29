import {Collapse} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import {RootState} from 'app/store';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

function AuthAlert() {
	const auth = useSelector((state: RootState) => state.auth);
	const [open, setOpen] = React.useState<boolean>(
		auth.errorMessage !== undefined ? true : false
	);

	useEffect(() => {
		if (auth.errorMessage) setOpen(true);
	}, [auth.errorMessage]);

	return (
		<>
			{auth.errorMessage && (
				<Collapse in={open}>
					<Alert
						severity="error"
						onClose={() => {
							setOpen(false);
						}}>
						<AlertTitle>Error</AlertTitle>
						<strong>{auth.errorMessage} </strong>
					</Alert>
				</Collapse>
			)}
		</>
	);
}

export default AuthAlert;
