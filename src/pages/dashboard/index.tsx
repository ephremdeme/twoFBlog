import React from 'react';
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
import firebase, {fbase} from '../../firebase/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const drawerWidth = 280;

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
		listItemText: {
			fontSize: '0.9rem',
			fontWeight: 'bold',
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

	return (
		<main className={classes.content}>
			{logged && <Cards />}
		</main>
	);
}
