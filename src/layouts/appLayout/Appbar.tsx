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
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../features/auth';
import {RootState} from '../../app/store';
import { Redirect, withRouter } from "react-router-dom";

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

function Appbar({history}: any): JSX.Element {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth)
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
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
							<Button 
								onClick={()=>{
									dispatch(logoutUser(auth.uid, auth.isGuest))
								}}>Log out</Button>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withRouter(Appbar);