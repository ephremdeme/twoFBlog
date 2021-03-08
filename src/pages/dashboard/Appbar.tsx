import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwitchBtn from './switchBtn';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import firebase from '../../firebase/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {setLogged, getLogged} from '../../features/user';
import {RootState} from '../../app/store';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
	})
);

export default function Appbar(): JSX.Element {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const onSignOut = () => {
		firebase
			.getInstance()
			.auth.signOut()
			.then(() => {
				dispatch(setLogged(false));
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return (
		<div>
			<CssBaseline />
			<AppBar
				elevation={2}
				position="fixed"
				color="default"
				className={classes.appBar}>
				<Toolbar>
					<Box display="flex" flexDirection="row" width="100%">
						<Box flexGrow={1}>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								className={classes.menuButton}
								size="small">
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" noWrap>
								DashBoard
							</Typography>
						</Box>
						<Box flexShrink={1} display="flex" flexDirection="row">
							<SwitchBtn />
							<Button onClick={onSignOut}>Log out</Button>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
}
