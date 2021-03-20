import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Button, CssBaseline, List, ListItem} from '@material-ui/core';
import {useEditor} from '@craftjs/core';
import lz from 'lzutf8';
import {Undo, Redo} from '@material-ui/icons';
import {postBlog, updateBlog} from '../../features/editor';
import {useAppDispatch} from '../../app/hooks';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store';

import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {toggleTheme} from 'features/app';

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
		undo: {
			marginRight: '20px',
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

	const {
		connectors: {create},
		actions,
		query,
		canRedo,
		canUndo,
	} = useEditor((state, query) => ({
		enabled: state.options.enabled,
		canUndo: query.history.canUndo(),
		canRedo: query.history.canRedo(),
	}));
	const dispatch = useAppDispatch();
	const appTheme = useSelector((state: RootState) => state.app.appTheme);

	return (
		<div className={classes.root}>
			<CssBaseline />
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
					<div className={classes.undo}>
						<IconButton
							className="copy-state-btn"
							size="small"
							disabled={!canUndo}
							color="secondary"
							onClick={() => actions.history.undo()}
							style={{marginRight: '10px'}}>
							<Undo />
						</IconButton>
						<IconButton
							className="copy-state-btn"
							size="small"
							color="secondary"
							disabled={!canRedo}
							onClick={() => actions.history.redo()}
							style={{marginRight: '10px'}}>
							<Redo />
						</IconButton>
					</div>

					<IconButton onClick={() => dispatch(toggleTheme(appTheme))}>
						{appTheme ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>

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
								dispatch(postBlog(values));
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
