import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import {
	makeStyles,
	useTheme,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import {RootState} from '../../app/store';
import {setTheme} from '../../features/app';
import {Avatar, Grid} from '@material-ui/core';
import {Cards} from './cards';
import Appbar from './Appbar';
import firebase, {fbase} from '../../firebase/firebase';
import {useDispatch, useSelector} from 'react-redux';

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
	const {window} = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const role = useSelector((state: RootState) => state.user.role);
	const logged = useSelector((state: RootState) => state.user.logged);
	const [photo, setPhoto] = React.useState<any>('');
	const [name, setName] = React.useState<any>(null);
	const [email, setEmail] = React.useState<any>(null);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	React.useEffect(() => {
		firebase.getInstance().auth.onAuthStateChanged((user): any => {
			if (user) {
				setPhoto(user.photoURL);
				setName(user.displayName);
				setEmail(user.email);
			} else {
			}
		});
	}, []);

	const drawer_admin = (
		<div>
			<Divider />
			<List>
				<ListItem button className={classes.listItems}>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary="Admin Dashboard" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button className={classes.listItems}>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary="Admin Dashboard" />
				</ListItem>
			</List>
		</div>
	);

	const drawer_user = (
		<div>
			<Divider />
			<List>
				<ListItem button className={classes.listItems}>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary="User Dashboard" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button className={classes.listItems}>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary="User Dashboard" />
				</ListItem>
			</List>
		</div>
	);

	const drawer_guest = (
		<div>
			<Divider />
			<List>
				<ListItem button className={classes.listItems}>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary="Guest Dashboard" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button className={classes.listItems}>
					<ListItemIcon>
						<MailIcon />
					</ListItemIcon>
					<ListItemText primary="Guest Dashboard" />
				</ListItem>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
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
						{role === 'admin'
							? drawer_admin
							: role === 'user'
							? drawer_user
							: drawer_guest}
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
							<Grid item justify="center" alignItems="center" container>
								<Avatar alt="Remy Sharp" src={photo} />
							</Grid>
							{role !== 'guest' ? (
								<Grid item>
									<h3 style={{margin: '0'}}>{name}</h3>
									<p style={{margin: '0'}}>{email}</p>
								</Grid>
							) : (
								<Grid item>
									<h3 style={{margin: '0'}}>Guset</h3>
								</Grid>
							)}
						</Grid>
						{role === 'admin'
							? drawer_admin
							: role === 'user'
							? drawer_user
							: drawer_guest}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{logged && <Cards />}
			</main>
		</div>
	);
}
