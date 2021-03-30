import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
	makeStyles,
	useTheme,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {RootState} from '../../app/store';
import dashboardRoutes from './routes';
import {INavRouter} from './routes';
import FB from '../../firebase/firebase';
import Icon from '@material-ui/core/Icon';
import Appbar from './Appbar';
import Cookies from 'js-cookie';
import {UserRole} from 'features/user/types';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';


const drawerWidth = 55;

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
			background: theme.palette.background.default,
			width: drawerWidth,
			border: 'none',
			borderRight: '1px solid #666',
			marginTop: '63px',
		},
		content: {
			flexGrow: 1,
		},
		// list items
		listItems: {
			width: '80%',
			padding: '.5rem auto',
			borderRadius: '4px',
			margin: '5px auto',
			transition: 'all .4s',
			background: theme.palette.background.default,
			'&:hover': {
				background: '#1113',
				transition: 'scale(1.1)',
			},
		},
	})
);

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
		fontWeight: 'bold',
		fontSize: '.87rem',
    backgroundColor: theme.palette.common.black,
  },
}));

function TooltipCustom(props: TooltipProps) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}


interface Props {
	window?: () => Window;
	children?: JSX.Element | JSX.Element[];
}

export default function AppNav(props: Props) {
	const classes = useStyles();
	const {window} = props;
	const dispatch = useDispatch();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [navs, setNavs] = useState<INavRouter[]>([]);
	const [photo, setPhoto] = React.useState<any>('');
	const [name, setName] = React.useState<any>(null);
	const [email, setEmail] = React.useState<any>(null);
	const role: UserRole = useSelector((state: RootState) => state.auth.role);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	React.useEffect(() => {
		FB.auth().onAuthStateChanged((user): any => {
			if (user) {
				setPhoto(user.photoURL);
				setName(user.displayName);
				setEmail(user.email);
			} else {
			}
		});
		setNavs(dashboardRoutes[role]);
	}, []);

	const drawer = (
		<div>
			<List>
				{navs.map((nav: INavRouter, i: number) => (
					<TooltipCustom title={nav.name} arrow placement="right">
						<ListItem
							button
							component={Link}
							to={nav.path}
							key={i}
							className={classes.listItems}>
							<ListItemIcon>
								<Icon style={{fontSize: 20, marginLeft: '-4px'}}>{nav.icon}</Icon>
							</ListItemIcon>
						</ListItem>
					</TooltipCustom>
				))}
			</List>
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
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}
