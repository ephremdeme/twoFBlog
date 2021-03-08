import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
	makeStyles,
	useTheme,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {setTheme} from '../features/app';
import {Avatar, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';


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
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		drawerPaper: {
			width: drawerWidth,
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
	children?: JSX.Element | JSX.Element[];
}

export default function AppNav(props: Props) {
	const {window} = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	const dispatch = useDispatch();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const navs = [
		{
			name: 'Dashboard',
			path: '/',
			icon: <InboxIcon />,
		},
		{
			name: 'Products',
			path: '/product',
			icon: <InboxIcon />,
		},
		{
			name: 'Blog',
			path: '/editor',
			icon: <InboxIcon />,
		},
	];

	const drawer = (
		<div>
			<Divider />
			<List>
				{navs.map((nav, i) => (
					<ListItem button component={Link} to={nav.path} key={i} className={classes.listItems}>
						<ListItemIcon>{nav.icon}</ListItemIcon>
						<ListItemText primary={nav.name} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem button key={text} className={classes.listItems}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				elevation={2}
				position="fixed"
				color="default"
				className={classes.appBar}
				>
				<Toolbar>
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
						Responsive drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open>
						<Grid container spacing={2} style={{margin: '0.5rem'}}>
							<Grid item justify="center" alignItems="center">
								<Avatar alt="Remy Sharp" />
							</Grid>
							<Grid item>
								<h3 style={{margin: '0'}}>Jean Doe</h3>
								<p style={{margin: '0'}}>Online</p>
							</Grid>
						</Grid>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar}></div>
				{props.children}
				</main>
		</div>
	);
}
