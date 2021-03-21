import React, {ReactElement} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Element, useEditor} from '@craftjs/core';
import Text from '../../components/user/text/Text';
import MaximizeIcon from '@material-ui/icons/Maximize';
import {
	CheckBoxOutlineBlankRounded,
	TextFieldsRounded,
	Undo,
	Redo,
	YouTube,
	ImageRounded,
} from '@material-ui/icons';
import {Video} from '../../components/user/video/video';
import {Image as ImageComp} from '../../components/user/image/image';
import {Container} from '../../components/selectors/Container';
import Divider from '../../components/selectors/Divider';
import {ListItemText, Tooltip} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: 'none',
		},
		icon: {
			fontSize: '2rem',
			minWidth: '46px !important',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		desktopDrawer: {
			top: 64,
			height: 'calc(100% - 64px)',
		},
		side: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
		},
		component: {
			display: 'flex',
			flex: '1 1 0%',
			flexDirection: 'column',
			alignItems: 'center',
			paddingLeft: '20px',
			paddingTop: '20px',
		},
		undo: {
			display: 'flex',

			flexDirection: 'column',
			alignItems: 'center',
		},
	})
);

export default function MiniDrawer() {
	const classes = useStyles();

	const {
		connectors: {create},
		actions,
		canRedo,
		canUndo,
	} = useEditor((state, query) => ({
		enabled: state.options.enabled,
		canUndo: query.history.canUndo(),
		canRedo: query.history.canRedo(),
	}));

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Drawer
				variant="persistent"
				anchor="left"
				classes={{paper: classes.desktopDrawer + ' MuiAppBar-colorDefault'}}
				open>
				<div className={classes.side + ' MuiAppBar-colorDefault'}>
					<div className={classes.component}>
						<List disablePadding>
							<ListItem
								disableGutters
								innerRef={(ref: ReactElement) =>
									create(ref, <Text text="edit text" />)
								}>
								<ListItemIcon className={classes.icon}>
									<Tooltip title="Insert Text" placement="right">
										<TextFieldsRounded />
									</Tooltip>
								</ListItemIcon>
							</ListItem>
							<ListItem
								disableGutters
								innerRef={(ref: ReactElement) =>
									create(
										ref,
										<Element
											canvas
											is={Container}
											height="auto"
											margin={['10', '10', '10', '10']}
											width="auto"></Element>
									)
								}>
								<ListItemIcon className={classes.icon}>
									<Tooltip title="Insert Container" placement="right">
										<CheckBoxOutlineBlankRounded />
									</Tooltip>
								</ListItemIcon>
							</ListItem>
							<ListItem
								disableGutters
								innerRef={(ref: ReactElement) => create(ref, <Video />)}>
								<ListItemIcon className={classes.icon}>
									<Tooltip title="Insert Youtube Video" placement="right">
										<YouTube />
									</Tooltip>
								</ListItemIcon>
							</ListItem>
							<ListItem
								disableGutters
								innerRef={(ref: ReactElement) => create(ref, <ImageComp />)}>
								<ListItemIcon className={classes.icon}>
									<Tooltip title="Insert Image" placement="right">
										<ImageRounded />
									</Tooltip>
								</ListItemIcon>
							</ListItem>
							<ListItem
								disableGutters
								innerRef={(ref: ReactElement) => create(ref, <Divider />)}>
								<ListItemIcon className={classes.icon}>
									<Tooltip title="Insert Divider" placement="right">
										<MaximizeIcon />
									</Tooltip>
								</ListItemIcon>
							</ListItem>
						</List>
					</div>
				</div>
			</Drawer>
		</div>
	);
}
