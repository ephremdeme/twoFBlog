import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
	})
);

export default function NavBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar elevation={2} position="fixed" color="transparent">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						className={classes.menuButton}
						edge="start"
						size="small">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Blog Editor
					</Typography>
				</Toolbar>
			</AppBar>
			;
		</div>
	);
}
