import {
	makeStyles,
	Theme,
	createStyles,
	Backdrop,
	CircularProgress,
} from '@material-ui/core';
import {red} from '@material-ui/core/colors';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		cardIcons: {
			float: 'right',
			marginLeft: '60%',
		},
		root: {
			maxWidth: 383,
		},
		media: {
			height: 100,
			paddingTop: '56.25%',
		},
		avatar: {
			backgroundColor: red[500],
		},
		rootDiv: {
			paddingTop: '5%',
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	})
);

function EditorBackdrop(props: {loading: boolean | undefined}) {
	const classes = useStyles();
	return (
		<Backdrop className={classes.backdrop} open={props.loading as boolean}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}

export default EditorBackdrop;
