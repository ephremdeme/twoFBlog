import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Button} from '@material-ui/core';
import {useEditor} from '@craftjs/core';
import lz from 'lzutf8';
import {postBlog, updateBlog} from '../../features/editor';
import {useAppDispatch} from '../../app/hooks';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	})
);

export const NavBar: React.FC<{
	enabled: boolean;
	setEnable: (enabled: boolean) => void;
	handleChange: (title: string, value: string) => void;
	values: {
		id: string;
		title: string;
		coverImageUrl: string;
		blogHash: string;
		date: string;
		authorId: string;
	};
}> = ({enabled, setEnable, handleChange, values}) => {
	const classes = useStyles();

	const {actions, query} = useEditor((state, query) => ({
		enabled: state.options.enabled,
	}));
	const dispatch = useAppDispatch();

	return (
		<div className={classes.root}>
			<AppBar elevation={0} position="fixed" color="default">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						className={classes.menuButton}
						edge="start"
						size="small">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap className={classes.title}>
						Blog Editor
					</Typography>
					<Button
						color="inherit"
						onClick={() => {
							actions.setOptions((options) => (options.enabled = !enabled));
							setEnable(!enabled);
							const json = query.serialize();
							const hash = lz.encodeBase64(lz.compress(json));
							handleChange('blogHash', hash);
							console.log(values);
						}}>
						{enabled ? 'Preview' : 'Edit'}{' '}
					</Button>
					<Button
						color="inherit"
						onClick={() => {
							const json = query.serialize();
							const hash = lz.encodeBase64(lz.compress(json));

							handleChange('blogHash', hash);
							if (values.id === '') dispatch(postBlog(values));
							else {
								// dispatch(postBlog(values));
								dispatch(updateBlog(values));
							}
							console.log(values);
						}}>
						Publish
					</Button>
				</Toolbar>
			</AppBar>
			;
		</div>
	);
};
export default NavBar;
