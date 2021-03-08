import React, {ReactElement} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Element, useEditor} from '@craftjs/core';
import Text from 'components/user/text/Text';
import MaximizeIcon from '@material-ui/icons/Maximize';
import {
	CheckBoxOutlineBlankOutlined,
	TextFields,
	Undo,
	Redo,
	YouTube,
	Image,
} from '@material-ui/icons';
import {Video} from 'components/user/video/video';
import {Image as ImageComp} from 'components/user/image/image';
import {Container} from 'components/selectors/Container';
import Divider from 'components/selectors/Divider';

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
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
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
				classes={{paper: classes.desktopDrawer}}
				open>
				<div className={classes.side}>
					<div className={classes.component}>
						<List>
							<ListItem innerRef={(ref: ReactElement) => create(ref, <Text />)}>
								<ListItemIcon>
									<TextFields />
								</ListItemIcon>
							</ListItem>
							<ListItem
								innerRef={(ref: ReactElement) =>
									create(
										ref,
										<Element
											canvas
											is={Container}
											height="300px"
											width="300px"></Element>
									)
								}>
								<ListItemIcon>
									<CheckBoxOutlineBlankOutlined />
								</ListItemIcon>
							</ListItem>
							<ListItem
								innerRef={(ref: ReactElement) => create(ref, <Video />)}>
								<ListItemIcon>
									<YouTube />
								</ListItemIcon>
							</ListItem>
							<ListItem
								innerRef={(ref: ReactElement) => create(ref, <ImageComp />)}>
								<ListItemIcon>
									<Image />
								</ListItemIcon>
							</ListItem>
							<ListItem
								innerRef={(ref: ReactElement) => create(ref, <Divider />)}>
								<ListItemIcon>
									<MaximizeIcon />
								</ListItemIcon>
							</ListItem>
						</List>
					</div>
					<div className={classes.undo}>
						<List>
							<ListItem innerRef={(ref: ReactElement) => create(ref, <Text />)}>
								<IconButton
									className="copy-state-btn"
									size="small"
									disabled={!canUndo}
									onClick={() => actions.history.undo()}
									style={{marginRight: '10px'}}>
									<Undo />
								</IconButton>
							</ListItem>
							<ListItem>
								<IconButton
									className="copy-state-btn"
									size="small"
									color="secondary"
									disabled={!canRedo}
									onClick={() => actions.history.redo()}
									style={{marginRight: '10px'}}>
									<Redo />
								</IconButton>
							</ListItem>
						</List>
					</div>
				</div>
			</Drawer>
		</div>
	);
}
