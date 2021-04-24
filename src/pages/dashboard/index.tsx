import React from 'react';
import {
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import { DashboardTopIndicators } from './DashboardTopIndicators';
import firebase from '../../firebase';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: drawerWidth,
			overflow: 'hidden',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		// list items
		listItems: {
			width: '90%',
			borderRadius: '4px',
			margin: '5px auto',
			transition: 'all .4s',
		},
	})
);

interface Props {
	window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.toolbar} />
			<DashboardTopIndicators />
		</div>
	);
}
