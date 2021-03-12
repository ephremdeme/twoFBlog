import React from 'react';
import {
	makeStyles,
	Theme,
	createStyles,
} from '@material-ui/core/styles';
import {RootState} from '../../app/store';
import {Cards} from './cards';
import firebase from '../../firebase/firebase';
import {useSelector} from 'react-redux';

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
	const classes = useStyles();
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
		<div>
			<div className={classes.toolbar} />
			{logged && <Cards />}
		</div>
	);
}
