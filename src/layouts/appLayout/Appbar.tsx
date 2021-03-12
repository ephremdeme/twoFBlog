import React, { useState } from 'react';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {},
		customizeToolbar: {
			display: 'flex',
			borderBottom: '1px solid #aaa',
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
		}
	})
);

function Appbar({ history }: any): JSX.Element {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state: RootState) => state.auth)
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
	// end of list popover

	return (
		<div>
			<CssBaseline />
			<AppBar
				elevation={1}
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
											<ListItemText primary="Sent mail" />
										</ListItem>
										<ListItem button>
											<ListItemIcon>
												<DraftsIcon />
											</ListItemIcon>
											<ListItemText primary="Drafts" />
										</ListItem>
										<ListItem button onClick={handlePopMenuClick}>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText primary="Inbox" />
											{openPopMenu ? <ExpandLess /> : <ExpandMore />}
										</ListItem>
										<Collapse in={openPopMenu} timeout="auto" unmountOnExit>
											<List component="div" disablePadding>
												<ListItem button className={classes.nested}>
													<ListItemIcon>
														<StarBorder />
													</ListItemIcon>
													<ListItemText primary="Starred" />
												</ListItem>
											</List>
										</Collapse>
										<ListItem button>
											<ListItemIcon>
												<ExitToAppIcon />
											</ListItemIcon>
											<ListItemText primary="Logout" onClick={() => {
												dispatch(logoutUser(auth.uid, auth.isGuest))
											}} />
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