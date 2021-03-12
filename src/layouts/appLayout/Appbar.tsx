import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Avatar, Button, Divider, Grid, Popover } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth';
import { RootState } from '../../app/store';
import firebase from '../../firebase/firebase';
import {setLogged, getLogged} from '../../features/user';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {toggleTheme} from 'features/app';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {},
		customizeToolbar: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		appBarTitlte: {},
		userPopoverContent: {
			minWidth: '240px',
		},
		margin: {
			margin: theme.spacing(1),
		},
		extendedIcon: {
			marginRight: theme.spacing(1),
		},
		userPopover: {
			padding: '1rem',
		},
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
		smallAvatar: {
			width: theme.spacing(4),
			height: theme.spacing(4),
		},
	})
);

function Appbar({ history }: any): JSX.Element {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth)
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};


	// user popover
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleUserPopoverClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleUserPopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'user-popover' : undefined;
	//end of user popover
	//list popover
	const [openPopMenu, setOpenPopMenu] = useState<boolean>(false);

	const handlePopMenuClick = () => {
		setOpenPopMenu(!openPopMenu);
	};
	const signOut = () =>  {
		dispatch(logoutUser(auth.uid, auth.isGuest))
	}
	// end of list popover

	return (
		<div>
			<CssBaseline />
			<AppBar
				elevation={0}
				position="fixed"
				color="default"
				className={classes.appBar}>
				<Toolbar className={classes.customizeToolbar}>
					<Box display="flex" flexDirection="row" width="100%">
						<Box
							flexGrow={1}
							display="flex"
							flexDirection="row"
							alignItems="center">
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								className={classes.menuButton}
								size="small">
								<MenuIcon />
							</IconButton>
							<Typography variant="body1" className={classes.appBarTitlte}>
								<b>DashBoard</b>
							</Typography>
						</Box>
						<Box flexShrink={1} display="flex" flexDirection="row">

							<Avatar
								aria-describedby={id}
								className={classes.smallAvatar}
								onClick={handleUserPopoverClick}
								alt="Remy Sharp"
							/>
							<Popover
								id={id}
								open={open}
								anchorEl={anchorEl}
								className={classes.userPopover}
								onClose={handleUserPopoverClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}>
								<Box pt={2} className={classes.userPopoverContent}>
									<Box m={2}>
										<Grid container spacing={2}>
											<Grid item justify="center" alignItems="center">
												<Avatar alt="User" />
											</Grid>
											<Grid item>
												<h3 style={{ margin: '0' }}>Jean Doe</h3>
												<p style={{ margin: '0' }}>Online</p>
											</Grid>
										</Grid>
									</Box>
									<Divider />
									<List
										component="nav"
										aria-labelledby="nested-list-subheader"
										className={classes.root}>
										<ListItem button>
											<ListItemIcon>
												<SendIcon />
											</ListItemIcon>
											<Box fontSize={14} fontWeight={500} onClick={signOut}>
												Sent mail
											</Box>
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												<DraftsIcon />
											</ListItemIcon>
											<Box fontSize={14} fontWeight={500} onClick={signOut}>
												Drafts
											</Box>
										</ListItem>
										<ListItem button onClick={handlePopMenuClick}>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<Box fontSize={14} fontWeight={500} onClick={signOut}>
												Inbox
											</Box>
											{openPopMenu ? <ExpandLess /> : <ExpandMore />}
										</ListItem>
										<Collapse in={openPopMenu} timeout="auto" unmountOnExit>
											<List component="div" disablePadding>
												<ListItem button className={classes.nested}>
													<ListItemIcon>
														<StarBorder />
													</ListItemIcon>
													<Box fontSize={14} fontWeight={500} onClick={signOut}>
														Starred
													</Box>
												</ListItem>
											</List>
										</Collapse>
										<ListItem button>
											<ListItemIcon>
												<ExitToAppIcon />
											</ListItemIcon>
											<Box fontSize={14} fontWeight={500} onClick={signOut}>
												Logout
											</Box>
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												{appTheme ? <Brightness7Icon /> : <Brightness4Icon />}
											</ListItemIcon>
											<Box
												fontSize={14}
												fontWeight={500}
												onClick={() => dispatch(toggleTheme(appTheme))}>
												Switch Theme
											</Box>
										</ListItem>
									</List>
								</Box>
							</Popover>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Appbar