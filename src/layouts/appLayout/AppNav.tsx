import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
import {RootState} from '../../app/store';
import {Avatar, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import dashboardRoutes from './routes';
import FB from '../../firebase/firebase';
import {INavRouter} from './routes';
import Icon from '@material-ui/core/Icon';
import {setTheme} from '../../features/app';
import Appbar from './Appbar';
import Dashboard from '@material-ui/icons/Dashboard';

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
		dashboardText: {
			fontSize: '.9rem',
			fontWeight: 'bold'
		}
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
	const role = useSelector((state: RootState) => state.user.role);
	const logged = useSelector((state: RootState) => state.user.logged);
	const [photo, setPhoto] = React.useState<any>('');
	const [name, setName] = React.useState<any>(null);
	const [email, setEmail] = React.useState<any>(null);
	const [navs, setNavs] = useState<INavRouter[]>([]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	React.useEffect(() => {
		FB.getInstance().auth.onAuthStateChanged((user): any => {
			if (user) {
				setPhoto(user.photoURL);
				setName(user.displayName);
				setEmail(user.email);
			} else {
			}
		});

		if (role === 'admin') {
			setNavs(dashboardRoutes['admin']);
		} else if (role === 'user') {
			setNavs(dashboardRoutes['user']);
		} else {
			setNavs(dashboardRoutes['guest']);
		}
	}, []);

	const drawer = (
		<div>
			<Divider />
			<List>
				{navs.map((nav: INavRouter, i: number) => (
					<ListItem
						button
						component={Link}
						to={nav.path}
						key={i}
						className={classes.listItems}>
						<ListItemIcon>
							<Icon>{nav.icon}</Icon>
						</ListItemIcon>
						<ListItemText className={classes.dashboardText} primary={nav.name} />
					</ListItem>
				))}
			</List>
			{/* <Divider /> */}
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Appbar />
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