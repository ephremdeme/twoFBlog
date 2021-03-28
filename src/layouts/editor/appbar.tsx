import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Button, CssBaseline} from '@material-ui/core';
import {useEditor} from '@craftjs/core';
import lz from 'lzutf8';
import {Undo, Redo, Delete} from '@material-ui/icons';
import {
	IBlog,
	postBlog,
	selectLoading,
	setEditBlog,
	useAddBlog,
} from '../../features/editor';
import {useAppDispatch} from '../../app/hooks';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store';

import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {toggleTheme} from 'features/app';
import EditorBackdrop from 'pages/editor/EditorBackdrop';
import {ErrorAlert} from 'components/helper';
import {Link, useHistory} from 'react-router-dom';
import {useFireDelete} from 'hooks/useFirestore';
import {useImageDirDelete} from 'hooks/useStorage';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 2,
		},
		blogs: {
			flexGrow: 1,
			textAlign: 'center',
			color: theme.palette.text.primary,
		},
		undo: {
			marginRight: '20px',
		},
	})
);
// {
// 	id: string;
// 	title: string;
// 	coverImageUrl: string;
// 	blogHash: string;
// 	date: string;
// 	authorId: string;
// }
export const NavBar: React.FC<{
	enabled: boolean;
	setEnable: (enabled: boolean) => void;
	handleChange: (title: string, value: string) => void;
	values: IBlog;
	deleteAble?: boolean;
}> = ({enabled, setEnable, values, deleteAble}) => {
	const classes = useStyles();

	const {actions, query, canRedo, canUndo} = useEditor((state, query) => ({
		enabled: state.options.enabled,
		canUndo: query.history.canUndo(),
		canRedo: query.history.canRedo(),
	}));
	const dispatch = useAppDispatch();
	const appTheme = useSelector((state: RootState) => state.app.appTheme);
	const user = useSelector((state: RootState) => state.auth);
	const loading = useSelector(selectLoading);

	const {loading: deleteLoading, deleteDoc} = useFireDelete('blogs');

	const {loading: uploadLoading, handleBlogPost} = useAddBlog();

	const {handleDirDelete} = useImageDirDelete('images/');

	const [message, setmessage] = useState('');

	const [open, setopen] = useState(false);

	useEffect(() => {
		if (!enabled) {
			actions.setOptions((options) => (options.enabled = false));
			setEnable(enabled);
		}
	}, []);

	const validateBlog = (blog: IBlog) => {
		const {coverImageUrl, title} = blog;
		if (title === '' || title === undefined) {
			setmessage('Insert Title First!');
			setopen(true);
			return false;
		}
		if (coverImageUrl === '' || coverImageUrl === undefined) {
			setmessage('Uplaod Cover Image First!');
			setopen(true);
			return false;
		}
		return true;
	};
	return (
		<div className={classes.root}>
			<CssBaseline />
			<ErrorAlert open={open} setOpen={setopen} message={message} />

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

					<Typography
						component={Link}
						variant="h6"
						to={'/blogs'}
						noWrap
						className={classes.blogs}>
						Blogs
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
					{(user.role === 'BLOGGER' ||
						user.role === 'ADMIN' ||
						user.role === 'EDITOR') && (
						<>
							{deleteAble && (
								<Button
									variant="contained"
									color="secondary"
									disabled={deleteLoading}
									onClick={(e) => {
										deleteDoc(values.id);
										handleDirDelete(values.id);
									}}
									startIcon={<Delete />}>
									Delete
								</Button>
							)}
							<Button
								color="inherit"
								onClick={() => {
									actions.setOptions((options) => (options.enabled = !enabled));
									setEnable(!enabled);
									// let a = document.getElementById("parent")
									// for (let child = a.firstElementChild; child; child = a.nextElementSibling){
									// 	for (let child1 = child.firstElementChild; child1; child = child.nextElementSibling){ console.log(child1)}}
									const json = query.serialize();
									const hash = lz.encodeBase64(lz.compress(json));
									dispatch(setEditBlog({key: 'blogHash', value: hash}));
									// handleChange('blogHash', hash);
									console.log(values);
								}}>
								{enabled ? 'Preview' : 'Edit'}{' '}
							</Button>
							<Button
								color="inherit"
								disabled={loading}
								onClick={() => {
									const json = query.serialize();
									const hash = lz.encodeBase64(lz.compress(json));

									// handleChange('blogHash', hash);
									dispatch(setEditBlog({key: 'blogHash', value: hash}));
									if (
										!validateBlog({
											...values,
											blogHash: hash,
										})
									)
										return;

									handleBlogPost({
										...values,
										blogHash: hash,
									});
									// dispatch(
									// 	postBlog({
									// 		...values,
									// 		blogHash: hash,
									// 	})
									// );

									console.log(values);
								}}>
								Publish
							</Button>
							<EditorBackdrop loading={loading} />
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};
export default NavBar;
