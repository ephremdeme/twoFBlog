import {Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import React from 'react';

export const ErrorAlert: React.FC<{
	open: boolean;
	message: string;
	setOpen: (data: boolean) => void;
}> = ({open, setOpen, message, children}) => {
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	return (
		<Snackbar
			open={open}
			anchorOrigin={{vertical: 'top', horizontal: 'center'}}
			autoHideDuration={600000}
			onClose={handleClose}>
			<Alert
				elevation={6}
				variant="filled"
				onClose={handleClose}
				severity="warning">
				{message}
			</Alert>
		</Snackbar>
	);
};
export const SuccesAlert: React.FC<{
	open: boolean;
	message: string;
	setOpen: (data: boolean) => void;
}> = ({open, setOpen, message, children}) => {
	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	return (
		<Snackbar
			open={open}
			anchorOrigin={{vertical: 'top', horizontal: 'center'}}
			autoHideDuration={600000}
			onClose={handleClose}>
			<Alert
				elevation={6}
				variant="filled"
				onClose={handleClose}
				severity="warning">
				{message}
			</Alert>
		</Snackbar>
	);
};
